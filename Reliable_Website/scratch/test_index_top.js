const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testIndexTop() {
  const port = 9945;
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
                  const wa = fl ? fl.querySelector('.whatsapp') : null;
                  const call = fl ? fl.querySelector('.call') : null;
                  const sc = document.querySelector('#scrollTopBtn');
                  
                  return {
                    scrollY: window.scrollY,
                    floatingExists: !!fl,
                    floatingRect: fl ? fl.getBoundingClientRect() : null,
                    floatingComputed: fl ? {
                      position: getComputedStyle(fl).position,
                      top: getComputedStyle(fl).top,
                      bottom: getComputedStyle(fl).bottom,
                      right: getComputedStyle(fl).right,
                      display: getComputedStyle(fl).display,
                      visibility: getComputedStyle(fl).visibility,
                      opacity: getComputedStyle(fl).opacity,
                      zIndex: getComputedStyle(fl).zIndex
                    } : null,
                    waComputed: wa ? {
                      display: getComputedStyle(wa).display,
                      visibility: getComputedStyle(wa).visibility,
                      opacity: getComputedStyle(wa).opacity
                    } : null,
                    callComputed: call ? {
                      display: getComputedStyle(call).display,
                      visibility: getComputedStyle(call).visibility,
                      opacity: getComputedStyle(call).opacity
                    } : null
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('EVAL RESULT:', JSON.stringify(msg.result.result.value, null, 2));
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 300);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/test_index_490_741.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/test_index_490_741.png');
            ws.close();
            chromeProc.kill();
          }
        };
      });
    });
  }, 1500);
}

testIndexTop();
