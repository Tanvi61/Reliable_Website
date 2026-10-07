const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testMobileBottomStack(tests) {
  for (const t of tests) {
    const port = 9910 + Math.floor(Math.random() * 80);
    const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      'file:///E:/MindAxis_Web/Reliable_Website/about.html'
    ]);

    await new Promise((resolve) => {
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
                params: { width: t.width, height: t.height, deviceScaleFactor: 1, mobile: t.mobile }
              }));
            };

            ws.onmessage = (event) => {
              const msg = JSON.parse(event.data);
              if (msg.id === 1) {
                // Apply test CSS: on mobile/tab (<= 1024px), bottom: 85px !important; top: auto !important; transform: none !important;
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `(() => {
                      document.documentElement.style.scrollBehavior = 'auto';
                      const isMobileOrTab = window.innerWidth <= 1024;
                      const el = document.querySelector('.floating-actions');
                      if (el && isMobileOrTab) {
                        el.style.setProperty('top', 'auto', 'important');
                        el.style.setProperty('bottom', '85px', 'important');
                        el.style.setProperty('transform', 'none', 'important');
                        el.style.setProperty('-webkit-transform', 'none', 'important');
                        el.style.setProperty('right', '16px', 'important');
                      }
                      if ('${t.scroll}' === 'bottom') {
                        window.scrollTo(0, document.body.scrollHeight);
                      } else if ('${t.scroll}' === '320') {
                        window.scrollTo(0, 320);
                      } else {
                        window.scrollTo(0, 0);
                      }
                      const r = el ? el.getBoundingClientRect() : null;
                      return {
                        width: window.innerWidth,
                        height: window.innerHeight,
                        scrollY: window.scrollY,
                        floatingRect: r ? { top: r.top, bottom: r.bottom, right: r.right, width: r.width, height: r.height } : null
                      };
                    })()`,
                    returnByValue: true
                  }
                }));
              } else if (msg.id === 2) {
                console.log(`Evaluated ${t.name}:`, JSON.stringify(msg.result.result.value));
                setTimeout(() => {
                  ws.send(JSON.stringify({
                    id: 3,
                    method: 'Page.captureScreenshot',
                    params: { format: 'png' }
                  }));
                }, 400);
              } else if (msg.id === 3) {
                fs.writeFileSync(t.out, Buffer.from(msg.result.data, 'base64'));
                console.log(`Saved ${t.out}`);
                ws.close();
                chromeProc.kill();
                resolve();
              }
            };
          });
        });
      }, 1500);
    });
  }
}

testMobileBottomStack([
  { name: 'Mobile Scroll 0', width: 390, height: 844, mobile: true, scroll: '0', out: 'scratch/test_m_scroll0.png' },
  { name: 'Mobile Scroll 320', width: 390, height: 844, mobile: true, scroll: '320', out: 'scratch/test_m_scroll320.png' },
  { name: 'Mobile Scroll Bottom', width: 390, height: 844, mobile: true, scroll: 'bottom', out: 'scratch/test_m_bottom.png' },
  { name: 'Custom 611 Scroll Bottom', width: 611, height: 767, mobile: false, scroll: 'bottom', out: 'scratch/test_611_bottom.png' },
  { name: 'Tablet Scroll Bottom', width: 768, height: 1024, mobile: true, scroll: 'bottom', out: 'scratch/test_tab_bottom.png' }
]);
