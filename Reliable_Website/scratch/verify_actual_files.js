const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function verifyFiles(pages) {
  for (const p of pages) {
    const port = 9940 + Math.floor(Math.random() * 50);
    const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      p.url
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
                params: { width: p.width, height: p.height, deviceScaleFactor: 2, mobile: p.mobile }
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
                      window.scrollTo(0, 1200);
                      window.dispatchEvent(new Event('scroll'));

                      const fl = document.querySelector('.floating-actions');
                      const sc = document.querySelector('#scrollTopBtn');
                      const wa = fl ? fl.querySelector('.whatsapp') : null;
                      const call = fl ? fl.querySelector('.call') : null;

                      const waRect = wa ? wa.getBoundingClientRect() : null;
                      const callRect = call ? call.getBoundingClientRect() : null;
                      const scRect = sc ? sc.getBoundingClientRect() : null;

                      return {
                        page: '${p.name}',
                        wa: waRect ? { left: waRect.left, right: waRect.right, width: waRect.width, top: waRect.top, bottom: waRect.bottom } : null,
                        call: callRect ? { left: callRect.left, right: callRect.right, width: callRect.width, top: callRect.top, bottom: callRect.bottom } : null,
                        sc: scRect ? { left: scRect.left, right: scRect.right, width: scRect.width, top: scRect.top, bottom: scRect.bottom } : null,
                        allRightEdgesMatch: (waRect.right === callRect.right && callRect.right === scRect.right),
                        allLeftEdgesMatch: (waRect.left === callRect.left && callRect.left === scRect.left),
                        allWidthsMatch: (waRect.width === callRect.width && callRect.width === scRect.width)
                      };
                    })()`,
                    returnByValue: true
                  }
                }));
              } else if (msg.id === 2) {
                console.log(`Verified ${p.name}:`, JSON.stringify(msg.result.result.value, null, 2));
                setTimeout(() => {
                  ws.send(JSON.stringify({
                    id: 3,
                    method: 'Page.captureScreenshot',
                    params: { format: 'png' }
                  }));
                }, 300);
              } else if (msg.id === 3) {
                fs.writeFileSync(p.out, Buffer.from(msg.result.data, 'base64'));
                console.log(`Saved screenshot: ${p.out}`);
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

verifyFiles([
  { name: 'About Mobile (390x844)', url: 'file:///E:/MindAxis_Web/Reliable_Website/about.html', width: 390, height: 844, mobile: true, out: 'scratch/real_verified_about_mobile.png' },
  { name: 'Index Mobile (390x844)', url: 'file:///E:/MindAxis_Web/Reliable_Website/index.html', width: 390, height: 844, mobile: true, out: 'scratch/real_verified_index_mobile.png' },
  { name: 'About Desktop (1366x768)', url: 'file:///E:/MindAxis_Web/Reliable_Website/about.html', width: 1366, height: 768, mobile: false, out: 'scratch/real_verified_about_desktop.png' }
]);
