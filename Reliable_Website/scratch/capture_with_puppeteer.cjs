const fs = require('fs');
const path = require('path');
const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function main() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    const viewports = [
        { name: 'ipad_768', width: 768, height: 1024 },
        { name: 'ipad_air_820', width: 820, height: 1180 },
        { name: 'ipad_1024', width: 1024, height: 768 },
        { name: 'mobile_390', width: 390, height: 844 },
        { name: 'desktop_1440', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
        await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
        
        // Wait for page to render fully
        await new Promise(r => setTimeout(r, 600));

        const footer = await page.$('.footer');
        if (footer) {
            await footer.screenshot({ path: path.join(ARTIFACT_DIR, `current_footer_${vp.name}.png`) });
            console.log(`Saved current_footer_${vp.name}.png`);
        }
    }

    await browser.close();
}

main().catch(console.error);
