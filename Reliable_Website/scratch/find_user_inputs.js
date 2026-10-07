const fs = require('fs');
const brainPath = 'C:/Users/HP/.gemini/antigravity-ide/brain';
const dirs = fs.readdirSync(brainPath);
dirs.forEach(d => {
  const p = brainPath + '/' + d + '/.system_generated/logs/transcript_full.jsonl';
  if (fs.existsSync(p)) {
    const lines = fs.readFileSync(p, 'utf8').split('\n');
    lines.forEach(l => {
      if (l.includes('"USER_INPUT"')) {
        try {
          const j = JSON.parse(l);
          console.log(d, j.type, (j.content || '').slice(0, 300));
        } catch(e) {}
      }
    });
  }
});
