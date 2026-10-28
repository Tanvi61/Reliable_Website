const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

// Let's inspect the exact lines in about.html around exp-slider
console.log('Read about.html successfully, length:', html.length);
