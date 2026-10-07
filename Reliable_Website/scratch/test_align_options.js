const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testStyle(pStyle, filenameMobile, filenameTab) {
  for (const { width, height, mobile, file } of [
    { width: 390, height: 844, mobile: true, file: filenameMobile },
    { width: 768, height: 1024, mobile: false, file: filenameTab }
  ]) {
    const port = 9500 + Math.floor(Math.random()*40);
    const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      'file:///E:/MindAxis_Web/Reliable_Website/index.html'
    ]);

    await new Promise((resolve) => {
      setTimeout(() => {
        http.get(`http://127.0.0.1:${port}/json`, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            const tabs = JSON.parse(data);
            const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

            ws.onopen = () => {
              ws.send(JSON.stringify({
                id: 1,
                method: 'Emulation.setDeviceMetricsOverride',
                params: { width, height, deviceScaleFactor: 2, mobile }
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
                        const sec = document.querySelector('.review-us-section');
                        const p = sec.querySelector('p');
                        p.setAttribute('style', '${pStyle}');
                        sec.scrollIntoView({ behavior: 'instant', block: 'center' });
                      })()`
                    }
                  }));
                }, 1000);
              } else if (msg.id === 2) {
                setTimeout(() => {
                  ws.send(JSON.stringify({
                    id: 3,
                    method: 'Page.captureScreenshot',
                    params: { format: 'png' }
                  }));
                }, 600);
              } else if (msg.id === 3) {
                fs.writeFileSync(file, Buffer.from(msg.result.data, 'base64'));
                console.log('Saved ' + file);
                ws.close();
                chromeProc.kill();
                resolve();
              }
            };
          });
        });
      }, 1200);
    });
  }
}

(async () => {
  // Option 1: text-align: left, margin-left: auto, margin-right: auto (box centered, text left-aligned)
  await testStyle(
    'color: rgba(255,255,255,0.85); font-size: 18px; margin-bottom: 35px; max-width: 600px; margin-left: auto; margin-right: auto; text-align: left;',
    'scratch/opt1_mobile.png',
    'scratch/opt1_tab.png'
  );

  // Option 2: text-align: left, margin-left: 0 (flush to the left)
  await testStyle(
    'color: rgba(255,255,255,0.85); font-size: 18px; margin-bottom: 35px; max-width: 600px; margin-left: 0; margin-right: auto; text-align: left;',
    'scratch/opt2_mobile.png',
    'scratch/opt2_tab.png'
  );
})();
