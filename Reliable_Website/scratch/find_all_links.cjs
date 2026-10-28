const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');

const linksSet = new Set();
const fileLinks = {};

htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const hrefRegex = /href\s*=\s*["']([^"']+)["']/gi;
    let match;
    fileLinks[file] = [];
    while ((match = hrefRegex.exec(content)) !== null) {
        const link = match[1];
        if (link.endsWith('.html') || link.includes('.html')) {
            linksSet.add(link);
            fileLinks[file].push(link);
        }
    }
});

console.log('--- ALL UNIQUE .html LINKS FOUND IN HTML FILES ---');
console.log(Array.from(linksSet).sort());
