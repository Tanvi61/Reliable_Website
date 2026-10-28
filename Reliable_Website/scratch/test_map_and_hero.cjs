const fs = require('fs');
const path = require('path');
const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';
const indexPath = path.join(__dirname, '..', 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');

// 1. Remove hero buttons
const heroActionsRegex = /\s*<div class="hero-actions anim-actions">[\s\S]*?<\/div>/;
if (heroActionsRegex.test(html)) {
  html = html.replace(heroActionsRegex, '');
  console.log('Successfully removed hero-actions buttons from index.html');
} else {
  console.log('hero-actions buttons already absent or not matched');
}

// 2. Add small map to footer in index.html if not already present
if (!html.includes('footer-map-wrapper')) {
  const mapEmbedHtml = `
                        <div class="footer-map-wrapper" style="width: 100%; max-width: 260px; height: 110px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(8, 43, 76, 0.18); box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin: 8px 0 12px 0;">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360431358!2d73.79292675000001!3d18.52461645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689146522361!5m2!1sen!2sin" width="100%" height="100%" style="border:0; display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Reliable Land Survey Consultancy Headquarters Location"></iframe>
                        </div>`;

  // Place right after <p>Pune, Maharashtra, India</p>
  html = html.replace(/(<p>Pune, Maharashtra, India<\/p>)/, `$1${mapEmbedHtml}`);
  console.log('Successfully added small map embed to footer');
} else {
  console.log('footer-map-wrapper already present');
}

fs.writeFileSync(indexPath, html, 'utf8');

// Now launch Puppeteer to test and screenshot
(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Desktop 1440x900
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('file:///' + indexPath.replace(/\\/g, '/'), { waitUntil: 'networkidle2' });

  // Hero section screenshot
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'verified_hero_no_buttons_desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 750 }
  });

  // Screenshot footer element directly
  const footerEl = await page.$('.footer');
  if (footerEl) {
    await footerEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'verified_footer_with_map_desktop.png')
    });
  }

  // 2. Mobile 390x844
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('file:///' + indexPath.replace(/\\/g, '/'), { waitUntil: 'networkidle2' });

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'verified_hero_no_buttons_mobile.png'),
    clip: { x: 0, y: 0, width: 390, height: 600 }
  });

  const mobileFooterEl = await page.$('.footer');
  if (mobileFooterEl) {
    await mobileFooterEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'verified_footer_with_map_mobile.png')
    });
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
})().catch(console.error);
