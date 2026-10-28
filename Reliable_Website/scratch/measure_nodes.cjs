const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: 'new'
    });
    const page = await browser.newPage();

    for (const width of [768, 820, 1024]) {
        await page.setViewport({ width, height: 1024 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
        
        const coords = await page.evaluate(() => {
            const timeline = document.querySelector('.process-timeline');
            if (!timeline) return null;
            const tRect = timeline.getBoundingClientRect();
            const nodes = Array.from(document.querySelectorAll('.process-step')).map((s, idx) => {
                const node = s.querySelector('.step-node');
                const nRect = node.getBoundingClientRect();
                return {
                    step: idx + 1,
                    // relative to timeline
                    x: (nRect.left + nRect.right) / 2 - tRect.left,
                    y: (nRect.top + nRect.bottom) / 2 - tRect.top,
                    radius: nRect.width / 2
                };
            });
            return {
                timelineWidth: tRect.width,
                timelineHeight: tRect.height,
                nodes
            };
        });
        console.log(`=== Viewport ${width} ===`);
        console.log(JSON.stringify(coords, null, 2));
    }
    
    await browser.close();
})();
