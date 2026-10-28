const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testNestedTrack() {
    const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html');

    // Nest process-line-fill inside process-line-bg
    await page.evaluate(() => {
        const bg = document.querySelector('.process-line-bg');
        const fill = document.querySelector('.process-line-fill');
        if (bg && fill && fill.parentElement !== bg) {
            bg.appendChild(fill);
        }
    });

    await page.addStyleTag({
        content: `
        .process-line-bg {
            position: absolute !important;
            top: 29px !important;
            left: calc(100% / 12) !important;
            width: calc(100% * 5 / 6) !important;
            height: 4px !important;
            background: #e2e8f0 !important;
            border-radius: 2px !important;
            overflow: hidden !important;
            z-index: 1 !important;
            display: block !important;
        }
        .process-line-fill {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            height: 100% !important;
            width: 100% !important;
            background: linear-gradient(90deg, #f47b20, #ff8c33) !important;
            box-shadow: 0 0 12px rgba(244, 123, 32, 0.6) !important;
            border-radius: 2px !important;
            display: block !important;
        }
        `
    });

    await page.evaluate(() => {
        document.querySelector('.process-section').scrollIntoView();
        document.querySelectorAll('.process-step').forEach(s => s.classList.add('active'));
    });
    await new Promise(r => setTimeout(r, 600));

    const section = await page.$('.process-section');
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'test_nested_track_ipad768.png') });
    await browser.close();
    console.log('Saved test_nested_track_ipad768.png');
}

testNestedTrack().catch(err => console.error(err));
