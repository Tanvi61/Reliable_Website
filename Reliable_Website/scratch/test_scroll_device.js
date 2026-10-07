const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testDevice(width, height, label) {
  const port = 9310 + Math.floor(Math.random() * 20);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    'file:///E:/MindAxis_Web/Reliable_Website/gallery.html'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:${port}/json`, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        const tabs = JSON.parse(d);
        const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
        ws.onopen = () => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Emulation.setDeviceMetricsOverride',
            params: { width, height, deviceScaleFactor: 2, mobile: true }
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
                  if (!el) return { error: 'No .floating-actions found' };
                  const r = el.getBoundingClientRect();
                  const s = window.getComputedStyle(el);
                  return {
                    rect: { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height },
                    position: s.position,
                    bottom: s.bottom,
                    right: s.right,
                    display: s.display,
                    visibility: s.visibility,
                    opacity: s.opacity,
                    zIndex: s.zIndex
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log(`[${label} info]:`, JSON.stringify(msg.result?.result?.value));
            ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
          } else if (msg.id === 3) {
            fs.writeFileSync(`E:/MindAxis_Web/Reliable_Website/scratch/${label}_view.png`, Buffer.from(msg.result.data, 'base64'));
            console.log(`Saved ${label}_view.png`);
            ws.close();
            chrome.kill();
            resolve();
          }
        };
      });
    });
  });
}

(async () => {
  await testDevice(390, 844, 'mobile_test');
  await testDevice(768, 1024, 'tablet_test');
  console.log('Testing done');
})();
