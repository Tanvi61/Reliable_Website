const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');
files.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    html = html.replace(/header-footer\.css(\?v=[^"']*)?/g, 'header-footer.css?v=20261010_04');
    html = html.replace(/responsive\.css(\?v=[^"']*)?/g, 'responsive.css?v=20261010_04');
    html = html.replace(/style\.css(\?v=[^"']*)?/g, 'style.css?v=20261010_04');
    fs.writeFileSync(f, html, 'utf8');
});
console.log('Bumped css versions to 20261010_04 in ' + files.length + ' files');
