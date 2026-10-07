const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testLiveServer() {
  const port = 9948;
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    'http://127.0.0.1:5501/Reliable_Website/index.html'
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
                  const sc = document.querySelector('#scrollTopBtn');
                  const r = fl ? fl.getBoundingClientRect() : null;
                  return {
                    scrollY: window.scrollY,
                    floatingRect: r ? { top: r.top, bottom: r.bottom, right: r.right, width: r.width, height: r.height } : null,
                    style: fl ? {
                      position: getComputedStyle(fl).position,
                      top: getComputedStyle(fl).top,
                      bottom: getComputedStyle(fl).bottom,
                      right: getComputedStyle(fl).right,
                      display: getComputedStyle(fl).display,
                      visibility: getComputedStyle(fl).visibility,
                      opacity: getComputedStyle(fl).opacity
                    } : null
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('LIVE SERVER RESULT:', JSON.stringify(msg.result.result.value, null, 2));
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 500);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/live_server_490x741.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/live_server_490x741.png');
            ws.close();
            chromeProc.kill();
          }
        };
      });
    });
  }, 1500);
}

testLiveServer();
