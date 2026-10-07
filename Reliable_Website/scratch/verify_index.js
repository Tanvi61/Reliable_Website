const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9232',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///E:/MindAxis_Web/Reliable_Website/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9232/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
      
      ws.onopen = () => {
        // Scroll halfway down index.html
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              window.scrollTo(0, 1800);
              return { scrollY: window.scrollY };
            })()`
          }
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
          }, 300);
        } else if (msg.id === 2) {
          fs.writeFileSync('E:/MindAxis_Web/Reliable_Website/scratch/verified_index.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved scratch/verified_index.png');
          ws.close();
          chromeProc.kill();
        }
      };
    });
  });
}, 2500);
