const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testTabletProcess() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        
        // 1. Test iPad Portrait (768 x 1024)
        await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });

        // Check initial state before scrolling
        console.log('Testing 768x1024 iPad...');
        
        // Scroll down to process section
        await page.evaluate(() => {
            const el = document.querySelector('.process-section');
            if (el) el.scrollIntoView({ behavior: 'instant' });
        });

        // Wait 1.5 seconds for auto-cascade animation to finish
        await new Promise(r => setTimeout(r, 1600));

        const section = await page.$('.process-section');
        if (section) {
            await section.screenshot({ path: path.join(ARTIFACT_DIR, 'test_ipad_process_cascade.png') });
            console.log('Saved test_ipad_process_cascade.png');
        }

        // Also take full viewport screenshot to see how it looks in context (like user screenshot)
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_ipad_viewport_context.png') });
        console.log('Saved test_ipad_viewport_context.png');

        // 2. Test iPad Air (820 x 1180)
        await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 2 });
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView({ behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 300));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_ipad_air_process.png') });
        console.log('Saved test_ipad_air_process.png');

        // 3. Test iPad Landscape (1024 x 768)
        await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 2 });
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView({ behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 300));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_ipad_landscape_process.png') });
        console.log('Saved test_ipad_landscape_process.png');

    } finally {
        await browser.close();
    }
}

testTabletProcess().catch(err => console.error(err));
