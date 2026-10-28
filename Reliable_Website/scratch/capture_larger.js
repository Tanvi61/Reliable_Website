const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

function captureView(width, height, outFile) {
  return new Promise((resolve) => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      '--remote-debugging-port=9242',
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${width},${height}`,
      'file:///E:/MindAxis_Web/Reliable_Website/about_test.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:9242/json', (res) => {
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
                    // Scroll so section heading is visible below floating navbar
                    window.scrollTo({ top: section.offsetTop - 80, behavior: 'instant' });
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
  await captureView(1280, 720, 'scratch/test_larger_1280.png');
  await captureView(1440, 900, 'scratch/test_larger_1440.png');
}

run();
