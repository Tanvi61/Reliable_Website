const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: 'new'
    });
    const page = await browser.newPage();
    
    // Desktop 1440
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });
    await page.evaluate(() => {
        document.querySelector('.process-section').scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));
    const section = await page.$('.process-section');
    await section.screenshot({ path: 'C:/Users/HP/.gemini/antigravity-ide/brain/e419adda-178e-4737-97b0-cf828728f817/current_process_desktop.png' });
    
    // Tablet 768
    await page.setViewport({ width: 768, height: 1024 });
    await page.evaluate(() => {
        document.querySelector('.process-section').scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));
    const tabSection = await page.$('.process-section');
    await tabSection.screenshot({ path: 'C:/Users/HP/.gemini/antigravity-ide/brain/e419adda-178e-4737-97b0-cf828728f817/current_process_tablet.png' });
    
    console.log('Saved current_process_desktop.png and current_process_tablet.png');
    await browser.close();
})();
