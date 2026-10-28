const fs = require('fs');

const raw = fs.readFileSync('about.html', 'utf8');
const isCRLF = raw.includes('\r\n');
const eol = isCRLF ? '\r\n' : '\n';
const lines = raw.split(/\r?\n/);

// 1. Section padding: 45px 20px 55px 20px
for (let i = 450; i < 465; i++) {
  if (lines[i] && lines[i].includes('padding:')) {
    lines[i] = lines[i].replace(/padding:[^;"]+;/, 'padding: 45px 20px 55px 20px;');
  }
}

// 2. Heading margins
for (let i = 500; i < 620; i++) {
  if (lines[i] && lines[i].includes('margin-bottom:') && lines[i].includes('fade-up') && lines[i].includes('text-align: center;')) {
    lines[i] = lines[i].replace(/margin-bottom:\s*\d+px;/, 'margin-bottom: 26px;');
  }
  if (lines[i] && lines[i].includes('OUR EXPERTISE') && lines[i].includes('margin-bottom:')) {
    lines[i] = lines[i].replace(/margin-bottom:\s*\d+px;/, 'margin-bottom: 8px;');
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
for (let i = styleStart; i < styleStart + 160; i++) {
  if (lines[i] && lines[i].trim() === '</style>') {
    styleEnd = i;
    break;
  }
}

const newStyleLines = [
  '        <style>',
  '        .exp-slider-wrapper {',
  '            max-width: 1020px;',
  '            margin: 0 auto;',
  '            display: flex;',
  '            flex-direction: column;',
  '            gap: 16px;',
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
  '            border-radius: 20px;',
  '            box-shadow: 0 20px 50px rgba(0,0,0,0.08);',
  '            overflow: hidden;',
  '            min-height: 420px;',
  '            height: 420px;',
  '            position: relative;',
  '        }',
  '        .exp-slider-img-col {',
  '            flex: 0 0 45%;',
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
  '            padding: 44px 50px;',
  '            position: relative;',
  '            display: flex;',
  '            flex-direction: column;',
  '            justify-content: center;',
  '            background: transparent;',
  '        }',
  '        .exp-top-bar {',
  '            display: flex; justify-content: space-between; align-items: center;',
  '            border-bottom: 1px solid #eaeaea;',
  '            padding-bottom: 12px;',
  '            margin-bottom: 24px;',
  '            position: absolute; top: 32px; left: 50px; right: 50px;',
  '        }',
  '        .exp-line { width: 70px; height: 3px; background: var(--accent-orange); border-radius: 2px; }',
  '        .exp-counter { display: none !important; }',
  '',
  '        .exp-text-wrap {',
  '            position: relative; z-index: 2;',
  '            transition: opacity 0.4s ease, transform 0.4s ease;',
  '        }',
  '        .exp-tag {',
  '            color: var(--accent-orange); font-weight: 800; font-size: 0.88rem; letter-spacing: 2px;',
  '            margin-bottom: 10px; display: flex; align-items: center; gap: 8px; text-transform: uppercase;',
  '        }',
  '        .exp-dot { display: none !important; }',
  '        .exp-text-wrap h2 {',
  '            font-size: 2.35rem; color: var(--dark-navy); margin-bottom: 14px; line-height: 1.15; font-weight: 900;',
  '        }',
  '        .exp-text-wrap p {',
  '            color: var(--text-muted); font-size: 1.05rem; line-height: 1.7; max-width: 95%; margin: 0;',
  '        }',
  '        .exp-watermark { display: none !important; }',
  '',
  '        /* Side Navigation Arrows - Spaced away from the box */',
  '        .exp-side-arrow {',
  '            position: absolute;',
  '            top: 50%;',
  '            transform: translateY(-50%);',
  '            width: 50px;',
  '            height: 50px;',
  '            border-radius: 50%;',
  '            background: #ffffff;',
  '            color: var(--dark-navy);',
  '            border: 1px solid rgba(0, 0, 0, 0.08);',
  '            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);',
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
  '            transform: translateY(-50%) scale(1.1);',
  '        }',
  '        /* Put away from the box with a clean 20px gap */',
  '        .exp-side-prev {',
  '            left: -70px;',
  '        }',
  '        .exp-side-prev:hover svg {',
  '            transform: translateX(-2px);',
  '        }',
  '        .exp-side-next {',
  '            right: -70px;',
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
  '            margin-top: 6px;',
  '            position: relative;',
  '            z-index: 2;',
  '        }',
  '        .exp-dot-btn {',
  '            width: 9px; height: 9px; border-radius: 50%; background: #d0d7de; border: none; cursor: pointer; transition: all 0.3s ease; padding: 0;',
  '        }',
  '        .exp-dot-btn.active {',
  '            width: 28px; border-radius: 4px; background: var(--accent-orange);',
  '        }',
  '',
  '        @media(max-width: 1220px) {',
  '            .exp-slider-wrapper { max-width: 920px; }',
  '            .exp-side-prev { left: -60px; }',
  '            .exp-side-next { right: -60px; }',
  '        }',
  '',
  '        @media(max-width: 1060px) {',
  '            .exp-slider-wrapper { max-width: 860px; }',
  '            .exp-side-prev { left: -54px; }',
  '            .exp-side-next { right: -54px; }',
  '        }',
  '',
  '        @media(max-width: 768px) {',
  '            .exp-slider-wrapper { max-width: 100%; }',
  '            .exp-slider-card { flex-direction: column; min-height: auto; height: auto; }',
  '            .exp-slider-img-col { height: 240px; flex: none; }',
  '            .exp-slider-content-col { padding: 40px 22px 24px 22px; }',
  '            .exp-top-bar { left: 22px; right: 22px; top: 16px; }',
  '            .exp-text-wrap h2 { font-size: 1.7rem; }',
  '            .exp-side-arrow {',
  '                top: auto;',
  '                bottom: -54px;',
  '                transform: none !important;',
  '                width: 42px;',
  '                height: 42px;',
  '            }',
  '            .exp-side-prev {',
  '                left: calc(50% - 100px);',
  '            }',
  '            .exp-side-next {',
  '                right: calc(50% - 100px);',
  '            }',
  '            .exp-dots {',
  '                margin-top: 24px;',
  '            }',
  '        }',
  '        </style>'
];

lines.splice(styleStart, (styleEnd - styleStart + 1), ...newStyleLines);

fs.writeFileSync('about.html', lines.join(eol), 'utf8');
console.log('Successfully updated about.html with larger box and spaced-out icons!');
