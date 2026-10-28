const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

['index.html', 'about.html', 'land-survey-services.html'].forEach(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const lines = content.split('\n');
    console.log(`\n=================== ${f} ===================`);
    lines.forEach((line, idx) => {
        if (line.includes('<img')) {
            console.log(`Line ${idx + 1}: ${line.trim()}`);
        }
    });
});
