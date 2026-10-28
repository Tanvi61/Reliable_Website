const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testFullAnimation() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });

    // Inject refined CSS
    await page.addStyleTag({
        content: `
        /* Tablet Process Timeline (768px - 1024px) */
        @media (min-width: 768px) and (max-width: 1024px) {
            .process-steps {
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 45px 30px !important;
                position: relative !important;
            }

            .process-step {
                position: relative !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: flex-start !important;
            }

            /* Inactive baseline track */
            .process-step:not(:nth-child(3)):not(:nth-child(6))::before {
                content: '' !important;
                position: absolute !important;
                top: 36px !important;
                left: 72px !important;
                right: -30px !important;
                height: 4px !important;
                background: #e2e8f0 !important;
                z-index: 1 !important;
                border-radius: 2px !important;
            }

            /* Animated orange fill line */
            .process-step:not(:nth-child(3)):not(:nth-child(6))::after {
                content: '' !important;
                position: absolute !important;
                top: 36px !important;
                left: 72px !important;
                width: 0% !important;
                max-width: calc(100% - 72px + 30px) !important;
                height: 4px !important;
                background: linear-gradient(90deg, #f47b20, #ff8c33) !important;
                box-shadow: 0 0 10px rgba(244, 123, 32, 0.5) !important;
                z-index: 2 !important;
                border-radius: 2px !important;
                transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }

            .process-step.active-line::after {
                width: calc(100% - 72px + 30px) !important;
            }

            /* Connector bridge from Step 3 down towards Row 2 */
            .process-step:nth-child(3)::before {
                content: '' !important;
                position: absolute !important;
                top: 36px !important;
                left: 72px !important;
                width: 25px !important;
                height: 60px !important;
                border-right: 3px dashed rgba(244, 123, 32, 0.5) !important;
                border-top: 3px dashed rgba(244, 123, 32, 0.5) !important;
                border-top-right-radius: 14px !important;
                z-index: 1 !important;
            }

            .step-node {
                width: 72px !important;
                height: 72px !important;
                border-radius: 50% !important;
                position: relative !important;
                z-index: 4 !important;
                background: #ffffff !important;
                border: 3px solid #cbd5e1 !important;
                font-weight: 800 !important;
                font-size: 1.15rem !important;
                color: #082b4c !important;
                box-shadow: 0 4px 14px rgba(8, 43, 76, 0.08) !important;
                transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
                margin-bottom: 18px !important;
            }

            /* Active illuminated step node */
            .process-step.active .step-node {
                background: #f47b20 !important;
                border-color: #f47b20 !important;
                color: #ffffff !important;
                transform: scale(1.08) !important;
                box-shadow: 0 0 22px rgba(244, 123, 32, 0.65) !important;
            }

            @keyframes pulseCurrent {
                0% { box-shadow: 0 0 0 0 rgba(244, 123, 32, 0.7); }
                70% { box-shadow: 0 0 0 16px rgba(244, 123, 32, 0); }
                100% { box-shadow: 0 0 0 0 rgba(244, 123, 32, 0); }
            }

            .process-step.current-step .step-node {
                animation: pulseCurrent 1.8s infinite !important;
            }
        }
        `
    });

    // Scroll to process section
    await page.evaluate(() => {
        document.querySelector('.process-section').scrollIntoView();
    });

    await new Promise(r => setTimeout(r, 400));

    // Test sequence: Activate 01 -> 02 -> 03 -> 04 -> 05 -> 06
    await page.evaluate(async () => {
        const steps = document.querySelectorAll('.process-step');
        for (let i = 0; i < steps.length; i++) {
            steps[i].classList.add('animate');
            steps[i].classList.add('active');
            if (i < steps.length - 1) {
                steps[i].classList.add('active-line');
            }
            if (i > 0) {
                steps[i - 1].classList.remove('current-step');
            }
            steps[i].classList.add('current-step');
            await new Promise(res => setTimeout(res, 200));
        }
    });

    await new Promise(r => setTimeout(r, 600));

    const section = await page.$('.process-section');
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'verified_tablet_process_animated.png') });
    console.log('Saved verified_tablet_process_animated.png');

    await browser.close();
}

testFullAnimation().catch(console.error);
