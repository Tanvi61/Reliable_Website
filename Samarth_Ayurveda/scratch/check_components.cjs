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

async function checkInteractiveComponents() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const componentResults = [];

  for (const dev of DEVICES) {
    await page.setViewport({ width: dev.width, height: dev.height });
    await page.goto('http://localhost:5173/#home', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    // Test Quote Modal
    await page.evaluate(() => {
      const btn = document.getElementById('navGetQuoteBtn') || document.getElementById('mobileGetQuoteBtn');
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 300));
    const quoteModalOverflow = await page.evaluate((devW) => {
      const modal = document.querySelector('.enquiry-modal-content');
      if (!modal) return null;
      const r = modal.getBoundingClientRect();
      return {
        width: Math.round(r.width),
        right: Math.round(r.right),
        overflow: r.right > devW ? Math.round(r.right - devW) : 0,
        fitsInViewport: r.width <= devW && r.right <= devW + 1
      };
    }, dev.width);

    // Close Quote Modal
    await page.evaluate(() => {
      const closeBtn = document.getElementById('closeQuoteModalBtn');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));

    // Test Cart Drawer
    await page.evaluate(() => {
      const cartBtn = document.getElementById('navCartBtn') || document.querySelector('.header-cart-btn');
      if (cartBtn) cartBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));
    const cartDrawerMetrics = await page.evaluate((devW) => {
      const drawer = document.getElementById('cartDrawer');
      if (!drawer) return null;
      const r = drawer.getBoundingClientRect();
      return {
        width: Math.round(r.width),
        right: Math.round(r.right),
        overflow: r.right > devW ? Math.round(r.right - devW) : 0,
        fitsInViewport: r.width <= devW
      };
    }, dev.width);

    // Close Cart Drawer
    await page.evaluate(() => {
      const closeBtn = document.getElementById('closeCartBtn');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));

    // Test Mobile Menu (on devices <= 1024)
    let mobileNavMetrics = null;
    if (dev.width <= 1024) {
      await page.evaluate(() => {
        const toggle = document.getElementById('mobileMenuToggle');
        if (toggle) toggle.click();
      });
      await new Promise(r => setTimeout(r, 300));
      mobileNavMetrics = await page.evaluate((devW) => {
        const drawer = document.getElementById('mobileNavDrawer');
        if (!drawer) return null;
        const r = drawer.getBoundingClientRect();
        return {
          width: Math.round(r.width),
          right: Math.round(r.right),
          overflow: r.right > devW ? Math.round(r.right - devW) : 0,
          fitsInViewport: r.width <= devW
        };
      }, dev.width);

      // Close Mobile Menu
      await page.evaluate(() => {
        const closeBtn = document.getElementById('closeMobileMenuBtn');
        if (closeBtn) closeBtn.click();
      });
      await new Promise(r => setTimeout(r, 200));
    }

    componentResults.push({
      device: dev.name,
      width: dev.width,
      quoteModalOverflow,
      cartDrawerMetrics,
      mobileNavMetrics
    });
  }

  await browser.close();
  console.log(JSON.stringify(componentResults, null, 2));
}

checkInteractiveComponents().catch(console.error);
