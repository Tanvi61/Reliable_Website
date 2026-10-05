const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../css/style.css');
let content = fs.readFileSync(cssPath, 'utf8');

const regex = /\/\*\s*=+\s*CUSTOM CURSOR\s*=+\s*\*\/[\s\S]*?@media \(max-width: 768px\) \{ \.cursor-dot, \.cursor-outline \{ display: none !important; \} \}/;

const replacement = `/* Interactive standard cursor pointers */
a, button, .btn, .nav-btn, summary, [role="button"], .tab-btn, .industry-card, .tech-item, .service-card, .faq-header, .faq-item summary {
  cursor: pointer;
}`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(cssPath, content, 'utf8');
    console.log('Successfully replaced custom cursor styles in style.css');
} else {
    console.log('Regex did not match directly, checking lines...');
}
