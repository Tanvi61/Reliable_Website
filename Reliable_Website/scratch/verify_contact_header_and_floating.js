const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9239',
  '--no-sandbox',
  '--disable-gpu',
  'file:///E:/MindAxis_Web/Reliable_Website/contact.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9239/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
      
      ws.onopen = () => {
        // Test 1: Mobile (390 x 844)
        ws.send(JSON.stringify({
          id: 1,
          method: 'Emulation.setDeviceMetricsOverride',
          params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
        }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 1200);
        } else if (msg.id === 2) {
          fs.writeFileSync('E:/MindAxis_Web/Reliable_Website/scratch/verified_mobile_header_floating.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved scratch/verified_mobile_header_floating.png');
          
          // Test 2: Switch to Desktop (1440 x 900)
          ws.send(JSON.stringify({
            id: 3,
            method: 'Emulation.setDeviceMetricsOverride',
            params: { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }
          }));
        } else if (msg.id === 3) {
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 4,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 1000);
        } else if (msg.id === 4) {
          fs.writeFileSync('E:/MindAxis_Web/Reliable_Website/scratch/verified_desktop_header_floating.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved scratch/verified_desktop_header_floating.png');
          ws.close();
          chromeProc.kill();
        }
      };
    });
  });
}, 2000);
