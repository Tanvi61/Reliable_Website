const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function verifyLive() {
    const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });

    try {
        const page = await browser.newPage();

        // 1. Live iPad 768px sequence capture
        await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'networkidle0' });

        // Scroll to process section to trigger observer
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView({ behavior: 'instant' });
        });

        // Capture progression across 4.5 seconds
        const delays = [300, 800, 1500, 2200, 2900, 3800, 4800];
        for (let i = 0; i < delays.length; i++) {
            await new Promise(r => setTimeout(r, i === 0 ? delays[0] : (delays[i] - delays[i - 1])));
            const section = await page.$('.process-section');
            await section.screenshot({ path: path.join(ARTIFACT_DIR, `live_ipad768_step_${i + 1}.png`) });
            console.log(`Saved live_ipad768_step_${i + 1}.png`);
        }

        // 2. Test iPad 820px after full animation
        await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView({ behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 4500));
        const sec820 = await page.$('.process-section');
        await sec820.screenshot({ path: path.join(ARTIFACT_DIR, 'live_ipad820_final.png') });
        console.log('Saved live_ipad820_final.png');

        // 3. Test iPad Pro 1024px after full animation
        await page.setViewport({ width: 1024, height: 1366, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView({ behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 4500));
        const sec1024 = await page.$('.process-section');
        await sec1024.screenshot({ path: path.join(ARTIFACT_DIR, 'live_ipad1024_final.png') });
        console.log('Saved live_ipad1024_final.png');

        // 4. Test Desktop 1440px after full animation
        await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView({ behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 4500));
        const secDesktop = await page.$('.process-section');
        await secDesktop.screenshot({ path: path.join(ARTIFACT_DIR, 'live_desktop1440_final.png') });
        console.log('Saved live_desktop1440_final.png');

        // 5. Test Mobile 390px after full animation
        await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView({ behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 4500));
        const secMobile = await page.$('.process-section');
        await secMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'live_mobile390_final.png') });
        console.log('Saved live_mobile390_final.png');

    } finally {
        await browser.close();
    }
}

verifyLive().catch(err => console.error(err));
