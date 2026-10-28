const fs = require('fs');
const path = require('path');
const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';
const contactPath = path.join(__dirname, '..', 'contact.html');

let html = fs.readFileSync(contactPath, 'utf8');

// Replace the congested form grid and captcha with the simplified, elegant version
const oldFormContentRegex = /<div class="contact-form-grid">[\s\S]*?<!-- Security Captcha Verification Section \(QA Item 27\) -->[\s\S]*?<\/div>\s*<\/div>\s*<!-- Captcha Validation Error Notice -->[\s\S]*?<\/div>\s*<\/div>/;

console.log('Old form content found:', oldFormContentRegex.test(html));

const newFormContent = `<div class="contact-form-grid">
                            <div>
                                <label class="contact-label" for="contact-name">Full Name *</label>
                                <input type="text" id="contact-name" name="Full Name" class="contact-input-field" placeholder="e.g. Rahul Sharma" autocomplete="name" required>
                            </div>
                            <div>
                                <label class="contact-label" for="contact-phone">Phone Number *</label>
                                <input type="tel" id="contact-phone" name="Phone Number" class="contact-input-field" placeholder="+91 96046 46777" autocomplete="tel" required>
                            </div>
                            <div>
                                <label class="contact-label" for="contact-email">Email Address *</label>
                                <input type="email" id="contact-email" name="Email Address" class="contact-input-field" placeholder="name@example.com" autocomplete="email" required>
                            </div>
                            <div>
                                <label class="contact-label" for="contact-service">Survey Service Required *</label>
                                <select id="contact-service" name="Survey Service Required" class="contact-input-field" required style="cursor: pointer;">
                                    <option value="" disabled selected>Select survey service...</option>
                                    <option value="Topographical Survey">Topographical & Land Survey</option>
                                    <option value="DGPS / GNSS Control">DGPS / GNSS Control</option>
                                    <option value="Total Station Survey">Total Station Measurement</option>
                                    <option value="RTK Drone Mapping">RTK Drone Aerial Mapping</option>
                                    <option value="Drone LiDAR Scanning">Drone LiDAR & 3D Scanning</option>
                                    <option value="Road & Highway Survey">Road & Highway Survey</option>
                                    <option value="Rail & Metro Survey">Rail & Metro Survey</option>
                                    <option value="CAD & GIS Processing">CAD & GIS Processing</option>
                                    <option value="General Consultation">General Consultation</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <label class="contact-label" for="contact-message">Project Scope & Deliverables *</label>
                                <textarea id="contact-message" name="Project Details & Deliverables" class="contact-input-field" rows="3" placeholder="Briefly describe site location, scope (acreage/km), required deliverables (Contours, 3D CAD, Point Cloud)..." required style="resize: vertical; min-height: 75px;"></textarea>
                            </div>
                        </div>

                        <!-- Streamlined Anti-Spam Captcha Verification (QA Item 27) -->
                        <div class="reliable-captcha-section" style="margin-top: 14px; padding: 12px 14px; background: #f8fafc; border: 1.5px solid #d5e2ef; border-radius: 10px; box-shadow: 0 2px 8px rgba(8, 43, 76, 0.04);">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-size: 11.5px; font-weight: 800; color: #082b4c; letter-spacing: 0.6px; text-transform: uppercase; font-family: var(--font-heading); display: inline-flex; align-items: center; gap: 5px;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#082b4c" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    Security Verification <span style="color: #ef4444;">*</span>
                                </span>
                                <label style="display: inline-flex; align-items: center; gap: 8px; margin: 0; cursor: pointer; font-size: 13px; font-weight: 600; color: #1e293b; user-select: none;">
                                    <input type="checkbox" id="robotCheck" style="width: 17px; height: 17px; cursor: pointer; accent-color: #082b4c;">
                                    <span>I'm not a robot</span>
                                </label>
                            </div>

                            <div style="display: flex; align-items: center; gap: 8px;">
                                <!-- Captcha Display Badge -->
                                <div id="captchaCodeBadge" style="user-select: none; -webkit-user-select: none; background: linear-gradient(135deg, #082b4c, #123f68); color: #ffffff; font-family: 'Courier New', Courier, monospace; font-size: 17px; font-weight: 800; letter-spacing: 4px; padding: 8px 12px; border-radius: 6px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); text-decoration: line-through; border: 1px dashed #f47b20; flex-shrink: 0; text-align: center; min-width: 105px; box-sizing: border-box;">
                                    <span id="captchaCodeText">7W3K9</span>
                                </div>
                                <!-- Refresh Button -->
                                <button type="button" id="btnRefreshCaptcha" title="Generate New Captcha Code" aria-label="Refresh Security Code" style="background: #ffffff; border: 1.5px solid #d5e2ef; color: #082b4c; width: 38px; height: 38px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: all 0.2s ease;">
                                    <svg id="captchaRefreshIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.4s ease;"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                                </button>
                                <!-- Captcha Input Field -->
                                <input type="text" id="contactCaptchaInput" name="captcha_code" class="contact-input-field" placeholder="Enter code" maxlength="6" autocomplete="off" required style="flex: 1; padding: 9px 12px; font-size: 14px; text-transform: uppercase; font-weight: 700; letter-spacing: 2px;">
                            </div>

                            <!-- Captcha Validation Error Notice -->
                            <div id="captchaError" style="display: none; margin-top: 8px; padding: 7px 12px; border-radius: 6px; background: #fef2f2; border: 1px solid #f87171; color: #b91c1c; font-size: 12.5px; font-weight: 600; align-items: center; gap: 6px;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                <span id="captchaErrorMsg">Please enter the security code.</span>
                            </div>
                        </div>`;

if (oldFormContentRegex.test(html)) {
  html = html.replace(oldFormContentRegex, newFormContent);
  fs.writeFileSync(contactPath, html, 'utf8');
  console.log('Successfully updated contact.html with simplified form & sleek captcha!');
} else {
  console.log('Regex did not match exactly, inspecting chunk...');
}

// Screenshot preview
(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('file:///' + contactPath.replace(/\\/g, '/'), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const splitSection = await page.$('.contact-grid-spaced');
  if (splitSection) {
    await splitSection.screenshot({
      path: path.join(ARTIFACT_DIR, 'simplified_contact_grid_desktop.png')
    });
  }

  // Mobile view
  await page.setViewport({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const mobileSplit = await page.$('.contact-grid-spaced');
  if (mobileSplit) {
    await mobileSplit.screenshot({
      path: path.join(ARTIFACT_DIR, 'simplified_contact_grid_mobile.png')
    });
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
})().catch(console.error);
