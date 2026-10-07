const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function snap(y, filename, width, height) {
  const port = 9450 + Math.floor(Math.random()*40);
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    'file:///E:/MindAxis_Web/Reliable_Website/index.html'
  ]);

  return new Promise((resolve) => {
    setTimeout(() => {
      http.get(`http://127.0.0.1:${port}/json`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const tabs = JSON.parse(data);
          const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

          ws.onopen = () => {
            ws.send(JSON.stringify({
              id: 1,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width, height, deviceScaleFactor: 2, mobile: width < 768 }
            }));
          };

          ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id === 1) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `window.scrollTo(0, ${y})`
                  }
                }));
              }, 1000);
            } else if (msg.id === 2) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 3,
                  method: 'Page.captureScreenshot',
                  params: { format: 'png' }
                }));
              }, 600);
            } else if (msg.id === 3) {
              fs.writeFileSync(filename, Buffer.from(msg.result.data, 'base64'));
              console.log('Saved ' + filename);
              ws.close();
              chromeProc.kill();
              resolve();
            }
          };
        });
      });
    }, 1200);
  });
}

(async () => {
  // Mobile (width 390)
  await snap(8050, 'scratch/exact_review_mobile.png', 390, 844);
  // Tablet (width 768)
  await snap(7500, 'scratch/exact_review_tab.png', 768, 1024);
})();
