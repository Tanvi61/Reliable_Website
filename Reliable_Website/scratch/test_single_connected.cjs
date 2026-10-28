const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testSingleConnected() {
    const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
    const page = await browser.newPage();
    
    // Inject clean styling
    const customCss = `
        /* Universal connected horizontal timeline for screen >= 768px */
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
            }
            .process-step::before, .process-step::after {
                display: none !important;
            }
            .step-node {
                margin: 0 auto 16px auto !important;
                border-radius: 50% !important;
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
            }
            .step-title {
                text-align: center !important;
            }
        }
        
        /* Specific fine-tuning for tablet 768px - 1024px */
        @media (min-width: 768px) and (max-width: 1024px) {
            .step-node {
                width: 58px !important;
                height: 58px !important;
                font-size: 1.05rem !important;
            }
            .process-line-bg, .process-line-fill {
                top: 29px !important; /* exactly half of 58px */
            }
            .step-title {
                font-size: 0.78rem !important;
                line-height: 1.3 !important;
            }
            .desktop-break {
                display: none !important;
            }
        }

        /* Desktop fine-tuning */
        @media (min-width: 1025px) {
            .step-node {
                width: 72px !important;
                height: 72px !important;
                font-size: 1.15rem !important;
            }
            .process-line-bg, .process-line-fill {
                top: 36px !important; /* exactly half of 72px */
            }
            .step-title {
                font-size: 0.95rem !important;
            }
        }
    `;

    // 1. Test Tablet 768px midway
    await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
    await page.addStyleTag({ content: customCss });
    
    // Animate across steps: test with line at 60% (reaching node 4)
    await page.evaluate(() => {
        const steps = document.querySelectorAll('.process-step');
        const line = document.querySelector('.process-line-fill');
        line.style.width = '60%';
        steps[0].classList.add('active');
        steps[1].classList.add('active');
        steps[2].classList.add('active');
        steps[3].classList.add('active');
    });
    const section = await page.$('.process-section');
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'test_ipad_768_midway.png') });

    // Test with line at 100% (all active)
    await page.evaluate(() => {
        const steps = document.querySelectorAll('.process-step');
        const line = document.querySelector('.process-line-fill');
        line.style.width = '100%';
        steps.forEach(s => s.classList.add('active'));
    });
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'test_ipad_768_full.png') });

    // 2. Test iPad 820px
    await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 2 });
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'test_ipad_820_full.png') });

    // 3. Test Desktop 1280px
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'test_desktop_1280_full.png') });

    await browser.close();
    console.log('Finished testing single connected row across viewports');
}

testSingleConnected().catch(err => console.error(err));
