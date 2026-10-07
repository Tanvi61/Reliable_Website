const http = require('http');
const { spawn } = require('child_process');

const targetFile = process.argv[2] || 'gallery.html';
const url = `file:///E:/MindAxis_Web/Reliable_Website/${targetFile}`;

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9251',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  url
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9251/json', res => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', () => {
      const tabs = JSON.parse(d);
      const pageTab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension://')) || tabs[0];
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
                const el = document.querySelector('.floating-actions');
                const rect0 = el.getBoundingClientRect();
                return {
                  innerWidth: window.innerWidth,
                  innerHeight: window.innerHeight,
                  docScrollWidth: document.documentElement.scrollWidth,
                  bodyScrollWidth: document.body.scrollWidth,
                  rect0: { top: rect0.top, bottom: rect0.bottom, left: rect0.left, right: rect0.right }
                };
              })()`,
              returnByValue: true
            }
          }));
        } else if (msg.id === 2) {
          console.log(targetFile, JSON.stringify(msg.result, null, 2));
          ws.close();
          chrome.kill();
        }
      };
    });
  });
}, 2000);
