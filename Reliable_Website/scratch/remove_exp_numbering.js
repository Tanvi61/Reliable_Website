const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../about.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove exp-counter HTML element
content = content.replace(
    /<div class="exp-counter" id="exp-counter">01 \/ 07<\/div>/g,
    ''
);

// 2. Remove reference in JS
content = content.replace(
    /document\.getElementById\('exp-counter'\)\.innerText = '0' \+ \(currentExpIndex \+ 1\) \+ ' \/ 0' \+ expData\.length;/g,
    '// counter removed'
);

// 3. Add display: none in style for .exp-counter
content = content.replace(
    /\.exp-counter \{[^\}]+\}/g,
    '.exp-counter { display: none !important; }'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully removed numbering from expertise section in about.html');
