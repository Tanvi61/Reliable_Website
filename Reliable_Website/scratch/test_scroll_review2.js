const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testScroll(yOffset, filename) {
  const port = 9420 + Math.floor(Math.random()*50);
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
              params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
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
                      const el = document.querySelector('.review-us-section');
                      const y = el.getBoundingClientRect().top + window.pageYOffset;
                      window.scrollTo(0, y + ${yOffset});
                    })()`,
                    returnByValue: true
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
  await testScroll(0, 'scratch/review_us_section_mobile.png');
  await testScroll(-300, 'scratch/feedback_and_review_mobile.png');
})();
