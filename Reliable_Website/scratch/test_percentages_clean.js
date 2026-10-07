const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testOne(pct) {
  return new Promise((resolve) => {
    const port = 9991;
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      '--remote-debugging-port=' + port,
      '--no-sandbox',
      '--disable-gpu',
      'http://127.0.0.1:5501/Reliable_Website/about.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:' + port + '/json', res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          const tabs = JSON.parse(data);
          const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

          ws.onopen = () => {
            ws.send(JSON.stringify({
              id: 1,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: 505, height: 662, deviceScaleFactor: 1, mobile: true }
            }));
          };

          ws.onmessage = e => {
            const msg = JSON.parse(e.data);
            if (msg.id === 1) {
              ws.send(JSON.stringify({
                id: 2,
                method: 'Runtime.evaluate',
                params: {
                  expression: `(() => {
                    const el = document.querySelector('.floating-actions');
                    el.style.setProperty('top', '${pct}%', 'important');
                    el.style.setProperty('bottom', 'auto', 'important');
                    el.style.setProperty('transform', 'translateY(-50%)', 'important');
                    el.style.setProperty('-webkit-transform', 'translateY(-50%)', 'important');
                    el.style.setProperty('right', '16px', 'important');

                    const call = document.querySelector('.float-btn.call').getBoundingClientRect();
                    return {
                      pct: ${pct},
                      callTop: call.top,
                      callBottom: call.bottom,
                      distanceFromScreenBottom: window.innerHeight - call.bottom
                    };
                  })()`,
                  returnByValue: true
                }
              }));
            } else if (msg.id === 2) {
              console.log('Result for ' + pct + '%:', msg.result.result.value);
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            } else if (msg.id === 3) {
              fs.writeFileSync(`scratch/test_about_top_${pct}.png`, Buffer.from(msg.result.data, 'base64'));
              ws.close();
              chrome.kill();
              resolve();
            }
          };
        });
      });
    }, 1500);
  });
}

async function main() {
  await testOne(42);
  await testOne(45);
}

main();
