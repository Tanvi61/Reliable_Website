const puppeteer = require('e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

const DEVICES = [
  { name: 'Desktop Full HD Monitor', type: 'Desktop', width: 1920, height: 1080, key: 'desktop_1920' },
  { name: 'Standard Windows Laptop', type: 'Laptop', width: 1366, height: 768, key: 'laptop_1366' },
  { name: 'MacBook Air 13"', type: 'Laptop', width: 1440, height: 900, key: 'macbook_1440' },
  { name: 'iPad Pro 12.9"', type: 'Tablet', width: 1024, height: 1366, key: 'ipad_pro_1024' },
  { name: 'iPad Mini', type: 'Tablet', width: 768, height: 1024, key: 'ipad_mini_768' },
  { name: 'iPhone 15 Pro Max', type: 'Mobile', width: 430, height: 932, key: 'iphone15pm_430' },
  { name: 'Google Pixel 7', type: 'Mobile', width: 412, height: 915, key: 'pixel7_412' },
  { name: 'iPhone SE', type: 'Mobile', width: 320, height: 568, key: 'iphonese_320' }
];

const PAGES = ['#home', '#about', '#products', '#contact', '#orders'];

async function runAudit() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const report = {};

  // Initial load
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/#home', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));

  for (const dev of DEVICES) {
    report[dev.key] = {
      device: dev.name,
      type: dev.type,
      resolution: `${dev.width}x${dev.height}`,
      pages: {}
    };

    await page.setViewport({ width: dev.width, height: dev.height, deviceScaleFactor: 1 });
    await new Promise(r => setTimeout(r, 300));

    for (const hash of PAGES) {
      const pageKey = hash.replace('#', '');
      await page.evaluate((h) => {
        window.location.hash = h;
      }, hash);
      await new Promise(r => setTimeout(r, 500));

      const overflowData = await page.evaluate((devWidth) => {
        const docWidth = document.documentElement.scrollWidth;
        const bodyWidth = document.body.scrollWidth;
        const winWidth = window.innerWidth;
        const hasHorizontalScroll = docWidth > winWidth + 1 || bodyWidth > winWidth + 1;

        // Find elements that overflow
        const overflowingElements = [];
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > winWidth + 2) {
            const style = window.getComputedStyle(el);
            if (style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity || '1') > 0) {
              const tag = el.tagName.toLowerCase();
              const cls = el.className && typeof el.className === 'string' ? el.className.trim() : '';
              const id = el.id ? `#${el.id}` : '';
              overflowingElements.push({
                identifier: `${tag}${id}${cls ? '.' + cls.split(/\s+/).slice(0, 3).join('.') : ''}`,
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                overflowAmount: Math.round(rect.right - winWidth)
              });
            }
          }
        }

        return {
          winWidth,
          docWidth,
          bodyWidth,
          hasHorizontalScroll,
          overflowCount: overflowingElements.length,
          topOverflowElements: overflowingElements.slice(0, 10)
        };
      }, dev.width);

      report[dev.key].pages[pageKey] = overflowData;

      // Capture screenshot for visual check
      const shotPath = path.join(OUTPUT_DIR, `${dev.key}_${pageKey}.png`);
      await page.screenshot({ path: shotPath, fullPage: false });
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'responsive_audit.json'), JSON.stringify(report, null, 2));
  console.log('AUDIT_FINISHED_SUCCESSFULLY');
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
