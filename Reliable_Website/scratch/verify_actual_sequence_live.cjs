const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function verifyLive() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });

        // Open live site file with ZERO injected styles or scripts
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });

        // Scroll to process section to trigger observer
        await page.evaluate(() => {
            document.querySelector('.process-section').scrollIntoView({ behavior: 'smooth' });
        });

        // Wait 4 seconds for complete choreographed cascade to finish
        await new Promise(r => setTimeout(r, 4200));

        // Measure line 1 and line 2 active widths
        const stats = await page.evaluate(() => {
            const steps = document.querySelectorAll('.process-step');
            return Array.from(steps).map((s, idx) => {
                const after = window.getComputedStyle(s, '::after');
                const node = s.querySelector('.step-node');
                const nodeStyle = window.getComputedStyle(node);
                return {
                    step: idx + 1,
                    classes: s.className,
                    nodeBg: nodeStyle.backgroundColor,
                    afterWidth: after ? after.width : 'none'
                };
            });
        });
        console.log('Live Process Steps State:', stats);

        // Capture section screenshot
        const section = await page.$('.process-section');
        await section.screenshot({ path: path.join(ARTIFACT_DIR, 'live_verified_process_sequence.png') });
        console.log('Saved live_verified_process_sequence.png');

        // Capture full viewport
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'live_verified_viewport_sequence.png') });
        console.log('Saved live_verified_viewport_sequence.png');

    } finally {
        await browser.close();
    }
}

verifyLive().catch(err => console.error(err));
