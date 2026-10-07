const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// ==========================================
// 1. UPDATE css/style.css
// ==========================================
const styleCssPath = path.join(rootDir, 'css', 'style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

// Fix html & body overflow and sizing
styleCss = styleCss.replace(
  /html\s*\{[\s\S]*?overflow-x:\s*(?:hidden|clip|visible);[\s\S]*?\}/,
  `html {
  scroll-behavior: smooth;
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
}`
);

styleCss = styleCss.replace(
  /body\s*\{[\s\S]*?font-family:\s*var\(--font-main\);[\s\S]*?overflow-x:\s*(?:hidden|clip|visible);[\s\S]*?\}/,
  `body {
  font-family: var(--font-main);
  background-color: var(--bg-white);
  color: var(--text-dark);
  line-height: 1.6;
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`
);

// Update .floating-actions in style.css to top: 50%
styleCss = styleCss.replace(
  /\/\* ==========================================\s+FLOATING ACTION BUTTONS[\s\S]*?\.floating-actions\s*\{[\s\S]*?pointer-events:\s*auto\s*!important;\s*\}/,
  `/* ==========================================
   FLOATING ACTION BUTTONS (Persistent Right Side Widget - Centered & Visible from Top)
========================================== */
.floating-actions {
  position: fixed !important;
  right: 18px !important;
  right: calc(18px + env(safe-area-inset-right, 0px)) !important;
  top: 50% !important;
  bottom: auto !important;
  transform: translateY(-50%) !important;
  -webkit-transform: translateY(-50%) !important;
  z-index: 2147483647 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  pointer-events: auto !important;
  visibility: visible !important;
  opacity: 1 !important;
}`
);

// Ensure overflow containment on marquee and testimonials to prevent widening document
styleCss = styleCss.replace(
  /\.marquee-row\s*\{[\s\S]*?overflow:\s*(?:visible|hidden);[\s\S]*?\}/,
  `.marquee-row {
  display: flex;
  overflow: hidden !important;
  user-select: none;
  padding: 10px 0;
  max-width: 100%;
}`
);

styleCss = styleCss.replace(
  /\.testimonials-section\s*\{[\s\S]*?background:\s*#e8f4fc;[\s\S]*?\}/,
  `.testimonials-section {
  background: #e8f4fc;
  overflow: hidden !important;
  max-width: 100vw;
}`
);

// Append service specification responsive grid rules to style.css if not already present
const serviceGridRules = `
/* ==========================================
   SERVICE DETAIL SPECIFICATION RESPONSIVE GRID
========================================== */
.service-spec-grid,
div[style*="grid-template-columns: 1fr 1.15fr"] {
  max-width: 100% !important;
  box-sizing: border-box !important;
}

@media (max-width: 991px) {
  .service-spec-grid,
  div[style*="grid-template-columns: 1fr 1.15fr"] {
    grid-template-columns: 1fr !important;
    gap: 30px !important;
    padding: clamp(20px, 4vw, 35px) !important;
  }

  .service-spec-grid table,
  div[style*="grid-template-columns: 1fr 1.15fr"] table {
    width: 100% !important;
    display: table !important;
    table-layout: fixed !important;
  }

  .service-spec-grid table td,
  div[style*="grid-template-columns: 1fr 1.15fr"] table td {
    word-break: break-word !important;
  }
}

@media (max-width: 480px) {
  .service-spec-cta-grid,
  div[style*="grid-template-columns: 1fr 1fr"] {
    grid-template-columns: 1fr !important;
  }
}
`;

if (!styleCss.includes('SERVICE DETAIL SPECIFICATION RESPONSIVE GRID')) {
  styleCss += '\n' + serviceGridRules;
}

fs.writeFileSync(styleCssPath, styleCss, 'utf8');
console.log('Successfully updated css/style.css');

// ==========================================
// 2. UPDATE css/responsive.css
// ==========================================
const respCssPath = path.join(rootDir, 'css', 'responsive.css');
let respCss = fs.readFileSync(respCssPath, 'utf8');

// Update .floating-actions responsive rules to top: 50%
respCss = respCss.replace(
  /\.floating-actions\s*\{[\s\S]*?pointer-events:\s*auto\s*!important;\s*\}/g,
  `.floating-actions {
    position: fixed !important;
    right: 14px !important;
    right: calc(14px + env(safe-area-inset-right, 0px)) !important;
    top: 50% !important;
    bottom: auto !important;
    transform: translateY(-50%) !important;
    -webkit-transform: translateY(-50%) !important;
    z-index: 2147483647 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    pointer-events: auto !important;
    visibility: visible !important;
    opacity: 1 !important;
  }`
);

// Append responsive service grid rules to responsive.css
if (!respCss.includes('SERVICE DETAIL SPECIFICATION RESPONSIVE GRID')) {
  respCss += '\n' + serviceGridRules;
}

fs.writeFileSync(respCssPath, respCss, 'utf8');
console.log('Successfully updated css/responsive.css');

// ==========================================
// 3. STANDARDIZED HEAD STYLE & FLOATING ACTIONS HTML
// ==========================================
const headFloatingStyle = `    <!-- Persistent Floating Actions Styles (Visible from page start across all devices) -->
    <style>
      .floating-actions {
        position: fixed !important;
        right: 18px !important;
        right: calc(18px + env(safe-area-inset-right, 0px)) !important;
        top: 50% !important;
        bottom: auto !important;
        transform: translateY(-50%) !important;
        -webkit-transform: translateY(-50%) !important;
        z-index: 2147483647 !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        pointer-events: auto !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      @media (max-width: 1024px) {
        .floating-actions {
          right: 14px !important;
          right: calc(14px + env(safe-area-inset-right, 0px)) !important;
          top: 50% !important;
          bottom: auto !important;
          transform: translateY(-50%) !important;
          -webkit-transform: translateY(-50%) !important;
          z-index: 2147483647 !important;
          gap: 10px !important;
        }
        .float-btn {
          width: 48px !important;
          height: 48px !important;
        }
      }
      .float-btn.whatsapp,
      .float-btn.call {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      .float-btn.scroll-top,
      #scrollTopBtn.scroll-top,
      #scrollTopBtn {
        position: fixed !important;
        bottom: 25px !important;
        bottom: calc(25px + env(safe-area-inset-bottom, 0px)) !important;
        right: 20px !important;
        right: calc(20px + env(safe-area-inset-right, 0px)) !important;
        z-index: 2147483646 !important;
        background-color: var(--dark-navy) !important;
      }
    </style>`;

const bodyFloatingHtml = `
    <!-- Floating Quick Actions (Persistent on right side across entire page from top to bottom) -->
    <div class="floating-actions" style="position: fixed !important; right: 18px !important; top: 50% !important; bottom: auto !important; transform: translateY(-50%) !important; -webkit-transform: translateY(-50%) !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; gap: 12px !important; pointer-events: auto !important;">
        <a href="https://wa.me/919604648777" target="_blank" rel="noopener" class="float-btn whatsapp" aria-label="WhatsApp" title="Chat on WhatsApp" style="background-color: #25D366 !important; display: flex !important; visibility: visible !important; opacity: 1 !important;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.89-4.443 9.891-9.891.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.74-1.975zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span class="float-tooltip">WhatsApp Us</span>
        </a>
        <a href="tel:+919604648777" class="float-btn call" aria-label="Call Us" title="Call Now" style="background-color: var(--accent-orange) !important; display: flex !important; visibility: visible !important; opacity: 1 !important;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span class="float-tooltip">Call Us</span>
        </a>
    </div>

    <!-- Standalone Scroll to Top Button (Bottom right) -->
    <a href="#" class="float-btn scroll-top" id="scrollTopBtn" aria-label="Scroll Top" style="position: fixed !important; bottom: 25px !important; right: 20px !important; z-index: 2147483646 !important; display: none !important; background-color: var(--dark-navy) !important;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
        <span class="float-tooltip">Scroll Top</span>
    </a>
`;

// All 15 site pages
const files = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html', 'review.html',
  'topographical-survey.html', 'dgps-gnss-control.html', 'total-station-survey.html',
  'rtk-drone-mapping.html', 'lidar-3d-scanning.html', 'drone-photogrammetry.html',
  'road-highway.html', 'rail-metro.html', 'cad-gis-processing.html'
];

files.forEach(f => {
  const filePath = path.join(rootDir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  // Cache busting query update v=20261007_2
  content = content.replace(/style\.css\?v=[^"'\s]+/g, 'style.css?v=20261007_2');
  content = content.replace(/responsive\.css\?v=[^"'\s]+/g, 'responsive.css?v=20261007_2');

  // Replace head floating style
  content = content.replace(
    /\s*<!-- Persistent Floating Actions Styles[^\n]*-->\s*<style>[\s\S]*?<\/style>/s,
    '\n' + headFloatingStyle
  );

  // If page didn't have headFloatingStyle, insert before </head>
  if (!content.includes('Persistent Floating Actions Styles')) {
    content = content.replace('</head>', headFloatingStyle + '\n</head>');
  }

  // Remove ANY existing floating actions & standalone scrollTopBtn anywhere in the file
  content = content.replace(
    /\s*(?:<!--\s*Floating Quick Actions[^\n]*\s*-->\s*)?<div class="floating-actions"[\s\S]*?<\/div>/g,
    ''
  );
  content = content.replace(
    /\s*(?:<!--\s*Standalone Scroll to Top Button[^\n]*\s*-->\s*)?<a href="#" class="float-btn scroll-top" id="scrollTopBtn"[\s\S]*?<\/a>/g,
    ''
  );

  // Re-insert right after <body>
  content = content.replace('<body>', '<body>' + bodyFloatingHtml);

  // For service pages: add class="service-spec-grid" to the grid container
  content = content.replace(
    /<div style="display: grid; grid-template-columns: 1fr 1\.15fr; gap: 40px;/g,
    '<div class="service-spec-grid" style="display: grid; grid-template-columns: 1fr 1.15fr; gap: 40px;'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${f}`);
});

console.log('All files successfully updated with unified persistent floating actions and responsive grid!');
