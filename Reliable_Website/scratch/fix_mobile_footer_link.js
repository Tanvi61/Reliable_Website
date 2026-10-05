const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');

// 1. Update css/style.css
const styleCssPath = path.join(dir, 'css/style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

const targetStyleRule = `.copyright-info p,
.copyright-info strong {
  color: var(--accent-orange) !important;
  margin-bottom: 0;
}`;

const replacementStyleRule = `.copyright-info p,
.copyright-info strong {
  color: var(--accent-orange) !important;
  margin-bottom: 0;
}

.copyright-info a,
.copyright-info strong a,
.footer-bottom a[href*="mindaxisinnovation"],
.footer .copyright-info a,
.footer-dev-link,
.mindaxis-footer-link {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  text-decoration: none !important;
  display: inline-block;
}

.copyright-info a:hover,
.footer .copyright-info a:hover,
.footer-bottom a[href*="mindaxisinnovation"]:hover,
.mindaxis-footer-link:hover {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  text-decoration: underline !important;
}`;

if (styleCss.includes(targetStyleRule)) {
    styleCss = styleCss.replace(targetStyleRule, replacementStyleRule);
    fs.writeFileSync(styleCssPath, styleCss, 'utf8');
    console.log('Updated css/style.css');
} else {
    console.log('Target rule in style.css not matched directly, appending...');
    styleCss += '\n' + replacementStyleRule + '\n';
    fs.writeFileSync(styleCssPath, styleCss, 'utf8');
}

// 2. Update css/responsive.css
const respCssPath = path.join(dir, 'css/responsive.css');
let respCss = fs.readFileSync(respCssPath, 'utf8');

const mobileRule = `
/* Mobile & Responsive Footer MindAxis Link */
@media (max-width: 1200px), (max-width: 991px), (max-width: 768px), (max-width: 576px) {
  .copyright-info a,
  .copyright-info strong a,
  .footer-bottom a[href*="mindaxisinnovation"],
  .footer .copyright-info a,
  .footer-dev-link,
  .mindaxis-footer-link {
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
    text-decoration: none !important;
  }
}
`;

if (!respCss.includes('Mobile & Responsive Footer MindAxis Link')) {
    respCss += '\n' + mobileRule + '\n';
    fs.writeFileSync(respCssPath, respCss, 'utf8');
    console.log('Updated css/responsive.css');
}

// 3. Update all HTML files with class and -webkit-text-fill-color
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Replace any variations of the mindaxis link
    const updatedHtml = html.replace(
        /<a\s+href="https:\/\/mindaxisinnovation\.com\/"[^>]*>([\s\S]*?)<\/a>/gi,
        '<a href="https://mindaxisinnovation.com/" target="_blank" rel="noopener" class="mindaxis-footer-link" style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; text-decoration: none !important;">$1</a>'
    );
    
    if (updatedHtml !== html) {
        fs.writeFileSync(filePath, updatedHtml, 'utf8');
        console.log(`Updated MindAxis footer link in ${file}`);
    }
});
