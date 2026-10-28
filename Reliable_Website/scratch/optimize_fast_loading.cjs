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

activeHtmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Script deferral: Add defer to topbar.js and script.js if not present
    content = content.replace(
        /<script src="js\/topbar\.js\?v=20261010-06"(?!\s+defer)><\/script>/g,
        '<script src="js/topbar.js?v=20261010-06" defer></script>'
    );
    content = content.replace(
        /<script src="js\/script\.js\?v=20261010-11"(?!\s+defer)><\/script>/g,
        '<script src="js/script.js?v=20261010-11" defer></script>'
    );

    // 2. Preconnect & DNS-Prefetch in <head>
    const preconnectBlock = `
    <!-- Performance Optimization: Resource Preconnects & DNS Prefetch -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
`;
    if (!content.includes('rel="dns-prefetch"')) {
        content = content.replace('<head>', '<head>' + preconnectBlock);
    }

    // 3. Ensure &display=swap is in Google Fonts link
    content = content.replace(
        /(fonts\.googleapis\.com\/css2\?[^"'>]+)(?!&display=swap)(["'>])/g,
        '$1&display=swap$2'
    );

    // 4. Lazy loading & async decoding on below-the-fold images
    // Exclude: logo-transparent.png in nav-logo, about-hero-clean.jpg, and first hero image in index.html
    content = content.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
        // Check if it's the top navbar logo
        if (attrs.includes('assets/logo/logo-transparent.png') && !attrs.includes('footer-logo-img')) {
            // High priority above the fold
            if (!attrs.includes('fetchpriority=')) {
                return `<img fetchpriority="high" decoding="async"${attrs}>`;
            }
            return match;
        }
        // Check if it's the hero background
        if (attrs.includes('bg-pan-anim') || attrs.includes('hero.jpg') || (attrs.includes('highway.jpg') && file === 'index.html' && attrs.includes('alt="High Precision Highway'))) {
            if (!attrs.includes('decoding=')) {
                return `<img decoding="async"${attrs}>`;
            }
            return match;
        }
        // For all other images: add loading="lazy" and decoding="async" if not present
        let updated = match;
        if (!attrs.includes('loading=')) {
            updated = updated.replace(/^<img\b/i, '<img loading="lazy"');
        }
        if (!attrs.includes('decoding=')) {
            updated = updated.replace(/^<img\b/i, '<img decoding="async"');
        }
        return updated;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Optimized performance in ${file}`);
});

console.log('Performance & Fast Loading optimizations successfully applied sitewide!');
