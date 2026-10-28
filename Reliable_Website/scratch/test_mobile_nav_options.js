const fs = require('fs');

let cssA = `
        /* Option A: side arrows on desktop, flanking dots on mobile */
        @media(min-width: 769px) {
            .exp-side-arrow {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 46px;
                height: 46px;
                border-radius: 50%;
                background: #ffffff;
                color: var(--dark-navy);
                border: 1px solid rgba(0, 0, 0, 0.08);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                outline: none;
                padding: 0;
            }
            .exp-side-arrow:hover {
                background: var(--accent-orange);
                color: #ffffff;
                border-color: var(--accent-orange);
                box-shadow: 0 10px 25px rgba(244, 123, 32, 0.4);
                transform: translateY(-50%) scale(1.08);
            }
            .exp-side-prev { left: -23px; }
            .exp-side-prev:hover svg { transform: translateX(-2px); }
            .exp-side-next { right: -23px; }
            .exp-side-next:hover svg { transform: translateX(2px); }
            .exp-bottom-nav {
                display: flex;
                justify-content: center;
                margin-top: 4px;
            }
        }
        @media(max-width: 768px) {
            .exp-bottom-nav {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 16px;
                margin-top: 10px;
                position: relative;
                z-index: 2;
            }
            .exp-side-arrow {
                position: static;
                transform: none !important;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #ffffff;
                color: var(--dark-navy);
                border: 1px solid rgba(0, 0, 0, 0.08);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                outline: none;
                padding: 0;
                transition: all 0.2s ease;
            }
            .exp-side-arrow:active {
                background: var(--accent-orange);
                color: #ffffff;
                transform: scale(0.95) !important;
            }
        }
`;

console.log('Testing CSS structure:', cssA.length);
