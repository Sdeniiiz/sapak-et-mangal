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

function runSecurityAudit() {
    console.log('\n=== [5/6] SECURITY & HARDENING AUDIT ===');
    let totalIssues = 0;
    const report = [];

    // 1. Sensitive files check
    const sensitivePatterns = ['.env', 'config.json', 'id_rsa', 'secret.key', 'wp-config.php'];
    for (const pat of sensitivePatterns) {
        if (fs.existsSync(pat)) {
            console.error(`✗ Critical: Sensitive file detected in public root: ${pat}`);
            totalIssues++;
            report.push(`Sensitive file exists: ${pat}`);
        }
    }

    // 2. Target _blank without rel="noopener"
    let unsafeTargetCount = 0;
    for (const page of PAGES) {
        if (!fs.existsSync(page)) continue;
        const html = fs.readFileSync(page, 'utf8');

        // Check target="_blank"
        const linkMatches = html.match(/<a\s+[^>]*target=["']_blank["'][^>]*>/gi) || [];
        for (const a of linkMatches) {
            if (!/rel=["'][^"']*noopener[^"']*["']/i.test(a)) {
                unsafeTargetCount++;
            }
        }

        // Check for insecure http:// script or stylesheet sources
        const insecureHttp = html.match(/(src|href)=["']http:\/\/[^"']+["']/gi) || [];
        const localHttp = insecureHttp.filter(h => !h.includes('localhost') && !h.includes('schema.org') && !h.includes('w3.org'));
        if (localHttp.length > 0) {
            console.warn(`⚠ ${page}: Insecure HTTP resources detected:`, localHttp);
            totalIssues++;
            report.push(`${page}: Insecure HTTP resources found (${localHttp.length})`);
        }
    }

    if (unsafeTargetCount > 0) {
        console.warn(`⚠ Security: ${unsafeTargetCount} links with target="_blank" missing rel="noopener noreferrer"`);
        totalIssues += unsafeTargetCount;
        report.push(`${unsafeTargetCount} target="_blank" links missing rel="noopener"`);
    } else {
        console.log('✓ All target="_blank" links have rel="noopener noreferrer".');
    }

    // 3. Render / Static Security Headers Config Check
    // Check if _headers file exists for Render / Cloudflare / Netlify
    if (fs.existsSync('_headers')) {
        console.log('✓ _headers file exists for static deployment.');
    } else {
        console.warn('⚠ Recommended: Create a standard _headers file for Render/static hosting to set CSP, HSTS, X-Content-Type-Options.');
    }

    console.log(`\nSecurity Result: ${totalIssues === 0 ? 'ALL PASSED (100%)' : totalIssues + ' issues found'}`);
    return { passed: totalIssues === 0, totalIssues, report };
}

if (require.main === module) {
    const res = runSecurityAudit();
    process.exit(res.passed ? 0 : 1);
}

module.exports = runSecurityAudit;
