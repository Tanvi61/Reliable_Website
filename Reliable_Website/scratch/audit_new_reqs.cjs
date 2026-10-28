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

console.log('=== AUDITING BREADCRUMBS, H1, SITEMAP, ROBOTS, GA & GSC ===\n');

// 1. Audit H1 across all pages
console.log('--- 1. H1 TAGS AUDIT ---');
activeHtmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const h1Matches = [...content.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    console.log(`${file}: (${h1Matches.length} H1s)`);
    h1Matches.forEach((m, idx) => {
        const text = m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
        console.log(`   [H1 #${idx + 1}]: "${text}"`);
    });
});

// 2. Audit Breadcrumb Navigation
console.log('\n--- 2. BREADCRUMBS AUDIT ---');
activeHtmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const hasBreadcrumbNav = /class=["'][^"']*breadcrumb[^"']*["']/i.test(content) || /aria-label=["']breadcrumb["']/i.test(content);
    const hasBreadcrumbSchema = /"BreadcrumbList"/i.test(content);
    console.log(`${file}: Visual Nav: ${hasBreadcrumbNav}, Schema: ${hasBreadcrumbSchema}`);
});

// 3. Audit GA and GSC tags
console.log('\n--- 3. GA & GSC TAG AUDIT ---');
activeHtmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const gaMatch = content.match(/googletagmanager\.com\/gtag\/js\?id=([^"'\s>]+)/i) || content.match(/gtag\(['"]config['"],\s*['"]([^"']+)['"]\)/i);
    const gscMatch = content.match(/<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']/i);
    console.log(`${file}: GA: ${gaMatch ? gaMatch[1] : 'NONE'}, GSC: ${gscMatch ? gscMatch[1] : 'NONE'}`);
});
