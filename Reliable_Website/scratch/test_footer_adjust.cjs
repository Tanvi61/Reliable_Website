const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testFooterAdjust() {
    const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html');

    // Test variations of padding-top on footer-bottom
    const variations = [
        { name: 'pad_60', css: '.footer-bottom { padding-top: 60px !important; padding-bottom: 25px !important; } .footer-grid { margin-bottom: 25px !important; }' },
        { name: 'pad_70', css: '.footer-bottom { padding-top: 70px !important; padding-bottom: 25px !important; } .footer-grid { margin-bottom: 20px !important; }' },
        { name: 'pad_80', css: '.footer-bottom { padding-top: 80px !important; padding-bottom: 30px !important; } .footer-grid { margin-bottom: 20px !important; }' },
        { name: 'pad_90', css: '.footer-bottom { padding-top: 90px !important; padding-bottom: 30px !important; } .footer-grid { margin-bottom: 15px !important; }' },
    ];

    for (const v of variations) {
        await page.addStyleTag({ content: v.css });
        await page.evaluate(() => document.querySelector('footer').scrollIntoView());
        const footer = await page.$('footer');
        await footer.screenshot({ path: path.join(ARTIFACT_DIR, `test_footer_${v.name}.png`) });
    }

    await browser.close();
    console.log('Saved all variations');
}

testFooterAdjust().catch(err => console.error(err));
