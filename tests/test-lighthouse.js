const { chromium } = require('playwright');

async function runLighthouse() {
    console.log('\n=== [6/6] LIGHTHOUSE PERFORMANCE & AUDIT ===');
    const lighthouse = (await import('lighthouse')).default;
    
    // Launch Chrome / Edge with remote debugging port
    const browser = await chromium.launch({
        channel: 'msedge',
        headless: true,
        args: ['--remote-debugging-port=9222']
    });

    const pagesToTest = [
        { name: 'Anasayfa', url: 'http://localhost:8080/index.html' },
        { name: 'Menümüz', url: 'http://localhost:8080/menumuz.html' }
    ];

    const results = {};

    for (const p of pagesToTest) {
        console.log(`Running Lighthouse on ${p.name} (${p.url})...`);
        const runnerResult = await lighthouse(p.url, {
            port: 9222,
            output: 'json',
            logLevel: 'error',
            onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
            formFactor: 'mobile',
            screenEmulation: {
                mobile: true,
                width: 390,
                height: 844,
                deviceScaleFactor: 2
            }
        });

        const report = runnerResult.lhr;
        const scores = {
            performance: Math.round(report.categories.performance.score * 100),
            accessibility: Math.round(report.categories.accessibility.score * 100),
            bestPractices: Math.round(report.categories['best-practices'].score * 100),
            seo: Math.round(report.categories.seo.score * 100),
            fcp: report.audits['first-contentful-paint'].displayValue,
            lcp: report.audits['largest-contentful-paint'].displayValue,
            cls: report.audits['cumulative-layout-shift'].displayValue,
            tbt: report.audits['total-blocking-time'].displayValue
        };

        results[p.name] = scores;
        console.log(`\nResults for ${p.name}:`);
        console.log(`  Performance:    ${scores.performance}/100`);
        console.log(`  Accessibility:  ${scores.accessibility}/100`);
        console.log(`  Best Practices: ${scores.bestPractices}/100`);
        console.log(`  SEO:            ${scores.seo}/100`);
        console.log(`  FCP: ${scores.fcp} | LCP: ${scores.lcp} | CLS: ${scores.cls} | TBT: ${scores.tbt}`);
    }

    await browser.close();
    return results;
}

if (require.main === module) {
    runLighthouse().then(res => {
        console.log('\nLighthouse Audit completed successfully.');
        process.exit(0);
    }).catch(err => {
        console.error('Lighthouse test error:', err);
        process.exit(1);
    });
}

module.exports = runLighthouse;
