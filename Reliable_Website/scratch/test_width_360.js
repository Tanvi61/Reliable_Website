const http = require('http');
const { spawn } = require('child_process');

async function testWidth360() {
  const port = 9996;
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
            params: { width: 360, height: 740, deviceScaleFactor: 1, mobile: true }
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
                  const bodyScrollW = document.body.scrollWidth;
                  const docScrollW = document.documentElement.scrollWidth;

                  const badElements = [];
                  document.querySelectorAll('*').forEach(el => {
                    const r = el.getBoundingClientRect();
                    const cs = window.getComputedStyle(el);
                    // Ignore elements that have overflow hidden or are fixed offscreen
                    if (cs.position !== 'fixed' && r.right > winW + 1) {
                      badElements.push({
                        tag: el.tagName,
                        className: el.className,
                        id: el.id,
                        right: r.right,
                        width: r.width,
                        csWidth: cs.width,
                        maxW: cs.maxWidth,
                        overflow: cs.overflow,
                        snippet: el.outerHTML.substring(0, 120)
                      });
                    }
                  });

                  return {
                    winW,
                    docScrollW,
                    bodyScrollW,
                    hasOverflow: docScrollW > winW || bodyScrollW > winW,
                    badElements
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('WIDTH 360 OVERFLOW RESULT:');
            console.log(JSON.stringify(msg.result.result.value, null, 2));
            ws.close();
            chrome.kill();
          }
        };
      });
    });
  }, 1500);
}

testWidth360();
