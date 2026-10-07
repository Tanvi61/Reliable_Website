const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function runVerification() {
  const port = 9970;
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    'file:///E:/MindAxis_Web/Reliable_Website/index.html'
  ]);

  setTimeout(() => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const tabs = JSON.parse(data);
        const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

        ws.onopen = () => {
          // 1. Test mobile starting view (490x741) at scrollY = 0
          ws.send(JSON.stringify({
            id: 1,
            method: 'Emulation.setDeviceMetricsOverride',
            params: { width: 490, height: 741, deviceScaleFactor: 1, mobile: true }
          }));
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          
          if (msg.id === 1) {
            // Check bounding rect at scrollY = 0
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  window.scrollTo(0, 0);
                  const fl = document.querySelector('.floating-actions');
                  const r = fl ? fl.getBoundingClientRect() : null;
                  const cs = fl ? window.getComputedStyle(fl) : null;
                  const wa = document.querySelector('.float-btn.whatsapp');
                  const call = document.querySelector('.float-btn.call');
                  const war = wa ? wa.getBoundingClientRect() : null;
                  const callr = call ? call.getBoundingClientRect() : null;
                  return {
                    scrollY: window.scrollY,
                    viewportHeight: window.innerHeight,
                    floatingRect: r ? { top: r.top, bottom: r.bottom, right: r.right, width: r.width, height: r.height } : null,
                    whatsappRect: war ? { top: war.top, bottom: war.bottom, right: war.right, width: war.width, height: war.height } : null,
                    callRect: callr ? { top: callr.top, bottom: callr.bottom, right: callr.right, width: callr.width, height: callr.height } : null,
                    computed: cs ? { position: cs.position, top: cs.top, right: cs.right, display: cs.display, visibility: cs.visibility, opacity: cs.opacity } : null
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('--- MOBILE SCROLL 0 (STARTING VIEW) ---');
            console.log(JSON.stringify(msg.result.result.value, null, 2));

            // Capture screenshot at scroll 0
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 300);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/verify_mobile_starting_index.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/verify_mobile_starting_index.png');

            // 2. Scroll to bottom on mobile and check #scrollTopBtn alignment
            ws.send(JSON.stringify({
              id: 4,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  window.scrollTo(0, document.body.scrollHeight);
                  const fl = document.querySelector('.floating-actions');
                  const sc = document.querySelector('#scrollTopBtn');
                  const flr = fl ? fl.getBoundingClientRect() : null;
                  const scr = sc ? sc.getBoundingClientRect() : null;
                  const wa = document.querySelector('.float-btn.whatsapp');
                  const call = document.querySelector('.float-btn.call');
                  const war = wa ? wa.getBoundingClientRect() : null;
                  const callr = call ? call.getBoundingClientRect() : null;
                  return {
                    scrollY: window.scrollY,
                    viewportHeight: window.innerHeight,
                    floatingRect: flr ? { top: flr.top, bottom: flr.bottom, right: flr.right, width: flr.width, height: flr.height } : null,
                    whatsappRect: war ? { top: war.top, bottom: war.bottom, right: war.right, width: war.width, height: war.height } : null,
                    callRect: callr ? { top: callr.top, bottom: callr.bottom, right: callr.right, width: callr.width, height: callr.height } : null,
                    scrollTopRect: scr ? { top: scr.top, bottom: scr.bottom, right: scr.right, width: scr.width, height: scr.height } : null
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 4) {
            console.log('--- MOBILE SCROLLED BOTTOM ---');
            console.log(JSON.stringify(msg.result.result.value, null, 2));

            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 5,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 300);
          } else if (msg.id === 5) {
            fs.writeFileSync('scratch/verify_mobile_bottom_index.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/verify_mobile_bottom_index.png');

            // 3. Switch to Desktop 1440x900
            ws.send(JSON.stringify({
              id: 6,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }
            }));
          } else if (msg.id === 6) {
            // Evaluate desktop
            ws.send(JSON.stringify({
              id: 7,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  window.scrollTo(0, 0);
                  const fl = document.querySelector('.floating-actions');
                  const r = fl ? fl.getBoundingClientRect() : null;
                  const cs = fl ? window.getComputedStyle(fl) : null;
                  return {
                    scrollY: window.scrollY,
                    viewportHeight: window.innerHeight,
                    floatingRect: r ? { top: r.top, bottom: r.bottom, right: r.right, width: r.width, height: r.height } : null,
                    computed: cs ? { position: cs.position, top: cs.top, right: cs.right, display: cs.display } : null
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 7) {
            console.log('--- DESKTOP STARTING VIEW ---');
            console.log(JSON.stringify(msg.result.result.value, null, 2));

            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 8,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 300);
          } else if (msg.id === 8) {
            fs.writeFileSync('scratch/verify_desktop_starting_index.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/verify_desktop_starting_index.png');

            // Navigate to about.html to verify another page
            ws.send(JSON.stringify({
              id: 9,
              method: 'Page.navigate',
              params: { url: 'file:///E:/MindAxis_Web/Reliable_Website/about.html' }
            }));
          } else if (msg.id === 9) {
            // Wait for about.html load
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 10,
                method: 'Emulation.setDeviceMetricsOverride',
                params: { width: 490, height: 741, deviceScaleFactor: 1, mobile: true }
              }));
            }, 800);
          } else if (msg.id === 10) {
            ws.send(JSON.stringify({
              id: 11,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  window.scrollTo(0, 0);
                  const fl = document.querySelector('.floating-actions');
                  const r = fl ? fl.getBoundingClientRect() : null;
                  return {
                    page: 'about.html',
                    scrollY: window.scrollY,
                    floatingRect: r ? { top: r.top, bottom: r.bottom, right: r.right, width: r.width, height: r.height } : null
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 11) {
            console.log('--- ABOUT.HTML MOBILE STARTING VIEW ---');
            console.log(JSON.stringify(msg.result.result.value, null, 2));

            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 12,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 300);
          } else if (msg.id === 12) {
            fs.writeFileSync('scratch/verify_about_starting_mobile.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/verify_about_starting_mobile.png');

            ws.close();
            chromeProc.kill();
            console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
          }
        };
      });
    });
  }, 1500);
}

runVerification();
