const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureFooterView(url, width, height, mobile, outPath) {
  const port = 9950 + Math.floor(Math.random() * 40);
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
                      expression: `(() => {
                        const el = document.querySelector('.footer-brand');
                        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
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
  const fileUrl = 'file:///E:/MindAxis_Web/Reliable_Website/index.html';

  console.log('Capturing Desktop Footer (Chrome View)...');
  await captureFooterView(fileUrl, 1366, 768, false, 'scratch/verify_logo_desktop_final.png');

  console.log('Capturing Tablet Footer...');
  await captureFooterView(fileUrl, 768, 1024, false, 'scratch/verify_logo_tablet_final.png');

  console.log('Capturing Mobile Footer...');
  await captureFooterView(fileUrl, 390, 844, true, 'scratch/verify_logo_mobile_final.png');

  console.log('All captures done.');
})();
