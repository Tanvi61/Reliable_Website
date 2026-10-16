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

async function deepVerify() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const summary = {};

  for (const dev of DEVICES) {
    summary[dev.key] = {
      device: dev.name,
      resolution: `${dev.width}x${dev.height}`,
      checks: {}
    };

    await page.setViewport({ width: dev.width, height: dev.height, deviceScaleFactor: 1 });

    // 1. Account view
    await page.goto('http://localhost:5173/#account', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 400));
    const accScroll = await page.evaluate((devW) => ({
      docWidth: document.documentElement.scrollWidth,
      winWidth: window.innerWidth,
      hasScroll: document.documentElement.scrollWidth > devW + 1
    }), dev.width);
    summary[dev.key].checks.account = accScroll;

    // 2. Product Detail Page
    await page.goto('http://localhost:5173/#product/1', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 400));
    const pdpScroll = await page.evaluate((devW) => ({
      docWidth: document.documentElement.scrollWidth,
      winWidth: window.innerWidth,
      hasScroll: document.documentElement.scrollWidth > devW + 1
    }), dev.width);
    summary[dev.key].checks.pdp = pdpScroll;

    // 3. Home View & Quote Modal
    await page.goto('http://localhost:5173/#home', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));

    // Open Quote Modal via JS function or button
    await page.evaluate(() => {
      const btn = document.getElementById('navGetQuoteBtn') || document.getElementById('mobileGetQuoteBtn');
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 350));
    const quoteModalCheck = await page.evaluate((devW) => {
      const modal = document.querySelector('.enquiry-modal-box');
      if (!modal) return { open: false };
      const r = modal.getBoundingClientRect();
      return {
        open: true,
        width: Math.round(r.width),
        fitsInScreen: r.width <= devW && r.right <= devW + 2
      };
    }, dev.width);
    summary[dev.key].checks.quoteModal = quoteModalCheck;

    // Capture screenshot of Quote Modal on iPhone SE and iPad
    if (['iphonese_320', 'ipad_mini_768', 'desktop_1920'].includes(dev.key)) {
      await page.screenshot({ path: path.join(OUTPUT_DIR, `qa_quote_modal_${dev.key}.png`) });
    }

    // Close Quote Modal
    await page.evaluate(() => {
      const closeBtn = document.getElementById('enquiryModalClose');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));

    // 4. Mobile Menu on devices <= 1024
    if (dev.width <= 1024) {
      await page.evaluate(() => {
        const toggle = document.getElementById('mobileMenuToggle');
        if (toggle) toggle.click();
      });
      await new Promise(r => setTimeout(r, 350));
      const drawerCheck = await page.evaluate((devW) => {
        const d = document.getElementById('mobileNavDrawer');
        if (!d) return { open: false };
        const r = d.getBoundingClientRect();
        return {
          open: true,
          width: Math.round(r.width),
          fitsInScreen: r.width <= devW && r.right <= devW + 2
        };
      }, dev.width);
      summary[dev.key].checks.mobileNav = drawerCheck;

      if (['iphonese_320', 'pixel7_412'].includes(dev.key)) {
        await page.screenshot({ path: path.join(OUTPUT_DIR, `qa_mobile_menu_${dev.key}.png`) });
      }

      await page.evaluate(() => {
        const closeBtn = document.getElementById('closeMobileMenuBtn');
        if (closeBtn) closeBtn.click();
      });
      await new Promise(r => setTimeout(r, 200));
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'deep_verify_report.json'), JSON.stringify(summary, null, 2));
  console.log('DEEP_VERIFY_SUCCESS');
  console.log(JSON.stringify(summary, null, 2));
}

deepVerify().catch(console.error);
