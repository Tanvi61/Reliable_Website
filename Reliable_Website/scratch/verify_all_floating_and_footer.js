const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function runVerifications(cases) {
  for (const c of cases) {
    const port = 9920 + Math.floor(Math.random() * 70);
    const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      c.url
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
                params: { width: c.width, height: c.height, deviceScaleFactor: 1, mobile: c.mobile }
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
                      if ('${c.scroll}' === 'bottom') {
                        window.scrollTo(0, document.body.scrollHeight);
                      } else if ('${c.scroll}' === '320') {
                        window.scrollTo(0, 320);
                      } else {
                        window.scrollTo(0, 0);
                      }
                      const fl = document.querySelector('.floating-actions');
                      const sc = document.querySelector('#scrollTopBtn');
                      const flRect = fl ? fl.getBoundingClientRect() : null;
                      const scRect = sc ? sc.getBoundingClientRect() : null;
                      return {
                        scrollY: window.scrollY,
                        floatingRect: flRect ? { top: flRect.top, bottom: flRect.bottom, right: flRect.right } : null,
                        scrollRect: scRect ? { top: scRect.top, bottom: scRect.bottom, right: scRect.right, display: window.getComputedStyle(sc).display } : null
                      };
                    })()`,
                    returnByValue: true
                  }
                }));
              } else if (msg.id === 2) {
                console.log(`Evaluated ${c.name}:`, JSON.stringify(msg.result.result.value));
                setTimeout(() => {
                  ws.send(JSON.stringify({
                    id: 3,
                    method: 'Page.captureScreenshot',
                    params: { format: 'png' }
                  }));
                }, 400);
              } else if (msg.id === 3) {
                fs.writeFileSync(c.out, Buffer.from(msg.result.data, 'base64'));
                console.log(`Saved ${c.out}`);
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

runVerifications([
  { name: 'Desktop Chrome View (Footer)', url: 'file:///E:/MindAxis_Web/Reliable_Website/about.html', width: 1366, height: 768, mobile: false, scroll: 'bottom', out: 'scratch/final_verify_desktop_bottom.png' },
  { name: 'Mobile View (Top)', url: 'file:///E:/MindAxis_Web/Reliable_Website/about.html', width: 390, height: 844, mobile: true, scroll: '0', out: 'scratch/final_verify_mobile_top.png' },
  { name: 'Mobile View (Bottom / End of Page)', url: 'file:///E:/MindAxis_Web/Reliable_Website/about.html', width: 390, height: 844, mobile: true, scroll: 'bottom', out: 'scratch/final_verify_mobile_bottom.png' },
  { name: 'Exact User Viewport (611x767 at End of Page)', url: 'file:///E:/MindAxis_Web/Reliable_Website/about.html', width: 611, height: 767, mobile: false, scroll: 'bottom', out: 'scratch/final_verify_611_bottom.png' },
  { name: 'Tablet View (Bottom / End of Page)', url: 'file:///E:/MindAxis_Web/Reliable_Website/about.html', width: 768, height: 1024, mobile: true, scroll: 'bottom', out: 'scratch/final_verify_tablet_bottom.png' },
  { name: 'Index Page Mobile (Bottom)', url: 'file:///E:/MindAxis_Web/Reliable_Website/index.html', width: 390, height: 844, mobile: true, scroll: 'bottom', out: 'scratch/final_verify_index_bottom.png' }
]);
