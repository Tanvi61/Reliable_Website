const http = require('http');
const { spawn } = require('child_process');

const targetFile = process.argv[2] || 'topographical-survey.html';

const port = 9390;
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--no-sandbox',
  '--disable-gpu',
  `file:///E:/MindAxis_Web/Reliable_Website/${targetFile}`
]);

setTimeout(() => {
  http.get(`http://127.0.0.1:${port}/json`, res => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', () => {
      const tabs = JSON.parse(d);
      const pageTab = tabs.find(t => t.url.includes(targetFile)) || tabs[0];
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
                const docW = document.documentElement.scrollWidth;
                const winW = window.innerWidth;
                const overflowing = [];
                document.querySelectorAll('*').forEach(e => {
                  const r = e.getBoundingClientRect();
                  if (r.right > 395) {
                    overflowing.push({
                      tag: e.tagName,
                      cls: (e.className || '').toString().slice(0, 50),
                      id: e.id,
                      rectRight: Math.round(r.right),
                      width: Math.round(r.width)
                    });
                  }
                });
                return {
                  docW, winW,
                  overflowingCount: overflowing.length,
                  overflowingTop10: overflowing.slice(0, 10)
                };
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
}, 2000);
