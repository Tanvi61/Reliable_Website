const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /(?:url\(['"]?|href=["']|src=["'])([^'")\s>]+)['")]?/gi;
    let match;
    const found = [];
    while ((match = regex.exec(content)) !== null) {
        const u = match[1];
        if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:') || u.startsWith('tel:') || u.startsWith('mailto:') || u.startsWith('#')) continue;
        if (u.includes('_') || u.includes('%20') || /[A-Z]/.test(path.basename(u))) {
            found.push(u);
        }
    }
    return found;
}

const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');
const cssFiles = fs.readdirSync(path.join(dir, 'css')).map(f => path.join('css', f));
const jsFiles = fs.readdirSync(path.join(dir, 'js')).map(f => path.join('js', f));

const allFiles = [...htmlFiles, ...cssFiles, ...jsFiles];

console.log('--- SCANNING ALL SITE FILES FOR UNDERSCORES, SPACES, UPPERCASE IN URLS ---');
allFiles.forEach(rel => {
    const full = path.join(dir, rel);
    if (fs.existsSync(full)) {
        const matches = scanFile(full);
        if (matches.length > 0) {
            console.log(`\n${rel}:`);
            matches.forEach(m => console.log('  ', m));
        }
    }
});
