const fs = require('fs');
const path = require('path');

const rootDir = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update css/style.css
const styleCssPath = path.join(rootDir, 'css/style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

const oldStyleFloat = /\.floating-actions\s*\{[\s\S]*?pointer-events:\s*auto\s*!important;\s*visibility:\s*visible\s*!important;\s*opacity:\s*1\s*!important;\s*\}/;
const newStyleFloat = `.floating-actions {
  position: fixed !important;
  right: 18px !important;
  right: calc(18px + env(safe-area-inset-right, 0px)) !important;
  bottom: 90px !important;
  bottom: calc(90px + env(safe-area-inset-bottom, 0px)) !important;
  top: auto !important;
  transform: none !important;
  -webkit-transform: none !important;
  z-index: 2147483647 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  pointer-events: auto !important;
  visibility: visible !important;
  opacity: 1 !important;
}`;

if (oldStyleFloat.test(styleCss)) {
    styleCss = styleCss.replace(oldStyleFloat, newStyleFloat);
    fs.writeFileSync(styleCssPath, styleCss, 'utf8');
    console.log('Updated css/style.css');
} else {
    console.log('style.css pattern did not match directly, checking fallback...');
    styleCss = styleCss.replace(/top:\s*60%\s*!important;\s*bottom:\s*auto\s*!important;\s*transform:\s*translateY\(-50%\)\s*!important;\s*-webkit-transform:\s*translateY\(-50%\)\s*!important;/g,
        'bottom: 90px !important; bottom: calc(90px + env(safe-area-inset-bottom, 0px)) !important; top: auto !important; transform: none !important; -webkit-transform: none !important;');
    fs.writeFileSync(styleCssPath, styleCss, 'utf8');
    console.log('Updated css/style.css with fallback');
}

// 2. Update css/responsive.css
const respCssPath = path.join(rootDir, 'css/responsive.css');
let respCss = fs.readFileSync(respCssPath, 'utf8');
respCss = respCss.replace(/top:\s*(42%|50%|55%|60%)\s*!important;\s*bottom:\s*auto\s*!important;\s*transform:\s*translateY\(-50%\)\s*!important;\s*-webkit-transform:\s*translateY\(-50%\)\s*!important;/g,
    'bottom: 85px !important; bottom: calc(85px + env(safe-area-inset-bottom, 0px)) !important; top: auto !important; transform: none !important; -webkit-transform: none !important;');
fs.writeFileSync(respCssPath, respCss, 'utf8');
console.log('Updated css/responsive.css');

// 3. Update all HTML files
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && f !== 'hero-test.html');
let htmlUpdated = 0;

for (const file of htmlFiles) {
    const filePath = path.join(rootDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // A. Replace top: 60% or 42% or 50% in head styles
    html = html.replace(/top:\s*(?:42%|50%|55%|60%)\s*!important;\s*bottom:\s*auto\s*!important;\s*transform:\s*translateY\(-50%\)\s*!important;\s*-webkit-transform:\s*translateY\(-50%\)\s*!important;/g,
        'bottom: 85px !important; bottom: calc(85px + env(safe-area-inset-bottom, 0px)) !important; top: auto !important; transform: none !important; -webkit-transform: none !important;');

    // B. Replace inline style on <div class="floating-actions" ...>
    html = html.replace(/<div class="floating-actions" style="[^"]*">/g,
        '<div class="floating-actions" style="position: fixed !important; right: 16px !important; bottom: 85px !important; top: auto !important; transform: none !important; -webkit-transform: none !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; gap: 10px !important; visibility: visible !important; opacity: 1 !important;">');

    // C. Replace alignFloatingWidget() script function
    const oldAlignRegex = /function alignFloatingWidget\(\)\{[\s\S]*?window\.addEventListener\('load', alignFloatingWidget\);[\s\S]*?\}\)\(\);/;
    const newAlign = `function alignFloatingWidget(){
        var el = document.querySelector('.floating-actions');
        if (!el) return;
        var isMobile = window.innerWidth <= 1024;
        el.style.setProperty('position', 'fixed', 'important');
        el.style.setProperty('bottom', isMobile ? '85px' : '90px', 'important');
        el.style.setProperty('top', 'auto', 'important');
        el.style.setProperty('transform', 'none', 'important');
        el.style.setProperty('-webkit-transform', 'none', 'important');
        el.style.setProperty('z-index', '2147483647', 'important');
        el.style.setProperty('display', 'flex', 'important');
        el.style.setProperty('flex-direction', 'column', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('right', isMobile ? '16px' : '18px', 'important');
        el.style.setProperty('gap', isMobile ? '10px' : '12px', 'important');
      }
      alignFloatingWidget();
      window.addEventListener('resize', alignFloatingWidget);
      window.addEventListener('load', alignFloatingWidget);
    })();`;

    if (oldAlignRegex.test(html)) {
        html = html.replace(oldAlignRegex, newAlign);
    }

    // D. Cache buster bump to v=20261010_06
    html = html.replace(/\?v=20261010_0[0-5]/g, '?v=20261010_06');
    html = html.replace(/\?v=20261008_\d+/g, '?v=20261010_06');

    fs.writeFileSync(filePath, html, 'utf8');
    htmlUpdated++;
}

console.log(`Updated ${htmlUpdated} HTML files with shifted-below floating buttons.`);
