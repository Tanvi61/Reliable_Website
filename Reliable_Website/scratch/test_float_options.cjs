const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testPositions() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });

        // Position 1: Bottom Right above scrollTopBtn (bottom: 85px, right: 16px)
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
        await page.evaluate(() => {
            const el = document.querySelector('.floating-actions');
            el.style.setProperty('top', 'auto', 'important');
            el.style.setProperty('bottom', '85px', 'important');
            el.style.setProperty('transform', 'none', 'important');
            el.style.setProperty('-webkit-transform', 'none', 'important');
        });
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_float_pos1_bottom85.png') });
        console.log('Saved test_float_pos1_bottom85.png');

        // Position 1 with scroll (to see scrollTopBtn interaction)
        await page.evaluate(() => {
            window.scrollTo(0, 600);
        });
        await new Promise(r => setTimeout(r, 200));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_float_pos1_scrolled.png') });
        console.log('Saved test_float_pos1_scrolled.png');

        // Position 2: Shifted down to lower-middle (top: 70% or top: 72%)
        await page.evaluate(() => {
            window.scrollTo(0, 0);
            const el = document.querySelector('.floating-actions');
            el.style.setProperty('top', '72%', 'important');
            el.style.setProperty('bottom', 'auto', 'important');
            el.style.setProperty('transform', 'translateY(-50%)', 'important');
            el.style.setProperty('-webkit-transform', 'translateY(-50%)', 'important');
        });
        await new Promise(r => setTimeout(r, 200));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_float_pos2_top72.png') });
        console.log('Saved test_float_pos2_top72.png');

        // Position 3: Standard bottom right at bottom: 95px or 100px
        await page.evaluate(() => {
            const el = document.querySelector('.floating-actions');
            el.style.setProperty('top', 'auto', 'important');
            el.style.setProperty('bottom', '90px', 'important');
            el.style.setProperty('transform', 'none', 'important');
            el.style.setProperty('-webkit-transform', 'none', 'important');
        });
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_float_pos3_bottom90.png') });
        console.log('Saved test_float_pos3_bottom90.png');

    } finally {
        await browser.close();
    }
}

testPositions().catch(err => console.error(err));
