const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Check if hero actions exist
const heroActionsRegex = /<div class="hero-actions anim-actions">[\s\S]*?<\/div>/;
console.log('Hero actions found:', heroActionsRegex.test(html));

// 2. Check footer
console.log('Footer found:', html.includes('<footer class="footer">'));
