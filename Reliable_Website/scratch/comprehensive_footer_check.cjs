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

    const tests = [
        { page: 'index.html', vpName: 'ipad_768_portrait', width: 768, height: 1024 },
        { page: 'index.html', vpName: 'ipad_air_820_portrait', width: 820, height: 1180 },
        { page: 'index.html', vpName: 'tablet_landscape_1024', width: 1024, height: 768 },
        { page: 'index.html', vpName: 'mobile_390', width: 390, height: 844 },
        { page: 'index.html', vpName: 'desktop_1440', width: 1440, height: 900 },
        { page: 'contact.html', vpName: 'ipad_768_portrait', width: 768, height: 1024 },
        { page: 'contact.html', vpName: 'mobile_390', width: 390, height: 844 },
        { page: 'about.html', vpName: 'ipad_768_portrait', width: 768, height: 1024 }
    ];

    for (const t of tests) {
        await page.setViewport({ width: t.width, height: t.height, deviceScaleFactor: 1 });
        await page.goto(`file:///e:/MindAxis_Web/Reliable_Website/${t.page}`, { waitUntil: 'load' });
        await new Promise(r => setTimeout(r, 600));

        const footer = await page.$('.footer');
        if (footer) {
            const outPath = path.join(ARTIFACT_DIR, `final_verified_${t.page.replace('.html', '')}_${t.vpName}.png`);
            await footer.screenshot({ path: outPath });
            console.log(`Saved ${path.basename(outPath)}`);
        }
    }

    await browser.close();
}

main().catch(console.error);
