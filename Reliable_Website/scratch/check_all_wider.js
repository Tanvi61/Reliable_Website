const http = require('http');
const { spawn } = require('child_process');

async function checkEveryElement() {
  const port = 9997;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'http://127.0.0.1:5501/Reliable_Website/about.html'
  ]);

  setTimeout(() => {
    http.get('http://127.0.0.1:' + port + '/json', res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const tabs = JSON.parse(data);
        const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

        ws.onopen = () => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Emulation.setDeviceMetricsOverride',
            params: { width: 375, height: 667, deviceScaleFactor: 2, mobile: true }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);
          if (msg.id === 1) {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const winW = window.innerWidth;
                  const docScrollW = document.documentElement.scrollWidth;
                  const bodyScrollW = document.body.scrollWidth;

                  const report = [];
                  document.querySelectorAll('*').forEach(el => {
                    const r = el.getBoundingClientRect();
                    const cs = window.getComputedStyle(el);
                    if (r.right > winW || r.width > winW || el.scrollWidth > winW) {
                      report.push({
                        tag: el.tagName,
                        id: el.id || '',
                        cls: el.className || '',
                        pos: cs.position,
                        left: Math.round(r.left),
                        right: Math.round(r.right),
                        width: Math.round(r.width),
                        scrollW: el.scrollWidth,
                        overflowX: cs.overflowX,
                        html: el.outerHTML.substring(0, 100).replace(/\\n/g, ' ')
                      });
                    }
                  });

                  return {
                    winW,
                    docScrollW,
                    bodyScrollW,
                    totalWiderElements: report.length,
                    elements: report.sort((a,b) => b.right - a.right)
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('ALL WIDER ELEMENTS AT 375px:');
            console.log(JSON.stringify(msg.result.result.value, null, 2));
            ws.close();
            chrome.kill();
          }
        };
      });
    });
  }, 1500);
}

checkEveryElement();
