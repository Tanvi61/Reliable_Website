const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

(async () => {
    const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
    const page = await browser.newPage();
    
    // 1. Mobile 390px
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html');
    await page.evaluate(() => document.querySelector('.process-section').scrollIntoView());
    await new Promise(r => setTimeout(r, 4500));
    const secMobile = await page.$('.process-section');
    await secMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_isolated_test.png') });
    
    // 2. iPad 768px
    await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html');
    await page.evaluate(() => document.querySelector('.process-section').scrollIntoView());
    await new Promise(r => setTimeout(r, 4500));
    const secIpad = await page.$('.process-section');
    await secIpad.screenshot({ path: path.join(ARTIFACT_DIR, 'ipad_isolated_test.png') });
    
    await browser.close();
    console.log('Mobile & iPad test completed');
})();
