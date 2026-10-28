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

// Mapping of old links to new links (exact string replacements)
const replacements = [
    // Full URLs
    { from: 'https://www.reliablelandsurvey.in/services.html', to: 'https://www.reliablelandsurvey.in/land-survey-services.html' },
    { from: 'https://www.reliablelandsurvey.in/road-highway.html', to: 'https://www.reliablelandsurvey.in/road-highway-survey.html' },
    { from: 'https://www.reliablelandsurvey.in/rail-metro.html', to: 'https://www.reliablelandsurvey.in/rail-metro-survey.html' },
    { from: 'https://www.reliablelandsurvey.in/dgps-gnss-control.html', to: 'https://www.reliablelandsurvey.in/dgps-gnss-control-survey.html' },
    { from: 'https://www.reliablelandsurvey.in/drone-photogrammetry.html', to: 'https://www.reliablelandsurvey.in/drone-photogrammetry-survey.html' },
    { from: 'https://www.reliablelandsurvey.in/rtk-drone-mapping.html', to: 'https://www.reliablelandsurvey.in/rtk-drone-mapping-survey.html' },
    { from: 'https://www.reliablelandsurvey.in/lidar-3d-scanning.html', to: 'https://www.reliablelandsurvey.in/lidar-3d-scanning-survey.html' },
    { from: 'https://www.reliablelandsurvey.in/cad-gis-processing.html', to: 'https://www.reliablelandsurvey.in/cad-gis-processing-services.html' },
    // Relative href attributes and string references
    { from: 'href="services.html"', to: 'href="land-survey-services.html"' },
    { from: "href='services.html'", to: "href='land-survey-services.html'" },
    { from: 'href="road-highway.html"', to: 'href="road-highway-survey.html"' },
    { from: "href='road-highway.html'", to: "href='road-highway-survey.html'" },
    { from: 'href="rail-metro.html"', to: 'href="rail-metro-survey.html"' },
    { from: "href='rail-metro.html'", to: "href='rail-metro-survey.html'" },
    { from: 'href="dgps-gnss-control.html"', to: 'href="dgps-gnss-control-survey.html"' },
    { from: "href='dgps-gnss-control.html'", to: "href='dgps-gnss-control-survey.html'" },
    { from: 'href="drone-photogrammetry.html"', to: 'href="drone-photogrammetry-survey.html"' },
    { from: "href='drone-photogrammetry.html'", to: "href='drone-photogrammetry-survey.html'" },
    { from: 'href="rtk-drone-mapping.html"', to: 'href="rtk-drone-mapping-survey.html"' },
    { from: "href='rtk-drone-mapping.html'", to: "href='rtk-drone-mapping-survey.html'" },
    { from: 'href="lidar-3d-scanning.html"', to: 'href="lidar-3d-scanning-survey.html"' },
    { from: "href='lidar-3d-scanning.html'", to: "href='lidar-3d-scanning-survey.html'" },
    { from: 'href="cad-gis-processing.html"', to: 'href="cad-gis-processing-services.html"' },
    { from: "href='cad-gis-processing.html'", to: "href='cad-gis-processing-services.html'" },
    // window.location or other references
    { from: '"services.html"', to: '"land-survey-services.html"' },
    { from: "'services.html'", to: "'land-survey-services.html'" }
];

console.log('--- UPDATING HTML FILES ---');
activeHtmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const r of replacements) {
        if (content.includes(r.from)) {
            // Be careful with '"services.html"' not to break unintended strings, but here it matches exact quotes
            content = content.split(r.from).join(r.to);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated links in ${file}`);
    } else {
        console.log(`No changes needed in ${file}`);
    }
});

// Update sitemap.xml in Reliable_Website and parent
[
    path.join(dir, 'sitemap.xml'),
    'e:/MindAxis_Web/sitemap.xml'
].forEach(smPath => {
    if (fs.existsSync(smPath)) {
        let content = fs.readFileSync(smPath, 'utf8');
        replacements.forEach(r => {
            if (content.includes(r.from)) {
                content = content.split(r.from).join(r.to);
            }
        });
        fs.writeFileSync(smPath, content, 'utf8');
        console.log(`Updated sitemap: ${smPath}`);
    }
});
