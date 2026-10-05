const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../about.html');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<!-- Grid background element -->\s*<div\s+style="position: absolute; top: -15px; left: -15px; width: 60%; height: 60%; background-image: radial-gradient\(#123F68 1\.5px, transparent 1\.5px\); background-size: 15px 15px; opacity: 0\.15; z-index: 0;">\s*<\/div>/;

if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully removed dotted background element from Who We Are section in about.html');
} else {
    console.log('Regex did not match, please inspect content');
}
