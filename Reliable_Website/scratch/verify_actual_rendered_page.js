const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function verifyActualRendered() {
  const port = 9985;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'http://127.0.0.1:5501/Reliable_Website/index.html'
  ]);

  setTimeout(() => {
    http.get('http://127.0.0.1:' + port + '/json', res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const tabs = JSON.parse(data);
        const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

        ws.onopen = () => {
          // Set device size to 503x683 (exact user screenshot dimensions!)
          ws.send(JSON.stringify({
            id: 1,
            method: 'Emulation.setDeviceMetricsOverride',
            params: { width: 503, height: 683, deviceScaleFactor: 1, mobile: true }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);
          if (msg.id === 1) {
            // Check bounding rect as rendered naturally by the browser (NO INJECTED STYLES!)
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  window.scrollTo(0, 0);
                  const el = document.querySelector('.floating-actions');
                  const cs = window.getComputedStyle(el);
                  const r = el.getBoundingClientRect();
                  const wa = document.querySelector('.float-btn.whatsapp').getBoundingClientRect();
                  const call = document.querySelector('.float-btn.call').getBoundingClientRect();
                  return {
                    scrollY: window.scrollY,
                    viewportHeight: window.innerHeight,
                    computed: {
                      position: cs.position,
                      top: cs.top,
                      bottom: cs.bottom,
                      right: cs.right,
                      transform: cs.transform,
                      display: cs.display,
                      visibility: cs.visibility,
                      opacity: cs.opacity
                    },
                    container: { top: r.top, bottom: r.bottom, right: r.right, height: r.height },
                    whatsapp: { top: wa.top, bottom: wa.bottom, right: wa.right },
                    call: { top: call.top, bottom: call.bottom, right: call.right }
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('ACTUAL RENDERED RESULT (503x683):', JSON.stringify(msg.result.result.value, null, 2));
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 300);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/actual_rendered_index_503x683.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/actual_rendered_index_503x683.png');
            ws.close();
            chrome.kill();
          }
        };
      });
    });
  }, 1500);
}

verifyActualRendered();
