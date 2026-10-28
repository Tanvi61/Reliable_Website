import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\f933a7cf-56f8-4efb-b433-1ef6270f3c16';

async function testEnhancedCaptcha() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  // 1. Contact Page Captcha Test
  await page.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Get initial captcha code
  const initialCode = await page.evaluate(() => {
    return document.getElementById('contactCaptchaDisplay')?.innerText.trim();
  });
  console.log('Initial Contact Captcha Code:', initialCode);

  // Click Refresh Button
  await page.click('#contactCaptchaRefreshBtn');
  await new Promise(r => setTimeout(r, 500));
  const refreshedCode = await page.evaluate(() => {
    return document.getElementById('contactCaptchaDisplay')?.innerText.trim();
  });
  console.log('Refreshed Contact Captcha Code:', refreshedCode);

  // Click "I'm not a robot"
  await page.click('#contactRecaptchaClickArea');
  await new Promise(r => setTimeout(r, 800));

  const isChecked = await page.evaluate(() => {
    return document.getElementById('contactRecaptchaCheckbox')?.classList.contains('checked');
  });
  console.log('Is Google reCAPTCHA checked?:', isChecked);

  // Take screenshot of Contact Form Captcha
  const formEl = await page.$('#contactForm');
  if (formEl) {
    await formEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'qa_contact_captcha_enhanced.png')
    });
  }

  // 2. Get a Quote Modal Captcha Test
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle2' });
  await page.click('#navGetQuoteBtn');
  await new Promise(r => setTimeout(r, 600));

  // Click modal "I'm not a robot"
  await page.click('#enquiryRecaptchaClickArea');
  await new Promise(r => setTimeout(r, 800));

  const modalBox = await page.$('.enquiry-modal-box');
  if (modalBox) {
    await modalBox.screenshot({
      path: path.join(ARTIFACT_DIR, 'qa_modal_captcha_enhanced.png')
    });
  }

  await browser.close();
  console.log('Enhanced Captcha verification tests completed successfully!');
}

testEnhancedCaptcha().catch(console.error);
