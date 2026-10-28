const http = require('http');
const { spawn } = require('child_process');

async function testViewportMotion(width, height, label) {
  return new Promise((resolve) => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const port = 9300 + Math.floor(Math.random() * 20);
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${width},${height}`,
      'http://127.0.0.1:5501/Reliable_Website/index.html'
    ]);

    setTimeout(() => {
      http.get(`http://127.0.0.1:${port}/json`, (res) => {
        let d = '';
        res.on('data', chunk => d += chunk);
        res.on('end', () => {
          try {
            const tabs = JSON.parse(d);
            const pageTab = tabs.find(t => t.type === 'page' || t.url.includes('Reliable_Website')) || tabs[0];
            const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

            ws.onopen = () => {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 1,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `(() => {
                      const track = document.querySelector('.top-bar-track');
                      if (!track) return { error: 'No .top-bar-track' };

                      const style = window.getComputedStyle(track);
                      const rect1 = track.getBoundingClientRect();
                      const matrix1 = window.getComputedStyle(track).transform;

                      return new Promise(r => {
                        setTimeout(() => {
                          const rect2 = track.getBoundingClientRect();
                          const matrix2 = window.getComputedStyle(track).transform;
                          r({
                            label: '${label}',
                            width: ${width},
                            animationName: style.animationName,
                            animationDuration: style.animationDuration,
                            animationPlayState: style.animationPlayState,
                            matrix1: matrix1,
                            matrix2: matrix2,
                            rect1_x: Math.round(rect1.x),
                            rect2_x: Math.round(rect2.x),
                            deltaX: Math.round(rect2.x - rect1.x),
                            hasMoved: rect1.x !== rect2.x || matrix1 !== matrix2
                          });
                        }, 1200);
                      });
                    })()`,
                    awaitPromise: true,
                    returnByValue: true
                  }
                }));
              }, 1200);
            };

            ws.onmessage = (event) => {
              const msg = JSON.parse(event.data);
              console.log(JSON.stringify(msg.result?.result?.value, null, 2));
              ws.close();
              chromeProc.kill();
              resolve();
            };

            ws.onerror = () => { chromeProc.kill(); resolve(); };
          } catch(e) {
            console.error('Error:', e);
            chromeProc.kill();
            resolve();
          }
        });
      }).on('error', () => { chromeProc.kill(); resolve(); });
    }, 1200);
  });
}

async function run() {
  console.log('=== TESTING TOPBAR MOTION ACROSS VIEWPORTS ===');
  await testViewportMotion(504, 692, 'USER MOBILE VIEWPORT (504x692)');
  await testViewportMotion(390, 844, 'IPHONE 14 (390x844)');
  await testViewportMotion(820, 1180, 'TABLET IPAD AIR (820x1180)');
  await testViewportMotion(1280, 800, 'DESKTOP (1280x800)');
}

run();
