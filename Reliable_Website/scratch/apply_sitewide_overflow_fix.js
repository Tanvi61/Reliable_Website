const fs = require('fs');
const path = require('path');

const baseDir = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update css/style.css: add overflow-x: clip and box-sizing to html and body
const styleCssPath = path.join(baseDir, 'css/style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

styleCss = styleCss.replace(
  /html\s*\{[\s\S]*?overflow-x:\s*hidden;\s*\n\s*max-width:\s*100vw;\s*\n\s*width:\s*100%;/g,
  `html {
  scroll-behavior: smooth;
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  overflow-x: hidden;
  overflow-x: clip;
  max-width: 100vw;
  width: 100%;
  box-sizing: border-box;`
);

styleCss = styleCss.replace(
  /body\s*\{[\s\S]*?overflow-x:\s*hidden;\s*\n\s*max-width:\s*100vw;\s*\n\s*width:\s*100%;/g,
  `body {
  font-family: var(--font-main);
  background-color: var(--bg-white);
  color: var(--text-dark);
  line-height: 1.6;
  overflow-x: hidden;
  overflow-x: clip;
  max-width: 100vw;
  width: 100%;
  box-sizing: border-box;`
);

fs.writeFileSync(styleCssPath, styleCss, 'utf8');
console.log('Updated css/style.css');

// 2. Update css/responsive.css
const respCssPath = path.join(baseDir, 'css/responsive.css');
let respCss = fs.readFileSync(respCssPath, 'utf8');

// Ensure html, body overflow-x: clip in responsive.css
if (!respCss.includes('overflow-x: clip')) {
  respCss = `/* Strict global mobile horizontal clipping */
html, body {
  overflow-x: hidden !important;
  overflow-x: clip !important;
  max-width: 100vw !important;
  width: 100% !important;
  box-sizing: border-box !important;
}
*, *::before, *::after {
  box-sizing: border-box;
}

` + respCss;
}

// Fix .nav-exact in @media (max-width: 1024px)
// Replace:
//   .nav-exact { 
//     top: 75px; 
//     left: 10px; 
//     right: 10px; 
//     width: calc(100% - 20px); 
//     height: 65px; 
//     padding: 0 15px; 
//     transition: background 0.3s ease;
//   }
respCss = respCss.replace(
  /\.nav-exact\s*\{\s*top:\s*75px;\s*left:\s*10px;\s*right:\s*10px;\s*width:\s*calc\(100%\s*-\s*20px\);\s*height:\s*65px;\s*padding:\s*0\s*15px;\s*transition:\s*background\s*0\.3s\s*ease;\s*\}/g,
  `.nav-exact { 
    top: 75px; 
    left: 10px !important; 
    right: 10px !important; 
    width: auto !important; 
    max-width: calc(100vw - 20px) !important; 
    height: 65px; 
    padding: 0 15px; 
    box-sizing: border-box !important;
    transition: background 0.3s ease;
  }`
);

// Fix .nav-exact .nav-links drawer when closed so it doesn't expand scrollWidth
respCss = respCss.replace(
  /\.nav-exact\s*\.nav-links\s*\{\s*position:\s*fixed\s*!important;\s*top:\s*0\s*!important;\s*bottom:\s*0\s*!important;\s*right:\s*-100%\s*!important;[\s\S]*?z-index:\s*1000000\s*!important;\s*pointer-events:\s*auto\s*!important;\s*\}/g,
  `.nav-exact .nav-links { 
    display: none !important;
    position: fixed !important; 
    top: 0 !important; 
    bottom: 0 !important; 
    right: 0 !important; 
    width: 300px !important; 
    max-width: 85vw !important; 
    height: 100vh !important; 
    height: 100dvh !important; 
    background: #ffffff !important; 
    padding: 90px 20px 120px !important; 
    box-shadow: -5px 0 25px rgba(8,43,76,0.18) !important; 
    border-radius: 0 !important; 
    text-align: center !important; 
    overflow-y: auto !important; 
    overflow-x: hidden !important; 
    z-index: 1000000 !important; 
    pointer-events: none !important;
    opacity: 0 !important;
    transform: translateX(100%) !important;
    transition: transform 0.35s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.35s ease !important;
  }`
);

respCss = respCss.replace(
  /\.nav-exact\s*\.nav-links\.active\s*\{\s*right:\s*0\s*!important;\s*\}/g,
  `.nav-exact .nav-links.active { 
    display: block !important; 
    pointer-events: auto !important;
    opacity: 1 !important;
    transform: translateX(0) !important;
  }`
);

// Add mobile responsive rules for mission-section and general sections
if (!respCss.includes('.mission-card-responsive-fix')) {
  respCss += `

/* Mobile Responsive Section Fixes to Prevent Horizontal Overflow */
@media (max-width: 768px) {
  .section {
    max-width: 100vw !important;
    overflow-x: clip !important;
    box-sizing: border-box !important;
  }
  .container {
    padding-left: 16px !important;
    padding-right: 16px !important;
    box-sizing: border-box !important;
  }
  .mission-card {
    padding: 20px 16px !important;
    gap: 15px !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
}
`;
}

fs.writeFileSync(respCssPath, respCss, 'utf8');
console.log('Updated css/responsive.css');

// 3. Update about.html Mission grid
const aboutPath = path.join(baseDir, 'about.html');
let aboutHtml = fs.readFileSync(aboutPath, 'utf8');

aboutHtml = aboutHtml.replace(
  'grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 60px;',
  'grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: clamp(30px, 4vw, 60px);'
);

aboutHtml = aboutHtml.replace(
  'width: 600px; height: 600px; background: radial-gradient(circle, rgba(244,123,32,0.15) 0%, transparent 70%); pointer-events: none;',
  'width: min(600px, 100vw); height: min(600px, 100vw); max-width: 100%; background: radial-gradient(circle, rgba(244,123,32,0.15) 0%, transparent 70%); pointer-events: none; overflow: hidden;'
);

fs.writeFileSync(aboutPath, aboutHtml, 'utf8');
console.log('Updated about.html Mission section');

// 4. Update all 16 HTML files in head style block and bump cache buster to ?v=20261007_12
const htmlFiles = fs.readdirSync(baseDir).filter(f => f.endsWith('.html') && f !== 'hero-test.html');

for (const file of htmlFiles) {
  const filePath = path.join(baseDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Add html, body overflow-x: clip in head style block
  if (!html.includes('overflow-x: clip')) {
    html = html.replace(
      '<!-- Strictly remove section label orange dot sitewide -->',
      `<!-- Strictly prevent horizontal overflow on all viewports -->
    <style>
      html, body {
        overflow-x: hidden !important;
        overflow-x: clip !important;
        max-width: 100vw !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      *, *::before, *::after {
        box-sizing: border-box !important;
      }
      @media (max-width: 1024px) {
        .nav-exact {
          left: 10px !important;
          right: 10px !important;
          width: auto !important;
          max-width: calc(100vw - 20px) !important;
          box-sizing: border-box !important;
        }
        .nav-exact .nav-links {
          display: none !important;
        }
        .nav-exact .nav-links.active {
          display: block !important;
        }
      }
    </style>
    <!-- Strictly remove section label orange dot sitewide -->`
    );
    changed = true;
  }

  // Bump cache query string ?v=20261007_11 -> ?v=20261007_12
  if (html.includes('?v=20261007_11')) {
    html = html.replace(/\?v=20261007_11/g, '?v=20261007_12');
    changed = true;
  } else if (html.includes('?v=20261007_10')) {
    html = html.replace(/\?v=20261007_10/g, '?v=20261007_12');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated HTML: ${file}`);
  }
}

console.log('All files updated successfully!');
