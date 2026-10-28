import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\f933a7cf-56f8-4efb-b433-1ef6270f3c16';

async function captureModalsAndSections() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  // Test 1: Mega-menu Hover on fresh page
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle2' });
    await page.hover('#navProductTrigger');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'qa_products_mega_menu_open.png'),
      clip: { x: 120, y: 0, width: 1200, height: 500 }
    });
    await page.close();
  }

  // Test 2: About Page Purpose & Clients
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/#about', { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      const el = document.getElementById('ourPurpose');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'qa_about_purpose_and_clients_view.png')
    });
    await page.close();
  }

  await browser.close();
  console.log('Done capturing clean extra screenshots!');
}

captureModalsAndSections().catch(console.error);
