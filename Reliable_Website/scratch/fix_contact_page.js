const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, '../contact.html');
let content = fs.readFileSync(contactPath, 'utf8');

const newSplitSection = `        <!-- CONTACT SPLIT SECTION -->
<section class="section fade-up" style="padding: 80px 0; background-color: #f4f6f8;">
    <div class="container">
        <style>
            .contact-grid {
                display: grid;
                grid-template-columns: 1.3fr 0.9fr;
                border-radius: 20px;
                box-shadow: 0 20px 50px rgba(8, 43, 76, 0.08);
                overflow: hidden;
                background: #ffffff;
                border: 1px solid rgba(18, 63, 104, 0.08);
            }
            @media (max-width: 991px) {
                .contact-grid {
                    grid-template-columns: 1fr;
                }
            }
            .contact-input-field {
                width: 100%;
                padding: 14px 18px;
                border: 1.5px solid #d9e2ec;
                border-radius: 8px;
                font-size: 15px;
                font-family: var(--font-main);
                color: var(--text-dark);
                background: #ffffff;
                outline: none;
                transition: all 0.25s ease;
                box-sizing: border-box;
            }
            .contact-input-field:focus {
                border-color: var(--accent-orange);
                box-shadow: 0 0 0 3px rgba(244, 123, 32, 0.15);
            }
            .contact-label {
                font-size: 12px;
                font-weight: 700;
                color: var(--dark-navy);
                letter-spacing: 0.5px;
                text-transform: uppercase;
                margin-bottom: 6px;
                display: block;
                font-family: var(--font-heading);
            }
            .faq-item summary::-webkit-details-marker { display: none; }
            .faq-item[open] summary svg { transform: rotate(180deg); transition: transform 0.3s ease; }
            .faq-item:not([open]) summary svg { transform: rotate(0deg); transition: transform 0.3s ease; }
        </style>
        
        <div class="contact-grid">
            
            <!-- Left Side: Form -->
            <div style="padding: clamp(35px, 5vw, 60px); background: #f8fbfe; border-right: 1px solid rgba(18, 63, 104, 0.06);">
                <div class="section-label" style="margin-bottom: 8px;">GET IN TOUCH</div>
                <h2 style="font-size: clamp(1.8rem, 3vw, 2.3rem); color: var(--dark-navy); margin-bottom: 12px; font-weight: 800; font-family: var(--font-heading); line-height: 1.2;">Consultation & Quote Request</h2>
                <p style="color: var(--text-muted); margin-bottom: 35px; font-size: 15px; line-height: 1.6;">Fill in your survey project details below. Our senior geospatial engineers will analyze your scope and get in touch within 24 hours.</p>
                
                <form id="contactForm" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
                    <div>
                        <label class="contact-label">Full Name *</label>
                        <input type="text" id="contact-name" class="contact-input-field" placeholder="Enter your full name" required>
                    </div>
                    <div>
                        <label class="contact-label">Company / Firm Name</label>
                        <input type="text" id="contact-company" class="contact-input-field" placeholder="Company or organization">
                    </div>
                    <div>
                        <label class="contact-label">Email Address *</label>
                        <input type="email" id="contact-email" class="contact-input-field" placeholder="name@example.com" required>
                    </div>
                    <div>
                        <label class="contact-label">Phone Number *</label>
                        <input type="tel" id="contact-phone" class="contact-input-field" placeholder="+91 96046 48777" required>
                    </div>
                    <div style="grid-column: 1 / -1;">
                        <label class="contact-label">Survey Service Required *</label>
                        <select id="contact-service" class="contact-input-field" required style="cursor: pointer;">
                            <option value="" disabled selected>Select a survey service...</option>
                            <option value="Topographical Survey">Topographical & Land Survey</option>
                            <option value="DGPS / GNSS Control">DGPS / GNSS Control Establishment</option>
                            <option value="Total Station Survey">Total Station Measurement & Layout</option>
                            <option value="RTK Drone Mapping">RTK Drone Aerial Mapping & Photogrammetry</option>
                            <option value="Drone LiDAR Scanning">Drone LiDAR & 3D Scanning</option>
                            <option value="Road & Highway Survey">Road & Highway Alignment Survey</option>
                            <option value="Rail & Metro Survey">Rail & Metro Infrastructure Survey</option>
                            <option value="CAD & GIS Processing">CAD Drafting & GIS Processing</option>
                            <option value="General Consultation">General Survey Consultation</option>
                        </select>
                    </div>
                    <div style="grid-column: 1 / -1;">
                        <label class="contact-label">Project Location & Scope</label>
                        <input type="text" id="contact-location" class="contact-input-field" placeholder="e.g. Pune, PCMC, Hinjewadi, or approx. Acreage/KM">
                    </div>
                    <div style="grid-column: 1 / -1;">
                        <label class="contact-label">Message / Project Requirements *</label>
                        <textarea id="contact-message" class="contact-input-field" rows="4" placeholder="Describe your site details, required deliverables (Contours, 3D CAD, Point Cloud, Orthomosaic), and target timeline..." required style="resize: vertical;"></textarea>
                    </div>
                    <div style="grid-column: 1 / -1; margin-top: 10px;">
                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 18px 30px; font-size: 16px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
                            Submit Consultation Request
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Right Side: Info -->
            <div style="padding: clamp(35px, 5vw, 60px); background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h2 style="font-size: clamp(1.6rem, 2.5vw, 2rem); color: var(--dark-navy); margin-bottom: 35px; font-weight: 800; font-family: var(--font-heading);">Our Headquarters</h2>
                    
                    <div style="display: flex; flex-direction: column; gap: 32px;">
                        
                        <!-- Address -->
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="background: rgba(244, 123, 32, 0.12); color: var(--accent-orange); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            </div>
                            <div>
                                <div style="font-size: 11px; font-weight: 800; color: #8898aa; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; font-family: var(--font-heading);">HEADQUARTERS LOCATION</div>
                                <p style="color: var(--dark-navy); font-size: 16px; font-weight: 700; line-height: 1.5; margin: 0;">Pune, Maharashtra, India</p>
                                <p style="color: var(--text-muted); font-size: 13px; margin-top: 4px; line-height: 1.4;">Executing surveying projects across Maharashtra & Pan-India</p>
                            </div>
                        </div>

                        <!-- Phone -->
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="background: rgba(18, 63, 104, 0.08); color: var(--primary-navy); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </div>
                            <div>
                                <div style="font-size: 11px; font-weight: 800; color: #8898aa; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; font-family: var(--font-heading);">DIRECT CONTACT PHONES</div>
                                <div style="display: flex; flex-direction: column; gap: 4px;">
                                    <a href="tel:+919604648777" style="color: var(--dark-navy); font-size: 17px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--accent-orange)'" onmouseout="this.style.color='var(--dark-navy)'">+91 96046 48777</a>
                                    <a href="tel:+918600044688" style="color: var(--dark-navy); font-size: 17px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--accent-orange)'" onmouseout="this.style.color='var(--dark-navy)'">+91 86000 44688</a>
                                </div>
                            </div>
                        </div>

                        <!-- Email -->
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="background: rgba(244, 123, 32, 0.12); color: var(--accent-orange); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </div>
                            <div>
                                <div style="font-size: 11px; font-weight: 800; color: #8898aa; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; font-family: var(--font-heading);">OFFICIAL EMAIL</div>
                                <a href="mailto:info@reliablelandsurvey.in" style="color: var(--accent-orange); font-size: 16px; font-weight: 700; text-decoration: none; word-break: break-all;">info@reliablelandsurvey.in</a>
                            </div>
                        </div>

                        <!-- Hours -->
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="background: rgba(18, 63, 104, 0.08); color: var(--primary-navy); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            </div>
                            <div>
                                <div style="font-size: 11px; font-weight: 800; color: #8898aa; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; font-family: var(--font-heading);">OPERATING HOURS</div>
                                <p style="color: var(--dark-navy); font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                                <span style="background: rgba(244, 123, 32, 0.12); color: var(--accent-orange); font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 4px; letter-spacing: 0.5px; display: inline-block;">CLOSED ON SUNDAYS & HOLIDAYS</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 35px;">
                    <a href="https://maps.google.com/?q=Pune,+Maharashtra" target="_blank" rel="noopener" style="background: var(--dark-navy); color: #fff; text-decoration: none; padding: 15px 24px; border-radius: 8px; text-align: center; font-weight: 700; display: flex; justify-content: center; align-items: center; gap: 10px; transition: all 0.3s ease;" onmouseover="this.style.background='var(--primary-navy)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='var(--dark-navy)'; this.style.transform='translateY(0)';">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/></svg> View on Google Maps
                    </a>
                    <a href="https://wa.me/919604648777" target="_blank" rel="noopener" style="background: #25D366; color: #fff; text-decoration: none; padding: 15px 24px; border-radius: 8px; text-align: center; font-weight: 700; display: flex; justify-content: center; align-items: center; gap: 10px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.25);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(37, 211, 102, 0.35)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(37, 211, 102, 0.25)';">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.89-4.443 9.891-9.891.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.74-1.975zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        Instant WhatsApp Inquiry
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- GOOGLE MAP (Pune, Maharashtra) -->
<section class="fade-up" style="width: 100%; height: 450px; background: #eaeaea; margin-bottom: 0;">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360431358!2d73.79292675000001!3d18.52461645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689146522361!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</section>`;

const targetRegex = /<!-- CONTACT SPLIT SECTION -->[\s\S]*?<!-- FAQ SECTION WITH ANIMATIONS -->/;

if (targetRegex.test(content)) {
    content = content.replace(targetRegex, newSplitSection + '\n\n<!-- FAQ SECTION WITH ANIMATIONS -->');
    fs.writeFileSync(contactPath, content, 'utf8');
    console.log('Successfully updated contact.html with accurate company details and professional formatting!');
} else {
    console.log('Could not match target section regex in contact.html');
}
