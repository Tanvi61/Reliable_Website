const fs = require('fs');
const path = require('path');
const puppeteer = require('e:/MindAxis_Web/Samarth_Ayurveda/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\e419adda-178e-4737-97b0-cf828728f817';

async function testPrototype() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Test viewports
    const viewports = [
        { name: 'ipad_768_portrait', width: 768, height: 1024 },
        { name: 'ipad_air_820_portrait', width: 820, height: 1180 },
        { name: 'ipad_pro_1024_portrait', width: 1024, height: 1366 },
        { name: 'tablet_1024_768_landscape', width: 1024, height: 768 },
        { name: 'mobile_390_iphone14', width: 390, height: 844 },
        { name: 'mobile_430_promax', width: 430, height: 932 },
        { name: 'desktop_1280', width: 1280, height: 800 },
        { name: 'desktop_1440', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
        await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
        await page.goto('file:///e:/MindAxis_Web/Reliable_Website/index.html', { waitUntil: 'load' });

        // Inject new proposed CSS for tablet and footer
        await page.addStyleTag({
            content: `
            /* Tablet Footer: 768px to 1024px */
            @media (min-width: 768px) and (max-width: 1024px) {
              .footer-grid {
                display: grid !important;
                grid-template-columns: 1.25fr 1fr 1.35fr !important;
                gap: 32px 30px !important;
                margin-bottom: 40px !important;
              }
              /* Row 1: Brand (1), Quick Links (2), Contact (3) */
              .footer-brand {
                grid-column: 1 / 2 !important;
                grid-row: 1 / 2 !important;
              }
              .footer-col:nth-of-type(2) { /* Quick Links */
                grid-column: 2 / 3 !important;
                grid-row: 1 / 2 !important;
              }
              .footer-col:nth-of-type(4) { /* Contact */
                grid-column: 3 / 4 !important;
                grid-row: 1 / 2 !important;
              }

              /* Row 2: Services (spans cols 1 & 2), Office Location Map (col 3) */
              .footer-col:nth-of-type(3) { /* Our Services */
                grid-column: 1 / 3 !important;
                grid-row: 2 / 3 !important;
              }
              .footer-col:nth-of-type(3) .footer-links {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 10px 24px !important;
              }
              .footer-col-map {
                grid-column: 3 / 4 !important;
                grid-row: 2 / 3 !important;
              }
              .footer-map-card {
                height: 165px !important;
                width: 100% !important;
              }
            }

            /* Mobile Footer: <= 767px */
            @media (max-width: 767px) {
              .footer-grid {
                display: flex !important;
                flex-direction: column !important;
                gap: 26px !important;
                margin-bottom: 45px !important;
              }
              .footer-brand { 
                order: 1 !important; 
              }
              .footer-col:nth-of-type(4) { /* Contact */
                order: 2 !important;
              }

              /* Container for Quick Links & Services side-by-side on mobile */
              .footer-mobile-links-wrapper {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 20px !important;
                order: 3 !important;
                width: 100% !important;
              }
              .footer-col:nth-of-type(2) { /* Quick Links */
                order: 3 !important;
              }
              .footer-col:nth-of-type(3) { /* Services */
                order: 4 !important;
              }
              .footer-col-map {
                order: 5 !important;
              }
              .footer-map-card {
                height: 175px !important;
                border-radius: 8px !important;
              }
              .footer-bottom {
                padding-top: 45px !important;
                padding-bottom: 25px !important;
              }
            }

            /* Action button styling for Open in Google Maps */
            .footer-map-directions-link {
              display: inline-flex !important;
              align-items: center !important;
              gap: 8px !important;
              padding: 8px 18px !important;
              background: #ffffff !important;
              color: #082b4c !important;
              border: 1.5px solid #f47b20 !important;
              border-radius: 6px !important;
              font-size: 13px !important;
              font-weight: 700 !important;
              text-decoration: none !important;
              box-shadow: 0 4px 12px rgba(8, 43, 76, 0.12) !important;
              transition: all 0.25s ease !important;
              margin-top: 6px !important;
            }
            .footer-map-directions-link span {
              color: #082b4c !important;
            }
            .footer-map-directions-link:hover {
              background: #f47b20 !important;
              color: #ffffff !important;
              border-color: #f47b20 !important;
              transform: translateY(-2px) !important;
              box-shadow: 0 6px 16px rgba(244, 123, 32, 0.35) !important;
            }
            .footer-map-directions-link:hover span {
              color: #ffffff !important;
            }

            /* Footer base styling */
            .footer {
              background-color: #edf5fc !important;
              padding-top: 45px !important;
              padding-bottom: 25px !important;
            }
            .footer-bottom {
              padding-top: 40px !important;
              padding-bottom: 20px !important;
            }
            `
        });

        await new Promise(r => setTimeout(r, 600));

        const footer = await page.$('.footer');
        if (footer) {
            await footer.screenshot({ path: path.join(ARTIFACT_DIR, `prototype_footer_${vp.name}.png`) });
            console.log(`Saved prototype_footer_${vp.name}.png`);
        }
    }

    await browser.close();
}

testPrototype().catch(console.error);
