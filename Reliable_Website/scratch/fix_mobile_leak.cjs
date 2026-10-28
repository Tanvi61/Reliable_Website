const fs = require('fs');
const path = require('path');

const ROOT = 'e:/MindAxis_Web/Reliable_Website';
const respPath = path.join(ROOT, 'css/responsive.css');
let respContent = fs.readFileSync(respPath, 'utf8');
let normResp = respContent.replace(/\r\n/g, '\n');

// 1. In tablet section, wrap in @media (min-width: 768px)
const oldTabletBlock = `  /* Connected single horizontal timeline for 768px - 1200px (Tablet & Laptop) */
  .process-timeline {
    position: relative;
    margin-top: 50px;
  }

  .process-line-bg {
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
    transform: scale(1.08);
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

const newTabletBlock = `  /* Connected single horizontal timeline for 768px - 1200px (Tablet & Laptop) */
  @media (min-width: 768px) {
    .process-timeline {
      position: relative;
      margin-top: 50px;
    }

    .process-line-bg {
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
      transform: scale(1.08);
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
    }
  }`;

if (normResp.includes(oldTabletBlock.replace(/\r\n/g, '\n'))) {
    normResp = normResp.replace(oldTabletBlock.replace(/\r\n/g, '\n'), newTabletBlock);
    console.log('Successfully wrapped tablet process styles with @media (min-width: 768px)');
} else {
    console.error('Failed to match old tablet block');
}

// 2. In mobile section (max-width: 767px), make sure process-steps is flex column
const oldMobileSteps = `  .process-steps {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .process-step {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }`;

const newMobileSteps = `  .process-steps {
    display: flex !important;
    flex-direction: column !important;
    gap: 24px !important;
  }

  .process-step {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 16px !important;
    text-align: left !important;
  }
  
  .step-title {
    text-align: left !important;
  }`;

if (normResp.includes(oldMobileSteps.replace(/\r\n/g, '\n'))) {
    normResp = normResp.replace(oldMobileSteps.replace(/\r\n/g, '\n'), newMobileSteps);
    console.log('Successfully updated mobile process steps to flex column');
} else {
    console.error('Failed to match old mobile steps');
}

fs.writeFileSync(respPath, normResp.replace(/\n/g, '\r\n'), 'utf8');
