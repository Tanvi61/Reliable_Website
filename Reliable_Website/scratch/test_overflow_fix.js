const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testFix() {
  const port = 9999;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'http://127.0.0.1:5501/Reliable_Website/about.html'
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
            params: { width: 375, height: 667, deviceScaleFactor: 2, mobile: true }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);
          if (msg.id === 1) {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  // Apply fixes in DOM
                  document.documentElement.style.setProperty('overflow-x', 'clip', 'important');
                  document.documentElement.style.setProperty('max-width', '100vw', 'important');
                  document.body.style.setProperty('overflow-x', 'clip', 'important');
                  document.body.style.setProperty('max-width', '100vw', 'important');

                  const nav = document.querySelector('.nav-exact');
                  if (nav) {
                    nav.style.setProperty('left', '10px', 'important');
                    nav.style.setProperty('right', '10px', 'important');
                    nav.style.setProperty('width', 'auto', 'important');
                    nav.style.setProperty('max-width', 'calc(100vw - 20px)', 'important');
                  }

                  const links = document.querySelector('.nav-exact .nav-links');
                  if (links && !links.classList.contains('active')) {
                    links.style.setProperty('display', 'none', 'important');
                  }

                  // Check grid in mission section
                  const grids = document.querySelectorAll('section div[style*=\"grid-template-columns\"]');
                  grids.forEach(g => {
                    g.style.setProperty('grid-template-columns', '1fr', 'important');
                    g.style.setProperty('gap', '30px', 'important');
                  });

                  // Scroll down to Mission, Vision section (matching user screenshot)
                  const missionSec = document.querySelector('section[style*=\"linear-gradient\"]');
                  if (missionSec) missionSec.scrollIntoView({ behavior: 'instant', block: 'start' });

                  const navRect = nav ? nav.getBoundingClientRect() : null;
                  const hamburger = document.querySelector('.hamburger-exact');
                  const hamRect = hamburger ? hamburger.getBoundingClientRect() : null;
                  const fl = document.querySelector('.floating-actions');
                  const flRect = fl ? fl.getBoundingClientRect() : null;

                  return {
                    winW: window.innerWidth,
                    docScrollW: document.documentElement.scrollWidth,
                    bodyScrollW: document.body.scrollWidth,
                    navRight: navRect ? navRect.right : null,
                    hamburgerRight: hamRect ? hamRect.right : null,
                    floatingRight: flRect ? flRect.right : null
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('DOM FIX RESULT:', msg.result.result.value);
            ws.send(JSON.stringify({
              id: 3,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/test_fixed_about_overflow.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/test_fixed_about_overflow.png');
            ws.close();
            chrome.kill();
          }
        };
      });
    });
  }, 1500);
}

testFix();
