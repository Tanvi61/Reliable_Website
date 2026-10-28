const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

function captureView(width, height, outFile) {
  return new Promise((resolve) => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      '--remote-debugging-port=9237',
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${width},${height}`,
      'file:///E:/MindAxis_Web/Reliable_Website/about_test.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:9237/json', (res) => {
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
                    // Scroll so section heading is cleanly visible below the floating navbar (navbar is ~75px high)
                    window.scrollTo({ top: section.offsetTop - 80, behavior: 'instant' });
                    return {
                      sectionTop: section.offsetTop,
                      cardHeight: card.offsetHeight,
                      scrollY: window.scrollY,
                      innerHeight: window.innerHeight
                    };
                  })()`,
                  returnByValue: true
                }
              }));
            }, 800);
          };

          ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id === 1) {
              console.log('Scroll info:', JSON.stringify(msg.result));
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
  await captureView(1280, 720, 'scratch/test_slider_scrolled_1280.png');
}

run();
