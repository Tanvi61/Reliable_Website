const http = require('http');
const { spawn } = require('child_process');

async function check() {
  const port = 9989;
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
                  const footer = document.querySelector('footer');
                  const footerRect = footer ? footer.getBoundingClientRect() : null;
                  const floating = document.querySelector('.floating-actions');
                  const floatingRect = floating ? floating.getBoundingClientRect() : null;
                  const scrollBtn = document.querySelector('#scrollTopBtn');
                  const scrollBtnRect = scrollBtn ? scrollBtn.getBoundingClientRect() : null;
                  const services = Array.from(document.querySelectorAll('h4, .footer-col-title')).find(el => el.textContent.includes('Services'));
                  const servicesRect = services ? services.getBoundingClientRect() : null;
                  return {
                    footerRect,
                    floatingRect,
                    scrollBtnRect,
                    servicesRect,
                    scrollY: window.scrollY,
                    bodyHeight: document.body.scrollHeight
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('RESULT:', JSON.stringify(msg.result.result.value, null, 2));
            ws.close();
            chromeProc.kill();
          }
        };
      });
    });
  }, 1500);
}
check();
