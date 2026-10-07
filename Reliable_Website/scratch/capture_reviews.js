const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  
  // Mobile
  await page.setViewport({width: 390, height: 844});
  await page.goto('http://localhost:5501/index.html', {waitUntil: 'networkidle0'});
  
  const el = await page.$('.review-us-section');
  if (el) {
    await el.screenshot({path: 'scratch/review_us_mobile_before.png'});
  }
  const elTest = await page.$('.testimonials-section');
  if (elTest) {
    await elTest.screenshot({path: 'scratch/testimonials_mobile_before.png'});
  }
  
  // Tab
  await page.setViewport({width: 768, height: 1024});
  await page.goto('http://localhost:5501/index.html', {waitUntil: 'networkidle0'});
  const elTab = await page.$('.review-us-section');
  if (elTab) {
    await elTab.screenshot({path: 'scratch/review_us_tab_before.png'});
  }
  
  // Desktop
  await page.setViewport({width: 1280, height: 800});
  await page.goto('http://localhost:5501/index.html', {waitUntil: 'networkidle0'});
  const elDesk = await page.$('.review-us-section');
  if (elDesk) {
    await elDesk.screenshot({path: 'scratch/review_us_desktop_before.png'});
  }
  
  await browser.close();
  console.log('Screenshots captured successfully');
})();
