const fs = require('fs');

const raw = fs.readFileSync('about.html', 'utf8');
const isCRLF = raw.includes('\r\n');
const eol = isCRLF ? '\r\n' : '\n';
const lines = raw.split(/\r?\n/);

// 1. Line 457 (section padding)
for (let i = 450; i < 465; i++) {
  if (lines[i] && lines[i].includes('padding: 100px 20px')) {
    lines[i] = lines[i].replace('padding: 100px 20px', 'padding: 24px 20px 35px 20px');
  }
}

// 2. Heading margins
for (let i = 570; i < 590; i++) {
  if (lines[i] && lines[i].includes('margin-bottom: 50px;')) {
    lines[i] = lines[i].replace('margin-bottom: 50px;', 'margin-bottom: 14px;');
  }
  if (lines[i] && lines[i].includes('margin-bottom: 15px;') && lines[i].includes('OUR EXPERTISE')) {
    lines[i] = lines[i].replace('margin-bottom: 15px;', 'margin-bottom: 4px;');
  }
}

// 3. Find style block (lines 460-575)
let styleStart = -1;
let styleEnd = -1;
for (let i = 455; i < 470; i++) {
  if (lines[i] && lines[i].trim() === '<style>') {
    styleStart = i;
    break;
  }
}
for (let i = styleStart; i < styleStart + 150; i++) {
  if (lines[i] && lines[i].trim() === '</style>') {
    styleEnd = i;
    break;
  }
}

const newStyleLines = [
  '        <style>',
  '        .exp-slider-wrapper {',
  '            max-width: 980px;',
  '            margin: 0 auto;',
  '            display: flex;',
  '            flex-direction: column;',
  '            gap: 12px;',
  '            position: relative;',
  '            z-index: 1;',
  '        }',
  '        .exp-card-container {',
  '            position: relative;',
  '            width: 100%;',
  '        }',
  '        .exp-slider-card {',
  '            display: flex;',
  '            background: rgba(255, 255, 255, 0.85);',
  '            backdrop-filter: blur(15px);',
  '            border: 1px solid rgba(255, 255, 255, 0.95);',
  '            border-radius: 18px;',
  '            box-shadow: 0 15px 45px rgba(0,0,0,0.07);',
  '            overflow: hidden;',
  '            min-height: 320px;',
  '            height: 320px;',
  '            position: relative;',
  '        }',
  '        .exp-slider-img-col {',
  '            flex: 0 0 44%;',
  '            position: relative;',
  '            overflow: hidden;',
  '            background: rgba(0,0,0,0.05);',
  '        }',
  '        .exp-slider-img-col img {',
  '            width: 100%; height: 100%; object-fit: cover;',
  '            transition: opacity 0.5s ease, transform 0.8s ease;',
  '        }',
  '        .exp-slider-content-col {',
  '            flex: 1;',
  '            padding: 26px 40px;',
  '            position: relative;',
  '            display: flex;',
  '            flex-direction: column;',
  '            justify-content: center;',
  '            background: transparent;',
  '        }',
  '        .exp-top-bar {',
  '            display: flex; justify-content: space-between; align-items: center;',
  '            border-bottom: 1px solid #eaeaea;',
  '            padding-bottom: 8px;',
  '            margin-bottom: 16px;',
  '            position: absolute; top: 20px; left: 40px; right: 40px;',
  '        }',
  '        .exp-line { width: 55px; height: 3px; background: var(--accent-orange); border-radius: 2px; }',
  '        .exp-counter { display: none !important; }',
  '',
  '        .exp-text-wrap {',
  '            position: relative; z-index: 2;',
  '            transition: opacity 0.4s ease, transform 0.4s ease;',
  '        }',
  '        .exp-tag {',
  '            color: var(--accent-orange); font-weight: 800; font-size: 0.82rem; letter-spacing: 2px;',
  '            margin-bottom: 6px; display: flex; align-items: center; gap: 8px; text-transform: uppercase;',
  '        }',
  '        .exp-dot { display: none !important; }',
  '        .exp-text-wrap h2 {',
  '            font-size: 2.05rem; color: var(--dark-navy); margin-bottom: 10px; line-height: 1.15; font-weight: 900;',
  '        }',
  '        .exp-text-wrap p {',
  '            color: var(--text-muted); font-size: 0.98rem; line-height: 1.6; max-width: 96%; margin: 0;',
  '        }',
  '        .exp-watermark { display: none !important; }',
  '',
  '        /* Side Navigation Arrows */',
  '        .exp-side-arrow {',
  '            position: absolute;',
  '            top: 50%;',
  '            transform: translateY(-50%);',
  '            width: 46px;',
  '            height: 46px;',
  '            border-radius: 50%;',
  '            background: #ffffff;',
  '            color: var(--dark-navy);',
  '            border: 1px solid rgba(0, 0, 0, 0.08);',
  '            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);',
  '            display: flex;',
  '            align-items: center;',
  '            justify-content: center;',
  '            cursor: pointer;',
  '            z-index: 10;',
  '            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);',
  '            outline: none;',
  '            padding: 0;',
  '        }',
  '        .exp-side-arrow svg {',
  '            transition: transform 0.25s ease;',
  '        }',
  '        .exp-side-arrow:hover {',
  '            background: var(--accent-orange);',
  '            color: #ffffff;',
  '            border-color: var(--accent-orange);',
  '            box-shadow: 0 10px 25px rgba(244, 123, 32, 0.4);',
  '            transform: translateY(-50%) scale(1.08);',
  '        }',
  '        .exp-side-prev {',
  '            left: -23px;',
  '        }',
  '        .exp-side-prev:hover svg {',
  '            transform: translateX(-2px);',
  '        }',
  '        .exp-side-next {',
  '            right: -23px;',
  '        }',
  '        .exp-side-next:hover svg {',
  '            transform: translateX(2px);',
  '        }',
  '        .exp-side-arrow:active {',
  '            transform: translateY(-50%) scale(0.95);',
  '        }',
  '',
  '        /* Dots beneath card */',
  '        .exp-dots {',
  '            display: flex;',
  '            gap: 10px;',
  '            align-items: center;',
  '            justify-content: center;',
  '            margin-top: 4px;',
  '            position: relative;',
  '            z-index: 2;',
  '        }',
  '        .exp-dot-btn {',
  '            width: 8px; height: 8px; border-radius: 50%; background: #d0d7de; border: none; cursor: pointer; transition: all 0.3s ease; padding: 0;',
  '        }',
  '        .exp-dot-btn.active {',
  '            width: 26px; border-radius: 4px; background: var(--accent-orange);',
  '        }',
  '',
  '        @media(max-width: 1060px) {',
  '            .exp-side-prev { left: 12px; }',
  '            .exp-side-next { right: 12px; }',
  '        }',
  '',
  '        @media(max-width: 768px) {',
  '            .exp-slider-card { flex-direction: column; min-height: auto; height: auto; }',
  '            .exp-slider-img-col { height: 210px; flex: none; }',
  '            .exp-slider-content-col { padding: 36px 18px 20px 18px; }',
  '            .exp-top-bar { left: 18px; right: 18px; top: 12px; }',
  '            .exp-text-wrap h2 { font-size: 1.55rem; }',
  '            .exp-side-arrow {',
  '                top: auto;',
  '                bottom: -50px;',
  '                transform: none !important;',
  '                width: 38px;',
  '                height: 38px;',
  '            }',
  '            .exp-side-prev {',
  '                left: calc(50% - 95px);',
  '            }',
  '            .exp-side-next {',
  '                right: calc(50% - 95px);',
  '            }',
  '            .exp-dots {',
  '                margin-top: 20px;',
  '            }',
  '        }',
  '        </style>'
];

lines.splice(styleStart, (styleEnd - styleStart + 1), ...newStyleLines);

// Find wrapper lines
let wrapStart = -1;
let wrapEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i] && lines[i].includes('class="exp-slider-wrapper fade-up"')) {
    wrapStart = i;
    break;
  }
}
for (let i = wrapStart; i < wrapStart + 50; i++) {
  if (lines[i] && lines[i].includes('class="exp-thumbnails"')) {
    wrapEnd = i + 2;
    break;
  }
}

const newWrapLines = [
  '            <div class="exp-slider-wrapper fade-up">',
  '                ',
  '                <div class="exp-card-container">',
  '                    <!-- Main Card -->',
  '                    <div class="exp-slider-card">',
  '                        <div class="exp-slider-img-col">',
  '                            <img id="exp-img" src="assets/images/total-station.jpg" alt="Expertise">',
  '                        </div>',
  '                        <div class="exp-slider-content-col">',
  '                            <!-- Top Bar -->',
  '                            <div class="exp-top-bar">',
  '                                <div class="exp-line"></div>',
  '                            </div>',
  '                            ',
  '                            <!-- Content -->',
  '                            <div class="exp-text-wrap" id="exp-text-wrap">',
  '                                <div class="exp-tag"><span id="exp-tag-text">PRECISION</span></div>',
  '                                <h2 id="exp-title">Accurate Measurements</h2>',
  '                                <p id="exp-desc">Accurate measurements and dependable survey data for critical engineering and design.</p>',
  '                            </div>',
  '                        </div>',
  '                    </div>',
  '',
  '                    <!-- Side Navigation Buttons -->',
  '                    <button class="exp-side-arrow exp-side-prev" onclick="expPrev()" aria-label="Previous image">',
  '                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  '                    </button>',
  '                    <button class="exp-side-arrow exp-side-next" onclick="expNext()" aria-label="Next image">',
  '                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  '                    </button>',
  '                </div>',
  '',
  '                <!-- Sleek Indicator Dots at Bottom -->',
  '                <div class="exp-dots" id="exp-dots-container"></div>',
  '',
  '            </div>'
];

lines.splice(wrapStart, (wrapEnd - wrapStart + 1), ...newWrapLines);

fs.writeFileSync('about_test.html', lines.join(eol), 'utf8');
console.log('Successfully written about_test.html!');
