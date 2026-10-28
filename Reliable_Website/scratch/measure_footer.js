const http = require('http');
const { spawn } = require('child_process');

const port = 9988;
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=' + port,
  'file:///E:/MindAxis_Web/Reliable_Website/index.html'
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
          params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
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
                const footer = document.querySelector('.footer');
                const cols = Array.from(document.querySelectorAll('.footer-col, .footer-brand'));
                const footerRect = footer.getBoundingClientRect();
                return cols.map((col, idx) => {
                  const r = col.getBoundingClientRect();
                  return {
                    idx: idx + 1,
                    class: col.className,
                    top: Math.round(r.top - footerRect.top),
                    bottom: Math.round(r.bottom - footerRect.top),
                    height: Math.round(r.height)
                  };
                });
              })()`,
              returnByValue: true
            }
          }));
        }
        if (msg.id === 2) {
          console.log(JSON.stringify(msg.result, null, 2));
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}, 1200);
