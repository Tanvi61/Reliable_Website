const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9236',
  '--no-sandbox',
  '--disable-gpu',
  'file:///E:/MindAxis_Web/Reliable_Website/contact.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9236/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
      
      ws.onopen = () => {
        // Set real mobile device emulation (390 x 844, scale 1, mobile true)
        ws.send(JSON.stringify({
          id: 1,
          method: 'Emulation.setDeviceMetricsOverride',
          params: {
            width: 390,
            height: 844,
            deviceScaleFactor: 2,
            mobile: true
          }
        }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          // After setting mobile emulation, wait 1000ms then check and screenshot
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const el = document.querySelector('.floating-actions');
                  const r = el ? el.getBoundingClientRect() : null;
                  return {
                    scrollY: window.scrollY,
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight,
                    floatingRect: r ? { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height } : null,
                    docScrollWidth: document.documentElement.scrollWidth,
                    bodyScrollWidth: document.body.scrollWidth,
                    elementFromPoint: r ? (document.elementFromPoint(r.left + 10, r.top + 10) ? document.elementFromPoint(r.left + 10, r.top + 10).outerHTML.slice(0, 80) : null) : null
                  };
                })()`,
                returnByValue: true
              }
            }));
          }, 1000);
        } else if (msg.id === 2) {
          console.log('Mobile Emulation Evaluation:', JSON.stringify(msg.result, null, 2));
          ws.send(JSON.stringify({
            id: 3,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        } else if (msg.id === 3) {
          fs.writeFileSync('E:/MindAxis_Web/Reliable_Website/scratch/real_mobile_scroll0.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved scratch/real_mobile_scroll0.png');
          ws.close();
          chromeProc.kill();
        }
      };
    });
  });
}, 2000);
