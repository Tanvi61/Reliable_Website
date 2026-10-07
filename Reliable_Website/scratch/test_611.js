const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function test() {
  const port = 9983;
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    'file:///E:/MindAxis_Web/Reliable_Website/about.html'
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
            params: { width: 611, height: 767, deviceScaleFactor: 1, mobile: false }
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
                  window.scrollTo(0, document.body.scrollHeight);
                  const el = document.querySelector('.floating-actions');
                  const rect = el ? el.getBoundingClientRect() : null;
                  const computed = el ? window.getComputedStyle(el) : null;
                  return {
                    scrollY: window.scrollY,
                    bodyHeight: document.body.scrollHeight,
                    innerHeight: window.innerHeight,
                    floatingRect: rect ? { top: rect.top, bottom: rect.bottom, right: rect.right, width: rect.width, height: rect.height } : null,
                    floatingStyle: computed ? {
                      position: computed.position,
                      top: computed.top,
                      bottom: computed.bottom,
                      right: computed.right,
                      transform: computed.transform,
                      display: computed.display,
                      visibility: computed.visibility,
                      opacity: computed.opacity,
                      zIndex: computed.zIndex
                    } : null
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('RESULT:', JSON.stringify(msg.result.result ? msg.result.result.value : msg, null, 2));
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 500);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/test_611_scrolled.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/test_611_scrolled.png');
            ws.close();
            chromeProc.kill();
          }
        };
      });
    });
  }, 1500);
}
test();
