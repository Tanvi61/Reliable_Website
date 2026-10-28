const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    const viewports = [
        { name: 'ipad_768_portrait', width: 768, height: 1024 },
        { name: 'ipad_air_820_portrait', width: 820, height: 1180 },
        { name: 'ipad_834_portrait', width: 834, height: 1194 },
        { name: 'tablet_landscape_1024', width: 1024, height: 768 },
        { name: 'ipad_pro_1024_1366', width: 1024, height: 1366 },
        { name: 'desktop_1280', width: 1280, height: 800 },
        { name: 'desktop_1440', width: 1440, height: 900 },
        { name: 'mobile_390', width: 390, height: 844 },
        { name: 'mobile_430', width: 430, height: 932 }
    ];

    for (const vp of viewports) {
        await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise(r => setTimeout(r, 600));
        
        const footerElem = await page.$('.footer');
        if (footerElem) {
            await footerElem.screenshot({ path: `C:/Users/HP/.gemini/antigravity-ide/brain/e419adda-178e-4737-97b0-cf828728f817/test_footer_${vp.name}.png` });
            console.log(`Saved test_footer_${vp.name}.png`);
        }
    }
    await browser.close();
})();
