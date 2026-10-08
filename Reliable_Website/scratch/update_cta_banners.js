const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';
const servicePages = [
  'topographical-survey.html',
  'total-station-survey.html',
  'dgps-gnss-control.html',
  'rtk-drone-mapping.html',
  'lidar-3d-scanning.html',
  'drone-photogrammetry.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html'
];

const newCtaBannerHtml = `    <!-- CTA BANNER -->
    <section class="service-cta-banner">
        <div style="position: absolute; top: 0; right: 0; width: 50%; height: 100%; background: radial-gradient(circle, rgba(244,123,32,0.18) 0%, transparent 70%); pointer-events: none;"></div>
        <div class="container" style="position: relative; z-index: 2; max-width: 750px;">
            <h2>Deploy Our Survey Crews to Your Project</h2>
            <p>Equipped with high-precision total stations, dual-frequency DGPS, and RTK drones, our Pune teams mobilize within 24-48 hours across Maharashtra and India.</p>
            <div class="service-cta-buttons">
                <a href="contact.html" class="cta-banner-btn-primary">
                    <span>Request Project Quotation</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="tel:+919604648777" class="cta-banner-btn-phone">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    <span>+91 96046 48777</span>
                </a>
            </div>
        </div>
    </section>`;

servicePages.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  const isCrlf = content.includes('\r\n');
  let normalized = content.replace(/\r\n/g, '\n');

  // Match CTA section from <!-- CTA BANNER --> until </section>
  const ctaRegex = /<!-- CTA BANNER -->\s*<section[\s\S]*?<\/section>/;

  if (ctaRegex.test(normalized)) {
    normalized = normalized.replace(ctaRegex, newCtaBannerHtml);
    // Also bump css cache version to v=20261008_4
    normalized = normalized.replace(/css\/style\.css\?v=[^\"]+/g, 'css/style.css?v=20261008_4');

    const finalContent = isCrlf ? normalized.replace(/\n/g, '\r\n') : normalized;
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log(`[${f}] CTA banner updated with visible white heading & animated buttons`);
  } else {
    console.log(`[${f}] WARNING: Could not match CTA banner section`);
  }
});
