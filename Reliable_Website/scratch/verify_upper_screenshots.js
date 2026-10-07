const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function capture(url, outPath, width, height, mobile) {
  return new Promise((resolve, reject) => {
    const port = 9270 + Math.floor(Math.random() * 20);
    const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      url
    ]);

    setTimeout(() => {
      http.get(`http://127.0.0.1:${port}/json`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const tabs = JSON.parse(data);
            const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
            const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

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
                    method: 'Page.captureScreenshot',
                    params: { format: 'png' }
                  }));
                }, 1200);
              } else if (msg.id === 2) {
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
      }).on('error', (err) => {
        chromeProc.kill();
        reject(err);
      });
    }, 1800);
  });
}

async function run() {
  try {
    // Exact user viewport dimensions from their screenshot (1422 x 748)
    await capture('file:///E:/MindAxis_Web/Reliable_Website/gallery.html', 'E:/MindAxis_Web/Reliable_Website/scratch/verified_gallery_user_viewport.png', 1422, 748, false);
    // Mobile view (390 x 844)
    await capture('file:///E:/MindAxis_Web/Reliable_Website/contact.html', 'E:/MindAxis_Web/Reliable_Website/scratch/verified_contact_upper_mobile.png', 390, 844, true);
    console.log('All upper floating screenshots captured successfully!');
  } catch (err) {
    console.error('Error during capture:', err);
  }
}

run();
