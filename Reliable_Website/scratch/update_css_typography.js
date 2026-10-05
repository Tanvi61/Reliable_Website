const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../css/style.css');
let content = fs.readFileSync(cssPath, 'utf8');

const oldTypoRegex = /\/\* Typography Defaults \*\/[\s\S]*?textarea \{\s*font-family: inherit;\s*font-size: inherit;\s*outline: none;\s*\}/;

const newTypo = `/* Typography Defaults & Strict Font Unification */
h1,
h2,
h3,
h4,
h5,
h6,
.hero-heading,
.section-heading,
.nav-links a,
.btn,
.nav-btn,
.counter-number,
.service-title,
.industry-title,
.why-feature-title,
.tech-preview-title,
.tech-item-name,
.tab-btn,
.section-label,
.mission-card h4,
.faq-header,
.faq-item summary {
  font-family: var(--font-heading);
  color: var(--text-dark);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

p,
span,
li,
a,
label,
td,
th {
  font-family: var(--font-main);
}

p {
  color: var(--text-body);
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.65;
}

a {
  text-decoration: none;
  color: inherit;
  transition: var(--transition-fast);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

ul,
ol {
  list-style: none;
}

button,
input,
select,
textarea {
  font-family: var(--font-main);
  font-size: inherit;
  outline: none;
}`;

if (oldTypoRegex.test(content)) {
    content = content.replace(oldTypoRegex, newTypo);
    fs.writeFileSync(cssPath, content, 'utf8');
    console.log('Successfully updated typography defaults in style.css');
} else {
    console.log('Typography block regex did not match');
}
