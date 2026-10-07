const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9231',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///E:/MindAxis_Web/Reliable_Website/contact.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9231/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
      
      ws.onopen = () => {
        // Step 1: Capture top screenshot
        ws.send(JSON.stringify({
          id: 1,
          method: 'Page.captureScreenshot',
          params: { format: 'png' }
        }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          fs.writeFileSync('E:/MindAxis_Web/Reliable_Website/scratch/verified_top.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved scratch/verified_top.png');

          // Step 2: Scroll to FAQ
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const faqSec = document.querySelector('.faq-list');
                if (faqSec) faqSec.scrollIntoView({ behavior: 'instant', block: 'center' });
                return { scrollY: window.scrollY };
              })()`
            }
          }));
        } else if (msg.id === 2) {
          console.log('Scrolled to FAQ:', msg.result);
          // Wait 300ms and capture FAQ screenshot
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 3,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 300);
        } else if (msg.id === 3) {
          fs.writeFileSync('E:/MindAxis_Web/Reliable_Website/scratch/verified_faq.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved scratch/verified_faq.png');
          ws.close();
          chromeProc.kill();
        }
      };
    });
  });
}, 2500);
