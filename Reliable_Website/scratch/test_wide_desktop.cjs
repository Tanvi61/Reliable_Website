const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testDesktopScreens() {
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

    const widths = [1920, 1680, 1440, 1366, 1280];

    for (const w of widths) {
        await page.setViewport({ width: w, height: 900 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html');
        await page.addStyleTag({ content: cssToTest });
        await page.evaluate(() => document.querySelector('footer').scrollIntoView());
        const footer = await page.$('footer');
        await footer.screenshot({ path: path.join(ARTIFACT_DIR, `wide_test_${w}.png`) });
    }

    await browser.close();
    console.log('Saved all desktop width tests');
}

testDesktopScreens().catch(err => console.error(err));
