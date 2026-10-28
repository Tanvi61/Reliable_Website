const fs = require('fs');
const path = require('path');
const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\\\Users\\\\HP\\\\.gemini\\\\antigravity-ide\\\\brain\\\\e419adda-178e-4737-97b0-cf828728f817';
const dir = path.join(__dirname, '..');

// 1. UPDATE header-footer.css with 5-column grid and responsive rules
const cssPath = path.join(dir, 'css', 'header-footer.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace .footer-grid definition
const oldFooterGridRegex = /\.footer-grid\s*\{[\s\S]*?margin-bottom:\s*60px;\s*\}/;
const newFooterGridCss = `.footer-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.85fr 1.1fr 1.2fr 1.5fr;
  gap: 32px;
  margin-bottom: 50px;
}

.footer-col-map {
  display: flex;
  flex-direction: column;
}

.footer-map-card {
  width: 100%;
  height: 185px;
  border-radius: 10px;
  overflow: hidden;
  border: 1.5px solid rgba(8, 43, 76, 0.16);
  box-shadow: 0 4px 14px rgba(8, 43, 76, 0.08);
  background: #e2e8f0;
}

.footer-map-directions-link {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent-orange) !important;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: transform 0.2s ease, color 0.2s ease;
}

.footer-map-directions-link:hover {
  color: var(--primary-navy) !important;
  transform: translateX(3px);
}`;

if (oldFooterGridRegex.test(css)) {
  css = css.replace(oldFooterGridRegex, newFooterGridCss);
}

// Update media query for mobile/tablet footer in header-footer.css
const oldMobileFooterRegex = /\/\* Mobile Footer column reordering \*\/[\s\S]*?\.footer-col:nth-child\(3\)\s*\{\s*order:\s*4;\s*\}/;
const newMobileFooterCss = `/* Mobile Footer column reordering */
  .footer-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 28px !important;
    margin-bottom: 35px !important;
  }
  .footer-col:nth-child(1) { order: 1; }
  .footer-col:nth-child(4) { order: 2; margin-bottom: 5px; }
  .footer-col:nth-child(2) { order: 3; }
  .footer-col:nth-child(3) { order: 4; }
  .footer-col-map          { order: 5; }
  .footer-map-card {
    height: 190px !important;
  }`;

if (oldMobileFooterRegex.test(css)) {
  css = css.replace(oldMobileFooterRegex, newMobileFooterCss);
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('header-footer.css updated with professional 5-column layout!');

// 2. TEMPLATE FOR CLEAN FOOTER (Col 4 clean with proprietors at top + Col 5 dedicated map)
const cleanCol4AndCol5 = `                <!-- Column 4: Contact -->
                <div class="footer-col">
                    <h4>Contact</h4>
                    <div class="footer-links" style="color: #000; font-size: 0.92rem; gap: 14px;">
                        <p style="margin: 0; font-weight: 700; color: #082b4c;">Pune, Maharashtra, India</p>
                        <p style="margin: 0; line-height: 1.55;"><strong>Proprietors:</strong><br>
                            Mahesh Deshmukh<br>
                            <a href="tel:+918600044688" class="footer-phone-link" title="Click to Call Mahesh Deshmukh (+91 86000 44688)" aria-label="Call Mahesh Deshmukh +91 86000 44688">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                                <span>+91 86000 44688</span>
                            </a><br>
                            <span style="display:inline-block; margin-top: 6px;">Sharad Pingale</span><br>
                            <a href="tel:+919604646777" class="footer-phone-link" title="Click to Call Sharad Pingale (+91 96046 46777)" aria-label="Call Sharad Pingale +91 96046 46777">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                                <span>+91 96046 46777</span>
                            </a>
                        </p>
                        <p style="margin: 0;"><a href="mailto:info@reliablelandsurvey.in" style="color: #000 !important;">info@reliablelandsurvey.in</a></p>
                        <div class="footer-social-icons" style="display: flex; align-items: center; gap: 12px; margin-top: 4px;">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener" class="footer-social-link instagram" aria-label="Instagram" style="color: #E1306C; display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: rgba(225, 48, 108, 0.1); transition: all 0.25s ease;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener" class="footer-social-link facebook" aria-label="Facebook" style="color: #1877F2; display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: rgba(24, 119, 242, 0.1); transition: all 0.25s ease;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener" class="footer-social-link youtube" aria-label="YouTube" style="color: #FF0000; display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: rgba(255, 0, 0, 0.1); transition: all 0.25s ease;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Column 5: Office Location Map -->
                <div class="footer-col footer-col-map">
                    <h4>Office Location</h4>
                    <div class="footer-map-card">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360431358!2d73.79292675000001!3d18.52461645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689146522361!5m2!1sen!2sin" width="100%" height="100%" style="border:0; display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Reliable Land Survey Consultancy Headquarters Location"></iframe>
                    </div>
                    <div style="margin-top: 10px; text-align: left;">
                        <a href="https://maps.google.com/?q=Pune,+Maharashtra" target="_blank" rel="noopener" class="footer-map-directions-link">
                            <span>Open in Google Maps</span> &rarr;
                        </a>
                    </div>
                </div>`;

// 3. APPLY TO ALL 15 HTML PAGES
const pages = [
  'index.html',
  'about.html',
  'services.html',
  'contact.html',
  'gallery.html',
  'review.html',
  'topographical-survey.html',
  'total-station-survey.html',
  'rtk-drone-mapping.html',
  'drone-photogrammetry.html',
  'lidar-3d-scanning.html',
  'dgps-gnss-control.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html'
];

pages.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Match existing Column 4 to end of footer-grid
  const col4Regex = /<!-- Column 4[\s\S]*?<\/div>\s*<\/div>\s*(?=<div class="footer-bottom"|<\/div>\s*<div class="footer-bottom")/i;
  const genericCol4Regex = /<div class="footer-col">[\s\S]*?<h4>(?:Contact|Pune Headquarters)<\/h4>[\s\S]*?<\/div>\s*<\/div>\s*(?=<div class="footer-bottom"|<\/div>\s*<div class="footer-bottom")/i;

  if (col4Regex.test(content)) {
    content = content.replace(col4Regex, cleanCol4AndCol5 + '\n            </div>\n');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[${file}] Updated footer successfully!`);
  } else if (genericCol4Regex.test(content)) {
    content = content.replace(genericCol4Regex, cleanCol4AndCol5 + '\n            </div>\n');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[${file}] Updated footer via generic regex!`);
  } else {
    console.log(`[${file}] Col4 regex did not match, inspecting...`);
  }
});

// 4. SCREENSHOT VERIFICATION
(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // Desktop
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('file:///' + path.join(dir, 'index.html').replace(/\\/g, '/'), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const footerEl = await page.$('.footer');
  if (footerEl) {
    await footerEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'verified_professional_footer_desktop.png')
    });
  }

  // Tablet (1024px)
  await page.setViewport({ width: 1024, height: 1366 });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  const tabletFooter = await page.$('.footer');
  if (tabletFooter) {
    await tabletFooter.screenshot({
      path: path.join(ARTIFACT_DIR, 'verified_professional_footer_tablet.png')
    });
  }

  // Mobile (390px)
  await page.setViewport({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  const mobileFooter = await page.$('.footer');
  if (mobileFooter) {
    await mobileFooter.screenshot({
      path: path.join(ARTIFACT_DIR, 'verified_professional_footer_mobile.png')
    });
  }

  await browser.close();
  console.log('All verification screenshots captured!');
})().catch(console.error);
