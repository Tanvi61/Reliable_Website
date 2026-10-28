const http = require('http');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9299',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=504,692',
  'https://reliablewebsite-reliablewebsite-seven.vercel.app/'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9299/json', (res) => {
    let d = '';
    res.on('data', chunk => d += chunk);
    res.on('end', () => {
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
                if (!track) return 'No track';
                
                // Get all rules from CSSOM
                const rules = [];
                for (const sheet of document.styleSheets) {
                  try {
                    for (const rule of sheet.cssRules) {
                      if (rule.cssText && rule.cssText.includes('top-bar-track')) {
                        rules.push({ href: sheet.href, css: rule.cssText });
                      }
                      if (rule.cssRules) {
                        for (const sub of rule.cssRules) {
                          if (sub.cssText && sub.cssText.includes('top-bar-track')) {
                            rules.push({ href: sheet.href, media: rule.conditionText, css: sub.cssText });
                          }
                        }
                      }
                    }
                  } catch(e) {}
                }

                // Check keyframes definition
                const keyframes = [];
                for (const sheet of document.styleSheets) {
                  try {
                    for (const rule of sheet.cssRules) {
                      if (rule.name === 'topBarMarquee') {
                        keyframes.push({ href: sheet.href, css: rule.cssText });
                      }
                      if (rule.cssRules) {
                        for (const sub of rule.cssRules) {
                          if (sub.name === 'topBarMarquee') {
                            keyframes.push({ href: sheet.href, media: rule.conditionText, css: sub.cssText });
                          }
                        }
                      }
                    }
                  } catch(e) {}
                }

                return {
                  computedTransform: window.getComputedStyle(track).transform,
                  computedAnimation: window.getComputedStyle(track).animation,
                  rules,
                  keyframes
                };
              })()`,
              returnByValue: true
            }
          }));
        }, 1500);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log(JSON.stringify(msg.result?.result?.value || msg, null, 2));
        ws.close();
        chromeProc.kill();
      };
    });
  });
}, 1200);
