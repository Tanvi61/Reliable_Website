const puppeteer = require('e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

const DEVICES = [
  { name: 'Desktop Full HD Monitor', width: 1920, height: 1080, key: 'desktop_1920' },
  { name: 'Standard Windows Laptop', width: 1366, height: 768, key: 'laptop_1366' },
  { name: 'MacBook Air 13"', width: 1440, height: 900, key: 'macbook_1440' },
  { name: 'iPad Pro 12.9"', width: 1024, height: 1366, key: 'ipad_pro_1024' },
  { name: 'iPad Mini', width: 768, height: 1024, key: 'ipad_mini_768' },
  { name: 'iPhone 15 Pro Max', width: 430, height: 932, key: 'iphone15pm_430' },
  { name: 'Google Pixel 7', width: 412, height: 915, key: 'pixel7_412' },
  { name: 'iPhone SE', width: 320, height: 568, key: 'iphonese_320' }
];

async function inspectSections() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Test sections on #home
  const sectionChecks = [];

  for (const dev of DEVICES) {
    await page.setViewport({ width: dev.width, height: dev.height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:5173/#home', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    const metrics = await page.evaluate((devWidth) => {
      const getRect = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          exists: true,
          width: Math.round(r.width),
          height: Math.round(r.height),
          left: Math.round(r.left),
          right: Math.round(r.right),
          overflow: r.right > devWidth + 1 ? Math.round(r.right - devWidth) : 0
        };
      };

      return {
        subheader: getRect('#siteSubheader'),
        header: getRect('#siteHeader'),
        hero: getRect('#heroSlideshow'),
        reels: getRect('#featuredReels'),
        bestSellers: getRect('#bestsellersSection'),
        luxuryExperience: getRect('#luxuryExperience'),
        founder: getRect('#founderSection'),
        reviews: getRect('#reviewsSection'),
        faq: getRect('#faqSection'),
        footer: getRect('#siteFooter'),
        quoteModal: getRect('#quoteModal'),
        floatingIcons: getRect('#floatingActionGroup')
      };
    }, dev.width);

    sectionChecks.push({ device: dev.name, key: dev.key, width: dev.width, metrics });

    // Also take full page screenshot on mobile, tablet, and desktop
    if (['iphonese_320', 'pixel7_412', 'iphone15pm_430', 'ipad_mini_768', 'ipad_pro_1024', 'desktop_1920'].includes(dev.key)) {
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `${dev.key}_home_full.png`),
        fullPage: true
      });
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'section_metrics.json'), JSON.stringify(sectionChecks, null, 2));
  console.log('SECTIONS_CHECK_COMPLETE');
}

inspectSections().catch(console.error);
