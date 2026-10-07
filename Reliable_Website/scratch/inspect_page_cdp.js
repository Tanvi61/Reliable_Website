const http = require('http');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9224',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///E:/MindAxis_Web/Reliable_Website/contact.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9224/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const wsUrl = tabs[0].webSocketDebuggerUrl;
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        // Send evaluate command
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              const el = document.querySelector('.floating-actions');
              if (!el) return { error: 'No .floating-actions found' };
              const rect = el.getBoundingClientRect();
              const style = window.getComputedStyle(el);
              const wa = document.querySelector('.float-btn.whatsapp');
              const call = document.querySelector('.float-btn.call');
              const waStyle = wa ? window.getComputedStyle(wa) : null;
              const callStyle = call ? window.getComputedStyle(call) : null;
              return {
                rect: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height },
                style: {
                  position: style.position,
                  bottom: style.bottom,
                  right: style.right,
                  zIndex: style.zIndex,
                  display: style.display,
                  visibility: style.visibility,
                  opacity: style.opacity
                },
                wa: waStyle ? { display: waStyle.display, visibility: waStyle.visibility, opacity: waStyle.opacity, width: waStyle.width, height: waStyle.height } : null,
                call: callStyle ? { display: callStyle.display, visibility: callStyle.visibility, opacity: callStyle.opacity, width: callStyle.width, height: callStyle.height } : null,
                window: { innerWidth: window.innerWidth, innerHeight: window.innerHeight, scrollY: window.scrollY },
                bodyHeight: document.body.scrollHeight
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
}, 2000);
