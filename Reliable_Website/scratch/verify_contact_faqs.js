const fs = require('fs');
const content = fs.readFileSync('contact.html', 'utf8');
const regex = /<span class="faq-question">([^<]+)<\/span>/g;
let m;
let i = 1;
while ((m = regex.exec(content)) !== null) {
  console.log(`${i++}. ${m[1]}`);
}
