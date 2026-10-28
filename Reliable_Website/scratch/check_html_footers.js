const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');
files.forEach(f => {
    const html = fs.readFileSync(f, 'utf8');
    const cols = [];
    if (html.includes('footer-brand')) cols.push('brand');
    if (html.includes('Quick Links')) cols.push('quick-links');
    if (html.includes('Our Services')) cols.push('services');
    if (html.includes('footer-col-map')) cols.push('map');
    console.log(f, cols);
});
