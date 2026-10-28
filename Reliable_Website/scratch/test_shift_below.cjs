const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testShiftBelow() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // 1. Test iPad Portrait (768 x 1024) at Top of page
        await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });

        // Apply the shift-below positioning
        await page.evaluate(() => {
            const el = document.querySelector('.floating-actions');
            if (el) {
                el.style.setProperty('position', 'fixed', 'important');
                el.style.setProperty('top', 'auto', 'important');
                el.style.setProperty('bottom', '85px', 'important');
                el.style.setProperty('right', '16px', 'important');
                el.style.setProperty('transform', 'none', 'important');
                el.style.setProperty('-webkit-transform', 'none', 'important');
                el.style.setProperty('z-index', '2147483647', 'important');
                el.style.setProperty('display', 'flex', 'important');
                el.style.setProperty('flex-direction', 'column', 'important');
                el.style.setProperty('gap', '10px', 'important');
                el.style.setProperty('visibility', 'visible', 'important');
                el.style.setProperty('opacity', '1', 'important');
            }
        });

        // Screenshot 1: iPad Top view (Hero section)
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verified_ipad_top_shifted_below.png') });
        console.log('Saved verified_ipad_top_shifted_below.png');

        // Screenshot 2: iPad Scrolled (About / Services section) with ScrollTopBtn
        await page.evaluate(() => {
            window.scrollTo(0, 700);
        });
        await new Promise(r => setTimeout(r, 300));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verified_ipad_scrolled_shifted_below.png') });
        console.log('Saved verified_ipad_scrolled_shifted_below.png');

        // Screenshot 3: iPad Process Section
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView();
        });
        await new Promise(r => setTimeout(r, 1500));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verified_ipad_process_shifted_below.png') });
        console.log('Saved verified_ipad_process_shifted_below.png');

        // Screenshot 4: iPad Footer Section
        await page.evaluate(() => {
            document.querySelector('footer').scrollIntoView();
        });
        await new Promise(r => setTimeout(r, 400));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verified_ipad_footer_shifted_below.png') });
        console.log('Saved verified_ipad_footer_shifted_below.png');

        // 2. Test Mobile (390 x 844)
        await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
        await page.evaluate(() => {
            window.scrollTo(0, 0);
            const el = document.querySelector('.floating-actions');
            if (el) {
                el.style.setProperty('top', 'auto', 'important');
                el.style.setProperty('bottom', '85px', 'important');
                el.style.setProperty('right', '16px', 'important');
                el.style.setProperty('transform', 'none', 'important');
            }
        });
        await new Promise(r => setTimeout(r, 300));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verified_mobile_top_shifted_below.png') });
        console.log('Saved verified_mobile_top_shifted_below.png');

        // 3. Test Desktop (1440 x 900)
        await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
        await page.evaluate(() => {
            window.scrollTo(0, 0);
            const el = document.querySelector('.floating-actions');
            if (el) {
                el.style.setProperty('top', 'auto', 'important');
                el.style.setProperty('bottom', '90px', 'important');
                el.style.setProperty('right', '18px', 'important');
                el.style.setProperty('transform', 'none', 'important');
            }
        });
        await new Promise(r => setTimeout(r, 300));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verified_desktop_top_shifted_below.png') });
        console.log('Saved verified_desktop_top_shifted_below.png');

    } finally {
        await browser.close();
    }
}

testShiftBelow().catch(err => console.error(err));
