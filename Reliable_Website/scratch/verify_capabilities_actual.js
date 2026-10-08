const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function verifyCapabilities() {
  const port = 9991;
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
            // Scroll to the capabilities section
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const sec = document.querySelector('.capabilities-theme-section');
                  if (sec) {
                    sec.scrollIntoView({ behavior: 'instant', block: 'center' });
                    return true;
                  }
                  return false;
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
            fs.writeFileSync('scratch/actual_cap_desktop.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/actual_cap_desktop.png');

            // Dispatch hover over card 3 (Legal & Cadastral Boundary Alignment)
            ws.send(JSON.stringify({
              id: 4,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const cards = document.querySelectorAll('.capability-card');
                  if (cards && cards.length >= 3) {
                    const rect = cards[2].getBoundingClientRect();
                    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                  }
                  return null;
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 4) {
            const pos = msg.result.result.value;
            if (pos) {
              ws.send(JSON.stringify({
                id: 5,
                method: 'Input.dispatchMouseEvent',
                params: {
                  type: 'mouseMoved',
                  x: pos.x,
                  y: pos.y
                }
              }));
            }
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 6,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 500);
          } else if (msg.id === 6) {
            fs.writeFileSync('scratch/actual_cap_hover.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/actual_cap_hover.png');

            // Switch to Mobile
            ws.send(JSON.stringify({
              id: 7,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
            }));
          } else if (msg.id === 7) {
            ws.send(JSON.stringify({
              id: 8,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const sec = document.querySelector('.capabilities-theme-section');
                  if (sec) {
                    sec.scrollIntoView({ behavior: 'instant', block: 'start' });
                    return true;
                  }
                  return false;
                })()`
              }
            }));
          } else if (msg.id === 8) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 9,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          } else if (msg.id === 9) {
            fs.writeFileSync('scratch/actual_cap_mobile.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/actual_cap_mobile.png');

            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1200);
}

verifyCapabilities();
