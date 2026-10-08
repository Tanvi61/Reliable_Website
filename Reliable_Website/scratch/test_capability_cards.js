const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testCapabilityCards() {
  const port = 9992;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'http://127.0.0.1:5501/Reliable_Website/topographical-survey.html'
  ]);

  setTimeout(() => {
    http.get('http://127.0.0.1:' + port + '/json', res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const tabs = JSON.parse(data);
        const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

        ws.onopen = () => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Emulation.setDeviceMetricsOverride',
            params: { width: 1280, height: 950, deviceScaleFactor: 1, mobile: false }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);

          if (msg.id === 1) {
            // Apply refined theme background and card animations
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('Key Capabilities'));
                  if (!h2) return false;
                  const sec = h2.closest('section');
                  
                  // Set Theme Background Color
                  sec.style.background = 'radial-gradient(circle at 10% 20%, rgba(244, 123, 32, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(8, 43, 76, 0.08) 0%, transparent 45%), linear-gradient(135deg, #edf5fd 0%, #f4f8fe 50%, #e8f2fc 100%)';
                  sec.style.position = 'relative';
                  sec.style.padding = '85px 0';

                  // Style Cards
                  const cards = sec.querySelectorAll('div[style*="border-radius: 12px"]');
                  const icons = [
                    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3l4 8 5-5 5 15H2L8 3z"/><path d="M4 18h16"/></svg>',
                    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
                    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
                    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
                  ];

                  cards.forEach((card, idx) => {
                    card.className = 'capability-card-demo';
                    card.style.background = '#ffffff';
                    card.style.borderRadius = '14px';
                    card.style.padding = '30px 26px';
                    card.style.border = '1px solid #d9e6f2';
                    card.style.boxShadow = '0 10px 30px rgba(8, 43, 76, 0.05)';
                    card.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                    card.style.position = 'relative';
                    card.style.overflow = 'hidden';
                    card.style.display = 'flex';
                    card.style.flexDirection = 'column';
                    card.style.justifyContent = 'flex-start';

                    // Insert top gradient accent
                    const topBar = document.createElement('div');
                    topBar.style.position = 'absolute';
                    topBar.style.top = '0';
                    topBar.style.left = '0';
                    topBar.style.width = '100%';
                    topBar.style.height = '4px';
                    topBar.style.background = idx % 2 === 0 ? 'linear-gradient(90deg, var(--accent-orange), #ffaa5b)' : 'linear-gradient(90deg, var(--primary-navy), #2563eb)';
                    card.prepend(topBar);

                    // Insert icon
                    const flexHead = card.querySelector('div[style*="display: flex"]');
                    if (flexHead && !flexHead.querySelector('.cap-icon-box')) {
                      const iconBox = document.createElement('div');
                      iconBox.className = 'cap-icon-box';
                      iconBox.style.width = '44px';
                      iconBox.style.height = '44px';
                      iconBox.style.borderRadius = '10px';
                      iconBox.style.display = 'flex';
                      iconBox.style.alignItems = 'center';
                      iconBox.style.justifyContent = 'center';
                      iconBox.style.flexShrink = '0';
                      iconBox.style.marginBottom = '16px';
                      iconBox.style.background = idx % 2 === 0 ? 'rgba(244, 123, 32, 0.1)' : 'rgba(8, 43, 76, 0.08)';
                      iconBox.style.color = idx % 2 === 0 ? 'var(--accent-orange)' : 'var(--dark-navy)';
                      iconBox.style.transition = 'all 0.3s ease';
                      iconBox.innerHTML = icons[idx];
                      
                      // Rearrange header: put icon above title for clear hierarchy
                      flexHead.style.flexDirection = 'column';
                      flexHead.style.alignItems = 'flex-start';
                      flexHead.style.gap = '0';
                      flexHead.prepend(iconBox);
                    }
                  });

                  // Add hover effect via CSS injection
                  const style = document.createElement('style');
                  style.innerHTML = \`
                    .capability-card-demo {
                      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease !important;
                    }
                    .capability-card-demo:hover {
                      transform: translateY(-8px) scale(1.015) !important;
                      box-shadow: 0 20px 40px -8px rgba(8, 43, 76, 0.12), 0 0 0 1px var(--accent-orange) !important;
                      border-color: var(--accent-orange) !important;
                    }
                    .capability-card-demo:hover .cap-icon-box {
                      transform: scale(1.1) rotate(5deg) !important;
                      background: var(--accent-orange) !important;
                      color: #ffffff !important;
                      box-shadow: 0 8px 18px rgba(244, 123, 32, 0.35) !important;
                    }
                    .capability-card-demo:hover h3 {
                      color: var(--accent-orange) !important;
                    }
                  \`;
                  document.head.appendChild(style);

                  sec.scrollIntoView({ behavior: 'instant', block: 'center' });
                  return true;
                })()`
              }
            }));
          } else if (msg.id === 2) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/test_cap_cards_desktop.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/test_cap_cards_desktop.png');

            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1200);
}

testCapabilityCards();
