const { chromium } = require('playwright');

const VIEWPORTS = [
    { name: '320px (Small Phone)', width: 320, height: 600 },
    { name: '375px (iPhone SE)', width: 375, height: 667 },
    { name: '390px (iPhone 12/13/14)', width: 390, height: 844 },
    { name: '430px (iPhone 14/15 Pro Max)', width: 430, height: 932 },
    { name: '768px (Tablet Portrait)', width: 768, height: 1024 },
    { name: '1024px (Tablet Landscape)', width: 1024, height: 768 },
    { name: '1366px (Standard Laptop)', width: 1366, height: 768 },
    { name: '1920px (Desktop Full HD)', width: 1920, height: 1080 }
];

const PAGES = [
    'index.html',
    'menumuz.html',
    'hikayemiz.html',
    'rezervasyon.html',
    'fotogaleri.html',
    'videogaleri.html',
    'iletisim.html'
];

async function runResponsiveAudit() {
    console.log('\n=== [3/6] MULTI-DEVICE & RESPONSIVE AUDIT (PLAYWRIGHT) ===');
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    let totalIssues = 0;
    const errorsList = [];

    for (const pageName of PAGES) {
        console.log(`\nTesting page: ${pageName}`);
        for (const vp of VIEWPORTS) {
            const context = await browser.newContext({
                viewport: { width: vp.width, height: vp.height },
                userAgent: vp.width < 768 
                    ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
                    : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
            });

            const page = await context.newPage();
            const consoleErrors = [];
            const failedRequests = [];

            page.on('console', msg => {
                if (msg.type() === 'error') consoleErrors.push(msg.text());
            });

            page.on('requestfailed', req => {
                failedRequests.push(`${req.method()} ${req.url()}`);
            });

            const url = `http://localhost:8080/${pageName}`;
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(300);

            // Check horizontal overflow
            const overflow = await page.evaluate(() => {
                const docWidth = document.documentElement.scrollWidth;
                const winWidth = window.innerWidth;
                const hasOverflow = docWidth > winWidth + 2;
                
                let offendingElements = [];
                if (hasOverflow) {
                    const all = document.querySelectorAll('*');
                    all.forEach(el => {
                        const r = el.getBoundingClientRect();
                        if (r.right > winWidth + 2) {
                            offendingElements.push({
                                tag: el.tagName,
                                class: el.className,
                                id: el.id,
                                right: Math.round(r.right),
                                width: Math.round(r.width)
                            });
                        }
                    });
                }
                return { hasOverflow, docWidth, winWidth, offending: offendingElements.slice(0, 3) };
            });

            if (overflow.hasOverflow) {
                console.warn(`  ⚠ Overflow on ${vp.name}: docWidth=${overflow.docWidth}px > winWidth=${overflow.winWidth}px`);
                overflow.offending.forEach(o => console.warn(`     Offending: <${o.tag} class="${o.class}"> (width=${o.width}px, right=${o.right}px)`));
                totalIssues++;
                errorsList.push({ page: pageName, viewport: vp.name, type: 'overflow', details: overflow });
            }

            if (consoleErrors.length > 0) {
                console.warn(`  ⚠ Console errors on ${vp.name}:`, consoleErrors.join(' | '));
                totalIssues++;
            }

            if (failedRequests.length > 0) {
                console.warn(`  ⚠ Failed network requests on ${vp.name}:`, failedRequests.join(' | '));
                totalIssues++;
            }

            // Mobile menu check (on mobile viewports)
            if (vp.width <= 768) {
                const hasMenuToggle = await page.evaluate(() => {
                    const btn = document.querySelector('.btn-menu, .mobile-button, .navbar-toggle');
                    return !!btn;
                });
                if (!hasMenuToggle) {
                    console.warn(`  ⚠ Mobile menu toggle button not detected on ${vp.name}`);
                }
            }

            await context.close();
        }
        console.log(`✓ ${pageName}: Responsive tests completed across 8 viewports.`);
    }

    await browser.close();
    console.log(`\nResponsive Result: ${totalIssues === 0 ? 'ALL PASSED (Zero Horizontal Overflow across 8 screen sizes)' : totalIssues + ' issues found'}`);
    return { passed: totalIssues === 0, totalIssues, errorsList };
}

if (require.main === module) {
    runResponsiveAudit().then(res => process.exit(res.passed ? 0 : 1)).catch(err => {
        console.error('Fatal responsive test error:', err);
        process.exit(1);
    });
}

module.exports = runResponsiveAudit;
