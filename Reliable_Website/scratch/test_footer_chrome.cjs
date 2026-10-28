const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function captureFooterChrome() {
    const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html');
    
    await page.addStyleTag({
        content: `
        .copyright-info {
            transform: translateY(38px) !important;
        }
        `
    });
    
    await page.evaluate(() => {
        document.querySelector('footer').scrollIntoView();
    });
    
    const footer = await page.$('footer');
    await footer.screenshot({ path: path.join(ARTIFACT_DIR, 'test_shift_38px.png') });
    
    const info = await page.evaluate(() => {
        const footer = document.querySelector('footer');
        const footerRect = footer.getBoundingClientRect();
        return Array.from(document.querySelectorAll('.footer-bottom p')).map(p => {
            const r = p.getBoundingClientRect();
            return {
                text: p.innerText,
                topFromFooter: r.top - footerRect.top,
                bottomFromFooter: r.bottom - footerRect.top,
                height: r.height
            };
        });
    });
    console.log(JSON.stringify(info, null, 2));

    await browser.close();
}

captureFooterChrome().catch(err => console.error(err));
