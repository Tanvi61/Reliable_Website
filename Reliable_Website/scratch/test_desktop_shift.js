const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testDesktopPos(topCss, filename) {
  const port = 9800 + Math.floor(Math.random() * 40);
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
              params: { width: 1366, height: 768, deviceScaleFactor: 1, mobile: false }
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
                    expression: `(() => {
                      const el = document.querySelector('.floating-actions');
                      if (el) {
                        el.style.setProperty('top', '${topCss}', 'important');
                        el.style.setProperty('transform', 'translateY(-50%)', 'important');
                      }
                      window.scrollTo(0, 0);
                    })()`
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
              }, 500);
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
  await testDesktopPos('50%', 'scratch/desk_pos_50.png');
  await testDesktopPos('58%', 'scratch/desk_pos_58.png');
  await testDesktopPos('60%', 'scratch/desk_pos_60.png');
  await testDesktopPos('63%', 'scratch/desk_pos_63.png');
  await testDesktopPos('65%', 'scratch/desk_pos_65.png');
})();
