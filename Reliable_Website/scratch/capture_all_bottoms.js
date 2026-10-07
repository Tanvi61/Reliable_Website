const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureAll(viewports) {
  for (const vp of viewports) {
    const port = 9985 + Math.floor(Math.random() * 20);
    const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      'file:///E:/MindAxis_Web/Reliable_Website/about.html'
    ]);

    await new Promise((resolve) => {
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
                params: { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: vp.mobile }
              }));
            };

            ws.onmessage = (event) => {
              const msg = JSON.parse(event.data);
              if (msg.id === 1) {
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `(() => {
                      document.documentElement.style.scrollBehavior = 'auto';
                      window.scrollTo(0, document.body.scrollHeight);
                    })()`
                  }
                }));
                setTimeout(() => {
                  ws.send(JSON.stringify({
                    id: 3,
                    method: 'Page.captureScreenshot',
                    params: { format: 'png' }
                  }));
                }, 600);
              } else if (msg.id === 3) {
                fs.writeFileSync(vp.out, Buffer.from(msg.result.data, 'base64'));
                console.log(`Saved ${vp.out}`);
                ws.close();
                chromeProc.kill();
                resolve();
              }
            };
          });
        });
      }, 1500);
    });
  }
}

captureAll([
  { width: 1366, height: 768, mobile: false, out: 'scratch/bottom_desktop.png' },
  { width: 768, height: 1024, mobile: true, out: 'scratch/bottom_tablet.png' },
  { width: 390, height: 844, mobile: true, out: 'scratch/bottom_mobile.png' },
  { width: 611, height: 767, mobile: false, out: 'scratch/bottom_custom.png' }
]);
