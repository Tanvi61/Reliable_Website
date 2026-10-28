const puppeteer = require('e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function diagnose() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Test iPhone SE (320px) on #products, #about, #contact
  const targets = [
    { page: '#products', width: 320, height: 568 },
    { page: '#products', width: 412, height: 915 },
    { page: '#about', width: 320, height: 568 },
    { page: '#contact', width: 320, height: 568 }
  ];

  for (const t of targets) {
    await page.setViewport({ width: t.width, height: t.height });
    await page.goto(`http://localhost:5173/${t.page}`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    const offenders = await page.evaluate((winWidth) => {
      const items = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > winWidth + 1) {
          const style = window.getComputedStyle(el);
          // ignore hidden or track animations
          if (style.display !== 'none' && style.visibility !== 'hidden' && !el.classList.contains('sona-alert-track') && !el.closest('#cartDrawer') && !el.closest('#mobileNavDrawer') && !el.closest('.quick-view-modal')) {
            items.push({
              tag: el.tagName,
              id: el.id,
              class: el.className ? (typeof el.className === 'string' ? el.className.trim() : '') : '',
              width: Math.round(r.width),
              right: Math.round(r.right),
              overflow: Math.round(r.right - winWidth),
              text: el.innerText ? el.innerText.slice(0, 30).trim() : ''
            });
          }
        }
      });
      return items;
    }, t.width);

    console.log(`\n=== OFFENDERS for ${t.page} @ ${t.width}px (Total: ${offenders.length}) ===`);
    offenders.slice(0, 15).forEach(o => {
      console.log(`  <${o.tag} id="${o.id}" class="${o.class}"> width=${o.width} right=${o.right} overflow=${o.overflow} text="${o.text}"`);
    });
  }

  await browser.close();
}

diagnose().catch(console.error);
