const http = require('http');
const { spawn } = require('child_process');

const port = 9470;
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--no-sandbox',
  '--disable-gpu',
  'file:///E:/MindAxis_Web/Reliable_Website/index.html'
]);

setTimeout(() => {
  http.get(`http://127.0.0.1:${port}/json`, res => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', () => {
      const tabs = JSON.parse(d);
      const pageTab = tabs.find(t => t.url.includes('index.html')) || tabs[0];
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({
          id: 1,
          method: 'Emulation.setDeviceMetricsOverride',
          params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
        }));
      };
      ws.onmessage = ev => {
        const msg = JSON.parse(ev.data);
        if (msg.id === 1) {
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const results = [];
                document.body.querySelectorAll('*').forEach(e => {
                  if (e.scrollWidth > 390 && e.offsetWidth <= 390) {
                    results.push({ tag: e.tagName, cls: e.className, id: e.id, scrollW: e.scrollWidth, offsetW: e.offsetWidth });
                  } else if (e.offsetWidth > 390) {
                    results.push({ tag: e.tagName, cls: e.className, id: e.id, offsetW: e.offsetWidth, parent: e.parentElement ? e.parentElement.tagName + '.' + e.parentElement.className : null });
                  }
                });
                return results;
              })()`,
              returnByValue: true
            }
          }));
        } else if (msg.id === 2) {
          console.log(JSON.stringify(msg.result?.result?.value, null, 2));
          ws.close();
          chrome.kill();
        }
      };
    });
  });
}, 1500);
