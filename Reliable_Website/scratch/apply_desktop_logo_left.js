const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update css/style.css
const styleCssPath = path.join(rootDir, 'css', 'style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

const targetStyleCss = `.footer-brand img,
.footer-brand .footer-logo-img,
.footer-logo-img {
  height: 100px;
  width: auto;
  display: block;
  margin: 0 auto 15px auto !important;
  align-self: center !important;
  object-fit: contain;
}`;

const newStyleCss = `.footer-brand img,
.footer-brand .footer-logo-img,
.footer-logo-img {
  height: 100px;
  width: auto;
  display: block;
  margin: 0 0 15px 0 !important;
  align-self: flex-start !important;
  object-fit: contain;
}`;

if (styleCss.replace(/\r\n/g, '\n').includes(targetStyleCss.replace(/\r\n/g, '\n'))) {
  // Use regex to be newline-agnostic
  styleCss = styleCss.replace(
    /\.footer-brand img,\r?\n\.footer-brand \.footer-logo-img,\r?\n\.footer-logo-img\s*\{[\s\S]*?margin:\s*0 auto 15px auto\s*!important;\r?\n\s*align-self:\s*center\s*!important;[\s\S]*?\}/,
    newStyleCss
  );
  fs.writeFileSync(styleCssPath, styleCss, 'utf8');
  console.log('Updated css/style.css: Desktop footer logo set to align-self: flex-start, margin: 0 0 15px 0');
} else {
  console.log('style.css target pattern not found directly, checking regex...');
  styleCss = styleCss.replace(
    /(\.footer-logo-img\s*\{[\s\S]*?margin:\s*)0 auto 15px auto(\s*!important;[\s\S]*?align-self:\s*)center(\s*!important;)/,
    '$10 0 15px 0$2flex-start$3'
  );
  fs.writeFileSync(styleCssPath, styleCss, 'utf8');
  console.log('Updated css/style.css via regex fallback');
}

// 2. Update css/responsive.css: Ensure mobile/tablet keeps logo centered
const responsiveCssPath = path.join(rootDir, 'css', 'responsive.css');
let responsiveCss = fs.readFileSync(responsiveCssPath, 'utf8');

// If there's an unscoped .footer-brand img rule in responsive.css, scope it to max-width: 1024px
const unscopedLogoRegex = /(\.footer-brand img,\r?\n\s*\.footer-brand \.footer-logo-img,\r?\n\s*\.footer-logo-img\s*\{\r?\n\s*margin:\s*0 auto 15px auto\s*!important;\r?\n\s*align-self:\s*center\s*!important;\r?\n\s*display:\s*block\s*!important;\r?\n\s*\})/g;

if (unscopedLogoRegex.test(responsiveCss)) {
  responsiveCss = responsiveCss.replace(
    unscopedLogoRegex,
    `@media (max-width: 1024px) {\n  .footer-brand img,\n  .footer-brand .footer-logo-img,\n  .footer-logo-img {\n    margin: 0 auto 15px auto !important;\n    align-self: center !important;\n    display: block !important;\n  }\n}`
  );
  fs.writeFileSync(responsiveCssPath, responsiveCss, 'utf8');
  console.log('Updated css/responsive.css: Scoped mobile/tablet centered logo to @media (max-width: 1024px)');
} else {
  console.log('Responsive unscoped logo regex did not match directly, checking if already scoped...');
}

// 3. Update all HTML files: Remove inline margin: 0 auto & align-self: center from img.footer-logo-img
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace inline style on footer-logo-img
  const inlineImgRegex = /(<img\s+src=["']assets\/logo\/logo-transparent\.png["']\s+alt=["'][^"']*["']\s+class=["']footer-logo-img["'])\s+style=["'][^"']*["']/g;
  if (inlineImgRegex.test(content)) {
    content = content.replace(inlineImgRegex, '$1 style="height: 100px; width: auto; display: block;"');
    changed = true;
  }

  // Bump cache query to v20261007_5
  if (content.includes('style.css?v=20261007_4')) {
    content = content.replace(/style\.css\?v=20261007_4/g, 'style.css?v=20261007_5');
    changed = true;
  }
  if (content.includes('responsive.css?v=20261007_4')) {
    content = content.replace(/responsive\.css\?v=20261007_4/g, 'responsive.css?v=20261007_5');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('All changes applied successfully.');
