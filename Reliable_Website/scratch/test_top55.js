const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testTop55() {
  const port = 9965;
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
            params: { width: 490, height: 741, deviceScaleFactor: 1, mobile: true }
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
                  const fl = document.querySelector('.floating-actions');
                  if (fl) {
                    fl.style.setProperty('top', '55%', 'important');
                    fl.style.setProperty('bottom', 'auto', 'important');
                    fl.style.setProperty('transform', 'translateY(-50%)', 'important');
                    fl.style.setProperty('-webkit-transform', 'translateY(-50%)', 'important');
                    fl.style.setProperty('right', '16px', 'important');
                  }
                  const r = fl ? fl.getBoundingClientRect() : null;
                  return {
                    scrollY: window.scrollY,
                    rect: r ? { top: r.top, bottom: r.bottom, right: r.right, width: r.width, height: r.height } : null
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('TOP 55 RESULT:', JSON.stringify(msg.result.result.value));
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 300);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/test_index_top55.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/test_index_top55.png');
            ws.close();
            chromeProc.kill();
          }
        };
      });
    });
  }, 1500);
}

testTop55();
