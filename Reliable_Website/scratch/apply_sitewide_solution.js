const fs = require('fs');

// 1. Update js/script.js for scrollTopBtn
let scriptJs = fs.readFileSync('js/script.js', 'utf8');
scriptJs = scriptJs.replace(
  /const scrollTopBtn = document\.getElementById\('scrollTopBtn'\);[\s\S]*?scrollTopBtn\.addEventListener\('click'/,
  `const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.setProperty('display', 'flex', 'important');
            } else {
                scrollTopBtn.style.setProperty('display', 'none', 'important');
            }
        });
        scrollTopBtn.addEventListener('click'`
);
fs.writeFileSync('js/script.js', scriptJs, 'utf8');
console.log('Updated js/script.js');

// 2. Persistent Floating Actions HTML to place right after <body>
const persistentFloatingHtml = `
    <!-- ==========================================
       PERSISTENT FLOATING ACTION BUTTONS
    ========================================== -->
    <div class="floating-actions" style="position: fixed !important; bottom: 25px !important; right: 25px !important; z-index: 9999999 !important; display: flex !important; flex-direction: column !important; gap: 12px !important; pointer-events: auto !important; transform: translateZ(0) !important; -webkit-transform: translateZ(0) !important;">
        <a href="#" class="float-btn scroll-top" id="scrollTopBtn" style="display: none !important; background-color: var(--dark-navy); margin-bottom: 5px;">
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
    </div>
`;

// 3. Nav Quick Actions HTML for header
const navQuickActionsHtml = `        <!-- Top Header Quick Action Icons -->
        <div class="nav-quick-actions">
            <a href="https://wa.me/919604648777" target="_blank" rel="noopener" class="nav-quick-btn whatsapp" aria-label="WhatsApp" title="Chat on WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.89-4.443 9.891-9.891.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.74-1.975zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
            <a href="tel:+919604648777" class="nav-quick-btn call" aria-label="Call Us" title="Call Now">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
        </div>\n`;

const files = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html', 'review.html',
  'topographical-survey.html', 'dgps-gnss-control.html', 'total-station-survey.html',
  'rtk-drone-mapping.html', 'lidar-3d-scanning.html', 'drone-photogrammetry.html',
  'road-highway.html', 'rail-metro.html', 'cad-gis-processing.html'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Cache busting query update v=20261006_7
  content = content.replace(/style\.css\?v=[^"'\s]+/g, 'style.css?v=20261006_7');
  content = content.replace(/responsive\.css\?v=[^"'\s]+/g, 'responsive.css?v=20261006_7');

  // 1. Remove ANY existing floating-actions block from after footer or end of body
  content = content.replace(
    /\s*(?:<!--\s*={5,}\s*(?:FLOATING ACTION BUTTONS|PERSISTENT FLOATING ACTION BUTTONS)[\s\S]*?-->\s*)?<div class="floating-actions"[\s\S]*?<\/div>\s*(?=\s*<!-- Script -->|<\/body>)/s,
    '\n'
  );

  // Also remove if placed after <body> previously
  content = content.replace(
    /(<body>)\s*(?:<!--\s*={5,}\s*(?:FLOATING ACTION BUTTONS|PERSISTENT FLOATING ACTION BUTTONS)[\s\S]*?-->\s*)?<div class="floating-actions"[\s\S]*?<\/div>/s,
    '$1'
  );

  // 2. Insert fresh standardized persistentFloatingHtml right after <body>
  content = content.replace('<body>', '<body>' + persistentFloatingHtml);

  // 3. Remove existing .nav-quick-actions if present
  content = content.replace(
    /\s*<!-- Top Header Quick Action Icons -->\s*<div class="nav-quick-actions">[\s\S]*?<\/div>\s*(?=\s*<div class="hamburger-exact">)/s,
    '\n        '
  );

  // 4. Insert .nav-quick-actions right before <div class="hamburger-exact">
  content = content.replace(
    /(<div class="hamburger-exact">)/,
    navQuickActionsHtml + '        $1'
  );

  fs.writeFileSync(f, content, 'utf8');
  console.log(`Updated ${f}`);
});
