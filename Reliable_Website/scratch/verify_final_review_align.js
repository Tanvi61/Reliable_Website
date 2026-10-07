const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureView(url, width, height, mobile, outPath) {
  const port = 9600 + Math.floor(Math.random() * 50);
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
                params: { width, height, deviceScaleFactor: 2, mobile }
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
                      expression: `document.querySelector('.review-us-section').scrollIntoView({ behavior: 'instant', block: 'center' })`
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
                console.log(`Saved screenshot: ${outPath}`);
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
  console.log('Capturing Mobile...');
  await captureView(fileUrl, 390, 844, true, 'scratch/final_review_mobile.png');

  console.log('Capturing Tablet...');
  await captureView(fileUrl, 768, 1024, false, 'scratch/final_review_tablet.png');

  console.log('Capturing Desktop...');
  await captureView(fileUrl, 1280, 800, false, 'scratch/final_review_desktop.png');

  console.log('Done capturing all views.');
})();
