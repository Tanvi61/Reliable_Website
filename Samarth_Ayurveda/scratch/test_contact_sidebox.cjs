const puppeteer = require('e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testAllBreakpoints() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const viewports = [
    { w: 1440, h: 950, name: 'desktop' },
    { w: 1024, h: 1366, name: 'ipad_pro' },
    { w: 768, h: 1024, name: 'tablet' },
    { w: 375, h: 812, name: 'mobile' }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto('file:///e:/MindAxis_Web/Reliable_Website/contact.html', { waitUntil: 'domcontentloaded' });

    await page.evaluate(() => {
      const rightBox = document.querySelector('.contact-box-right');
      const innerWrapper = rightBox.querySelector('div[style*="display: flex"]');
      const rightList = document.querySelector('.contact-box-right .info-block-row')?.parentElement;
      
      if (rightList && innerWrapper) {
        innerWrapper.style.display = 'flex';
        innerWrapper.style.flexDirection = 'column';
        innerWrapper.style.height = '100%';

        rightList.style.display = 'flex';
        rightList.style.flexDirection = 'column';
        rightList.style.flex = '1';
        rightList.style.justifyContent = 'space-between';
        rightList.style.gap = '14px';
        rightList.style.margin = '14px 0 20px 0';

        const newCard = document.createElement('div');
        newCard.className = 'info-block-row';
        newCard.innerHTML = `
          <div style="background: rgba(244, 123, 32, 0.12); color: var(--accent-orange); width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div style="flex: 1;">
              <div class="info-block-tag">RAPID ESTIMATION COMMITMENT</div>
              <p style="color: #082b4c; font-size: 14.5px; font-weight: 800; margin: 0 0 3px 0; line-height: 1.35;">24-Hour Scope Assessment &amp; Proposal</p>
              <p style="color: #1e293b; font-size: 12.5px; font-weight: 500; margin: 0; line-height: 1.35;">Itemized quotations with precision standards, deliverable checklists, and timeline estimates.</p>
          </div>
        `;
        rightList.appendChild(newCard);

        const rows = document.querySelectorAll('.contact-box-right .info-block-row');
        rows.forEach(row => {
          row.style.padding = '15px 18px';
          row.style.flex = '1';
          row.style.display = 'flex';
          row.style.alignItems = 'center';
        });

        const emailRow = rows[3];
        if (emailRow && !emailRow.querySelector('.extra-sub')) {
          const subP = document.createElement('p');
          subP.className = 'extra-sub';
          subP.style.cssText = 'color: #1e293b; font-size: 12.5px; font-weight: 500; margin: 3px 0 0 0; line-height: 1.35;';
          subP.textContent = 'Share KMZ site boundaries, survey scope, or tender RFQ docs';
          emailRow.querySelector('div[style*="flex: 1"]').appendChild(subP);
        }

        const hoursRow = rows[4];
        if (hoursRow && !hoursRow.querySelector('.extra-sub')) {
          const subP = document.createElement('p');
          subP.className = 'extra-sub';
          subP.style.cssText = 'color: #1e293b; font-size: 12px; font-weight: 500; margin: 4px 0 0 0; line-height: 1.35;';
          subP.textContent = '24/7 emergency survey crew deployment on prior coordination';
          hoursRow.querySelector('div[style*="flex: 1"]').appendChild(subP);
        }
      }
    });

    await new Promise(r => setTimeout(r, 400));
    const cardEl = await page.$('.contact-box-right');
    if (cardEl) {
      await cardEl.screenshot({ path: path.join(OUTPUT_DIR, `sidebox_${vp.name}.png`) });
    }
  }

  await browser.close();
  console.log('ALL_BREAKPOINTS_TESTED');
}

testAllBreakpoints().catch(console.error);
