const fs = require('fs');
const path = require('path');

const baseDir = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update css/style.css: set #scrollTopBtn desktop right to 18px
const styleCssPath = path.join(baseDir, 'css/style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

styleCss = styleCss.replace(
  /(\.float-btn\.scroll-top,\s*\n#scrollTopBtn\.scroll-top,\s*\n#scrollTopBtn\s*\{[\s\S]*?right:\s*)20px(\s*!important;\s*\n\s*right:\s*calc\()20px/g,
  '$118px$218px'
);
fs.writeFileSync(styleCssPath, styleCss, 'utf8');
console.log('Updated css/style.css');

// 2. Update css/responsive.css:
const respCssPath = path.join(baseDir, 'css/responsive.css');
let respCss = fs.readFileSync(respCssPath, 'utf8');

// Update .floating-actions bottom to 83px in responsive.css
respCss = respCss.replace(/bottom:\s*85px\s*!important;\s*\n\s*bottom:\s*calc\(85px/g, 'bottom: 83px !important;\n    bottom: calc(83px');

// Add responsive rule for #scrollTopBtn in @media (max-width: 1024px)
if (!respCss.includes('.float-btn.scroll-top,\n  #scrollTopBtn')) {
  respCss = respCss.replace(
    /(@media\s*\(\s*max-width\s*:\s*1024px\s*\)\s*\{)/,
    `$1\n  .float-btn.scroll-top,\n  #scrollTopBtn.scroll-top,\n  #scrollTopBtn {\n    right: 16px !important;\n    right: calc(16px + env(safe-area-inset-right, 0px)) !important;\n    bottom: 25px !important;\n    bottom: calc(25px + env(safe-area-inset-bottom, 0px)) !important;\n  }`
  );
}
fs.writeFileSync(respCssPath, respCss, 'utf8');
console.log('Updated css/responsive.css');

// 3. Update all 16 HTML files
const htmlFiles = fs.readdirSync(baseDir).filter(f => f.endsWith('.html'));
let updatedCount = 0;

for (const file of htmlFiles) {
  const filePath = path.join(baseDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // A. In head style block, update #scrollTopBtn
  // Replace:
  //   .float-btn.scroll-top,
  //   #scrollTopBtn.scroll-top,
  //   #scrollTopBtn {
  //     position: fixed !important;
  //     bottom: 25px !important;
  //     bottom: calc(25px + env(safe-area-inset-bottom, 0px)) !important;
  //     right: 20px !important;
  //     right: calc(20px + env(safe-area-inset-right, 0px)) !important;
  //     z-index: 2147483646 !important;
  //     background-color: var(--dark-navy) !important;
  //   }
  // With:
  //   .float-btn.scroll-top,
  //   #scrollTopBtn.scroll-top,
  //   #scrollTopBtn {
  //     position: fixed !important;
  //     bottom: 25px !important;
  //     bottom: calc(25px + env(safe-area-inset-bottom, 0px)) !important;
  //     right: 18px !important;
  //     right: calc(18px + env(safe-area-inset-right, 0px)) !important;
  //     z-index: 2147483646 !important;
  //     background-color: var(--dark-navy) !important;
  //   }
  const oldHeadScrollRegex = /\.float-btn\.scroll-top,\s*\n\s*#scrollTopBtn\.scroll-top,\s*\n\s*#scrollTopBtn\s*\{[\s\S]*?right:\s*20px\s*!important;\s*\n\s*right:\s*calc\(20px\s*\+\s*env\(safe-area-inset-right,\s*0px\)\)\s*!important;[\s\S]*?\}/g;

  const newHeadScroll = `.float-btn.scroll-top,
      #scrollTopBtn.scroll-top,
      #scrollTopBtn {
        position: fixed !important;
        bottom: 25px !important;
        bottom: calc(25px + env(safe-area-inset-bottom, 0px)) !important;
        right: 18px !important;
        right: calc(18px + env(safe-area-inset-right, 0px)) !important;
        z-index: 2147483646 !important;
        background-color: var(--dark-navy) !important;
      }`;

  if (oldHeadScrollRegex.test(html)) {
    html = html.replace(oldHeadScrollRegex, newHeadScroll);
    changed = true;
  }

  // B. In head style block under @media (max-width: 1024px), ensure #scrollTopBtn has right: 16px
  const oldMediaFloatBlock = /(@media\s*\(\s*max-width\s*:\s*1024px\s*\)\s*\{[\s\S]*?\.floating-actions\s*\{[\s\S]*?)(bottom:\s*85px\s*!important;\s*\n\s*bottom:\s*calc\(85px\s*\+\s*env\(safe-area-inset-bottom,\s*0px\)\)\s*!important;)/g;

  if (oldMediaFloatBlock.test(html)) {
    html = html.replace(oldMediaFloatBlock, (match, p1) => {
      return `${p1}bottom: 83px !important;\n          bottom: calc(83px + env(safe-area-inset-bottom, 0px)) !important;`;
    });
    changed = true;
  }

  // Add #scrollTopBtn to head @media (max-width: 1024px) if not present
  if (!html.includes('#scrollTopBtn {\n          right: 16px')) {
    html = html.replace(
      /(@media\s*\(\s*max-width\s*:\s*1024px\s*\)\s*\{\s*\n\s*\.floating-actions\s*\{)/,
      `@media (max-width: 1024px) {\n        .float-btn.scroll-top,\n        #scrollTopBtn.scroll-top,\n        #scrollTopBtn {\n          right: 16px !important;\n          right: calc(16px + env(safe-area-inset-right, 0px)) !important;\n          bottom: 25px !important;\n          bottom: calc(25px + env(safe-area-inset-bottom, 0px)) !important;\n        }\n        .floating-actions {`
    );
    changed = true;
  }

  // C. Remove inline right: 20px !important from #scrollTopBtn tag so media query can apply right: 16px on mobile
  const inlineScrollRegex = /<a href="#" class="float-btn scroll-top" id="scrollTopBtn" aria-label="Scroll Top" style="position: fixed !important; bottom: 25px !important; right: 20px !important; z-index: 2147483646 !important; display: none !important; background-color: var\(--dark-navy\) !important;">/g;

  const newInlineScroll = `<a href="#" class="float-btn scroll-top" id="scrollTopBtn" aria-label="Scroll Top" style="position: fixed !important; bottom: 25px !important; z-index: 2147483646 !important; display: none !important; background-color: var(--dark-navy) !important;">`;

  if (inlineScrollRegex.test(html)) {
    html = html.replace(inlineScrollRegex, newInlineScroll);
    changed = true;
  }

  // D. Bump cache query string ?v=20261007_6 -> ?v=20261007_7
  if (html.includes('?v=20261007_6')) {
    html = html.replace(/\?v=20261007_6/g, '?v=20261007_7');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    updatedCount++;
    console.log(`Updated HTML: ${file}`);
  }
}

console.log(`Updated ${updatedCount} HTML files successfully.`);
