const http = require('http');
const { spawn } = require('child_process');

async function findOverflowElements() {
  const port = 9995;
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
            params: { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }
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
                  const docW = document.documentElement.scrollWidth;
                  const bodyW = document.body.scrollWidth;

                  const all = Array.from(document.querySelectorAll('*'));
                  const overflowing = [];

                  all.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    // Check if element extends past right edge (ignore fixed elements that are positioned offscreen like drawer)
                    const cs = window.getComputedStyle(el);
                    if (cs.position !== 'fixed' && (rect.right > winW || el.scrollWidth > winW)) {
                      overflowing.push({
                        tag: el.tagName,
                        id: el.id,
                        className: el.className,
                        width: rect.width,
                        right: rect.right,
                        scrollWidth: el.scrollWidth,
                        position: cs.position,
                        html: el.outerHTML.substring(0, 100)
                      });
                    }
                  });

                  return {
                    winW,
                    docW,
                    bodyW,
                    overflowingCount: overflowing.length,
                    overflowing: overflowing.sort((a,b) => b.right - a.right).slice(0, 15)
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('ABOUT.HTML OVERFLOW RESULT:');
            console.log(JSON.stringify(msg.result.result.value, null, 2));
            ws.close();
            chrome.kill();
          }
        };
      });
    });
  }, 1500);
}

findOverflowElements();
