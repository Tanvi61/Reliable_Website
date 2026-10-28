const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

function captureMobile(outFile) {
  return new Promise((resolve) => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      '--remote-debugging-port=9240',
      '--no-sandbox',
      '--disable-gpu',
      '--window-size=390,844',
      'file:///E:/MindAxis_Web/Reliable_Website/about_test.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:9240/json', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const tabs = JSON.parse(data);
          const pageTab = tabs.find(t => t.type === 'page' || t.url.includes('about_test.html')) || tabs[0];
          const wsUrl = pageTab.webSocketDebuggerUrl;
          const ws = new WebSocket(wsUrl);

          ws.onopen = () => {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 1,
                method: 'Runtime.evaluate',
                params: {
                  expression: `(() => {
                    const card = document.querySelector('.exp-slider-card');
                    if (card) card.scrollIntoView({ block: 'center', behavior: 'instant' });
                    return true;
                  })()`,
                  returnByValue: true
                }
              }));
            }, 1000);
          };

          ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id === 1) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Page.captureScreenshot',
                  params: { format: 'png' }
                }));
              }, 500);
            } else if (msg.id === 2) {
              if (msg.result && msg.result.data) {
                fs.writeFileSync(outFile, Buffer.from(msg.result.data, 'base64'));
                console.log('Saved', outFile);
              }
              ws.close();
              chromeProc.kill();
              setTimeout(resolve, 500);
            }
          };
        });
      });
    }, 1500);
  });
}

captureMobile('scratch/verify_exp_mobile_center.png');
