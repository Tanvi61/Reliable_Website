const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9320',
  '--no-sandbox',
  '--disable-gpu',
  'file:///E:/MindAxis_Web/Reliable_Website/gallery.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9320/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      console.log('Tabs:', tabs.map(t => ({ url: t.url, type: t.type })));
      const pageTab = tabs.find(t => t.url.includes('gallery.html')) || tabs[0];
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

      ws.onopen = () => {
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
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const el = document.querySelector('.floating-actions');
                  if (!el) return { error: 'No element' };
                  const rect = el.getBoundingClientRect();
                  const comp = window.getComputedStyle(el);
                  return {
                    scrollY: window.scrollY,
                    rect: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height },
                    position: comp.position,
                    display: comp.display,
                    visibility: comp.visibility,
                    opacity: comp.opacity,
                    zIndex: comp.zIndex,
                    bottom: comp.bottom,
                    right: comp.right,
                    top: comp.top,
                    transform: comp.transform,
                    windowHeight: window.innerHeight,
                    windowWidth: window.innerWidth
                  };
                })()`,
                returnByValue: true
              }
            }));
          }, 1000);
        } else if (msg.id === 2) {
          console.log('DOM info:', JSON.stringify(msg.result?.result?.value, null, 2));
          ws.send(JSON.stringify({
            id: 3,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        } else if (msg.id === 3) {
          fs.writeFileSync('E:/MindAxis_Web/Reliable_Website/scratch/actual_gallery_render.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved actual_gallery_render.png');
          ws.close();
          chromeProc.kill();
        }
      };
    });
  });
}, 2000);
