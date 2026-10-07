const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function capture(url, outPath, width, height, mobile) {
  return new Promise((resolve, reject) => {
    const port = 9520 + Math.floor(Math.random() * 50);
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
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
            const pageTab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension://')) || tabs[0];
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
                }, 1000);
              } else if (msg.id === 2) {
                fs.writeFileSync(outPath, Buffer.from(msg.result.data, 'base64'));
                console.log(`Saved screenshot: ${outPath}`);
                ws.close();
                chrome.kill();
                resolve();
              }
            };

            ws.onerror = (err) => {
              chrome.kill();
              reject(err);
            };
          } catch (e) {
            chrome.kill();
            reject(e);
          }
        });
      }).on('error', (err) => {
        chrome.kill();
        reject(err);
      });
    }, 1500);
  });
}

async function run() {
  try {
    await capture('file:///E:/MindAxis_Web/Reliable_Website/about.html', 'E:/MindAxis_Web/Reliable_Website/scratch/verify_about_mobile_top.png', 390, 844, true);
    await capture('file:///E:/MindAxis_Web/Reliable_Website/about.html', 'E:/MindAxis_Web/Reliable_Website/scratch/verify_about_desktop_top.png', 1440, 900, false);
    await capture('file:///E:/MindAxis_Web/Reliable_Website/topographical-survey.html', 'E:/MindAxis_Web/Reliable_Website/scratch/verify_topo_mobile_top.png', 390, 844, true);
    console.log('All verification screenshots captured!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
