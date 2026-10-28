const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function capture() {
  const port = 9993;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'file:///e:/MindAxis_Web/Reliable_Website/index.html'
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
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 2,
                method: 'Runtime.evaluate',
                params: {
                  expression: `
                    (() => {
                      const f = document.querySelector('.footer');
                      const r = f ? f.getBoundingClientRect() : null;
                      const y = window.pageYOffset + (r ? r.top : 0);
                      window.scrollTo(0, y + 400);
                      return { scrollHeight: document.body.scrollHeight, footerTop: y };
                    })()
                  `,
                  returnByValue: true
                }
              }));
            }, 600);
          }

          if (msg.id === 2) {
            console.log('Result id 2:', JSON.stringify(msg.result));
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          }

          if (msg.id === 3) {
            fs.writeFileSync('e:/MindAxis_Web/Reliable_Website/scratch/footer_current_render.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Screenshot saved!');
            ws.close();
            chrome.kill();
            process.exit(0);
          }
        };
      });
    }).on('error', err => {
      console.error(err);
      chrome.kill();
      process.exit(1);
    });
  }, 1000);
}
capture();
