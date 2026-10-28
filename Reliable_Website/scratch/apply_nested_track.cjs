const fs = require('fs');
const path = require('path');

const ROOT = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update index.html to nest process-line-fill inside process-line-bg
const indexPath = path.join(ROOT, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const oldHtmlTimeline = `            <div class="process-timeline">
                <div class="process-line-bg fade-up"></div>
                <div class="process-line-fill"></div>

                <div class="process-steps">`;

const newHtmlTimeline = `            <div class="process-timeline">
                <div class="process-line-bg fade-up">
                    <div class="process-line-fill"></div>
                </div>

                <div class="process-steps">`;

const normIndex = indexHtml.replace(/\r\n/g, '\n');
if (normIndex.includes(oldHtmlTimeline.replace(/\r\n/g, '\n'))) {
    const updated = normIndex.replace(oldHtmlTimeline.replace(/\r\n/g, '\n'), newHtmlTimeline);
    fs.writeFileSync(indexPath, updated.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Successfully updated index.html with nested track');
} else {
    console.log('index.html already has nested track or snippet not found');
}

// 2. Update css/style.css
const stylePath = path.join(ROOT, 'css/style.css');
let styleContent = fs.readFileSync(stylePath, 'utf8');
let normStyle = styleContent.replace(/\r\n/g, '\n');

const oldStyleLineSnippet = `.process-line-bg {
  position: absolute;
  top: 36px;
  left: calc(100% / 12);
  width: calc(100% * 5 / 6);
  height: 4px;
  background: var(--border-light);
  border-radius: 2px;
  z-index: 1;
}

.process-line-fill {
  position: absolute;
  top: 36px;
  left: calc(100% / 12);
  width: 0%;
  height: 4px;
  background: linear-gradient(90deg, #f47b20, #ff8c33);
  box-shadow: 0 0 12px rgba(244, 123, 32, 0.6);
  border-radius: 2px;
  z-index: 2;
  transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}`;

const newStyleLineSnippet = `.process-line-bg {
  position: absolute;
  top: 36px;
  left: calc(100% / 12);
  width: calc(100% * 5 / 6);
  height: 4px;
  background: var(--border-light);
  border-radius: 2px;
  z-index: 1;
  overflow: hidden;
}

.process-line-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #f47b20, #ff8c33);
  box-shadow: 0 0 12px rgba(244, 123, 32, 0.6);
  border-radius: 2px;
  z-index: 2;
  transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1), height 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}`;

if (normStyle.includes(oldStyleLineSnippet.replace(/\r\n/g, '\n'))) {
    normStyle = normStyle.replace(oldStyleLineSnippet.replace(/\r\n/g, '\n'), newStyleLineSnippet);
    fs.writeFileSync(stylePath, normStyle.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Successfully updated css/style.css nested track');
} else {
    console.log('style.css snippet not matched for nested track');
}

// 3. Update css/responsive.css
const respPath = path.join(ROOT, 'css/responsive.css');
let respContent = fs.readFileSync(respPath, 'utf8');
let normResp = respContent.replace(/\r\n/g, '\n');

const oldRespLineSnippet = `  .process-line-bg, .process-line-fill {
    display: block !important;
    position: absolute;
    top: 29px; /* center of 58px node */
    left: calc(100% / 12);
    width: calc(100% * 5 / 6);
    height: 4px;
    border-radius: 2px;
  }

  .process-line-bg {
    background: #e2e8f0;
    z-index: 1;
  }

  .process-line-fill {
    background: linear-gradient(90deg, #f47b20, #ff8c33);
    box-shadow: 0 0 12px rgba(244, 123, 32, 0.6);
    z-index: 2;
    width: 0%;
    transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }`;

const newRespLineSnippet = `  .process-line-bg {
    display: block !important;
    position: absolute;
    top: 29px; /* center of 58px node */
    left: calc(100% / 12);
    width: calc(100% * 5 / 6);
    height: 4px;
    border-radius: 2px;
    background: #e2e8f0;
    overflow: hidden;
    z-index: 1;
  }

  .process-line-fill {
    display: block !important;
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(90deg, #f47b20, #ff8c33);
    box-shadow: 0 0 12px rgba(244, 123, 32, 0.6);
    z-index: 2;
    border-radius: 2px;
    transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }`;

if (normResp.includes(oldRespLineSnippet.replace(/\r\n/g, '\n'))) {
    normResp = normResp.replace(oldRespLineSnippet.replace(/\r\n/g, '\n'), newRespLineSnippet);
    console.log('Successfully updated tablet line in css/responsive.css');
}

// Mobile responsive nested line
const oldMobileLine = `  /* Show vertical line on mobile connecting node 01 to node 06 */
  .process-line-bg, .process-line-fill {
    display: block !important;
    top: 27px; /* center of 54px node 01 */
    left: 25px; /* centers 4px line in 54px node */
    width: 4px;
    height: calc(100% - 54px);
  }
  .process-line-fill {
    height: 0%;
    transition: height 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }`;

const newMobileLine = `  /* Show vertical line on mobile connecting node 01 to node 06 */
  .process-line-bg {
    display: block !important;
    position: absolute;
    top: 27px; /* center of 54px node 01 */
    left: 25px; /* centers 4px line in 54px node */
    width: 4px;
    height: calc(100% - 54px);
    overflow: hidden;
    z-index: 1;
  }
  .process-line-fill {
    display: block !important;
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 0%;
    transition: height 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }`;

if (normResp.includes(oldMobileLine.replace(/\r\n/g, '\n'))) {
    normResp = normResp.replace(oldMobileLine.replace(/\r\n/g, '\n'), newMobileLine);
    console.log('Successfully updated mobile vertical line in css/responsive.css');
}

fs.writeFileSync(respPath, normResp.replace(/\n/g, '\r\n'), 'utf8');

// 4. Update js/script.js setProcessProgress
const scriptPath = path.join(ROOT, 'js/script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');
let normScript = scriptContent.replace(/\r\n/g, '\n');

const oldSetProgress = `        const setProcessProgress = (pct) => {
            if (!processLineFill) return;
            if (window.innerWidth <= 767) {
                processLineFill.style.width = '4px';
                processLineFill.style.height = pct + '%';
            } else {
                processLineFill.style.height = '4px';
                processLineFill.style.width = pct + '%';
            }
        };`;

const newSetProgress = `        const setProcessProgress = (pct) => {
            if (!processLineFill) return;
            if (window.innerWidth <= 767) {
                processLineFill.style.width = '100%';
                processLineFill.style.height = pct + '%';
            } else {
                processLineFill.style.height = '100%';
                processLineFill.style.width = pct + '%';
            }
        };`;

if (normScript.includes(oldSetProgress.replace(/\r\n/g, '\n'))) {
    normScript = normScript.replace(oldSetProgress.replace(/\r\n/g, '\n'), newSetProgress);
    fs.writeFileSync(scriptPath, normScript.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Successfully updated js/script.js setProcessProgress');
}
