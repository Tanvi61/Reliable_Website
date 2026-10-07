const http = require('http');
const { spawn } = require('child_process');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9230',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///E:/MindAxis_Web/Reliable_Website/contact.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9230/json', (res) => {
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
              const el = document.querySelector('.floating-actions');
              const rect = el ? el.getBoundingClientRect() : null;
              
              // Find all elements causing horizontal overflow
              const docWidth = document.documentElement.clientWidth;
              const overflowingElements = [];
              document.querySelectorAll('*').forEach(node => {
                const r = node.getBoundingClientRect();
                if (r.right > docWidth + 5) {
                  overflowingElements.push({
                    tag: node.tagName,
                    class: node.className,
                    right: r.right,
                    width: r.width
                  });
                }
              });

              return {
                windowInnerWidth: window.innerWidth,
                docClientWidth: document.documentElement.clientWidth,
                docScrollWidth: document.documentElement.scrollWidth,
                bodyScrollWidth: document.body.scrollWidth,
                floatingRect: rect,
                floatingComputed: el ? {
                  right: window.getComputedStyle(el).right,
                  bottom: window.getComputedStyle(el).bottom,
                  position: window.getComputedStyle(el).position,
                  zIndex: window.getComputedStyle(el).zIndex
                } : null,
                overflowCount: overflowingElements.length,
                topOverflowElements: overflowingElements.slice(0, 10)
              };
            })()`,
            returnByValue: true
          }
        }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          console.log('Result:', JSON.stringify(msg.result, null, 2));
          ws.close();
          chromeProc.kill();
        }
      };
    });
  });
}, 2500);
