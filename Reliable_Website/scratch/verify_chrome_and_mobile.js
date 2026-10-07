const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function snapReal(url, width, height, mobile, scrollY, outPath) {
  const port = 9850 + Math.floor(Math.random() * 40);
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    url
  ]);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      http.get(`http://127.0.0.1:${port}/json`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const tabs = JSON.parse(data);
            const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

            ws.onopen = () => {
              ws.send(JSON.stringify({
                id: 1,
                method: 'Emulation.setDeviceMetricsOverride',
                params: { width, height, deviceScaleFactor: 1, mobile }
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
                      expression: `window.scrollTo(0, ${scrollY})`
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
                fs.writeFileSync(outPath, Buffer.from(msg.result.data, 'base64'));
                console.log(`Saved: ${outPath}`);
                ws.close();
                chromeProc.kill();
                resolve();
              }
            };

            ws.onerror = (err) => {
              chromeProc.kill();
              reject(err);
            };
          } catch (e) {
            chromeProc.kill();
            reject(e);
          }
        });
      });
    }, 1200);
  });
}

(async () => {
  console.log('Capturing Desktop Index (1366x768)...');
  await snapReal('file:///E:/MindAxis_Web/Reliable_Website/index.html', 1366, 768, false, 0, 'scratch/verify_chrome_view_index.png');

  console.log('Capturing Desktop About (1366x768)...');
  await snapReal('file:///E:/MindAxis_Web/Reliable_Website/about.html', 1366, 768, false, 0, 'scratch/verify_chrome_view_about.png');

  console.log('Capturing Mobile Index (393x852)...');
  await snapReal('file:///E:/MindAxis_Web/Reliable_Website/index.html', 393, 852, true, 0, 'scratch/verify_mobile_after_desktop_change.png');

  console.log('Done!');
})();
