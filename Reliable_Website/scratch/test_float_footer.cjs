const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testFooter() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
        
        await page.evaluate(() => {
            const el = document.querySelector('.floating-actions');
            el.style.setProperty('top', 'auto', 'important');
            el.style.setProperty('bottom', '85px', 'important');
            el.style.setProperty('transform', 'none', 'important');
            el.style.setProperty('-webkit-transform', 'none', 'important');
            
            // Scroll to footer
            window.scrollTo(0, document.body.scrollHeight);
        });
        
        await new Promise(r => setTimeout(r, 400));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_float_footer_ipad.png') });
        console.log('Saved test_float_footer_ipad.png');

        // Also test mobile (390 x 844)
        await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_float_footer_mobile.png') });
        console.log('Saved test_float_footer_mobile.png');

        // Test mobile at top
        await page.evaluate(() => {
            window.scrollTo(0, 0);
        });
        await new Promise(r => setTimeout(r, 400));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_float_top_mobile.png') });
        console.log('Saved test_float_top_mobile.png');

    } finally {
        await browser.close();
    }
}

testFooter().catch(err => console.error(err));
