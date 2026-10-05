const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../index.html');
let content = fs.readFileSync(filePath, 'utf8');

const targetSectionRegex = /<p style="font-size: 16px; color: var\(--primary-navy\); margin-bottom: 16px; line-height: 1\.6;">[\s\S]*?<a href="about\.html" class="btn btn-primary" style="margin-top: 15px;">Learn More About Us\s+&rarr;<\/a>/;

const newSection = `<p style="font-size: 16px; color: var(--text-body); margin-bottom: 18px; line-height: 1.7;">
                        Reliable Land Survey Consultancy is a professional surveying and geospatial service provider focused on delivering accurate field data, engineering-ready deliverables, and dependable on-site support.
                    </p>
                    <p style="font-size: 16px; color: var(--text-body); margin-bottom: 28px; line-height: 1.7;">
                        We provide specialized surveying solutions across critical infrastructure sectors including Metro Rail, Railways, Highways, and Land Development. Combining experienced field practices with modern surveying technology, our team delivers high-precision, dependable data tailored for engineering and construction excellence.
                    </p>

                    <a href="about.html" class="btn btn-primary">Learn More About Us &rarr;</a>`;

if (targetSectionRegex.test(content)) {
    content = content.replace(targetSectionRegex, newSection);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated index.html about section with simple clean text');
} else {
    console.log('Regex did not match, please inspect content');
}
