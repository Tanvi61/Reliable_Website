const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  // 1. RELIABLE WEBSITE
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));

    // Reliable Hero Screenshot (No buttons)
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'reliable_hero_no_buttons.png'),
      clip: { x: 0, y: 0, width: 1440, height: 750 }
    });

    // Reliable Footer Screenshot (With map)
    const footerEl = await page.$('.footer');
    if (footerEl) {
      await footerEl.screenshot({
        path: path.join(ARTIFACT_DIR, 'reliable_footer_with_map.png')
      });
    }

    // Reliable Mobile Footer Screenshot
    await page.setViewport({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));
    const mobileFooterEl = await page.$('.footer');
    if (mobileFooterEl) {
      await mobileFooterEl.screenshot({
        path: path.join(ARTIFACT_DIR, 'reliable_footer_with_map_mobile.png')
      });
    }

    await page.close();
  }

  // 2. SAMARTH AYURVEDA
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));

    // Ayurveda Hero Screenshot
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'ayurveda_hero_no_buttons.png'),
      clip: { x: 0, y: 0, width: 1440, height: 750 }
    });

    // Ayurveda Footer Screenshot (With map)
    const footerEl = await page.$('.site-footer');
    if (footerEl) {
      await footerEl.screenshot({
        path: path.join(ARTIFACT_DIR, 'ayurveda_footer_with_map.png')
      });
    }

    await page.close();
  }

  await browser.close();
  console.log('All verification screenshots captured successfully!');
})().catch(console.error);
