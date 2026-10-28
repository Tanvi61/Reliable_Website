import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\f933a7cf-56f8-4efb-b433-1ef6270f3c16\\.system_generated\\steps\\1244\\content.md', 'utf8');
const imgs = html.match(/<img[^>]+>/g) || [];
console.log('Total img tags in sheet html:', imgs.length);
imgs.forEach(img => console.log(img));

const links = html.match(/https?:\/\/[^\s"'<>]+/g) || [];
const filtered = links.filter(l => l.includes('drive.google.com') || l.includes('googleusercontent') || l.includes('drawings') || l.includes('lh3') || l.includes('lh7'));
console.log('Filtered media links in sheet:', filtered);
