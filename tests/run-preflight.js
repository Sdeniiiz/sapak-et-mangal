const fs = require('fs');
const path = require('path');
const runSeoAudit = require('./test-seo');
const runLinkAudit = require('./test-links');
const runResponsiveAudit = require('./test-responsive');
const runA11yAudit = require('./test-a11y');
const runSecurityAudit = require('./test-security');

async function main() {
    console.log('================================================================');
    console.log('    SAPAK ET MANGAL BAFRA - AUTOMATED PREFLIGHT TEST SUITE      ');
    console.log('================================================================');
    const startTime = Date.now();

    const seoRes = runSeoAudit();
    const linkRes = runLinkAudit();
    const secRes = runSecurityAudit();
    const respRes = await runResponsiveAudit();
    const a11yRes = await runA11yAudit();

    const totalIssues = (seoRes.totalIssues || 0) + 
                        (linkRes.totalIssues || 0) + 
                        (secRes.totalIssues || 0) + 
                        (respRes.totalIssues || 0) + 
                        (a11yRes.totalIssues || 0);

    const summary = {
        timestamp: new Date().toISOString(),
        durationSeconds: ((Date.now() - startTime) / 1000).toFixed(1),
        seo: seoRes,
        links: linkRes,
        security: secRes,
        responsive: respRes,
        accessibility: a11yRes,
        totalIssues,
        status: totalIssues === 0 ? 'READY_FOR_PRODUCTION' : 'CONDITIONAL_READY'
    };

    if (!fs.existsSync('tests/reports')) {
        fs.mkdirSync('tests/reports', { recursive: true });
    }
    fs.writeFileSync('tests/reports/preflight-summary.json', JSON.stringify(summary, null, 2));

    console.log('\n================================================================');
    console.log(`PREFLIGHT SUMMARY: ${totalIssues === 0 ? '✓ ALL CHECKS PASSED (100%)' : '⚠ ' + totalIssues + ' ISSUES DETECTED'}`);
    console.log(`Status: ${summary.status}`);
    console.log(`Duration: ${summary.durationSeconds}s | Report: tests/reports/preflight-summary.json`);
    console.log('================================================================');

    process.exit(totalIssues === 0 ? 0 : 1);
}

main().catch(err => {
    console.error('Fatal preflight error:', err);
    process.exit(1);
});
