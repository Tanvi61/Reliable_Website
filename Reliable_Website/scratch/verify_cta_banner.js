const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function captureCtaBanner() {
  const port = 9997;
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
            params: { width: 1280, height: 850, deviceScaleFactor: 1, mobile: false }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);

          if (msg.id === 1) {
            // Scroll to CTA banner
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const banner = document.querySelector('.service-cta-banner');
                  if (banner) banner.scrollIntoView({ behavior: 'instant', block: 'center' });
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
            const outPath = path.join(__dirname, 'cta_banner_verified.png');
            fs.writeFileSync(outPath, Buffer.from(msg.result.data, 'base64'));
            console.log('Saved ' + outPath);

            // Now test hover on the primary quote button
            ws.send(JSON.stringify({
              id: 4,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const btn = document.querySelector('.cta-banner-btn-primary');
                  if (btn) {
                    const rect = btn.getBoundingClientRect();
                    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                  }
                  return null;
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 4) {
            const coords = msg.result.result.value;
            if (coords) {
              ws.send(JSON.stringify({
                id: 5,
                method: 'Input.dispatchMouseEvent',
                params: {
                  type: 'mouseMoved',
                  x: coords.x,
                  y: coords.y
                }
              }));
            }
          } else if (msg.id === 5) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 6,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 500);
          } else if (msg.id === 6) {
            const outPath = path.join(__dirname, 'cta_btn_hover_verified.png');
            fs.writeFileSync(outPath, Buffer.from(msg.result.data, 'base64'));
            console.log('Saved ' + outPath);

            // Clean up
            chrome.kill();
            process.exit(0);
          }
        };
      });
    }).on('error', err => {
      console.error('HTTP error:', err.message);
      chrome.kill();
      process.exit(1);
    });
  }, 2000);
}

captureCtaBanner();
