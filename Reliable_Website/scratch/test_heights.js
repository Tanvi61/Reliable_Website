const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testViewport(h) {
  const port = 9260 + Math.floor(Math.random() * 20);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    'file:///E:/MindAxis_Web/Reliable_Website/index.html'
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
            params: { width: 375, height: h, deviceScaleFactor: 2, mobile: true }
          }));
        };
        ws.onmessage = ev => {
          const msg = JSON.parse(ev.data);
          if (msg.id === 1) {
            setTimeout(() => {
              ws.send(JSON.stringify({ id: 2, method: 'Page.captureScreenshot', params: { format: 'png' } }));
            }, 800);
          } else if (msg.id === 2) {
            fs.writeFileSync(`E:/MindAxis_Web/Reliable_Website/scratch/test_h_${h}.png`, Buffer.from(msg.result.data, 'base64'));
            ws.close(); chrome.kill(); resolve();
          }
        };
      });
    });
  });
}

(async () => {
  await testViewport(500);
  await testViewport(600);
  console.log('done testing heights');
})();
