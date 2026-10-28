const fs = require('fs');
const path = require('path');

const ROOT = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update css/style.css
const stylePath = path.join(ROOT, 'css/style.css');
let styleContent = fs.readFileSync(stylePath, 'utf8');

const oldStyleSnippet = `.process-timeline {
  position: relative;
  margin-top: 60px;
}

.process-line-bg {
  position: absolute;
  top: 36px;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--border-light);
  z-index: 1;
}

.process-line-fill {
  position: absolute;
  top: 36px;
  left: 0;
  width: 0%;
  height: 4px;
  background: var(--accent-orange);
  z-index: 2;
  transition: width 1s ease-out;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  position: relative;
  z-index: 3;
}

.process-step {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.step-node {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 3px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--primary-navy);
  margin-bottom: 24px;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.process-step.active .step-node,
.process-step:hover .step-node {
  border-color: var(--accent-orange);
  background: var(--accent-orange);
  color: #FFFFFF;
  box-shadow: 0 0 20px var(--accent-orange-glow);
  transform: scale(1.08);
}

.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1.35;
}`;

const newStyleSnippet = `.process-timeline {
  position: relative;
  margin-top: 60px;
}

.process-line-bg {
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
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  position: relative;
  z-index: 3;
}

.process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.step-node {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 3px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--primary-navy);
  margin: 0 auto 24px auto;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
  position: relative;
  z-index: 4;
}

.process-step.active .step-node,
.process-step:hover .step-node {
  border-color: var(--accent-orange);
  background: var(--accent-orange);
  color: #FFFFFF;
  box-shadow: 0 0 20px var(--accent-orange-glow);
  transform: scale(1.08);
}

.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1.35;
  text-align: center;
}`;

// Normalize line breaks for matching
const normStyle = styleContent.replace(/\r\n/g, '\n');
const normOldStyle = oldStyleSnippet.replace(/\r\n/g, '\n');

if (normStyle.includes(normOldStyle)) {
    const updatedNorm = normStyle.replace(normOldStyle, newStyleSnippet.replace(/\r\n/g, '\n'));
    fs.writeFileSync(stylePath, updatedNorm.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Successfully updated css/style.css');
} else {
    console.error('Failed to match old snippet in css/style.css');
}

// 2. Update css/responsive.css
const respPath = path.join(ROOT, 'css/responsive.css');
let respContent = fs.readFileSync(respPath, 'utf8');
let normResp = respContent.replace(/\r\n/g, '\n');

// Tablet replacement (lines 42 to 122)
const oldRespSnippet = `  .process-steps {
    grid-template-columns: repeat(3, 1fr);
    gap: 46px 28px;
    position: relative;
  }
  
  .process-line-bg, .process-line-fill {
    display: none;
  }

  .process-step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
  }

  /* Inactive baseline track between steps in Row 1 and Row 2 */
  .process-step:not(:nth-child(3)):not(:nth-child(6))::before {
    content: '';
    position: absolute;
    top: 36px;
    left: 72px;
    right: -28px;
    height: 4px;
    background: #e2e8f0;
    z-index: 1;
    border-radius: 2px;
  }

  /* Animated orange fill line between steps */
  .process-step:not(:nth-child(3)):not(:nth-child(6))::after {
    content: '';
    position: absolute;
    top: 36px;
    left: 72px;
    width: 0% !important;
    max-width: calc(100% - 72px + 28px);
    height: 4px;
    background: linear-gradient(90deg, #f47b20, #ff8c33);
    box-shadow: 0 0 10px rgba(244, 123, 32, 0.45);
    z-index: 2;
    border-radius: 2px;
    transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  .process-step.active-line:not(:nth-child(3)):not(:nth-child(6))::after,
  .process-step.active-line::after {
    width: calc(100% - 72px + 28px) !important;
  }

  .step-node {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    position: relative;
    z-index: 4;
    background: #ffffff;
    border: 3px solid #cbd5e1;
    font-weight: 800;
    font-size: 1.15rem;
    color: var(--primary-navy, #082b4c);
    box-shadow: 0 4px 14px rgba(8, 43, 76, 0.08);
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    margin-bottom: 18px;
  }

  /* Active illuminated step node */
  .process-step.active .step-node {
    background: #f47b20 !important;
    border-color: #f47b20 !important;
    color: #ffffff !important;
    transform: scale(1.08) !important;
    box-shadow: 0 0 22px rgba(244, 123, 32, 0.65) !important;
  }

  .process-step.current-step .step-node {
    animation: pulseCurrent 1.8s infinite !important;
  }`;

const newRespSnippet = `  /* Connected single horizontal timeline for 768px - 1200px (Tablet & Laptop) */
  .process-timeline {
    position: relative;
    margin-top: 50px;
  }

  .process-line-bg, .process-line-fill {
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
  }

  .process-steps {
    display: grid !important;
    grid-template-columns: repeat(6, 1fr) !important;
    gap: 12px !important;
    position: relative;
    z-index: 3;
  }

  .process-step {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    cursor: pointer;
    position: relative;
  }

  .process-step::before,
  .process-step::after {
    display: none !important;
  }

  .step-node {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    position: relative;
    z-index: 4;
    background: #ffffff;
    border: 3px solid #cbd5e1;
    font-weight: 800;
    font-size: 1.05rem;
    color: var(--primary-navy, #082b4c);
    box-shadow: 0 4px 14px rgba(8, 43, 76, 0.08);
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    margin: 0 auto 14px auto;
  }

  .process-step.active .step-node,
  .process-step:hover .step-node {
    background: #f47b20 !important;
    border-color: #f47b20 !important;
    color: #ffffff !important;
    transform: scale(1.08) !important;
    box-shadow: 0 0 22px rgba(244, 123, 32, 0.65) !important;
  }

  .process-step.current-step .step-node {
    animation: pulseCurrent 1.8s infinite !important;
  }

  .step-title {
    font-size: 0.78rem;
    line-height: 1.3;
    text-align: center;
    color: var(--text-dark, #1e293b);
  }

  .desktop-break {
    display: none;
  }`;

if (normResp.includes(oldRespSnippet.replace(/\r\n/g, '\n'))) {
    normResp = normResp.replace(oldRespSnippet.replace(/\r\n/g, '\n'), newRespSnippet);
    console.log('Successfully updated tablet section in css/responsive.css');
} else {
    console.error('Failed to match old tablet snippet in css/responsive.css');
}

// Mobile line update in responsive.css
const oldMobileLine = `  /* Show vertical line on mobile */
  .process-line-bg, .process-line-fill {
    display: block !important;
    top: 0;
    left: 25px; /* centers 4px line in 54px node */
    width: 4px;
    height: 100%;
  }
  .process-line-fill {
    height: 0%;
    transition: height 1s ease-out, width 1s ease-out;
  }`;

const newMobileLine = `  /* Show vertical line on mobile connecting node 01 to node 06 */
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

if (normResp.includes(oldMobileLine.replace(/\r\n/g, '\n'))) {
    normResp = normResp.replace(oldMobileLine.replace(/\r\n/g, '\n'), newMobileLine);
    console.log('Successfully updated mobile vertical line in css/responsive.css');
} else {
    console.error('Failed to match mobile line in css/responsive.css');
}

fs.writeFileSync(respPath, normResp.replace(/\n/g, '\r\n'), 'utf8');

// 3. Update js/script.js
const scriptPath = path.join(ROOT, 'js/script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');
let normScript = scriptContent.replace(/\r\n/g, '\n');

const oldScriptSnippet = `    /* ==========================================
       4. PROCESS TIMELINE ANIMATION
    ========================================== */
    const processSection = document.querySelector('.process-section');
    const processTimeline = document.querySelector('.process-timeline');
    const processLineFill = document.querySelector('.process-line-fill');
    const processSteps = document.querySelectorAll('.process-step');
    
    if (processSection && processTimeline && processSteps.length >= 6) {
        if (processLineFill) {
            processLineFill.style.transition = 'width 0.45s cubic-bezier(0.4, 0, 0.2, 1), height 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        // True choreographed sequential cascade: Node illuminates -> Line fills to next node -> Next node illuminates
        let hasAnimatedSequence = false;
        const triggerProcessCascade = async () => {
            if (hasAnimatedSequence) return;
            hasAnimatedSequence = true;

            const delay = ms => new Promise(res => setTimeout(res, ms));

            // Step 01 illuminates
            processSteps[0].classList.add('animate', 'active', 'current-step');
            await delay(250);

            // Line 01 -> 02 draws
            processSteps[0].classList.add('active-line');
            if (processLineFill && window.innerWidth > 1200) {
                processLineFill.style.width = '20%';
            } else if (processLineFill && window.innerWidth <= 767) {
                processLineFill.style.height = '20%';
            }
            await delay(450); // wait for line 1 to reach node 02

            // Step 02 illuminates
            processSteps[0].classList.remove('current-step');
            processSteps[1].classList.add('animate', 'active', 'current-step');
            await delay(250);

            // Line 02 -> 03 draws
            processSteps[1].classList.add('active-line');
            if (processLineFill && window.innerWidth > 1200) {
                processLineFill.style.width = '40%';
            } else if (processLineFill && window.innerWidth <= 767) {
                processLineFill.style.height = '40%';
            }
            await delay(450); // wait for line 2 to reach node 03

            // Step 03 illuminates (Row 1 complete)
            processSteps[1].classList.remove('current-step');
            processSteps[2].classList.add('animate', 'active', 'current-step');
            await delay(400); // pause as focus shifts to Row 2

            // Transition to Row 2: Step 04 illuminates
            processSteps[2].classList.remove('current-step');
            processSteps[3].classList.add('animate', 'active', 'current-step');
            if (processLineFill && window.innerWidth > 1200) {
                processLineFill.style.width = '60%';
            } else if (processLineFill && window.innerWidth <= 767) {
                processLineFill.style.height = '60%';
            }
            await delay(250);

            // Line 04 -> 05 draws
            processSteps[3].classList.add('active-line');
            if (processLineFill && window.innerWidth > 1200) {
                processLineFill.style.width = '80%';
            } else if (processLineFill && window.innerWidth <= 767) {
                processLineFill.style.height = '80%';
            }
            await delay(450); // wait for line 4 to reach node 05

            // Step 05 illuminates
            processSteps[3].classList.remove('current-step');
            processSteps[4].classList.add('animate', 'active', 'current-step');
            await delay(250);

            // Line 05 -> 06 draws
            processSteps[4].classList.add('active-line');
            if (processLineFill && window.innerWidth > 1200) {
                processLineFill.style.width = '100%';
            } else if (processLineFill && window.innerWidth <= 767) {
                processLineFill.style.height = '100%';
            }
            await delay(450); // wait for line 5 to reach node 06

            // Step 06 illuminates (Final step)
            processSteps[4].classList.remove('current-step');
            processSteps[5].classList.add('animate', 'active', 'current-step');
        };

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    triggerProcessCascade();
                }
            });
        }, { threshold: 0.15 });
        timelineObserver.observe(processSection);

        // Scroll listener for interactive progress
        window.addEventListener('scroll', () => {
            if (hasAnimatedSequence) return; // Keep fully animated state once completed
            const rect = processTimeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.75;
            let progress = 0;

            if (rect.top < triggerPoint) {
                const distance = 420;
                let scrolledPastTrigger = triggerPoint - rect.top;
                progress = (scrolledPastTrigger / distance) * 100;
                if (progress < 0) progress = 0;
                if (progress > 100) progress = 100;
            }

            const isMobile = window.innerWidth <= 767;
            const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1200;

            if (processLineFill) {
                if (isMobile) {
                    processLineFill.style.width = '4px';
                    processLineFill.style.height = progress + '%';
                } else if (!isTablet) {
                    processLineFill.style.height = '4px';
                    processLineFill.style.width = progress + '%';
                }
            }

            // Sync node activation with scroll progress
            if (progress >= 10) processSteps[0].classList.add('active');
            if (progress >= 25) { processSteps[0].classList.add('active-line'); processSteps[1].classList.add('active'); }
            if (progress >= 42) { processSteps[1].classList.add('active-line'); processSteps[2].classList.add('active'); }
            if (progress >= 60) processSteps[3].classList.add('active');
            if (progress >= 78) { processSteps[3].classList.add('active-line'); processSteps[4].classList.add('active'); }
            if (progress >= 95) { processSteps[4].classList.add('active-line'); processSteps[5].classList.add('active'); }
        }, { passive: true });

        // Touch & click interaction for tablets and mobile devices
        processSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                hasAnimatedSequence = true;
                processSteps.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                        if (i < index && i !== 2) {
                            s.classList.add('active-line');
                        } else {
                            s.classList.remove('active-line');
                        }
                    } else {
                        s.classList.remove('active');
                        s.classList.remove('active-line');
                    }
                    s.classList.remove('current-step');
                });
                step.classList.add('current-step');
            });
        });
    }`;

const newScriptSnippet = `    /* ==========================================
       4. PROCESS TIMELINE ANIMATION (Connected 1 to 6)
    ========================================== */
    const processSection = document.querySelector('.process-section');
    const processTimeline = document.querySelector('.process-timeline');
    const processLineFill = document.querySelector('.process-line-fill');
    const processSteps = document.querySelectorAll('.process-step');
    
    if (processSection && processTimeline && processSteps.length >= 6) {
        if (processLineFill) {
            processLineFill.style.transition = 'width 0.45s cubic-bezier(0.4, 0, 0.2, 1), height 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        const setProcessProgress = (pct) => {
            if (!processLineFill) return;
            if (window.innerWidth <= 767) {
                processLineFill.style.width = '4px';
                processLineFill.style.height = pct + '%';
            } else {
                processLineFill.style.height = '4px';
                processLineFill.style.width = pct + '%';
            }
        };

        // Choreographed sequential cascade: Node illuminates -> Line fills connected to next node -> Next node illuminates
        let hasAnimatedSequence = false;
        const triggerProcessCascade = async () => {
            if (hasAnimatedSequence) return;
            hasAnimatedSequence = true;

            const delay = ms => new Promise(res => setTimeout(res, ms));

            // Reset initial state
            setProcessProgress(0);
            processSteps.forEach(s => s.classList.remove('active', 'current-step'));

            // Step 01 illuminates
            processSteps[0].classList.add('animate', 'active', 'current-step');
            await delay(250);

            // Line 01 -> 02 draws connected
            setProcessProgress(20);
            await delay(450); // wait for line to reach node 02

            // Step 02 illuminates
            processSteps[0].classList.remove('current-step');
            processSteps[1].classList.add('animate', 'active', 'current-step');
            await delay(250);

            // Line 02 -> 03 draws connected
            setProcessProgress(40);
            await delay(450); // wait for line to reach node 03

            // Step 03 illuminates
            processSteps[1].classList.remove('current-step');
            processSteps[2].classList.add('animate', 'active', 'current-step');
            await delay(250);

            // Line 03 -> 04 draws connected (unbroken flow)
            setProcessProgress(60);
            await delay(450); // wait for line to reach node 04

            // Step 04 illuminates
            processSteps[2].classList.remove('current-step');
            processSteps[3].classList.add('animate', 'active', 'current-step');
            await delay(250);

            // Line 04 -> 05 draws connected
            setProcessProgress(80);
            await delay(450); // wait for line to reach node 05

            // Step 05 illuminates
            processSteps[3].classList.remove('current-step');
            processSteps[4].classList.add('animate', 'active', 'current-step');
            await delay(250);

            // Line 05 -> 06 draws connected
            setProcessProgress(100);
            await delay(450); // wait for line to reach node 06

            // Step 06 illuminates (Final step)
            processSteps[4].classList.remove('current-step');
            processSteps[5].classList.add('animate', 'active', 'current-step');
            await delay(600);
            processSteps[5].classList.remove('current-step');
        };

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    triggerProcessCascade();
                }
            });
        }, { threshold: 0.15 });
        timelineObserver.observe(processSection);

        // Scroll listener for interactive progress
        window.addEventListener('scroll', () => {
            if (hasAnimatedSequence) return; // Keep fully animated state once completed
            const rect = processTimeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.75;
            let progress = 0;

            if (rect.top < triggerPoint) {
                const distance = 420;
                let scrolledPastTrigger = triggerPoint - rect.top;
                progress = Math.min(100, Math.max(0, (scrolledPastTrigger / distance) * 100));
            }

            setProcessProgress(progress);

            // Sync node activation with scroll progress
            processSteps.forEach((step, idx) => {
                const threshold = idx * 20;
                if (progress >= threshold) {
                    step.classList.add('active');
                }
            });
        }, { passive: true });

        // Touch & click interaction for tablets and mobile devices
        processSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                hasAnimatedSequence = true;
                const targetPct = index * 20;
                setProcessProgress(targetPct);
                processSteps.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active', 'current-step');
                    }
                });
                processSteps.forEach(s => s.classList.remove('current-step'));
                step.classList.add('current-step');
            });
        });
    }`;

if (normScript.includes(oldScriptSnippet.replace(/\r\n/g, '\n'))) {
    normScript = normScript.replace(oldScriptSnippet.replace(/\r\n/g, '\n'), newScriptSnippet);
    fs.writeFileSync(scriptPath, normScript.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Successfully updated js/script.js');
} else {
    console.error('Failed to match old snippet in js/script.js');
}
