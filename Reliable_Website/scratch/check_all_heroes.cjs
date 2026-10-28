const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  // Check hero actions or buttons in hero
  const heroMatch = content.match(/class="[^"]*hero[^"]*"[\s\S]*?(?=<\/section>|<\/div>\s*<!--|$)/i);
  if (heroMatch) {
    const hasExplore = heroMatch[0].includes('btn-explore') || heroMatch[0].includes('btn-contact');
    const hasHeroActions = heroMatch[0].includes('hero-actions');
    if (hasExplore || hasHeroActions) {
      console.log(`[${f}] HAS HERO BUTTONS!`);
    } else {
      console.log(`[${f}] Hero clean (no hero-actions buttons)`);
    }
  }
});
