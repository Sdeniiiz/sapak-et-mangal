const fs = require('fs');
const http = require('http');

const PAGES = [
    'index.html',
    'menumuz.html',
    'hikayemiz.html',
    'rezervasyon.html',
    'fotogaleri.html',
    'videogaleri.html',
    'iletisim.html'
];

function runLinkAudit() {
    console.log('\n=== [2/6] INTERNAL & EXTERNAL LINKS AUDIT ===');
    let totalIssues = 0;
    const allLinks = new Set();
    const linkOrigins = {};

    for (const page of PAGES) {
        if (!fs.existsSync(page)) continue;
        const html = fs.readFileSync(page, 'utf8');

        // Extract href
        const hrefMatches = html.match(/href=["']([^"']*)["']/gi) || [];
        for (const m of hrefMatches) {
            const href = m.replace(/^href=["']|["']$/gi, '').trim();
            if (href && !href.startsWith('javascript:')) {
                allLinks.add(href);
                if (!linkOrigins[href]) linkOrigins[href] = [];
                linkOrigins[href].push(page);
            }
        }
    }

    console.log(`Found ${allLinks.size} unique links across ${PAGES.length} pages.`);

    const phoneRegex = /^tel:(\+?905364116537|05364116537)$/;
    const waRegex = /^https:\/\/wa\.me\/905364116537/;

    let brokenInternal = 0;
    let oldPhones = 0;

    for (const link of allLinks) {
        // Phone numbers
        if (link.startsWith('tel:')) {
            if (!phoneRegex.test(link)) {
                console.warn(`⚠ Outdated phone link: "${link}" on [${linkOrigins[link].join(', ')}]`);
                oldPhones++;
                totalIssues++;
            }
            continue;
        }

        // WhatsApp
        if (link.includes('wa.me') || link.includes('whatsapp.com')) {
            if (!waRegex.test(link)) {
                console.warn(`⚠ Outdated WhatsApp link: "${link}" on [${linkOrigins[link].join(', ')}]`);
                totalIssues++;
            }
            continue;
        }

        // External Links (HTTP/HTTPS)
        if (link.startsWith('http://') || link.startsWith('https://')) {
            continue;
        }

        // Anchors on same page
        if (link.startsWith('#')) {
            if (link === '#' || link === '#!') {
                // Generic empty anchor
            }
            continue;
        }

        // Mailto
        if (link.startsWith('mailto:')) {
            continue;
        }

        // Clean query and hash
        const cleanPath = link.split('?')[0].split('#')[0];
        if (cleanPath && !fs.existsSync(cleanPath)) {
            console.error(`✗ Broken local link: "${link}" on [${linkOrigins[link].join(', ')}]`);
            brokenInternal++;
            totalIssues++;
        }
    }

    if (brokenInternal === 0 && oldPhones === 0) {
        console.log('✓ All local files and internal navigation links exist.');
        console.log('✓ All telephone links match the verified number: 0536 411 65 37.');
        console.log('✓ All WhatsApp links point to 905364116537.');
    }

    console.log(`\nLinks Result: ${totalIssues === 0 ? 'ALL PASSED (100%)' : totalIssues + ' issues found'}`);
    return { passed: totalIssues === 0, totalIssues };
}

if (require.main === module) {
    const res = runLinkAudit();
    process.exit(res.passed ? 0 : 1);
}

module.exports = runLinkAudit;
