const fs = require('fs');

const files = ['contact.html', 'index.html', 'about.html', 'services.html'];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const m = content.match(/<div class="floating-actions"[\s\S]*?<\/div>/);
  console.log('=== ' + f + ' ===');
  console.log(m ? m[0] : 'NONE');
});
