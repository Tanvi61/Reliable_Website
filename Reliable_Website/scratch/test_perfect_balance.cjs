const fs = require('fs');
const path = require('path');
const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\\\Users\\\\HP\\\\.gemini\\\\antigravity-ide\\\\brain\\\\e419adda-178e-4737-97b0-cf828728f817';
const contactPath = path.join(__dirname, '..', 'contact.html');

let html = fs.readFileSync(contactPath, 'utf8');

// 1. Update the left form inside contact-box-left:
// Make textarea comfortable (min-height: 105px) and form layout natural (no huge auto stretch gap)
const formStyleRegex = /<form id="contactForm"[^>]*style="[^"]*"/;
if (formStyleRegex.test(html)) {
  html = html.replace(formStyleRegex, '<form id="contactForm" action="https://formsubmit.co/tanviii6104@gmail.com" method="POST" style="display: flex; flex-direction: column; gap: 14px; margin-top: 10px;"');
}

// Ensure right info blocks have clean 12px 16px padding and natural spacing
html = html.replace(/<div class="contact-info-list"[^>]*>/, '<div class="contact-info-list" style="display: flex; flex-direction: column; justify-content: space-between; gap: 10px; margin: 14px 0 16px 0; flex: 1;">');

// Update textarea to have clean 4-row height
html = html.replace(/rows="3"[^>]*style="[^"]*"/, 'rows="4" style="resize: vertical; min-height: 95px;"');

fs.writeFileSync(contactPath, html, 'utf8');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('file:///' + contactPath.replace(/\\/g, '/'), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const splitSection = await page.$('.contact-grid-spaced');
  if (splitSection) {
    await splitSection.screenshot({
      path: path.join(ARTIFACT_DIR, 'balanced_simple_contact_desktop.png')
    });
  }

  // Mobile
  await page.setViewport({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const mobileSplit = await page.$('.contact-grid-spaced');
  if (mobileSplit) {
    await mobileSplit.screenshot({
      path: path.join(ARTIFACT_DIR, 'balanced_simple_contact_mobile.png')
    });
  }

  await browser.close();
  console.log('Balanced screenshots captured!');
})().catch(console.error);
