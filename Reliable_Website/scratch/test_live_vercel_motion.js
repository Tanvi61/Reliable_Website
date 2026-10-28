const http = require('http');
const { spawn } = require('child_process');

async function testLiveVercelMotion() {
  return new Promise((resolve) => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const port = 9310;
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      '--window-size=504,692',
      'https://reliablewebsite-reliablewebsite-seven.vercel.app/'
    ]);

    setTimeout(() => {
      http.get(`http://127.0.0.1:${port}/json`, (res) => {
        let d = '';
        res.on('data', chunk => d += chunk);
        res.on('end', () => {
          try {
            const tabs = JSON.parse(d);
            const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

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
                            url: 'https://reliablewebsite-reliablewebsite-seven.vercel.app/',
                            viewport: '504x692',
                            animationName: style.animationName,
                            animationDuration: style.animationDuration,
                            animationPlayState: style.animationPlayState,
                            matrix1: matrix1,
                            matrix2: matrix2,
                            rect1_x: Math.round(rect1.x),
                            rect2_x: Math.round(rect2.x),
                            deltaX: Math.round(rect2.x - rect1.x),
                            isContinuouslyMoving: matrix1 !== matrix2 || rect1.x !== rect2.x
                          });
                        }, 1500);
                      });
                    })()`,
                    awaitPromise: true,
                    returnByValue: true
                  }
                }));
              }, 1500);
            };

            ws.onmessage = (event) => {
              const msg = JSON.parse(event.data);
              console.log('\n=== LIVE VERCEL PRODUCTION MOTION TEST ===');
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

testLiveVercelMotion();
