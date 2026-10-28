const fs = require('fs');
const path = require('path');
const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function verifyAll() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    const viewports = [
        { name: 'verify_ipad_768_portrait', width: 768, height: 1024 },
        { name: 'verify_ipad_air_820_portrait', width: 820, height: 1180 },
        { name: 'verify_ipad_pro_1024_portrait', width: 1024, height: 1366 },
        { name: 'verify_tablet_1024_768_landscape', width: 1024, height: 768 },
        { name: 'verify_mobile_390_iphone14', width: 390, height: 844 },
        { name: 'verify_mobile_430_promax', width: 430, height: 932 },
        { name: 'verify_desktop_1280', width: 1280, height: 800 },
        { name: 'verify_desktop_1440', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
        await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
        await new Promise(r => setTimeout(r, 600));

        const footer = await page.$('.footer');
        if (footer) {
            await footer.screenshot({ path: path.join(ARTIFACT_DIR, `${vp.name}.png`) });
            console.log(`Saved ${vp.name}.png`);
        }
    }

    await browser.close();
}

verifyAll().catch(console.error);
