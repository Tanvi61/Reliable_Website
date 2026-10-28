const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testSequence() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });

        // Inject fixed CSS
        await page.addStyleTag({
            content: `
            /* Clean tablet lines */
            .process-step:nth-child(3)::before {
                display: none !important;
            }
            .process-step:not(:nth-child(3)):not(:nth-child(6))::after {
                width: 0% !important;
                transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            .process-step.active-line:not(:nth-child(3)):not(:nth-child(6))::after,
            .process-step.active-line::after {
                width: calc(100% - 72px + 28px) !important;
            }
            `
        });

        // Scroll to process section
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView();
        });

        // Test computed width of active-line
        const testWidth = await page.evaluate(async () => {
            const steps = document.querySelectorAll('.process-step');
            steps[0].classList.add('active');
            steps[0].classList.add('active-line');
            await new Promise(r => setTimeout(r, 600)); // wait for transition
            const cs = window.getComputedStyle(steps[0], '::after');
            return { width: cs.width, bg: cs.backgroundColor || cs.backgroundImage };
        });
        console.log('Tested Step 0 active-line width:', testWidth);

        // Run the complete choreographed sequence:
        // 01 -> line 1 -> 02 -> line 2 -> 03 -> 04 -> line 4 -> 05 -> line 5 -> 06
        await page.evaluate(async () => {
            const steps = document.querySelectorAll('.process-step');
            
            // Reset all
            steps.forEach(s => {
                s.classList.remove('active', 'active-line', 'current-step');
            });

            const delay = ms => new Promise(res => setTimeout(res, ms));

            // Step 01 lights up
            steps[0].classList.add('active', 'current-step');
            await delay(200);

            // Line 01 -> 02 draws
            steps[0].classList.add('active-line');
            await delay(450); // wait for line animation to reach step 2

            // Step 02 lights up
            steps[0].classList.remove('current-step');
            steps[1].classList.add('active', 'current-step');
            await delay(200);

            // Line 02 -> 03 draws
            steps[1].classList.add('active-line');
            await delay(450); // wait for line animation to reach step 3

            // Step 03 lights up
            steps[1].classList.remove('current-step');
            steps[2].classList.add('active', 'current-step');
            await delay(400); // pause at end of Row 1

            // Transition to Row 2: Step 04 lights up
            steps[2].classList.remove('current-step');
            steps[3].classList.add('active', 'current-step');
            await delay(200);

            // Line 04 -> 05 draws
            steps[3].classList.add('active-line');
            await delay(450); // wait for line animation to reach step 5

            // Step 05 lights up
            steps[3].classList.remove('current-step');
            steps[4].classList.add('active', 'current-step');
            await delay(200);

            // Line 05 -> 06 draws
            steps[4].classList.add('active-line');
            await delay(450); // wait for line animation to reach step 6

            // Step 06 lights up (Final step)
            steps[4].classList.remove('current-step');
            steps[5].classList.add('active', 'current-step');
        });

        await new Promise(r => setTimeout(r, 600));

        // Capture screenshot of finished state
        const section = await page.$('.process-section');
        await section.screenshot({ path: path.join(ARTIFACT_DIR, 'test_sequence_result.png') });
        console.log('Saved test_sequence_result.png');

        // Also capture full viewport
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_sequence_viewport.png') });
        console.log('Saved test_sequence_viewport.png');

    } finally {
        await browser.close();
    }
}

testSequence().catch(err => console.error(err));
