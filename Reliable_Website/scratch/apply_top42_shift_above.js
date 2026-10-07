const fs = require('fs');
const path = require('path');

const baseDir = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update css/responsive.css
const respCssPath = path.join(baseDir, 'css/responsive.css');
let respCss = fs.readFileSync(respCssPath, 'utf8');
respCss = respCss.replace(/top:\s*(50%|55%)\s*!important;/g, 'top: 42% !important;');
fs.writeFileSync(respCssPath, respCss, 'utf8');
console.log('Updated css/responsive.css to top: 42%');

// 2. Update all 16 HTML files
const htmlFiles = fs.readdirSync(baseDir).filter(f => f.endsWith('.html') && f !== 'hero-test.html');
let updatedCount = 0;

for (const file of htmlFiles) {
  const filePath = path.join(baseDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // A. Replace top: 50% or top: 55% in head style block under max-width: 1024px
  // Specifically:
  // .floating-actions { ... top: 50% !important; ... }
  const mediaFloatRegex = /(@media\s*\(\s*max-width\s*:\s*1024px\s*\)\s*\{[\s\S]*?\.floating-actions\s*\{[\s\S]*?top:\s*)(50%|55%)(\s*!important;)/g;
  if (mediaFloatRegex.test(html)) {
    html = html.replace(mediaFloatRegex, '$142%$3');
    changed = true;
  }

  // B. Update inline style on <div class="floating-actions" ...>
  const divRegex = /<div class="floating-actions" style="([^"]*?)top:\s*(50%|55%)\s*!important;([^"]*?)">/g;
  if (divRegex.test(html)) {
    html = html.replace(divRegex, '<div class="floating-actions" style="$1top: 42% !important;$3">');
    changed = true;
  }

  // C. Update script helper
  if (html.includes("el.style.setProperty('top', '50%', 'important')")) {
    html = html.replace("el.style.setProperty('top', '50%', 'important')", "el.style.setProperty('top', '42%', 'important')");
    changed = true;
  }

  // D. Bump cache query string ?v=20261007_10 -> ?v=20261007_11
  if (html.includes('?v=20261007_10')) {
    html = html.replace(/\?v=20261007_10/g, '?v=20261007_11');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    updatedCount++;
    console.log(`Updated HTML: ${file}`);
  }
}

console.log(`Finished updating ${updatedCount} HTML files.`);
