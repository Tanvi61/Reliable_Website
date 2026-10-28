const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testShiftingText() {
    const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html');

    const tests = [
        { name: 'shift_15px', css: '.copyright-info { transform: translateY(15px) !important; }' },
        { name: 'shift_22px', css: '.copyright-info { transform: translateY(22px) !important; }' },
        { name: 'shift_28px', css: '.copyright-info { transform: translateY(28px) !important; }' },
        { name: 'shift_35px', css: '.copyright-info { transform: translateY(35px) !important; }' },
    ];

    for (const t of tests) {
        await page.addStyleTag({ content: t.css });
        await page.evaluate(() => document.querySelector('footer').scrollIntoView());
        const footer = await page.$('footer');
        await footer.screenshot({ path: path.join(ARTIFACT_DIR, `test_${t.name}.png`) });
    }

    await browser.close();
    console.log('Saved shift tests');
}

testShiftingText().catch(err => console.error(err));
