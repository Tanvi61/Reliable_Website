const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function checkAllScrolls() {
  const port = 9330;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    'file:///E:/MindAxis_Web/Reliable_Website/gallery.html'
  ]);
  await new Promise(r => setTimeout(r, 2000));

  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:${port}/json`, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', async () => {
        const tabs = JSON.parse(d);
        const pageTab = tabs.find(t => t.url.includes('gallery.html')) || tabs[0];
        const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

        ws.onopen = () => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Emulation.setDeviceMetricsOverride',
            params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
          }));
        };

        let step = 0;
        const scrollPositions = [0, 200, 400, 600, 1000, 2000];

        ws.onmessage = async (ev) => {
          const msg = JSON.parse(ev.data);
          if (msg.id === 1) {
            runStep();
          } else if (msg.id >= 10 && msg.id < 20) {
            const scroll = scrollPositions[step];
            const data = msg.result?.result?.value;
            console.log(`Scroll ${scroll}px:`, data);
            
            // Take screenshot
            ws.send(JSON.stringify({ id: 20 + step, method: 'Page.captureScreenshot', params: { format: 'png' } }));
          } else if (msg.id >= 20 && msg.id < 30) {
            const scroll = scrollPositions[step];
            fs.writeFileSync(`E:/MindAxis_Web/Reliable_Website/scratch/scroll_${scroll}.png`, Buffer.from(msg.result.data, 'base64'));
            step++;
            if (step < scrollPositions.length) {
              runStep();
            } else {
              console.log('All steps completed!');
              ws.close();
              chrome.kill();
              resolve();
            }
          }
        };

        function runStep() {
          const scroll = scrollPositions[step];
          ws.send(JSON.stringify({
            id: 10 + step,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                window.scrollTo(0, ${scroll});
                const el = document.querySelector('.floating-actions');
                const r = el.getBoundingClientRect();
                const comp = window.getComputedStyle(el);
                return {
                  scrollY: window.scrollY,
                  rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) },
                  display: comp.display,
                  visibility: comp.visibility,
                  opacity: comp.opacity,
                  zIndex: comp.zIndex
                };
              })()`,
              returnByValue: true
            }
          }));
        }
      });
    });
  });
}

checkAllScrolls();
