const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\\\Users\\\\HP\\\\.gemini\\\\antigravity-ide\\\\brain\\\\e419adda-178e-4737-97b0-cf828728f817';
const contactPath = 'e:/MindAxis_Web/Reliable_Website/contact.html';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // Desktop
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('file:///' + contactPath, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const splitEl = await page.$('.contact-grid-spaced');
  if (splitEl) {
    await splitEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'clean_uncongested_contact_grid_desktop.png')
    });
  }

  // Mobile
  await page.setViewport({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const mobileSplit = await page.$('.contact-grid-spaced');
  if (mobileSplit) {
    await mobileSplit.screenshot({
      path: path.join(ARTIFACT_DIR, 'clean_uncongested_contact_grid_mobile.png')
    });
  }

  await browser.close();
  console.log('Done!');
})().catch(console.error);
