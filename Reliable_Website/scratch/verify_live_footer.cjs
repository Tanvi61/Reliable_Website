const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function verifyLiveFooter() {
    const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
    const page = await browser.newPage();

    const viewports = [
        { name: 'desktop_1920', w: 1920, h: 900 },
        { name: 'desktop_1440', w: 1440, h: 900 },
        { name: 'laptop_1280', w: 1280, h: 800 },
        { name: 'tablet_1024', w: 1024, h: 1366 },
        { name: 'tablet_768', w: 768, h: 1024 },
        { name: 'mobile_390', w: 390, h: 844 },
    ];

    for (const vp of viewports) {
        await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: vp.w < 1200 ? 2 : 1 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'networkidle0' });
        await page.evaluate(() => document.querySelector('footer').scrollIntoView());
        const footer = await page.$('footer');
        await footer.screenshot({ path: path.join(ARTIFACT_DIR, `verified_footer_${vp.name}.png`) });
        console.log(`Saved verified_footer_${vp.name}.png`);
    }

    await browser.close();
}

verifyLiveFooter().catch(err => console.error(err));
