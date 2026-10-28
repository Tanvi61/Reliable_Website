const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function verifyAll() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // 1. Desktop (1440 x 900)
        await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView({ behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 1600));
        const desktopSection = await page.$('.process-section');
        if (desktopSection) {
            await desktopSection.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_desktop_process.png') });
            console.log('Saved verify_desktop_process.png');
        }

        // 2. Mobile (390 x 844 - iPhone)
        await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView({ behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 1600));
        const mobileSection = await page.$('.process-section');
        if (mobileSection) {
            await mobileSection.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_mobile_process.png') });
            console.log('Saved verify_mobile_process.png');
        }

    } finally {
        await browser.close();
    }
}

verifyAll().catch(err => console.error(err));
