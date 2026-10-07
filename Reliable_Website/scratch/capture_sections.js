const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureElement(url, outPath, width, height, mobile, selector) {
  return new Promise((resolve, reject) => {
    const port = 9350 + Math.floor(Math.random() * 50);
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
                    method: 'Runtime.evaluate',
                    params: {
                      expression: `(() => {
                        const el = document.querySelector('${selector}');
                        if (!el) return null;
                        el.scrollIntoView({block: 'center'});
                        const r = el.getBoundingClientRect();
                        return { x: Math.max(0, r.left), y: Math.max(0, r.top), width: r.width, height: r.height };
                      })()`,
                      returnByValue: true
                    }
                  }));
                }, 1000);
              } else if (msg.id === 2) {
                const clip = msg.result.value;
                console.log('Clip:', clip);
                setTimeout(() => {
                  ws.send(JSON.stringify({
                    id: 3,
                    method: 'Page.captureScreenshot',
                    params: {
                      format: 'png',
                      clip: clip ? { x: clip.x, y: clip.y, width: clip.width, height: clip.height, scale: 1 } : undefined
                    }
                  }));
                }, 500);
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
  const url = 'file:///E:/MindAxis_Web/Reliable_Website/index.html';
  await captureElement(url, 'scratch/review_mobile.png', 390, 844, true, '.review-us-section');
  await captureElement(url, 'scratch/review_tab.png', 768, 1024, false, '.review-us-section');
  await captureElement(url, 'scratch/testimonials_mobile.png', 390, 844, true, '.testimonials-section');
  await captureElement(url, 'scratch/testimonials_tab.png', 768, 1024, false, '.testimonials-section');
})();
