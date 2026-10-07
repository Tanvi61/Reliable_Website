const fs = require('fs');
const path = require('path');

const baseDir = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update css/responsive.css
const respCssPath = path.join(baseDir, 'css/responsive.css');
let respCss = fs.readFileSync(respCssPath, 'utf8');

// Replace top: 55% with top: 50% in responsive.css
respCss = respCss.replace(/top:\s*55%\s*!important;/g, 'top: 50% !important;');
fs.writeFileSync(respCssPath, respCss, 'utf8');
console.log('Updated css/responsive.css to top: 50%');

// 2. Update all 16 HTML files
const htmlFiles = fs.readdirSync(baseDir).filter(f => f.endsWith('.html') && f !== 'hero-test.html');
let updatedCount = 0;

const inlineScriptTag = `
    <script>
    (function(){
      function alignFloatingWidget(){
        var el = document.querySelector('.floating-actions');
        if (!el) return;
        var isMobile = window.innerWidth <= 1024;
        el.style.setProperty('position', 'fixed', 'important');
        el.style.setProperty('bottom', 'auto', 'important');
        el.style.setProperty('transform', 'translateY(-50%)', 'important');
        el.style.setProperty('-webkit-transform', 'translateY(-50%)', 'important');
        el.style.setProperty('z-index', '2147483647', 'important');
        el.style.setProperty('display', 'flex', 'important');
        el.style.setProperty('flex-direction', 'column', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
        el.style.setProperty('opacity', '1', 'important');
        if (isMobile) {
          el.style.setProperty('top', '50%', 'important');
          el.style.setProperty('right', '16px', 'important');
          el.style.setProperty('gap', '10px', 'important');
        } else {
          el.style.setProperty('top', '60%', 'important');
          el.style.setProperty('right', '18px', 'important');
          el.style.setProperty('gap', '12px', 'important');
        }
      }
      alignFloatingWidget();
      window.addEventListener('resize', alignFloatingWidget);
      window.addEventListener('load', alignFloatingWidget);
    })();
    </script>`;

for (const file of htmlFiles) {
  const filePath = path.join(baseDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // A. In head style block: change top: 55% to top: 50%
  if (html.includes('top: 55% !important;')) {
    html = html.replace(/top:\s*55%\s*!important;/g, 'top: 50% !important;');
    changed = true;
  }

  // B. Ensure .floating-actions has inline style
  // Replace <div class="floating-actions"> or existing inline style
  const oldDivRegex = /<div class="floating-actions"([^>]*)>/;
  const newDivTag = `<div class="floating-actions" style="position: fixed !important; right: 16px !important; top: 50% !important; bottom: auto !important; transform: translateY(-50%) !important; -webkit-transform: translateY(-50%) !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; gap: 10px !important; visibility: visible !important; opacity: 1 !important;">`;
  
  if (oldDivRegex.test(html)) {
    html = html.replace(oldDivRegex, newDivTag);
    changed = true;
  }

  // C. Add inline script after </div> of floating-actions if not already present
  if (!html.includes('alignFloatingWidget')) {
    // Look for closing </div> of floating-actions followed by Standalone Scroll to Top Button
    const searchPattern = /<\/div>\s*\n\s*<!-- Standalone Scroll to Top Button/;
    if (searchPattern.test(html)) {
      html = html.replace(searchPattern, `</div>${inlineScriptTag}\n\n    <!-- Standalone Scroll to Top Button`);
      changed = true;
    }
  }

  // D. Bump cache query string ?v=20261007_9 -> ?v=20261007_10
  if (html.includes('?v=20261007_9')) {
    html = html.replace(/\?v=20261007_9/g, '?v=20261007_10');
    changed = true;
  } else if (html.includes('?v=20261007_8')) {
    html = html.replace(/\?v=20261007_8/g, '?v=20261007_10');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    updatedCount++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`Finished updating ${updatedCount} HTML files.`);
