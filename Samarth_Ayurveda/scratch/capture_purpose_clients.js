import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\f933a7cf-56f8-4efb-b433-1ef6270f3c16';

async function capturePurposeAndClients() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/#about', { waitUntil: 'networkidle2' });

  // Hide floating chat temporarily for clear section screenshots
  await page.addStyleTag({ content: '#sonaFloatingChat { display: none !important; }' });

  const purposeEl = await page.$('#ourPurpose');
  if (purposeEl) {
    await purposeEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'qa_about_our_purpose.png')
    });
  }

  const clientsEl = await page.$('#ourClients');
  if (clientsEl) {
    await clientsEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'qa_about_our_clients.png')
    });
  }

  await browser.close();
  console.log('Purpose and Clients screenshots captured successfully!');
}

capturePurposeAndClients().catch(console.error);
