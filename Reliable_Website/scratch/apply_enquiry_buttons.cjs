const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update land-survey-services.html product cards
const servicesFile = path.join(dir, 'land-survey-services.html');
let servicesContent = fs.readFileSync(servicesFile, 'utf8');

const serviceCards = [
    {
        name: 'Topographical Survey',
        slug: 'topographical-survey.html',
        param: 'topographical-survey'
    },
    {
        name: 'DGPS / GNSS Control',
        slug: 'dgps-gnss-control-survey.html',
        param: 'dgps-gnss-control-survey'
    },
    {
        name: 'Total Station Survey',
        slug: 'total-station-survey.html',
        param: 'total-station-survey'
    },
    {
        name: 'RTK Drone Mapping',
        slug: 'rtk-drone-mapping-survey.html',
        param: 'rtk-drone-mapping-survey'
    },
    {
        name: 'LiDAR 3D Scanning',
        slug: 'lidar-3d-scanning-survey.html',
        param: 'lidar-3d-scanning-survey'
    },
    {
        name: 'CAD / GIS Processing',
        slug: 'cad-gis-processing-services.html',
        param: 'cad-gis-processing-services'
    },
    {
        name: 'Drone Photogrammetry',
        slug: 'drone-photogrammetry-survey.html',
        param: 'drone-photogrammetry-survey'
    },
    {
        name: 'Rail / Metro',
        slug: 'rail-metro-survey.html',
        param: 'rail-metro-survey'
    },
    {
        name: 'Road / Highway',
        slug: 'road-highway-survey.html',
        param: 'road-highway-survey'
    }
];

serviceCards.forEach(card => {
    // Replace the old Request Survey link with the new Action Bar containing Enquiry Button and Details link
    const oldLinkRegex = new RegExp(
        `<a href="${card.slug.replace(/\//g, '\\/')}" style="color: var\\(--accent-orange\\); font-weight: bold; text-decoration: none; display: flex; align-items: center; gap: 5px;">Request Survey <svg[^>]*>[\\s\\S]*?<\\/svg><\\/a>`,
        'i'
    );

    const newActionBar = `<div class="product-action-bar" style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 22px; padding-top: 16px; border-top: 1px solid #edf2f7; flex-wrap: wrap;">
                            <a href="contact.html?service=${card.param}" class="btn-product-enquiry" style="background: var(--accent-orange); color: #ffffff; text-decoration: none; padding: 9px 18px; border-radius: 6px; font-weight: 700; font-size: 13.5px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(244, 123, 32, 0.25); transition: all 0.25s ease;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                <span>Enquire Now</span>
                            </a>
                            <a href="${card.slug}" style="color: var(--primary-navy); font-weight: 700; font-size: 13.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; transition: color 0.2s;">
                                <span>View Details</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </a>
                        </div>`;

    if (oldLinkRegex.test(servicesContent)) {
        servicesContent = servicesContent.replace(oldLinkRegex, newActionBar);
        console.log(`Added Enquiry button for card: ${card.name}`);
    } else {
        console.warn(`Could not find old link for card: ${card.name}`);
    }
});

// Add hover effect style in land-survey-services.html
if (!servicesContent.includes('.btn-product-enquiry:hover')) {
    servicesContent = servicesContent.replace(
        '</style>',
        `  .btn-product-enquiry:hover {
        background: #e0650d !important;
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(244, 123, 32, 0.4) !important;
      }
    </style>`
    );
}
fs.writeFileSync(servicesFile, servicesContent, 'utf8');
console.log('Updated land-survey-services.html with enquiry buttons!');

// 2. Update individual 9 service pages
const individualPages = [
    { file: 'topographical-survey.html', param: 'topographical-survey', name: 'Topographical Survey' },
    { file: 'dgps-gnss-control-survey.html', param: 'dgps-gnss-control-survey', name: 'DGPS & GNSS Control' },
    { file: 'total-station-survey.html', param: 'total-station-survey', name: 'Total Station Survey' },
    { file: 'rtk-drone-mapping-survey.html', param: 'rtk-drone-mapping-survey', name: 'RTK Drone Mapping' },
    { file: 'lidar-3d-scanning-survey.html', param: 'lidar-3d-scanning-survey', name: 'LiDAR 3D Scanning' },
    { file: 'drone-photogrammetry-survey.html', param: 'drone-photogrammetry-survey', name: 'Drone Photogrammetry' },
    { file: 'road-highway-survey.html', param: 'road-highway-survey', name: 'Road & Highway Survey' },
    { file: 'rail-metro-survey.html', param: 'rail-metro-survey', name: 'Rail & Metro Survey' },
    { file: 'cad-gis-processing-services.html', param: 'cad-gis-processing-services', name: 'CAD & GIS Processing' }
];

individualPages.forEach(p => {
    const pPath = path.join(dir, p.file);
    let pContent = fs.readFileSync(pPath, 'utf8');

    // 2a. Update CTA grid Request Quote button to Enquire Now with parameter
    pContent = pContent.replace(
        /<a href="contact\.html" class="btn btn-primary btn-spec-quote"[^>]*>[\s\S]*?Request Quote[\s\S]*?<\/a>/i,
        `<a href="contact.html?service=${p.param}" class="btn btn-primary btn-spec-quote" style="padding: 15px 18px; font-size: 14.5px; border-radius: 8px; font-weight: 700; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> <span>Enquire Now</span></a>`
    );

    // 2b. Add Enquiry bar below technical specifications table
    const tableEnd = '</table>';
    const specEnquiryBar = `</table>
                        <div style="margin-top: 22px; padding-top: 18px; border-top: 1px solid rgba(8,43,76,0.12); display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap;">
                            <div style="font-size: 14px; color: var(--primary-navy); font-weight: 600;">
                                Need customized surveying solutions or field mobilization?
                            </div>
                            <a href="contact.html?service=${p.param}" class="btn-product-enquiry" style="background: var(--accent-orange); color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 700; font-size: 13.5px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 14px rgba(244,123,32,0.28); transition: all 0.25s ease;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                <span>Enquire for ${p.name}</span>
                            </a>
                        </div>`;

    if (pContent.includes(tableEnd) && !pContent.includes(`Enquire for ${p.name}`)) {
        pContent = pContent.replace(tableEnd, specEnquiryBar);
        console.log(`Added spec enquiry bar to ${p.file}`);
    }

    fs.writeFileSync(pPath, pContent, 'utf8');
});

// 3. Update contact.html
const contactFile = path.join(dir, 'contact.html');
let contactContent = fs.readFileSync(contactFile, 'utf8');

// Ensure Drone Photogrammetry option exists
if (!contactContent.includes('value="Drone Photogrammetry"')) {
    contactContent = contactContent.replace(
        '<option value="Drone LiDAR Scanning">Drone LiDAR & 3D Scanning</option>',
        `<option value="Drone LiDAR Scanning">Drone LiDAR & 3D Scanning</option>\n                                    <option value="Drone Photogrammetry">Drone Photogrammetry Survey</option>`
    );
}

// Add auto-select JS if not present
const autoSelectJs = `
    <!-- Auto-select service from URL parameter (e.g. ?service=road-highway-survey) -->
    <script>
    (function() {
        try {
            var params = new URLSearchParams(window.location.search);
            var s = params.get('service');
            if (s && document.getElementById('contact-service')) {
                var select = document.getElementById('contact-service');
                var sClean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
                for (var i = 0; i < select.options.length; i++) {
                    var optClean = select.options[i].value.toLowerCase().replace(/[^a-z0-9]/g, '');
                    if (optClean.includes(sClean) || sClean.includes(optClean)) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }
        } catch(e) {}
    })();
    </script>
`;

if (!contactContent.includes('Auto-select service from URL parameter')) {
    contactContent = contactContent.replace('</body>', autoSelectJs + '\n</body>');
    console.log('Added auto-select JS to contact.html');
}

fs.writeFileSync(contactFile, contactContent, 'utf8');
console.log('All enquiry buttons successfully added!');
