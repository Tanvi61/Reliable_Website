const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testAllViewports() {
    const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
    const page = await browser.newPage();

    const cssToTest = `
    .footer-bottom {
        border-top: none !important;
    }
    .copyright-info {
        transform: translateY(26px) !important;
    }
    @media (max-width: 767px) {
        .copyright-info {
            transform: translateY(0px) !important;
        }
    }
    `;

    const viewports = [
        { name: 'desk_1440', w: 1440, h: 900 },
        { name: 'desk_1280', w: 1280, h: 800 },
        { name: 'tab_1024', w: 1024, h: 1366 },
        { name: 'tab_768', w: 768, h: 1024 },
        { name: 'mob_390', w: 390, h: 844 },
    ];

    for (const vp of viewports) {
        await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: vp.w < 1200 ? 2 : 1 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html');
        await page.addStyleTag({ content: cssToTest });
        await page.evaluate(() => document.querySelector('footer').scrollIntoView());
        const footer = await page.$('footer');
        await footer.screenshot({ path: path.join(ARTIFACT_DIR, `vp_test_${vp.name}.png`) });
    }

    await browser.close();
    console.log('Saved all viewport tests');
}

testAllViewports().catch(err => console.error(err));
