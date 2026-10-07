const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function inspectSections() {
  const port = 9435;
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    'file:///E:/MindAxis_Web/Reliable_Website/index.html'
  ]);

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
                  expression: "JSON.stringify({ t: document.querySelector('.testimonials-section') ? document.querySelector('.testimonials-section').getBoundingClientRect() : null, r: document.querySelector('.review-us-section') ? document.querySelector('.review-us-section').getBoundingClientRect() : null, pageY: window.pageYOffset })",
                  returnByValue: true
                }
              }));
            }, 1000);
          } else if (msg.id === 2) {
            console.log('msg.result:', JSON.stringify(msg.result));
            const parsed = JSON.parse(msg.result.value);
            console.log('Parsed:', parsed);
            const rTop = parsed.r.top + parsed.pageY;
            ws.send(JSON.stringify({
              id: 3,
              method: 'Runtime.evaluate',
              params: {
                expression: `window.scrollTo(0, ${rTop} - 100)`
              }
            }));
          } else if (msg.id === 3) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 4,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          } else if (msg.id === 4) {
            fs.writeFileSync('scratch/exact_review_us.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/exact_review_us.png');
            ws.close();
            chromeProc.kill();
          }
        };
      });
    });
  }, 1200);
}

inspectSections();
