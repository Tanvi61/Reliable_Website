const fs = require('fs');
const path = require('path');

const ROOT = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update css/header-footer.css
const hfPath = path.join(ROOT, 'css/header-footer.css');
let hfContent = fs.readFileSync(hfPath, 'utf8');
let normHf = hfContent.replace(/\r\n/g, '\n');

const oldHfSnippet = `/* Footer Bottom Bar */
.footer-bottom {
  padding-top: 40px;
  padding-bottom: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.85rem;
  color: #000000;
}

.copyright-info p,
.copyright-info strong {
  color: var(--accent-orange, #f47b20) !important;
  margin-bottom: 0;
}`;

const newHfSnippet = `/* Footer Bottom Bar - Centered cleanly on the dark blue artwork bar */
.footer-bottom {
  padding-top: 30px;
  padding-bottom: 25px;
  border-top: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.85rem;
  color: #000000;
  position: relative;
  z-index: 5;
}

.copyright-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  text-align: center;
  transform: translateY(26px);
}

.copyright-info p,
.copyright-info strong {
  color: var(--accent-orange, #f47b20) !important;
  margin-bottom: 0;
}`;

if (normHf.includes(oldHfSnippet)) {
    normHf = normHf.replace(oldHfSnippet, newHfSnippet);
    fs.writeFileSync(hfPath, normHf.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Successfully updated css/header-footer.css');
} else {
    console.error('Failed to match old snippet in css/header-footer.css');
}

// 2. Update css/style.css
const stylePath = path.join(ROOT, 'css/style.css');
let styleContent = fs.readFileSync(stylePath, 'utf8');
let normStyle = styleContent.replace(/\r\n/g, '\n');

const oldStyleSnippet = `.footer-bottom {
  padding-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.85rem;
  color: #000000;
}

.copyright-info p,
.copyright-info strong {
  color: var(--accent-orange) !important;
  margin-bottom: 0;
}`;

const newStyleSnippet = `.footer-bottom {
  padding-top: 30px;
  padding-bottom: 25px;
  border-top: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.85rem;
  color: #000000;
  position: relative;
  z-index: 5;
}

.copyright-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  text-align: center;
  transform: translateY(26px);
}

.copyright-info p,
.copyright-info strong {
  color: var(--accent-orange) !important;
  margin-bottom: 0;
}`;

if (normStyle.includes(oldStyleSnippet)) {
    normStyle = normStyle.replace(oldStyleSnippet, newStyleSnippet);
    fs.writeFileSync(stylePath, normStyle.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Successfully updated css/style.css');
} else {
    console.error('Failed to match old snippet in css/style.css');
}

// 3. Update css/responsive.css (reset transform on mobile)
const respPath = path.join(ROOT, 'css/responsive.css');
let respContent = fs.readFileSync(respPath, 'utf8');
let normResp = respContent.replace(/\r\n/g, '\n');

const oldRespBottom = `  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }`;

const newRespBottom = `  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
    border-top: none !important;
  }
  .copyright-info {
    transform: translateY(0) !important;
  }`;

if (normResp.includes(oldRespBottom)) {
    normResp = normResp.replace(oldRespBottom, newRespBottom);
    fs.writeFileSync(respPath, normResp.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Successfully updated css/responsive.css');
} else {
    console.error('Failed to match old footer-bottom in css/responsive.css');
}

// 4. Bump cache busters across all html files
const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
for (const f of htmlFiles) {
    const p = path.join(ROOT, f);
    let html = fs.readFileSync(p, 'utf8');
    html = html.replace(/header-footer\.css\?v=[a-zA-Z0-9_]+/g, 'header-footer.css?v=20261010_10');
    html = html.replace(/responsive\.css\?v=[a-zA-Z0-9_]+/g, 'responsive.css?v=20261010_10');
    html = html.replace(/style\.css\?v=[a-zA-Z0-9_]+/g, 'style.css?v=20261010_10');
    html = html.replace(/script\.js\?v=[a-zA-Z0-9_]+/g, 'script.js?v=20261010_10');
    fs.writeFileSync(p, html, 'utf8');
}
console.log(`Updated cache busters in ${htmlFiles.length} HTML files`);
