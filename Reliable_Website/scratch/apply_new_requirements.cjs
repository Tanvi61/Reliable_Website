const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';
const rootDir = 'e:/MindAxis_Web';

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

console.log('=== STEP 1: CREATE SITEMAP.TXT & UPDATE ROBOTS.TXT ===');

const sitemapUrls = [
    'https://www.reliablelandsurvey.in/',
    'https://www.reliablelandsurvey.in/about.html',
    'https://www.reliablelandsurvey.in/land-survey-services.html',
    'https://www.reliablelandsurvey.in/topographical-survey.html',
    'https://www.reliablelandsurvey.in/dgps-gnss-control-survey.html',
    'https://www.reliablelandsurvey.in/total-station-survey.html',
    'https://www.reliablelandsurvey.in/rtk-drone-mapping-survey.html',
    'https://www.reliablelandsurvey.in/lidar-3d-scanning-survey.html',
    'https://www.reliablelandsurvey.in/drone-photogrammetry-survey.html',
    'https://www.reliablelandsurvey.in/road-highway-survey.html',
    'https://www.reliablelandsurvey.in/rail-metro-survey.html',
    'https://www.reliablelandsurvey.in/cad-gis-processing-services.html',
    'https://www.reliablelandsurvey.in/gallery.html',
    'https://www.reliablelandsurvey.in/contact.html',
    'https://www.reliablelandsurvey.in/review.html'
];

const sitemapTxtContent = sitemapUrls.join('\n') + '\n';
fs.writeFileSync(path.join(dir, 'sitemap.txt'), sitemapTxtContent, 'utf8');
fs.writeFileSync(path.join(rootDir, 'sitemap.txt'), sitemapTxtContent, 'utf8');
console.log('Created sitemap.txt in Reliable_Website and root directory.');

const robotsContent = `User-agent: *
Allow: /

Sitemap: https://www.reliablelandsurvey.in/sitemap.xml
Sitemap: https://www.reliablelandsurvey.in/sitemap.txt
`;
fs.writeFileSync(path.join(dir, 'robots.txt'), robotsContent, 'utf8');
fs.writeFileSync(path.join(rootDir, 'robots.txt'), robotsContent, 'utf8');
console.log('Updated robots.txt in Reliable_Website and root directory.');

console.log('\n=== STEP 2: UPDATE H1 TAGS ON PRODUCT & SERVICE PAGES ===');

// H1 updates for specific product files
const h1Updates = [
    {
        file: 'land-survey-services.html',
        findRegex: /<h1[^>]*>[\s\S]*?Comprehensive[\s\S]*?Surveying Solutions\.[\s\S]*?<\/h1>/i,
        replaceH1: `<h1 style="font-size: clamp(2.5rem, 5vw, 4rem); color: var(--dark-navy); line-height: 1.1; margin-bottom: 20px; font-weight: 800; text-shadow: 0 0 15px rgba(255,255,255,0.7);">
                <span class="hero-title-main">Land Survey</span> <span class="hero-title-accent" style="color: var(--accent-orange); white-space: nowrap;">Services</span>
            </h1>`
    },
    {
        file: 'rtk-drone-mapping-survey.html',
        findRegex: /<h1 class="service-hero-title"[^>]*>[\s\S]*?<\/h1>/i,
        replaceH1: `<h1 class="service-hero-title" style="font-size: clamp(1.85rem, 5vw, 3.2rem); color: var(--dark-navy); line-height: 1.2; margin-bottom: 18px; font-weight: 800; text-shadow: 0 0 15px rgba(255,255,255,0.85);">
                    <span class="hero-title-main">RTK Drone Mapping</span> <span class="hero-title-accent" style="color: var(--accent-orange); white-space: nowrap;">Survey</span>
                </h1>`
    },
    {
        file: 'lidar-3d-scanning-survey.html',
        findRegex: /<h1 class="service-hero-title"[^>]*>[\s\S]*?<\/h1>/i,
        replaceH1: `<h1 class="service-hero-title" style="font-size: clamp(1.85rem, 5vw, 3.2rem); color: var(--dark-navy); line-height: 1.2; margin-bottom: 18px; font-weight: 800; text-shadow: 0 0 15px rgba(255,255,255,0.85);">
                    <span class="hero-title-main">Drone LiDAR & 3D Scanning</span> <span class="hero-title-accent" style="color: var(--accent-orange); white-space: nowrap;">Survey</span>
                </h1>`
    },
    {
        file: 'drone-photogrammetry-survey.html',
        findRegex: /<h1 class="service-hero-title"[^>]*>[\s\S]*?<\/h1>/i,
        replaceH1: `<h1 class="service-hero-title" style="font-size: clamp(1.85rem, 5vw, 3.2rem); color: var(--dark-navy); line-height: 1.2; margin-bottom: 18px; font-weight: 800; text-shadow: 0 0 15px rgba(255,255,255,0.85);">
                    <span class="hero-title-main">Drone Photogrammetry</span> <span class="hero-title-accent" style="color: var(--accent-orange); white-space: nowrap;">Survey</span>
                </h1>`
    },
    {
        file: 'cad-gis-processing-services.html',
        findRegex: /<h1 class="service-hero-title"[^>]*>[\s\S]*?<\/h1>/i,
        replaceH1: `<h1 class="service-hero-title" style="font-size: clamp(1.85rem, 5vw, 3.2rem); color: var(--dark-navy); line-height: 1.2; margin-bottom: 18px; font-weight: 800; text-shadow: 0 0 15px rgba(255,255,255,0.85);">
                    <span class="hero-title-main">CAD Drafting & GIS</span> <span class="hero-title-accent" style="color: var(--accent-orange); white-space: nowrap;">Processing Services</span>
                </h1>`
    }
];

h1Updates.forEach(u => {
    const fPath = path.join(dir, u.file);
    let content = fs.readFileSync(fPath, 'utf8');
    if (u.findRegex.test(content)) {
        content = content.replace(u.findRegex, u.replaceH1);
        fs.writeFileSync(fPath, content, 'utf8');
        console.log(`Updated H1 in ${u.file}`);
    } else {
        console.warn(`Could not match H1 in ${u.file}`);
    }
});

console.log('\n=== STEP 3: ADD SEMANTIC BREADCRUMB NAVIGATION ===');

// Helper to generate semantic breadcrumb HTML
function generateBreadcrumb(items) {
    let lis = items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        if (isLast) {
            return `<li class="breadcrumb-item active" style="color: var(--accent-orange); font-weight: 800; white-space: nowrap;" aria-current="page">${it.name}</li>`;
        }
        return `<li class="breadcrumb-item"><a href="${it.url}" style="color: #4b5563; text-decoration: none; transition: color 0.2s;">${it.name}</a></li><li aria-hidden="true" style="color: var(--accent-orange);">&raquo;</li>`;
    }).join('');

    return `<nav aria-label="breadcrumb" class="breadcrumb-container" style="margin-bottom: 14px;">
                    <ol class="breadcrumb" style="list-style: none; padding: 0; margin: 0; font-size: 11.5px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        ${lis}
                    </ol>
                </nav>`;
}

// 3a. Update 9 service pages to wrap .service-breadcrumb in semantic <nav aria-label="breadcrumb">
const servicePages = [
    { file: 'topographical-survey.html', title: 'TOPOGRAPHICAL SURVEY' },
    { file: 'dgps-gnss-control-survey.html', title: 'DGPS & GNSS CONTROL' },
    { file: 'total-station-survey.html', title: 'TOTAL STATION SURVEY' },
    { file: 'rtk-drone-mapping-survey.html', title: 'RTK DRONE MAPPING' },
    { file: 'lidar-3d-scanning-survey.html', title: 'DRONE LIDAR & 3D SCANNING' },
    { file: 'drone-photogrammetry-survey.html', title: 'DRONE PHOTOGRAMMETRY' },
    { file: 'road-highway-survey.html', title: 'ROAD & HIGHWAY SURVEY' },
    { file: 'rail-metro-survey.html', title: 'RAIL & METRO SURVEY' },
    { file: 'cad-gis-processing-services.html', title: 'CAD & GIS PROCESSING' }
];

servicePages.forEach(p => {
    const fPath = path.join(dir, p.file);
    let content = fs.readFileSync(fPath, 'utf8');

    const oldBcRegex = /<div class="service-breadcrumb"[^>]*>[\s\S]*?<\/div>/i;
    const newBc = generateBreadcrumb([
        { name: 'HOME', url: 'index.html' },
        { name: 'SERVICES', url: 'land-survey-services.html' },
        { name: p.title, url: '' }
    ]);

    if (oldBcRegex.test(content)) {
        content = content.replace(oldBcRegex, newBc);
        fs.writeFileSync(fPath, content, 'utf8');
        console.log(`Updated semantic breadcrumb in ${p.file}`);
    }
});

// 3b. Add breadcrumb to land-survey-services.html
{
    const fPath = path.join(dir, 'land-survey-services.html');
    let content = fs.readFileSync(fPath, 'utf8');
    const bcHtml = generateBreadcrumb([
        { name: 'HOME', url: 'index.html' },
        { name: 'OUR SERVICES', url: '' }
    ]);

    if (!content.includes('aria-label="breadcrumb"')) {
        content = content.replace(
            '<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px; pointer-events: auto;">',
            `<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px; pointer-events: auto;">\n            ${bcHtml}`
        );
        fs.writeFileSync(fPath, content, 'utf8');
        console.log('Added breadcrumb to land-survey-services.html');
    }
}

// 3c. Add breadcrumb to about.html
{
    const fPath = path.join(dir, 'about.html');
    let content = fs.readFileSync(fPath, 'utf8');
    const bcHtml = generateBreadcrumb([
        { name: 'HOME', url: 'index.html' },
        { name: 'ABOUT US', url: '' }
    ]);

    if (!content.includes('aria-label="breadcrumb"')) {
        content = content.replace(
            '<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px; pointer-events: auto;">',
            `<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px; pointer-events: auto;">\n            ${bcHtml}`
        );
        fs.writeFileSync(fPath, content, 'utf8');
        console.log('Added breadcrumb to about.html');
    }
}

// 3d. Add breadcrumb to contact.html
{
    const fPath = path.join(dir, 'contact.html');
    let content = fs.readFileSync(fPath, 'utf8');
    const bcHtml = generateBreadcrumb([
        { name: 'HOME', url: 'index.html' },
        { name: 'CONTACT US', url: '' }
    ]);

    if (!content.includes('aria-label="breadcrumb"')) {
        content = content.replace(
            '<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px; pointer-events: auto;">',
            `<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px; pointer-events: auto;">\n            ${bcHtml}`
        );
        fs.writeFileSync(fPath, content, 'utf8');
        console.log('Added breadcrumb to contact.html');
    }
}

// 3e. Add breadcrumb to gallery.html
{
    const fPath = path.join(dir, 'gallery.html');
    let content = fs.readFileSync(fPath, 'utf8');
    const bcHtml = generateBreadcrumb([
        { name: 'HOME', url: 'index.html' },
        { name: 'PROJECT GALLERY', url: '' }
    ]);

    if (!content.includes('aria-label="breadcrumb"')) {
        content = content.replace(
            '<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px; pointer-events: auto;">',
            `<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px; pointer-events: auto;">\n            ${bcHtml}`
        );
        fs.writeFileSync(fPath, content, 'utf8');
        console.log('Added breadcrumb to gallery.html');
    }
}

// 3f. Add breadcrumb to review.html
{
    const fPath = path.join(dir, 'review.html');
    let content = fs.readFileSync(fPath, 'utf8');
    const bcHtml = generateBreadcrumb([
        { name: 'HOME', url: 'index.html' },
        { name: 'CLIENT REVIEWS', url: '' }
    ]);

    if (!content.includes('aria-label="breadcrumb"')) {
        content = content.replace(
            '<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px; pointer-events: auto;">',
            `<div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 20px; pointer-events: auto;">\n            ${bcHtml}`
        );
        fs.writeFileSync(fPath, content, 'utf8');
        console.log('Added breadcrumb to review.html');
    }
}

console.log('\n=== STEP 4: ADD GA (GTAG) & GSC VERIFICATION TAGS ===');

const analyticsAndGscTag = `
    <!-- Google Analytics (GA4 - gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-N13T37FJ7D"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-N13T37FJ7D');
    </script>

    <!-- Google Search Console (GSC) Verification -->
    <meta name="google-site-verification" content="GSC_RELIABLE_LAND_SURVEY_VERIFICATION_TOKEN" />
`;

activeHtmlFiles.forEach(file => {
    const fPath = path.join(dir, file);
    let content = fs.readFileSync(fPath, 'utf8');

    if (!content.includes('google-site-verification')) {
        // Insert right after <head> or after meta charset
        content = content.replace(
            /<meta charset="UTF-8">/i,
            `<meta charset="UTF-8">\n${analyticsAndGscTag}`
        );
        fs.writeFileSync(fPath, content, 'utf8');
        console.log(`Added GA4 & GSC tags to ${file}`);
    }
});

console.log('\nAll new requirements applied successfully!');
