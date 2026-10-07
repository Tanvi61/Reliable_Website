const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureRealView(url, width, height, mobile, scrollY, outPath) {
  const port = 9750 + Math.floor(Math.random() * 40);
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
                      expression: `(() => {
                        window.scrollTo(0, ${scrollY});
                        const el = document.querySelector('.floating-actions');
                        const r = el ? el.getBoundingClientRect() : null;
                        const cs = el ? window.getComputedStyle(el) : null;
                        return {
                          rect: r ? { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height } : null,
                          topStyle: cs ? cs.top : null,
                          transformStyle: cs ? cs.transform : null
                        };
                      })()`,
                      returnByValue: true
                    }
                  }));
                }, 1000);
              } else if (msg.id === 2) {
                console.log(`${outPath} computed:`, JSON.stringify(msg.result.value));
                setTimeout(() => {
                  ws.send(JSON.stringify({
                    id: 3,
                    method: 'Page.captureScreenshot',
                    params: { format: 'png' }
                  }));
                }, 500);
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
  
  // 1. Mobile iPhone 14 Pro (393 x 852) at user's scroll position (~350px)
  await captureRealView(fileUrl, 393, 852, true, 350, 'scratch/verify_shifted_iphone14pro.png');

  // 2. Mobile iPhone 14 Pro in simulated short viewport (393 x 600) like the user's laptop screen
  await captureRealView(fileUrl, 393, 600, true, 350, 'scratch/verify_shifted_short_mobile.png');

  // 3. Tablet iPad (768 x 1024) at 350px
  await captureRealView(fileUrl, 768, 1024, false, 350, 'scratch/verify_shifted_tablet.png');

  // 4. Desktop (1280 x 800) at top
  await captureRealView(fileUrl, 1280, 800, false, 0, 'scratch/verify_shifted_desktop.png');

  // 5. About page on Mobile (393 x 852) at 0
  await captureRealView('file:///E:/MindAxis_Web/Reliable_Website/about.html', 393, 852, true, 0, 'scratch/verify_about_shifted.png');

  console.log('All verification screenshots complete.');
})();
