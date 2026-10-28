const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testAnimationSequence() {
    const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
    const page = await browser.newPage();
    
    // Inject the new CSS and new JS
    await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 2 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
    
    await page.addStyleTag({
        content: `
        @media (min-width: 768px) {
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
                cursor: pointer !important;
            }
            .process-step::before, .process-step::after {
                display: none !important;
            }
            .step-node {
                margin: 0 auto 16px auto !important;
                border-radius: 50% !important;
                position: relative !important;
                z-index: 4 !important;
                background: #ffffff !important;
                border: 3px solid #cbd5e1 !important;
                font-weight: 800 !important;
                color: #082b4c !important;
                transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            .process-step.active .step-node {
                background: #f47b20 !important;
                border-color: #f47b20 !important;
                color: #ffffff !important;
                transform: scale(1.08) !important;
                box-shadow: 0 0 22px rgba(244, 123, 32, 0.65) !important;
            }
            .process-line-bg, .process-line-fill {
                display: block !important;
                position: absolute !important;
                left: calc(100% / 12) !important;
                width: calc(100% * 5 / 6) !important;
                height: 4px !important;
                border-radius: 2px !important;
            }
            .process-line-bg {
                background: #e2e8f0 !important;
                z-index: 1 !important;
            }
            .process-line-fill {
                background: linear-gradient(90deg, #f47b20, #ff8c33) !important;
                box-shadow: 0 0 12px rgba(244, 123, 32, 0.6) !important;
                z-index: 2 !important;
                width: 0%;
                transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            .step-title {
                text-align: center !important;
            }
        }
        
        @media (min-width: 768px) and (max-width: 1024px) {
            .step-node {
                width: 58px !important;
                height: 58px !important;
                font-size: 1.05rem !important;
            }
            .process-line-bg, .process-line-fill {
                top: 29px !important;
            }
            .step-title {
                font-size: 0.78rem !important;
                line-height: 1.3 !important;
            }
            .desktop-break {
                display: none !important;
            }
        }
        @media (min-width: 1025px) {
            .step-node {
                width: 72px !important;
                height: 72px !important;
                font-size: 1.15rem !important;
            }
            .process-line-bg, .process-line-fill {
                top: 36px !important;
            }
            .step-title {
                font-size: 0.95rem !important;
            }
        }
        `
    });

    const section = await page.$('.process-section');

    // Run animation steps sequentially and capture each step
    await page.evaluate(() => {
        // Reset all steps
        document.querySelectorAll('.process-step').forEach(s => s.className = 'process-step');
        document.querySelector('.process-line-fill').style.width = '0%';
    });

    // Step 1
    await page.evaluate(() => {
        const steps = document.querySelectorAll('.process-step');
        steps[0].classList.add('active');
    });
    await new Promise(r => setTimeout(r, 200));
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'seq_frame_1.png') });

    // Line 1 -> 2
    await page.evaluate(() => {
        document.querySelector('.process-line-fill').style.width = '20%';
    });
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate(() => {
        document.querySelectorAll('.process-step')[1].classList.add('active');
    });
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'seq_frame_2.png') });

    // Line 2 -> 3
    await page.evaluate(() => {
        document.querySelector('.process-line-fill').style.width = '40%';
    });
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate(() => {
        document.querySelectorAll('.process-step')[2].classList.add('active');
    });
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'seq_frame_3.png') });

    // Line 3 -> 4
    await page.evaluate(() => {
        document.querySelector('.process-line-fill').style.width = '60%';
    });
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate(() => {
        document.querySelectorAll('.process-step')[3].classList.add('active');
    });
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'seq_frame_4.png') });

    // Line 4 -> 5
    await page.evaluate(() => {
        document.querySelector('.process-line-fill').style.width = '80%';
    });
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate(() => {
        document.querySelectorAll('.process-step')[4].classList.add('active');
    });
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'seq_frame_5.png') });

    // Line 5 -> 6
    await page.evaluate(() => {
        document.querySelector('.process-line-fill').style.width = '100%';
    });
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate(() => {
        document.querySelectorAll('.process-step')[5].classList.add('active');
    });
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'seq_frame_6.png') });

    await browser.close();
    console.log('Animation sequence captured from 1 to 6 successfully');
}

testAnimationSequence().catch(err => console.error(err));
