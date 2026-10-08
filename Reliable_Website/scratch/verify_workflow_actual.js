const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function captureWorkflow() {
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
            // Scroll to the workflow section
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const sec = document.querySelector('.workflow-theme-section');
                  if (sec) {
                    sec.scrollIntoView({ behavior: 'instant', block: 'start' });
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
            }, 800);
          } else if (msg.id === 3) {
            const outPath = path.join(__dirname, 'workflow_verified_desktop.png');
            fs.writeFileSync(outPath, Buffer.from(msg.result.data, 'base64'));
            console.log('Saved ' + outPath);

            // Now scroll slightly down to show the workflow cards + FAQ section boundary
            ws.send(JSON.stringify({
              id: 4,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const faqSec = document.querySelector('.faqs-theme-section');
                  if (faqSec) {
                    faqSec.scrollIntoView({ behavior: 'instant', block: 'center' });
                    return true;
                  }
                  return false;
                })()`
              }
            }));
          } else if (msg.id === 4) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 5,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          } else if (msg.id === 5) {
            const outPath = path.join(__dirname, 'faqs_verified_desktop.png');
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

captureWorkflow();
