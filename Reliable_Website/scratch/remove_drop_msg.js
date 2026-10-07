const fs = require('fs');

let content = fs.readFileSync('contact.html', 'utf8');

// Remove Drop a Message button
content = content.replace(
  /\s*<div>\s*<a href="#form-section" class="hero-contact-cta">[\s\S]*?<\/a>\s*<\/div>/,
  ''
);

// Remove the hero-contact-cta style block and #form-section div
content = content.replace(
  /\s*<style>\s*\.hero-contact-cta\s*\{[\s\S]*?<\/style>\s*<!-- Add ID for anchor link to form -->\s*<div id="form-section"><\/div>/,
  ''
);

fs.writeFileSync('contact.html', content, 'utf8');
console.log('Successfully removed Drop a Message from contact.html');
