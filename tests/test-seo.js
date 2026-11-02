const fs = require('fs');

const PAGES = [
    'index.html',
    'menumuz.html',
    'hikayemiz.html',
    'rezervasyon.html',
    'fotogaleri.html',
    'videogaleri.html',
    'iletisim.html'
];

function runSeoAudit() {
    console.log('\n=== [1/6] TECHNICAL SEO AUDIT ===');
    let totalIssues = 0;
    const report = {};

    // 1. Robots.txt
    if (fs.existsSync('robots.txt')) {
        const robots = fs.readFileSync('robots.txt', 'utf8');
        if (robots.includes('Sitemap:') && robots.includes('User-agent:')) {
            console.log('✓ robots.txt: Valid (includes User-agent and Sitemap)');
        } else {
            console.warn('⚠ robots.txt: Missing Sitemap or User-agent');
            totalIssues++;
        }
    } else {
        console.error('✗ robots.txt: Missing');
        totalIssues++;
    }

    // 2. Sitemap.xml
    if (fs.existsSync('sitemap.xml')) {
        const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
        let count = (sitemap.match(/<loc>/g) || []).length;
        console.log(`✓ sitemap.xml: Valid (${count} URLs listed)`);
    } else {
        console.error('✗ sitemap.xml: Missing');
        totalIssues++;
    }

    // 3. Page by Page Audit
    for (const page of PAGES) {
        if (!fs.existsSync(page)) {
            console.error(`✗ Page not found: ${page}`);
            totalIssues++;
            continue;
        }

        const html = fs.readFileSync(page, 'utf8');
        const pageIssues = [];

        // Title
        const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : '';
        if (!title) {
            pageIssues.push('Missing <title>');
        } else if (title.length < 30 || title.length > 70) {
            pageIssues.push(`Title length (${title.length} chars) should ideally be between 30-65 chars: "${title}"`);
        }

        // Meta Description (properly match double-quoted or single-quoted content)
        const descMatch = html.match(/<meta\s+name=["']description["']\s+content="([^"]*)"/i) ||
                          html.match(/<meta\s+name=["']description["']\s+content='([^']*)'/i) ||
                          html.match(/<meta\s+content="([^"]*)"\s+name=["']description["']/i);
        const desc = descMatch ? descMatch[1].trim() : '';
        if (!desc) {
            pageIssues.push('Missing meta description');
        } else if (desc.length < 70 || desc.length > 175) {
            pageIssues.push(`Description length (${desc.length} chars) should ideally be 120-165 chars`);
        }

        // Canonical
        const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
        if (!canonMatch) {
            pageIssues.push('Missing canonical link');
        }

        // H1 check
        const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
        if (h1Matches.length === 0) {
            pageIssues.push('Missing H1 heading');
        } else if (h1Matches.length > 1) {
            pageIssues.push(`Multiple H1 headings found (${h1Matches.length})`);
        }

        // Open Graph
        const hasOgTitle = /<meta\s+property=["']og:title["']/i.test(html);
        const hasOgDesc = /<meta\s+property=["']og:description["']/i.test(html);
        const hasOgImage = /<meta\s+property=["']og:image["']/i.test(html);
        const hasOgUrl = /<meta\s+property=["']og:url["']/i.test(html);
        if (!hasOgTitle || !hasOgDesc || !hasOgImage || !hasOgUrl) {
            pageIssues.push('Incomplete OpenGraph tags (og:title, og:description, og:image, og:url required)');
        }

        // Twitter Card
        const hasTwCard = /<meta\s+name=["']twitter:card["']/i.test(html);
        if (!hasTwCard) {
            pageIssues.push('Missing twitter:card meta tag');
        }

        // JSON-LD Schema
        const hasJsonLd = /<script\s+type=["']application\/ld\+json["']/i.test(html);
        if (!hasJsonLd) {
            pageIssues.push('Missing JSON-LD structured data');
        }

        // Images without alt
        const imgMatches = html.match(/<img\s+[^>]*>/gi) || [];
        let missingAltCount = 0;
        for (const img of imgMatches) {
            if (!/alt=["'][^"']*["']/i.test(img)) {
                missingAltCount++;
            }
        }
        if (missingAltCount > 0) {
            pageIssues.push(`${missingAltCount} images missing alt attribute`);
        }

        // HTML lang
        if (!/<html[^>]*lang=["']tr["']/i.test(html)) {
            pageIssues.push('Missing or incorrect lang="tr" attribute on <html>');
        }

        report[page] = {
            title,
            descLength: desc.length,
            h1Count: h1Matches.length,
            issues: pageIssues
        };

        if (pageIssues.length === 0) {
            console.log(`✓ ${page}: Perfect SEO compliance (Title: "${title.slice(0, 45)}...", Desc: ${desc.length} chars)`);
        } else {
            console.warn(`⚠ ${page}: ${pageIssues.length} issue(s)`);
            pageIssues.forEach(i => console.warn(`   - ${i}`));
            totalIssues += pageIssues.length;
        }
    }

    console.log(`\nTechnical SEO Result: ${totalIssues === 0 ? 'ALL PASSED (100% PERFECT)' : totalIssues + ' issues to resolve'}`);
    return { passed: totalIssues === 0, totalIssues, report };
}

if (require.main === module) {
    const res = runSeoAudit();
    process.exit(res.passed ? 0 : 1);
}

module.exports = runSeoAudit;
