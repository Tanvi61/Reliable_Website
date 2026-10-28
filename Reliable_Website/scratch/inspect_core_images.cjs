const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';
['index.html', 'about.html', 'services.html'].forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const imgRegex = /<img\b([^>]*)>/gi;
    let match;
    console.log(`\n================= ${file} =================`);
    while ((match = imgRegex.exec(content)) !== null) {
        console.log(match[0].trim().replace(/\s+/g, ' '));
    }
});
