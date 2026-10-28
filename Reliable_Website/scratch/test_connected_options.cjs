const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testOptions() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });

        // OPTION 1: 6 Steps in ONE continuous horizontal connected row on tablet (Single unbroken line 1 to 6)
        await page.addStyleTag({
            content: `
            @media (min-width: 768px) and (max-width: 1024px) {
                .process-timeline {
                    position: relative;
                    margin-top: 50px;
                }
                .process-line-bg, .process-line-fill {
                    display: block !important;
                    top: 30px !important;
                    left: 28px !important;
                    width: calc(100% - 56px) !important;
                    height: 4px !important;
                }
                .process-line-bg {
                    background: #e2e8f0 !important;
                    z-index: 1 !important;
                }
                .process-line-fill {
                    background: linear-gradient(90deg, #f47b20, #ff8c33) !important;
                    box-shadow: 0 0 12px rgba(244, 123, 32, 0.6) !important;
                    z-index: 2 !important;
                    width: 100% !important;
                    transition: width 1s ease-out !important;
                }
                .process-steps {
                    display: grid !important;
                    grid-template-columns: repeat(6, 1fr) !important;
                    gap: 12px !important;
                    position: relative !important;
                    z-index: 3 !important;
                }
                .process-step {
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    text-align: center !important;
                }
                .process-step::before, .process-step::after {
                    display: none !important;
                }
                .step-node {
                    width: 60px !important;
                    height: 60px !important;
                    font-size: 1.05rem !important;
                    margin-bottom: 14px !important;
                    background: #f47b20 !important;
                    border-color: #f47b20 !important;
                    color: #ffffff !important;
                    box-shadow: 0 0 20px rgba(244, 123, 32, 0.55) !important;
                }
                .step-title {
                    font-size: 0.78rem !important;
                    line-height: 1.3 !important;
                    text-align: center !important;
                }
            }
            `
        });

        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView();
        });
        await new Promise(r => setTimeout(r, 600));

        const section = await page.$('.process-section');
        await section.screenshot({ path: path.join(ARTIFACT_DIR, 'option1_single_row_6steps_ipad.png') });
        console.log('Saved option1_single_row_6steps_ipad.png');

    } finally {
        await browser.close();
    }
}

testOptions().catch(err => console.error(err));
