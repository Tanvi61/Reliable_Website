const fs = require('fs');
const path = require('path');
const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\\\Users\\\\HP\\\\.gemini\\\\antigravity-ide\\\\brain\\\\e419adda-178e-4737-97b0-cf828728f817';
const contactPath = path.join(__dirname, '..', 'contact.html');

let html = fs.readFileSync(contactPath, 'utf8');

// 1. SIMPLIFY FORM (Left Card)
const simpleFormHtml = `
                    <form id="contactForm" action="https://formsubmit.co/tanviii6104@gmail.com" method="POST" style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; margin-top: 6px;">
                        <!-- Destination & Configuration Fields -->
                        <input type="hidden" name="_subject" value="New Project Quotation Request - Reliable Land Surveyors">
                        <input type="hidden" name="_template" value="table">
                        <input type="hidden" name="_captcha" value="false">
                        <input type="hidden" name="_replyto" id="contactReplyTo" value="">
                        <input type="hidden" name="_next" id="contactNext" value="">
                        <input type="text" name="_honey" style="display:none">

                        <div class="contact-form-grid" style="gap: 14px;">
                            <div>
                                <label class="contact-label" for="contact-name">Full Name *</label>
                                <input type="text" id="contact-name" name="Full Name" class="contact-input-field" placeholder="Enter full name" autocomplete="name" required>
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
                                <label class="contact-label" for="contact-service">Survey Service *</label>
                                <select id="contact-service" name="Survey Service Required" class="contact-input-field" required style="cursor: pointer;">
                                    <option value="" disabled selected>Select service required...</option>
                                    <option value="Topographical Survey">Topographical & Land Survey</option>
                                    <option value="DGPS / GNSS Control">DGPS / GNSS Control</option>
                                    <option value="Total Station Survey">Total Station Measurement</option>
                                    <option value="RTK Drone Mapping">RTK Drone Aerial Mapping</option>
                                    <option value="Drone LiDAR Scanning">Drone LiDAR & 3D Scanning</option>
                                    <option value="Road & Highway Survey">Road & Highway Survey</option>
                                    <option value="Rail & Metro Survey">Rail & Metro Survey</option>
                                    <option value="CAD & GIS Processing">CAD & GIS Processing</option>
                                    <option value="General Consultation">General Survey Consultation</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <label class="contact-label" for="contact-message">Project Location, Scope & Deliverables *</label>
                                <textarea id="contact-message" name="Project Details & Deliverables" class="contact-input-field" rows="3" placeholder="Briefly describe project location, estimated area/km, required deliverables (Contours, 3D CAD, Point Cloud)..." required style="resize: vertical; min-height: 85px;"></textarea>
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
                                <input type="text" id="contactCaptchaInput" name="captcha_code" class="contact-input-field" placeholder="Enter 5-character code" maxlength="6" autocomplete="off" required style="flex: 1; padding: 9px 12px; font-size: 14px; text-transform: uppercase; font-weight: 700; letter-spacing: 2px;">
                            </div>

                            <!-- Captcha Validation Error Notice -->
                            <div id="captchaError" style="display: none; margin-top: 8px; padding: 7px 12px; border-radius: 6px; background: #fef2f2; border: 1px solid #f87171; color: #b91c1c; font-size: 12.5px; font-weight: 600; align-items: center; gap: 6px;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                <span id="captchaErrorMsg">Please enter the security code.</span>
                            </div>
                        </div>

                        <div style="margin-top: 14px;">
                            <button type="submit" id="contactSubmitBtn" class="btn btn-primary submit-consultation-btn" style="width: 100%; padding: 14px 24px; font-size: 15px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                                Submit Consultation Request
                            </button>
                        </div>
                    </form>`;

// Replace form in contact.html
const formSectionRegex = /<form id="contactForm"[\s\S]*?<\/form>/;
html = html.replace(formSectionRegex, simpleFormHtml);

// 2. STREAMLINE RIGHT CARD (4 high-value balanced blocks)
const simpleRightListHtml = `<div class="contact-info-list" style="display: flex; flex-direction: column; justify-content: space-between; gap: 12px; margin: 16px 0 18px 0; flex: 1;">
                        
                        <!-- 1. Address -->
                        <div class="info-block-row" style="padding: 14px 18px;">
                            <div style="background: rgba(244, 123, 32, 0.12); color: var(--accent-orange); width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            </div>
                            <div style="flex: 1;">
                                <div class="info-block-tag">HEADQUARTERS LOCATION</div>
                                <p style="color: #082b4c; font-size: 14.5px; font-weight: 800; margin: 0 0 3px 0; line-height: 1.35;">Pune, Maharashtra, India</p>
                                <p style="color: #1e293b; font-size: 12.5px; font-weight: 500; margin: 0; line-height: 1.35;">Central Operations Hub • Executing surveys across Maharashtra &amp; Pan-India</p>
                            </div>
                        </div>

                        <!-- 2. Proprietors & Direct Contact -->
                        <div class="info-block-row" style="padding: 14px 18px;">
                            <div style="background: rgba(8, 43, 76, 0.1); color: var(--dark-navy); width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                            <div style="flex: 1;">
                                <div class="info-block-tag">PROPRIETORS &amp; SENIOR CONSULTANTS</div>
                                <div style="display: flex; flex-direction: column; gap: 4px;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px;">
                                        <span style="color: #082b4c; font-size: 14px; font-weight: 800;">Mahesh Deshmukh</span>
                                        <a href="tel:+918600044688" style="color: var(--accent-orange); text-decoration: none; font-size: 13px; font-weight: 700;">+91 86000 44688</a>
                                    </div>
                                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px;">
                                        <span style="color: #082b4c; font-size: 14px; font-weight: 800;">Sharad Pingale</span>
                                        <a href="tel:+919604646777" style="color: var(--accent-orange); text-decoration: none; font-size: 13px; font-weight: 700;">+91 96046 46777</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 3. Official Email -->
                        <div class="info-block-row" style="padding: 14px 18px;">
                            <div style="background: rgba(244, 123, 32, 0.12); color: var(--accent-orange); width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </div>
                            <div style="flex: 1;">
                                <div class="info-block-tag">OFFICIAL INQUIRY &amp; RFQ EMAIL</div>
                                <a href="mailto:info@reliablelandsurvey.in" style="color: var(--accent-orange); text-decoration: none; font-size: 14.5px; font-weight: 800; display: block; margin-bottom: 3px;">info@reliablelandsurvey.in</a>
                                <p style="color: #1e293b; font-size: 12.5px; font-weight: 500; margin: 0; line-height: 1.35;">Share KMZ site boundaries, tender documents, or survey requirements</p>
                            </div>
                        </div>

                        <!-- 4. Operating Hours & Mobilization -->
                        <div class="info-block-row" style="padding: 14px 18px;">
                            <div style="background: rgba(8, 43, 76, 0.1); color: var(--dark-navy); width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            </div>
                            <div style="flex: 1;">
                                <div class="info-block-tag">OPERATING &amp; MOBILIZATION HOURS</div>
                                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 3px;">
                                    <p style="color: #082b4c; font-size: 14px; font-weight: 800; margin: 0;">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                                    <span style="background: #ffedd5; color: #c2410c; font-size: 11px; font-weight: 800; padding: 2px 7px; border-radius: 4px; letter-spacing: 0.5px; display: inline-block; border: 1px solid rgba(194, 65, 12, 0.2);">CLOSED ON SUNDAYS</span>
                                </div>
                                <p style="color: #1e293b; font-size: 12px; font-weight: 500; margin: 0; line-height: 1.35;">Field survey crew mobilization available 24/7 on prior coordination</p>
                            </div>
                        </div>

                    </div>`;

const rightListRegex = /<div class="contact-info-list"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div style="margin-top: auto;/;
// Let's replace the contact-info-list block
const fullRightListRegex = /<div class="contact-info-list"[\s\S]*?<\/div>\s*(?=<div style="margin-top: auto;)/;
if (fullRightListRegex.test(html)) {
  html = html.replace(fullRightListRegex, simpleRightListHtml + '\n                    ');
  console.log('Successfully replaced right list with 4 clean cards!');
} else {
  console.log('Right list regex did not match, inspecting...');
}

fs.writeFileSync(contactPath, html, 'utf8');

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
      path: path.join(ARTIFACT_DIR, 'clean_uncongested_contact_grid_desktop.png')
    });
  }

  // Mobile
  await page.setViewport({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const mobileSplit = await page.$('.contact-grid-spaced');
  if (mobileSplit) {
    await mobileSplit.screenshot({
      path: path.join(ARTIFACT_DIR, 'clean_uncongested_contact_grid_mobile.png')
    });
  }

  await browser.close();
  console.log('Clean uncongested screenshots captured!');
})().catch(console.error);
