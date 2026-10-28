const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

const redirects = [
    {
        oldFile: 'services.html',
        newFile: 'land-survey-services.html',
        name: 'Land Survey Services'
    },
    {
        oldFile: 'road-highway.html',
        newFile: 'road-highway-survey.html',
        name: 'Road & Highway Survey'
    },
    {
        oldFile: 'rail-metro.html',
        newFile: 'rail-metro-survey.html',
        name: 'Rail & Metro Survey'
    },
    {
        oldFile: 'dgps-gnss-control.html',
        newFile: 'dgps-gnss-control-survey.html',
        name: 'DGPS & GNSS Control Survey'
    },
    {
        oldFile: 'drone-photogrammetry.html',
        newFile: 'drone-photogrammetry-survey.html',
        name: 'Drone Photogrammetry Survey'
    },
    {
        oldFile: 'rtk-drone-mapping.html',
        newFile: 'rtk-drone-mapping-survey.html',
        name: 'RTK Drone Mapping Survey'
    },
    {
        oldFile: 'lidar-3d-scanning.html',
        newFile: 'lidar-3d-scanning-survey.html',
        name: 'Drone LiDAR & 3D Scanning Survey'
    },
    {
        oldFile: 'cad-gis-processing.html',
        newFile: 'cad-gis-processing-services.html',
        name: 'CAD Drafting & GIS Processing Services'
    }
];

redirects.forEach(r => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=${r.newFile}">
    <link rel="canonical" href="https://www.reliablelandsurvey.in/${r.newFile}">
    <title>Redirecting to ${r.name} | Reliable Land Survey Consultancy</title>
    <script>
        window.location.replace("${r.newFile}");
    </script>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #082B4C; color: #ffffff;">
    <div style="text-align: center;">
        <h2 style="margin-bottom: 10px; font-weight: 600;">Redirecting to ${r.name}...</h2>
        <p style="color: #94A3B8;">If you are not redirected automatically, <a href="${r.newFile}" style="color: #F47B20; text-decoration: underline; font-weight: 600;">click here to view ${r.name}</a>.</p>
    </div>
</body>
</html>
`;
    fs.writeFileSync(path.join(dir, r.oldFile), html, 'utf8');
    console.log(`Created redirect stub: ${r.oldFile} -> ${r.newFile}`);
});
