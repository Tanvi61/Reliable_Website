const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

function captureResponsive(width, height, outFile) {
  return new Promise((resolve) => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      '--remote-debugging-port=9239',
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${width},${height}`,
      'file:///E:/MindAxis_Web/Reliable_Website/about_test.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:9239/json', (res) => {
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
                    const section = card.closest('section');
                    window.scrollTo({ top: section.offsetTop - 70, behavior: 'instant' });
                    return true;
                  })()`,
                  returnByValue: true
                }
              }));
            }, 800);
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
              }, 400);
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

async function run() {
  await captureResponsive(768, 1024, 'scratch/verify_exp_tablet_768.png');
  await captureResponsive(390, 844, 'scratch/verify_exp_mobile_390.png');
  await captureResponsive(1440, 900, 'scratch/verify_exp_desktop_1440.png');
  console.log('All responsive captures done!');
}

run();
