const puppeteer = require('e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Test at standard desktop (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('file:///e:/MindAxis_Web/Reliable_Website/contact.html', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const gridEl = await page.$('.contact-grid-spaced');
  if (gridEl) {
    await gridEl.screenshot({ path: path.join(OUTPUT_DIR, 'verified_contact_grid_desktop.png') });
  }

  // Test at laptop 1366x768
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('file:///e:/MindAxis_Web/Reliable_Website/contact.html', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const gridEl1366 = await page.$('.contact-grid-spaced');
  if (gridEl1366) {
    await gridEl1366.screenshot({ path: path.join(OUTPUT_DIR, 'verified_contact_grid_laptop.png') });
  }

  // Test at mobile 430x932
  await page.setViewport({ width: 430, height: 932 });
  await page.goto('file:///e:/MindAxis_Web/Reliable_Website/contact.html', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const rightBoxMob = await page.$('.contact-box-right');
  if (rightBoxMob) {
    await rightBoxMob.screenshot({ path: path.join(OUTPUT_DIR, 'verified_contact_grid_mobile.png') });
  }

  await browser.close();
  console.log('VERIFICATION_COMPLETE');
}

verify().catch(console.error);
