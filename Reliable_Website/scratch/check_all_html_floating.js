const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const bodyIdx = content.indexOf('<body');
  const footerIdx = content.indexOf('<footer');
  const floatMatches = [...content.matchAll(/class=["'][^"']*floating-actions[^"']*["']/g)];
  const scrollTopMatches = [...content.matchAll(/id=["']scrollTopBtn["']/g)];
  
  console.log(f, {
    floatCount: floatMatches.length,
    floatPositions: floatMatches.map(m => m.index > footerIdx ? 'AFTER_FOOTER' : (m.index > bodyIdx ? 'NEAR_BODY_START' : 'OTHER')),
    scrollTopCount: scrollTopMatches.length,
    footerIdx
  });
});
