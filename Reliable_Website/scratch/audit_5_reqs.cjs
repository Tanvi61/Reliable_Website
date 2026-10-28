const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';
const activeHtmlFiles = [
    'index.html',
    'about.html',
    'land-survey-services.html',
    'topographical-survey.html',
    'dgps-gnss-control-survey.html',
    'total-station-survey.html',
    'rtk-drone-mapping-survey.html',
    'lidar-3d-scanning-survey.html',
    'drone-photogrammetry-survey.html',
    'road-highway-survey.html',
    'rail-metro-survey.html',
    'cad-gis-processing-services.html',
    'gallery.html',
    'contact.html',
    'review.html'
];

console.log('=== AUDITING 5 REQUIREMENTS ===\n');

// 1. Meta Titles & Descriptions (Duplicate Content Check)
console.log('--- 1. TITLE & DESCRIPTION AUDIT ---');
const titles = {};
const descriptions = {};
const canonicals = {};

activeHtmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const title = (content.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
    const desc = (content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || [])[1] || '';
    const canon = (content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) || [])[1] || '';

    if (titles[title]) titles[title].push(file);
    else titles[title] = [file];

    if (descriptions[desc]) descriptions[desc].push(file);
    else descriptions[desc] = [file];

    if (canonicals[canon]) canonicals[canon].push(file);
    else canonicals[canon] = [file];
});

console.log('Duplicate Titles:');
for (const [t, files] of Object.entries(titles)) {
    if (files.length > 1) console.log(`  "${t}": [${files.join(', ')}]`);
}
console.log('Duplicate Descriptions:');
for (const [d, files] of Object.entries(descriptions)) {
    if (files.length > 1) console.log(`  "${d.substring(0, 50)}...": [${files.join(', ')}]`);
}
console.log('Duplicate Canonicals:');
for (const [c, files] of Object.entries(canonicals)) {
    if (files.length > 1) console.log(`  "${c}": [${files.join(', ')}]`);
}

// 2. URL Rules Check (no spaces, no underscores, only hyphens)
console.log('\n--- 2. URL RULES AUDIT (Checking all hrefs and srcs in HTML) ---');
const badUrls = new Set();
activeHtmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const hrefRegex = /(?:href|src)\s*=\s*["']([^"']+)["']/gi;
    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
        const url = match[1];
        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('tel:') || url.startsWith('mailto:') || url.startsWith('#') || url === '') continue;
        
        const clean = url.split('?')[0].split('#')[0];
        // Check for underscores, spaces, uppercase
        if (clean.includes('_') || clean.includes(' ') || clean.includes('%20')) {
            badUrls.add(`${file} -> ${url}`);
        }
    }
});
console.log(`Found ${badUrls.size} URLs violating rules (containing underscore or space):`);
Array.from(badUrls).slice(0, 20).forEach(u => console.log(' ', u));

// 3. Image loading & defer script check
console.log('\n--- 3. FAST LOADING AUDIT (Scripts & Images) ---');
activeHtmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const scriptTags = content.match(/<script\b[^>]*src=["'][^"']+["'][^>]*>/gi) || [];
    const unoptimizedScripts = scriptTags.filter(s => !s.includes('defer') && !s.includes('async'));
    const imgTags = content.match(/<img\b[^>]*>/gi) || [];
    const missingLazy = imgTags.filter(img => !img.includes('loading=') && !img.includes('bg-pan-anim') && !img.includes('logo'));
    console.log(`${file}: ${imgTags.length} imgs (${missingLazy.length} without loading="lazy"), ${scriptTags.length} external scripts (${unoptimizedScripts.length} without defer/async)`);
});
