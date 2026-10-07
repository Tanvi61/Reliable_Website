const http = require('http');
const { spawn } = require('child_process');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9235',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///E:/MindAxis_Web/Reliable_Website/contact.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9235/json', (res) => {
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
              if (!el) return { error: 'No .floating-actions element' };
              const rect = el.getBoundingClientRect();
              const style = window.getComputedStyle(el);
              const wa = document.querySelector('.float-btn.whatsapp');
              const call = document.querySelector('.float-btn.call');
              const scrollBtn = document.querySelector('#scrollTopBtn');
              
              return {
                scrollY: window.scrollY,
                windowInner: { w: window.innerWidth, h: window.innerHeight },
                rect: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height },
                style: {
                  position: style.position,
                  bottom: style.bottom,
                  right: style.right,
                  zIndex: style.zIndex,
                  display: style.display,
                  visibility: style.visibility,
                  opacity: style.opacity,
                  transform: style.transform
                },
                waStyle: wa ? { display: window.getComputedStyle(wa).display, rect: wa.getBoundingClientRect() } : null,
                callStyle: call ? { display: window.getComputedStyle(call).display, rect: call.getBoundingClientRect() } : null,
                scrollBtnStyle: scrollBtn ? { display: window.getComputedStyle(scrollBtn).display, rect: scrollBtn.getBoundingClientRect() } : null,
                elementFromPoint: document.elementFromPoint(rect.left + 10, rect.top + 10) ? document.elementFromPoint(rect.left + 10, rect.top + 10).outerHTML.slice(0, 100) : null
              };
            })()`,
            returnByValue: true
          }
        }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          console.log('Result at scroll 0:', JSON.stringify(msg.result, null, 2));
          ws.close();
          chromeProc.kill();
        }
      };
    });
  });
}, 2000);
