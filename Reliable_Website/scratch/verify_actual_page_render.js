const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function verifyActualRender() {
  const port = 9993;
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
            // Scroll to the engineering survey section
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const sec = document.querySelector('.engineering-survey-section');
                  if (sec) {
                    window.scrollTo(0, sec.offsetTop - 70);
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
            fs.writeFileSync('scratch/final_verified_desktop.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/final_verified_desktop.png');

            // Switch to Mobile
            ws.send(JSON.stringify({
              id: 4,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
            }));
          } else if (msg.id === 4) {
            ws.send(JSON.stringify({
              id: 5,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const sec = document.querySelector('.engineering-survey-section');
                  if (sec) {
                    window.scrollTo(0, sec.offsetTop - 65);
                    return true;
                  }
                  return false;
                })()`
              }
            }));
          } else if (msg.id === 5) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 6,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          } else if (msg.id === 6) {
            fs.writeFileSync('scratch/final_verified_mobile.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/final_verified_mobile.png');

            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1200);
}

verifyActualRender();
