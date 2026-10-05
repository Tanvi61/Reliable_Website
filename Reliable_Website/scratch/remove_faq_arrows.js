const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update contact.html
const contactPath = path.join(dir, 'contact.html');
let contactContent = fs.readFileSync(contactPath, 'utf8');

const oldContactFaqRegex = /<!-- FAQ SECTION WITH ANIMATIONS -->[\s\S]*?<\/section>/;
const newContactFaq = `<!-- FAQ SECTION WITH ANIMATIONS -->
<section class="section" style="padding: 90px 0 100px 0; background: #fff;">
    <div class="container">
        <div class="text-center fade-up" style="margin-bottom: 50px;">
            <div class="section-label" style="margin-bottom: 8px;">FAQS</div>
            <h2 class="section-heading" style="font-size: clamp(2rem, 3.5vw, 2.5rem); color: var(--dark-navy); font-weight: 800; font-family: var(--font-heading); margin: 0 0 12px 0;">Frequently Asked Questions</h2>
            <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto; font-size: 15px; line-height: 1.6;">Find answers to common queries about our surveying process, deliverables, and capabilities.</p>
        </div>

        <div style="max-width: 850px; margin: 0 auto;">
            <div class="faq-list" style="display: flex; flex-direction: column; gap: 16px;">
                
                <div class="faq-card fade-up">
                    <div class="faq-card-header">
                        <span class="faq-question">What kind of surveys do you perform?</span>
                    </div>
                    <div class="faq-card-body">
                        <div class="faq-card-content">
                            We specialize in Topographical Surveys, DGPS/GNSS Control Establishment, LiDAR Drone Scanning, Route Alignments (Highways/Railways), and detailed As-Built structural surveys using state-of-the-art robotic total stations and RTK drones.
                        </div>
                    </div>
                </div>

                <div class="faq-card fade-up">
                    <div class="faq-card-header">
                        <span class="faq-question">How accurate is your Drone LiDAR mapping?</span>
                    </div>
                    <div class="faq-card-body">
                        <div class="faq-card-content">
                            Our LiDAR sensors deployed on DJI enterprise drones can achieve absolute precision of down to 2-3 cm (XYZ) depending on flight parameters and ground control points. It easily penetrates dense vegetation to capture true ground models.
                        </div>
                    </div>
                </div>

                <div class="faq-card fade-up">
                    <div class="faq-card-header">
                        <span class="faq-question">What is the standard turnaround time for a project?</span>
                    </div>
                    <div class="faq-card-body">
                        <div class="faq-card-content">
                            Turnaround time heavily depends on the project scope, terrain, and deliverables. However, our use of modern drone mapping allows us to capture thousands of acres in a single day, reducing traditional field time by up to 70%. We will provide a precise timeline along with our quotation.
                        </div>
                    </div>
                </div>

                <div class="faq-card fade-up">
                    <div class="faq-card-header">
                        <span class="faq-question">What formats do you deliver the final data in?</span>
                    </div>
                    <div class="faq-card-body">
                        <div class="faq-card-content">
                            We deliver engineering-ready data compatible with major CAD and GIS software. Common formats include AutoCAD (.DWG, .DXF), point clouds (.LAS, .LAZ), GeoTIFF orthomosaics, shapefiles (.SHP), and standard PDF reports.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>`;

if (oldContactFaqRegex.test(contactContent)) {
    contactContent = contactContent.replace(oldContactFaqRegex, newContactFaq);
    fs.writeFileSync(contactPath, contactContent, 'utf8');
    console.log('Updated contact.html FAQs');
}

// 2. Remove faq-icon-pill across all html files
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove faq-icon-pill container and its SVG
    const iconPillRegex = /\s*<div class="faq-icon-pill">[\s\S]*?<\/div>/g;
    if (iconPillRegex.test(content)) {
        content = content.replace(iconPillRegex, '');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Removed faq-icon-pill from ${file}`);
    }
});
