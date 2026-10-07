const fs = require('fs');
['index.html', 'about.html', 'contact.html', 'topographical-survey.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const footerStart = c.indexOf('<footer');
  const footerEnd = c.indexOf('</footer>');
  const footer = c.substring(footerStart, footerEnd);
  const lines = footer.split('\n');
  console.log('=== ' + f + ' ===');
  lines.forEach(l => {
    if (l.includes('wa.me') || l.includes('WhatsApp')) console.log(l.trim());
  });
});
