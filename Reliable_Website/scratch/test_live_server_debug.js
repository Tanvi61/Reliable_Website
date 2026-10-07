const http = require('http');
const { spawn } = require('child_process');

const port = 9975;
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=' + port,
  '--no-sandbox',
  '--disable-gpu',
  'http://127.0.0.1:5501/Reliable_Website/index.html'
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
          params: { width: 490, height: 741, deviceScaleFactor: 1, mobile: true }
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
                const el = document.querySelector('.floating-actions');
                const cs = window.getComputedStyle(el);
                const r = el.getBoundingClientRect();
                return {
                  computedTop: cs.top,
                  computedBottom: cs.bottom,
                  computedTransform: cs.transform,
                  rect: { top: r.top, bottom: r.bottom, right: r.right, height: r.height }
                };
              })()`,
              returnByValue: true
            }
          }));
        } else if (msg.id === 2) {
          console.log('LIVE SERVER 5501 RESULT:', JSON.stringify(msg.result.result.value, null, 2));
          ws.close();
          chrome.kill();
        }
      };
    });
  });
}, 1500);
