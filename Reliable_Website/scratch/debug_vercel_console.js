const http = require('http');
const { spawn } = require('child_process');

async function debugVercelPage() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9325;
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
        const tabs = JSON.parse(d);
        const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
        const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

        ws.onopen = () => {
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 1,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const track = document.querySelector('.top-bar-track');
                  if (!track) return { error: 'No .top-bar-track found' };

                  const style = window.getComputedStyle(track);
                  const rect1 = track.getBoundingClientRect();
                  const matrix1 = style.transform;

                  return new Promise(r => {
                    setTimeout(() => {
                      const rect2 = track.getBoundingClientRect();
                      const matrix2 = window.getComputedStyle(track).transform;
                      r({
                        url: window.location.href,
                        viewport: window.innerWidth + 'x' + window.innerHeight,
                        animationName: style.animationName,
                        animationDuration: style.animationDuration,
                        animationPlayState: style.animationPlayState,
                        matrix1: matrix1,
                        matrix2: matrix2,
                        rect1_x: Math.round(rect1.x),
                        rect2_x: Math.round(rect2.x),
                        deltaX: Math.round(rect2.x - rect1.x),
                        isMoving: matrix1 !== matrix2 || rect1.x !== rect2.x
                      });
                    }, 1200);
                  });
                })()`,
                awaitPromise: true,
                returnByValue: true
              }
            }));
          }, 3500); // 3.5s after launch to allow DOM & scripts to execute
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === 1) {
            console.log('\n=== LIVE VERCEL MOTION VERIFICATION AT 504px ===');
            console.log(JSON.stringify(msg.result?.result?.value, null, 2));
            ws.close();
            chromeProc.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1200);
}

debugVercelPage();
