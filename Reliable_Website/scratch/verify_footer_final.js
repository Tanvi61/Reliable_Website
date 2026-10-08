const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function capturePage(url, outName) {
  return new Promise((resolve) => {
    const port = 9991;
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      '--remote-debugging-port=' + port,
      '--no-sandbox',
      '--disable-gpu',
      url
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
              params: { width: 1280, height: 750, deviceScaleFactor: 1, mobile: false }
            }));
          };

          ws.onmessage = e => {
            const msg = JSON.parse(e.data);
            if (msg.id === 1) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `(() => {
                      const footer = document.querySelector('footer');
                      if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
                    })()`
                  }
                }));
              }, 1200);
            }
            if (msg.id === 2) {
              setTimeout(() => {
                ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
              }, 500);
            }
            if (msg.id === 3) {
              fs.writeFileSync(path.join(__dirname, outName), Buffer.from(msg.result.data, 'base64'));
              console.log('Saved ' + outName);
              ws.close();
              chrome.kill();
              resolve();
            }
          };
        });
      });
    }, 1200);
  });
}

async function run() {
  await capturePage('http://127.0.0.1:5501/Reliable_Website/index.html', 'verified_index_footer.png');
  await capturePage('http://127.0.0.1:5501/Reliable_Website/topographical-survey.html', 'verified_service_footer.png');
  console.log('All footer verifications complete.');
}

run().catch(console.error);
