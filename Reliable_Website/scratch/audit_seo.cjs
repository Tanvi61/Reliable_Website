const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');

console.log('--- HTML FILES IN WORKSPACE ---');
console.log(htmlFiles);

console.log('\n--- AUDITING IMAGES ACROSS HTML FILES ---');
let totalImages = 0;
let missingAlt = 0;
let missingTitle = 0;

htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const imgRegex = /<img\b([^>]*)>/gi;
    let match;
    let fileImgs = 0;
    let fileMissingAlt = 0;
    let fileMissingTitle = 0;
    
    while ((match = imgRegex.exec(content)) !== null) {
        totalImages++;
        fileImgs++;
        const attrs = match[1];
        const hasAlt = /alt\s*=\s*["'][^"']*["']/i.test(attrs);
        const hasTitle = /title\s*=\s*["'][^"']*["']/i.test(attrs);
        
        if (!hasAlt) {
            missingAlt++;
            fileMissingAlt++;
        }
        if (!hasTitle) {
            missingTitle++;
            fileMissingTitle++;
        }
    }
    console.log(`${file}: ${fileImgs} images (Missing alt: ${fileMissingAlt}, Missing title: ${fileMissingTitle})`);
});

console.log(`\nTOTAL: ${totalImages} images. Missing alt: ${missingAlt}, Missing title: ${missingTitle}`);
