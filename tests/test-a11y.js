const { chromium } = require('playwright');
const axeSource = require('axe-core').source;

const PAGES = [
    'index.html',
    'menumuz.html',
    'hikayemiz.html',
    'rezervasyon.html',
    'fotogaleri.html',
    'videogaleri.html',
    'iletisim.html'
];

async function runA11yAudit() {
    console.log('\n=== [4/6] ACCESSIBILITY (AXE-CORE WCAG 2.1 AA) AUDIT ===');
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    let totalViolations = 0;
    const report = {};

    for (const pageName of PAGES) {
        const page = await browser.newPage({
            viewport: { width: 1280, height: 800 }
        });

        await page.goto(`http://localhost:8080/${pageName}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Inject axe
        await page.evaluate(axeSource);

        // Run axe
        const results = await page.evaluate(async () => {
            return await axe.run({
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
                }
            });
        });

        const violations = results.violations.map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.length,
            helpUrl: v.helpUrl
        }));

        report[pageName] = violations;

        if (violations.length === 0) {
            console.log(`✓ ${pageName}: 0 WCAG violations`);
        } else {
            console.warn(`⚠ ${pageName}: ${violations.length} WCAG violation type(s)`);
            violations.forEach(v => {
                console.warn(`   - [${v.impact.toUpperCase()}] ${v.id}: ${v.description} (${v.nodes} elements)`);
            });
            totalViolations += violations.length;
        }

        await page.close();
    }

    await browser.close();
    console.log(`\nA11y Result: ${totalViolations === 0 ? 'ALL PASSED (0 WCAG Violations)' : totalViolations + ' violation types found'}`);
    return { passed: totalViolations === 0, totalViolations, report };
}

if (require.main === module) {
    runA11yAudit().then(res => process.exit(res.passed ? 0 : 1)).catch(err => {
        console.error('Fatal A11y test error:', err);
        process.exit(1);
    });
}

module.exports = runA11yAudit;
