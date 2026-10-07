const fs = require('fs');

// 1. Update css/style.css
let styleCss = fs.readFileSync('css/style.css', 'utf8');

// Change overflow-x: hidden to overflow-x: clip on html and body
styleCss = styleCss.replace(
  /html\s*\{[^}]*overflow-x:\s*hidden;[^}]*\}/s,
  `html {
  scroll-behavior: smooth;
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  overflow-x: clip;
}`
);

styleCss = styleCss.replace(
  /body\s*\{[^}]*overflow-x:\s*hidden;[^}]*\}/s,
  `body {
  font-family: var(--font-main);
  background-color: var(--bg-white);
  color: var(--text-dark);
  line-height: 1.6;
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`
);

// Update .floating-actions block in css/style.css
const oldFloatBlockRegex = /\/\* ==========================================\s+FLOATING ACTION BUTTONS[\s\S]*?\.float-tooltip\s*\{/s;
const newFloatBlock = `/* ==========================================
   FLOATING ACTION BUTTONS (Persistent Global Widget)
========================================== */
.floating-actions {
  position: fixed !important;
  bottom: 25px !important;
  bottom: calc(25px + env(safe-area-inset-bottom, 0px)) !important;
  right: 25px !important;
  right: calc(25px + env(safe-area-inset-right, 0px)) !important;
  z-index: 9999999 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  pointer-events: auto !important;
  transform: translateZ(0) !important;
  -webkit-transform: translateZ(0) !important;
  will-change: transform;
}

.float-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
  position: relative;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  cursor: pointer;
  text-decoration: none;
}

.float-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
}

.float-btn.whatsapp {
  background-color: #25D366 !important;
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.float-btn.call {
  background-color: var(--accent-orange) !important;
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.float-btn.call:hover {
  background-color: #d96814 !important;
}

.float-tooltip {`;

if (oldFloatBlockRegex.test(styleCss)) {
  styleCss = styleCss.replace(oldFloatBlockRegex, newFloatBlock);
  console.log('Updated .floating-actions in css/style.css');
} else {
  console.log('WARNING: Could not match floating block in css/style.css');
}

fs.writeFileSync('css/style.css', styleCss, 'utf8');

// 2. Update css/responsive.css
let respCss = fs.readFileSync('css/responsive.css', 'utf8');

// Replace old .floating-actions inside 767px media query if present
respCss = respCss.replace(
  /\.floating-actions\s*\{\s*bottom:\s*16px;\s*right:\s*16px;\s*\}/s,
  `.floating-actions {
    position: fixed !important;
    bottom: 20px !important;
    bottom: calc(20px + env(safe-area-inset-bottom, 0px)) !important;
    right: 18px !important;
    right: calc(18px + env(safe-area-inset-right, 0px)) !important;
    z-index: 9999999 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    pointer-events: auto !important;
    transform: translateZ(0) !important;
    -webkit-transform: translateZ(0) !important;
  }`
);

// Add global responsive rule at bottom of css/responsive.css if not present
if (!respCss.includes('GLOBAL_FLOATING_FIX_APPLIED')) {
  respCss += `

/* GLOBAL_FLOATING_FIX_APPLIED: Persistent Floating Actions across all responsive viewports */
@media (max-width: 1024px) {
  .floating-actions {
    position: fixed !important;
    bottom: 20px !important;
    bottom: calc(20px + env(safe-area-inset-bottom, 0px)) !important;
    right: 18px !important;
    right: calc(18px + env(safe-area-inset-right, 0px)) !important;
    z-index: 9999999 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    pointer-events: auto !important;
    transform: translateZ(0) !important;
    -webkit-transform: translateZ(0) !important;
  }
  .float-btn {
    width: 48px !important;
    height: 48px !important;
  }
  .float-btn.whatsapp,
  .float-btn.call {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
}
`;
  console.log('Appended global responsive rule to css/responsive.css');
}

fs.writeFileSync('css/responsive.css', respCss, 'utf8');

// 3. Update all 15 HTML files
const files = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html', 'review.html',
  'topographical-survey.html', 'dgps-gnss-control.html', 'total-station-survey.html',
  'rtk-drone-mapping.html', 'lidar-3d-scanning.html', 'drone-photogrammetry.html',
  'road-highway.html', 'rail-metro.html', 'cad-gis-processing.html'
];

const standardizedFloatingHtml = `    <!-- ==========================================
       FLOATING ACTION BUTTONS (Persistent Widget)
    ========================================== -->
    <div class="floating-actions" style="position: fixed !important; bottom: 25px !important; right: 25px !important; z-index: 9999999 !important; display: flex !important; flex-direction: column !important; gap: 12px !important; pointer-events: auto !important; transform: translateZ(0) !important; -webkit-transform: translateZ(0) !important;">
        <a href="#" class="float-btn scroll-top" id="scrollTopBtn" style="display: none; background-color: var(--dark-navy); margin-bottom: 5px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
            <span class="float-tooltip">Scroll Top</span>
        </a>
        <a href="https://wa.me/919604648777" target="_blank" class="float-btn whatsapp" aria-label="WhatsApp" style="background-color: #25D366 !important; display: flex !important; visibility: visible !important; opacity: 1 !important;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.89-4.443 9.891-9.891.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.74-1.975zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span class="float-tooltip">WhatsApp Us</span>
        </a>
        <a href="tel:+919604648777" class="float-btn call" aria-label="Call Us" style="background-color: var(--accent-orange) !important; display: flex !important; visibility: visible !important; opacity: 1 !important;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span class="float-tooltip">Call Us</span>
        </a>
    </div>`;

const inlineFloatingStyle = `
    <!-- Persistent Floating Actions Styles -->
    <style>
      .floating-actions {
        position: fixed !important;
        bottom: 25px !important;
        bottom: calc(25px + env(safe-area-inset-bottom, 0px)) !important;
        right: 25px !important;
        right: calc(25px + env(safe-area-inset-right, 0px)) !important;
        z-index: 9999999 !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        pointer-events: auto !important;
        transform: translateZ(0) !important;
        -webkit-transform: translateZ(0) !important;
      }
      @media (max-width: 1024px) {
        .floating-actions {
          bottom: 20px !important;
          bottom: calc(20px + env(safe-area-inset-bottom, 0px)) !important;
          right: 18px !important;
          right: calc(18px + env(safe-area-inset-right, 0px)) !important;
          z-index: 9999999 !important;
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
    </style>
`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Cache busting query update v=20261006_6
  content = content.replace(/style\.css\?v=[^"'\s]+/g, 'style.css?v=20261006_6');
  content = content.replace(/responsive\.css\?v=[^"'\s]+/g, 'responsive.css?v=20261006_6');

  // Replace floating-actions container
  content = content.replace(
    /(?:<!--\s*={5,}\s*FLOATING ACTION BUTTONS[\s\S]*?-->\s*)?<div class="floating-actions"[\s\S]*?<\/div>/s,
    standardizedFloatingHtml
  );

  // Add inlineFloatingStyle before </head> if not already added
  if (!content.includes('Persistent Floating Actions Styles')) {
    content = content.replace('</head>', `${inlineFloatingStyle}\n</head>`);
  }

  fs.writeFileSync(f, content, 'utf8');
  console.log(`Updated ${f}`);
});
