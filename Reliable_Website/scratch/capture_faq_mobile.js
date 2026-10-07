const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9229',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///E:/MindAxis_Web/Reliable_Website/contact.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9229/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
      
      ws.onopen = () => {
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              const faqSec = document.querySelector('.faq-list');
              if (faqSec) {
                faqSec.scrollIntoView({ behavior: 'instant', block: 'center' });
              }
              return { scrollY: window.scrollY };
            })()`
          }
        }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          console.log('Scrolled to:', msg.result);
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 300);
        } else if (msg.id === 2) {
          const imgBase64 = msg.result.data;
          fs.writeFileSync('E:/MindAxis_Web/Reliable_Website/scratch/test_faq_mobile.png', Buffer.from(imgBase64, 'base64'));
          console.log('Saved scratch/test_faq_mobile.png successfully');
          ws.close();
          chromeProc.kill();
        }
      };
    });
  });
}, 2500);
