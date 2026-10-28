const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testTabletAnimation() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });

    // Inject prototype CSS for Tablet Process Animation
    await page.addStyleTag({
        content: `
        @media (min-width: 768px) and (max-width: 1024px) {
            .process-steps {
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 45px 30px !important;
                position: relative !important;
            }

            .process-step {
                position: relative !important;
                align-items: flex-start !important;
            }

            .step-node {
                width: 68px !important;
                height: 68px !important;
                border-radius: 50% !important;
                position: relative !important;
                z-index: 5 !important;
                background: #ffffff !important;
                border: 3px solid #cbd5e1 !important;
                font-weight: 800 !important;
                font-size: 1.15rem !important;
                color: #082b4c !important;
                box-shadow: 0 4px 12px rgba(8, 43, 76, 0.08) !important;
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
                margin-bottom: 16px !important;
            }

            /* Step Connectors for Row 1 (1->2, 2->3) and Row 2 (4->5, 5->6) */
            .process-step:not(:nth-child(3)):not(:nth-child(6))::after {
                content: '' !important;
                position: absolute !important;
                top: 34px !important;
                left: 68px !important;
                width: calc(100% - 68px + 30px) !important;
                height: 4px !important;
                background: #e2e8f0 !important;
                z-index: 2 !important;
                border-radius: 2px !important;
            }

            /* Animated fill bar */
            .process-step:not(:nth-child(3)):not(:nth-child(6)) .step-connector-fill {
                position: absolute !important;
                top: 34px !important;
                left: 68px !important;
                width: 0% !important;
                max-width: calc(100% - 68px + 30px) !important;
                height: 4px !important;
                background: linear-gradient(90deg, #f47b20, #ff9d42) !important;
                z-index: 3 !important;
                border-radius: 2px !important;
                box-shadow: 0 0 8px rgba(244, 123, 32, 0.6) !important;
                transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }

            .process-step.active-line .step-connector-fill {
                width: calc(100% - 68px + 30px) !important;
            }

            /* Turn connector between Step 3 and Step 4 */
            .process-step:nth-child(3)::after {
                content: '' !important;
                position: absolute !important;
                top: 34px !important;
                right: -15px !important;
                width: 20px !important;
                height: calc(100% + 45px) !important;
                border-right: 4px dashed #f47b20 !important;
                border-bottom: 4px dashed #f47b20 !important;
                border-bottom-right-radius: 16px !important;
                z-index: 2 !important;
                opacity: 0.4 !important;
            }

            /* Active glowing node state */
            .process-step.active .step-node {
                background: #f47b20 !important;
                border-color: #f47b20 !important;
                color: #ffffff !important;
                transform: scale(1.1) !important;
                box-shadow: 0 0 22px rgba(244, 123, 32, 0.65) !important;
            }

            @keyframes pulseGlow {
                0% { box-shadow: 0 0 0 0 rgba(244, 123, 32, 0.7); }
                70% { box-shadow: 0 0 0 16px rgba(244, 123, 32, 0); }
                100% { box-shadow: 0 0 0 0 rgba(244, 123, 32, 0); }
            }

            .process-step.current-step .step-node {
                animation: pulseGlow 1.8s infinite !important;
            }
        }
        `
    });

    // Inject fill elements and activate steps 1 through 4
    await page.evaluate(() => {
        const steps = document.querySelectorAll('.process-step');
        steps.forEach((s, idx) => {
            if (idx !== 2 && idx !== 5) {
                const fill = document.createElement('div');
                fill.className = 'step-connector-fill';
                s.appendChild(fill);
            }
        });

        // Activate steps 1, 2, 3
        steps[0].classList.add('active', 'active-line');
        steps[1].classList.add('active', 'active-line');
        steps[2].classList.add('active');
        steps[2].classList.add('current-step');
    });

    await page.evaluate(() => {
        document.querySelector('.process-section').scrollIntoView();
    });

    await new Promise(r => setTimeout(r, 600));

    const section = await page.$('.process-section');
    await section.screenshot({ path: path.join(ARTIFACT_DIR, 'test_tablet_process_active.png') });
    console.log('Saved test_tablet_process_active.png');

    await browser.close();
}

testTabletAnimation().catch(console.error);
