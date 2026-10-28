const fs = require('fs');

const raw = fs.readFileSync('about_test.html', 'utf8');

// Let's test mobile styling
let updated = raw.replace(
  `        @media(max-width: 576px) {
            .exp-slider-img-col { height: 210px; }
            .exp-slider-content-col { padding: 38px 16px 18px 16px; }
            .exp-top-bar { left: 16px; right: 16px; top: 12px; }
            .exp-text-wrap h2 { font-size: 1.5rem; }
            .exp-side-arrow {
                top: 105px;
                width: 36px;
                height: 36px;
            }
        }`,
  `        @media(max-width: 768px) {
            .exp-slider-card { flex-direction: column; min-height: auto; height: auto; }
            .exp-slider-img-col { height: 220px; flex: none; position: relative; }
            .exp-slider-content-col { padding: 40px 18px 20px 18px; }
            .exp-top-bar { left: 18px; right: 18px; top: 14px; }
            .exp-text-wrap h2 { font-size: 1.6rem; }
            .exp-side-arrow {
                top: auto;
                bottom: 12px;
                transform: none;
                width: 36px;
                height: 36px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(8px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            .exp-side-prev {
                left: 12px;
            }
            .exp-side-next {
                right: 12px;
            }
        }`
);

fs.writeFileSync('about_test.html', updated, 'utf8');
console.log('Updated mobile rules in about_test.html');
