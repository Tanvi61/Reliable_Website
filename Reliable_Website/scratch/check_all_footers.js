const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const matches = content.match(/<div class="copyright-info"[\s\S]*?<\/div>/);
    if (matches) {
        console.log(`=== ${f} ===\n${matches[0]}\n`);
    } else {
        const altMatches = content.match(/Developed by[\s\S]*?<\/p>/);
        if (altMatches) {
            console.log(`=== ${f} (ALT) ===\n${altMatches[0]}\n`);
        }
    }
});
