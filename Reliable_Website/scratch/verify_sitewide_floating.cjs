const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function verifySitewide() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // 1. iPad Portrait (768 x 1024) - Clean file load with zero manual JS injection
        await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
        await new Promise(r => setTimeout(r, 600));

        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'final_verified_ipad_hero_clean.png') });
        console.log('Saved final_verified_ipad_hero_clean.png');

        // Check computed style of .floating-actions
        const computed = await page.evaluate(() => {
            const el = document.querySelector('.floating-actions');
            const rect = el.getBoundingClientRect();
            const cs = window.getComputedStyle(el);
            return {
                bottom: cs.bottom,
                top: cs.top,
                right: cs.right,
                position: cs.position,
                rectY: rect.y,
                windowHeight: window.innerHeight,
                distFromBottom: window.innerHeight - rect.bottom
            };
        });
        console.log('Computed values on iPad:', computed);

        // 2. iPad Scrolled
        await page.evaluate(() => window.scrollTo(0, 1000));
        await new Promise(r => setTimeout(r, 400));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'final_verified_ipad_scrolled_clean.png') });
        console.log('Saved final_verified_ipad_scrolled_clean.png');

        // 3. iPad Footer
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise(r => setTimeout(r, 400));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'final_verified_ipad_footer_clean.png') });
        console.log('Saved final_verified_ipad_footer_clean.png');

        // 4. Mobile (390 x 844) Top
        await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
        await new Promise(r => setTimeout(r, 400));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'final_verified_mobile_hero_clean.png') });
        console.log('Saved final_verified_mobile_hero_clean.png');

        // 5. Desktop (1440 x 900) Top
        await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
        await new Promise(r => setTimeout(r, 400));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'final_verified_desktop_hero_clean.png') });
        console.log('Saved final_verified_desktop_hero_clean.png');

    } finally {
        await browser.close();
    }
}

verifySitewide().catch(err => console.error(err));
