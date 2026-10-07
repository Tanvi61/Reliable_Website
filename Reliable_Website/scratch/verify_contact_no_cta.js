const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9234',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///E:/MindAxis_Web/Reliable_Website/contact.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9234/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
      
      ws.onopen = () => {
        // Wait 1200ms for images and animations to render
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }, 1200);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          fs.writeFileSync('E:/MindAxis_Web/Reliable_Website/scratch/verified_contact_no_cta.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved scratch/verified_contact_no_cta.png');
          ws.close();
          chromeProc.kill();
        }
      };
    });
  });
}, 2500);
