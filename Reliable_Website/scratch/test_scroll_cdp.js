const http = require('http');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9227',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///E:/MindAxis_Web/Reliable_Website/contact.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9227/json', (res) => {
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
              // Find the FAQ section
              const faqSec = document.querySelector('.faq-list') || document.querySelector('.section-heading');
              const faqTop = faqSec ? faqSec.getBoundingClientRect().top + window.scrollY : 3500;
              
              // Scroll to FAQ
              window.scrollTo(0, faqTop - 200);
              
              const el = document.querySelector('.floating-actions');
              const rect = el.getBoundingClientRect();
              
              // What element is on top at the floating actions position?
              const topEl = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
              
              return {
                scrollY: window.scrollY,
                faqTop: faqTop,
                floatingRect: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right },
                elementOnTop: topEl ? (topEl.tagName + '.' + topEl.className) : null,
                isFloatingActionsOnTop: el.contains(topEl) || topEl === el
              };
            })()`,
            returnByValue: true
          }
        }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          console.log('Scroll Result:', JSON.stringify(msg.result, null, 2));
          ws.close();
          chromeProc.kill();
        }
      };
    });
  });
}, 2500);
