const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testFooter(logoStyleDesktop, filenameDesk, filenameMobile, filenameTab) {
  for (const { width, height, mobile, file } of [
    { width: 1366, height: 768, mobile: false, file: filenameDesk },
    { width: 390, height: 844, mobile: true, file: filenameMobile },
    { width: 768, height: 1024, mobile: false, file: filenameTab }
  ]) {
    const port = 9900 + Math.floor(Math.random()*40);
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
                params: { width, height, deviceScaleFactor: 1, mobile }
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
                        const img = document.querySelector('.footer-logo-img');
                        if (img && ${!mobile && width > 1024}) {
                          img.style.setProperty('margin', '0 0 15px 0', 'important');
                          img.style.setProperty('align-self', 'flex-start', 'important');
                        }
                        const footer = document.querySelector('footer');
                        footer.scrollIntoView({ behavior: 'instant', block: 'end' });
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
  await testFooter('', 'scratch/test_footer_desk.png', 'scratch/test_footer_mobile.png', 'scratch/test_footer_tab.png');
})();
