const fs = require('fs');
const path = require('path');

const contactPath = 'e:/MindAxis_Web/Reliable_Website/contact.html';
let content = fs.readFileSync(contactPath, 'utf8');

// 1. Update CSS around line 391 for @media (max-width: 991px)
const oldMedia = `@media (max-width: 991px) {
                .contact-grid-spaced {
                    grid-template-columns: 1fr;
                    gap: 30px;
                }
            }`;

const newMedia = `@media (max-width: 991px) {
                .contact-grid-spaced {
                    grid-template-columns: 1fr;
                    gap: 30px;
                }
                .contact-info-list {
                    flex: none !important;
                    gap: 14px !important;
                    margin: 16px 0 20px 0 !important;
                }
                .contact-box-right .info-block-row {
                    flex: none !important;
                }
            }`;

// 2. Update .info-block-row CSS to have flex: 1 and 6 nth-child delays
const oldInfoBlockCss = `.info-block-row {
                background: #f8fafc;
                border: 1.5px solid #cbd5e1;
                border-radius: 10px;
                padding: 14px 16px;
                display: flex;
                gap: 14px;
                align-items: center;
                position: relative;
                overflow: hidden;
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                            border-color 0.3s ease, 
                            box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                            background 0.3s ease;
                animation: tabFloatContinuous 4s ease-in-out infinite;
                will-change: transform, box-shadow, border-color;
            }`;

const newInfoBlockCss = `.info-block-row {
                background: #f8fafc;
                border: 1.5px solid #cbd5e1;
                border-radius: 10px;
                padding: 15px 18px;
                display: flex;
                gap: 14px;
                align-items: center;
                position: relative;
                overflow: hidden;
                flex: 1;
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                            border-color 0.3s ease, 
                            box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                            background 0.3s ease;
                animation: tabFloatContinuous 4s ease-in-out infinite;
                will-change: transform, box-shadow, border-color;
            }`;

const oldNthDelays = `.info-block-row:nth-child(5),
            .info-block-row:nth-child(5)::after {
                animation-delay: 3.2s;
            }`;

const newNthDelays = `.info-block-row:nth-child(5),
            .info-block-row:nth-child(5)::after {
                animation-delay: 3.2s;
            }
            .info-block-row:nth-child(6),
            .info-block-row:nth-child(6)::after {
                animation-delay: 4.0s;
            }`;

// Normalize line endings for replacement
function safeReplace(str, target, replacement) {
  const normStr = str.replace(/\r\n/g, '\n');
  const normTarget = target.replace(/\r\n/g, '\n');
  const normReplacement = replacement.replace(/\r\n/g, '\n');
  if (!normStr.includes(normTarget)) {
    console.error('Target not found:', normTarget.slice(0, 50));
    return str;
  }
  return normStr.replace(normTarget, normReplacement);
}

content = safeReplace(content, oldMedia, newMedia);
content = safeReplace(content, oldInfoBlockCss, newInfoBlockCss);
content = safeReplace(content, oldNthDelays, newNthDelays);

// 3. Replace the contact-box-right block
const oldBoxRightRegex = /<!-- Box 2 \(Right\): Headquarters Card -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;

const newBoxRightHtml = `<!-- Box 2 (Right): Headquarters Card -->
            <div class="contact-box-card contact-box-right">
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div>
                        <h3 class="contact-card-header">Direct Office &amp; Technical Desk</h3>
                        <p class="contact-card-sub" style="margin-bottom: 0;">Reach our technical desk directly for active field project coordination, methodology review, or visit our central Pune office.</p>
                    </div>

                    <!-- Contact Info Blocks List: Evenly distributed & proportioned -->
                    <div class="contact-info-list" style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; gap: 14px; margin: 16px 0 20px 0;">
                        
                        <!-- 1. Address -->
                        <div class="info-block-row">
                            <div style="background: rgba(244, 123, 32, 0.12); color: var(--accent-orange); width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            </div>
                            <div style="flex: 1;">
                                <div class="info-block-tag">HEADQUARTERS LOCATION</div>
                                <p style="color: #082b4c; font-size: 15px; font-weight: 800; line-height: 1.35; margin: 0;">Pune, Maharashtra, India</p>
                                <p style="color: #1e293b; font-size: 13px; font-weight: 500; margin: 3px 0 0 0; line-height: 1.35;">Central Operations Hub • Executing surveys across Maharashtra &amp; Pan-India</p>
                            </div>
                        </div>

                        <!-- 2. Proprietors -->
                        <div class="info-block-row">
                            <div style="background: rgba(244, 123, 32, 0.12); color: var(--accent-orange); width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                            <div style="flex: 1;">
                                <div class="info-block-tag">PROPRIETORS &amp; SENIOR CONSULTANTS</div>
                                <p style="color: #082b4c; font-size: 15px; font-weight: 800; margin: 0; line-height: 1.4;">Mahesh Deshmukh &amp; Sharad Pingale</p>
                                <p style="color: #1e293b; font-size: 12.5px; font-weight: 500; margin: 3px 0 0 0; line-height: 1.35;">25+ Years Combined Expertise in Engineering &amp; Drone Surveys</p>
                            </div>
                        </div>

                        <!-- 3. Phone -->
                        <div class="info-block-row">
                            <div style="background: rgba(18, 63, 104, 0.08); color: var(--primary-navy); width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </div>
                            <div style="flex: 1;">
                                <div class="info-block-tag">DIRECT CONTACT PHONES</div>
                                <div style="display: flex; flex-direction: column; gap: 4px;">
                                    <div style="font-size: 14.5px; color: #082b4c;">
                                        <span style="font-weight: 700; color: #082b4c;">Mahesh Deshmukh:</span> <a href="tel:+918600044688" style="color: #082b4c; font-size: 15px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--accent-orange)'" onmouseout="this.style.color='#082b4c'">+91 86000 44688</a>
                                    </div>
                                    <div style="font-size: 14.5px; color: #082b4c;">
                                        <span style="font-weight: 700; color: #082b4c;">Sharad Pingale:</span> <a href="tel:+919604646777" style="color: #082b4c; font-size: 15px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--accent-orange)'" onmouseout="this.style.color='#082b4c'">+91 96046 46777</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 4. Email -->
                        <div class="info-block-row">
                            <div style="background: rgba(244, 123, 32, 0.12); color: var(--accent-orange); width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </div>
                            <div style="flex: 1;">
                                <div class="info-block-tag">OFFICIAL INQUIRY &amp; RFQ EMAIL</div>
                                <a href="mailto:info@reliablelandsurvey.in" style="color: var(--accent-orange); font-size: 15px; font-weight: 800; text-decoration: none; overflow-wrap: anywhere; word-break: break-word;">info@reliablelandsurvey.in</a>
                                <p style="color: #1e293b; font-size: 12.5px; font-weight: 500; margin: 3px 0 0 0; line-height: 1.35;">Share KMZ site boundaries, tender documents, or survey requirements</p>
                            </div>
                        </div>

                        <!-- 5. Hours -->
                        <div class="info-block-row">
                            <div style="background: rgba(18, 63, 104, 0.08); color: var(--primary-navy); width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            </div>
                            <div style="flex: 1;">
                                <div class="info-block-tag">OPERATING &amp; MOBILIZATION HOURS</div>
                                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 3px;">
                                    <p style="color: #082b4c; font-size: 14.5px; font-weight: 800; margin: 0;">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                                    <span style="background: #ffedd5; color: #c2410c; font-size: 11px; font-weight: 800; padding: 2px 7px; border-radius: 4px; letter-spacing: 0.5px; display: inline-block; border: 1px solid rgba(194, 65, 12, 0.2);">CLOSED ON SUNDAYS</span>
                                </div>
                                <p style="color: #1e293b; font-size: 12px; font-weight: 500; margin: 0; line-height: 1.35;">Field survey crew mobilization available 24/7 on prior coordination</p>
                            </div>
                        </div>

                        <!-- 6. Rapid Estimation & Technical Consultation -->
                        <div class="info-block-row">
                            <div style="background: rgba(244, 123, 32, 0.12); color: var(--accent-orange); width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            </div>
                            <div style="flex: 1;">
                                <div class="info-block-tag">RAPID ESTIMATION COMMITMENT</div>
                                <p style="color: #082b4c; font-size: 14.5px; font-weight: 800; margin: 0 0 3px 0; line-height: 1.35;">24-Hour Scope Assessment &amp; Proposal</p>
                                <p style="color: #1e293b; font-size: 12.5px; font-weight: 500; margin: 0; line-height: 1.35;">Itemized quotations with precision standards, deliverable checklists, and timeline estimates.</p>
                            </div>
                        </div>

                    </div>

                    <div style="margin-top: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <a href="https://maps.google.com/?q=Pune,+Maharashtra" target="_blank" rel="noopener" class="contact-map-tab-btn" style="background: var(--dark-navy); color: #fff; text-decoration: none; padding: 14px 16px; border-radius: 8px; text-align: center; font-weight: 700; font-size: 14px; display: flex; justify-content: center; align-items: center; gap: 8px; transition: all 0.3s ease;" onmouseover="this.style.background='var(--primary-navy)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='var(--dark-navy)'; this.style.transform='translateY(0)';">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/></svg> View on Map
                        </a>
                        <a href="https://wa.me/919604646777" target="_blank" rel="noopener" class="contact-wa-tab-btn" style="background: #25D366; color: #fff; text-decoration: none; padding: 14px 16px; border-radius: 8px; text-align: center; font-weight: 700; font-size: 14px; display: flex; justify-content: center; align-items: center; gap: 8px; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 18px rgba(37, 211, 102, 0.35)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(37, 211, 102, 0.25)';">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.89-4.443 9.891-9.891.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.74-1.975zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg> WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

const normContent = content.replace(/\r\n/g, '\n');
if (oldBoxRightRegex.test(normContent)) {
  const updated = normContent.replace(oldBoxRightRegex, newBoxRightHtml);
  fs.writeFileSync(contactPath, updated, 'utf8');
  console.log('SUCCESSFULLY_UPDATED_CONTACT_HTML');
} else {
  console.error('REGEX_FAILED_TO_MATCH');
}
