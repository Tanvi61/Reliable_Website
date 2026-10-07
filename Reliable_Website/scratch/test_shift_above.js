const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testPosition(topCss, transformCss, filename, width, height) {
  const port = 9700 + Math.floor(Math.random() * 50);
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    'file:///E:/MindAxis_Web/Reliable_Website/index.html'
  ]);

  return new Promise((resolve) => {
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
              params: { width, height, deviceScaleFactor: 2, mobile: width < 1024 }
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
                      const el = document.querySelector('.floating-actions');
                      if (el) {
                        el.style.setProperty('top', '${topCss}', 'important');
                        el.style.setProperty('transform', '${transformCss}', 'important');
                        el.style.setProperty('-webkit-transform', '${transformCss}', 'important');
                      }
                      // Scroll to where stats cards are visible as in user screenshot
                      window.scrollTo(0, 320);
                      const r = el.getBoundingClientRect();
                      return { top: r.top, bottom: r.bottom, right: r.right };
                    })()`,
                    returnByValue: true
                  }
                }));
              }, 1000);
            } else if (msg.id === 2) {
              console.log(`${filename} pos:`, msg.result.value);
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 3,
                  method: 'Page.captureScreenshot',
                  params: { format: 'png' }
                }));
              }, 500);
            } else if (msg.id === 3) {
              fs.writeFileSync(filename, Buffer.from(msg.result.data, 'base64'));
              console.log('Saved ' + filename);
              ws.close();
              chromeProc.kill();
              resolve();
            }
          };
        });
      });
    }, 1200);
  });
}

(async () => {
  // Test on user's exact viewport: width 393, height 620 (the visible area of user's screen in their screenshot!)
  // In user's screenshot, the visible height is around 620px.
  // Let's test top: 40% vs top: 42% vs top: calc(50% - 60px)
  await testPosition('40%', 'translateY(-50%)', 'scratch/pos_40pct_393x620.png', 393, 620);
  await testPosition('42%', 'translateY(-50%)', 'scratch/pos_42pct_393x620.png', 393, 620);
  await testPosition('45%', 'translateY(-50%)', 'scratch/pos_45pct_393x620.png', 393, 620);
  await testPosition('40%', 'translateY(-50%)', 'scratch/pos_40pct_tab.png', 768, 1024);
  await testPosition('42%', 'translateY(-50%)', 'scratch/pos_42pct_tab.png', 768, 1024);
})();
