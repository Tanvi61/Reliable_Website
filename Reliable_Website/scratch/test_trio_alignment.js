const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testAlignment() {
  const port = 9935;
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
            params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
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
                  // Scroll down to where Our Expertise / Core Strengths is, exactly as in user screenshot
                  window.scrollTo(0, 1200);

                  const fl = document.querySelector('.floating-actions');
                  const sc = document.querySelector('#scrollTopBtn');
                  const wa = fl.querySelector('.whatsapp');
                  const call = fl.querySelector('.call');

                  // Apply alignment adjustments
                  fl.style.setProperty('right', '16px', 'important');
                  fl.style.setProperty('bottom', '83px', 'important');
                  sc.style.setProperty('right', '16px', 'important');
                  sc.style.setProperty('bottom', '25px', 'important');
                  sc.style.setProperty('display', 'flex', 'important');

                  const waRect = wa.getBoundingClientRect();
                  const callRect = call.getBoundingClientRect();
                  const scRect = sc.getBoundingClientRect();

                  return {
                    wa: { left: waRect.left, right: waRect.right, width: waRect.width, top: waRect.top, bottom: waRect.bottom },
                    call: { left: callRect.left, right: callRect.right, width: callRect.width, top: callRect.top, bottom: callRect.bottom },
                    sc: { left: scRect.left, right: scRect.right, width: scRect.width, top: scRect.top, bottom: scRect.bottom },
                    gapCallToScroll: callRect.bottom - scRect.top, // should be around -10 (call bottom to sc top)
                    scTopMinusCallBottom: scRect.top - callRect.bottom,
                    callTopMinusWaBottom: callRect.top - waRect.bottom
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('ALIGNMENT METRICS:', JSON.stringify(msg.result.result.value, null, 2));
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 300);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/verify_trio_alignment.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/verify_trio_alignment.png');
            ws.close();
            chromeProc.kill();
          }
        };
      });
    });
  }, 1500);
}

testAlignment();
