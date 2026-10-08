const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureMobile() {
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
            params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
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
                  const btnGrid = document.querySelector('.service-spec-cta-grid');
                  if (btnGrid) {
                    btnGrid.scrollIntoView({ behavior: 'instant', block: 'center' });
                    return {
                      quoteText: document.querySelector('.btn-spec-quote').textContent.trim(),
                      waText: document.querySelector('.btn-spec-whatsapp').textContent.trim()
                    };
                  }
                  return null;
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('Mobile evaluation:', msg.result.result.value);
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 500);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/service_buttons_mobile.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/service_buttons_mobile.png');
            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1200);
}

captureMobile();
