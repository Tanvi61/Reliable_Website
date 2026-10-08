const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testViewport(url, width, height, name) {
  return new Promise((resolve) => {
    const port = 9999;
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      '--remote-debugging-port=' + port,
      '--no-sandbox',
      '--disable-gpu',
      url
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:' + port + '/json', res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          const tabs = JSON.parse(data);
          const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

          ws.onopen = () => {
            ws.send(JSON.stringify({
              id: 1,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: width, height: height, deviceScaleFactor: 2, mobile: true }
            }));
          };

          ws.onmessage = e => {
            const msg = JSON.parse(e.data);
            if (msg.id === 1) {
              ws.send(JSON.stringify({
                id: 2,
                method: 'Runtime.evaluate',
                params: {
                  expression: `(() => {
                    const winW = window.innerWidth;
                    const docW = document.documentElement.scrollWidth;
                    const bodyW = document.body.scrollWidth;
                    const nav = document.querySelector('.nav-exact');
                    const ham = document.querySelector('.hamburger-exact');
                    const fl = document.querySelector('.floating-actions');
                    const wa = document.querySelector('.float-btn.whatsapp');
                    const call = document.querySelector('.float-btn.call');

                    const navR = nav ? nav.getBoundingClientRect() : null;
                    const hamR = ham ? ham.getBoundingClientRect() : null;
                    const flR = fl ? fl.getBoundingClientRect() : null;
                    const waR = wa ? wa.getBoundingClientRect() : null;
                    const callR = call ? call.getBoundingClientRect() : null;

                    return {
                      winW,
                      docW,
                      bodyW,
                      hasDocOverflow: docW > winW,
                      hasBodyOverflow: bodyW > winW,
                      navRight: navR ? navR.right : null,
                      navFits: navR ? navR.right <= winW : null,
                      hamburgerRight: hamR ? hamR.right : null,
                      hamburgerFits: hamR ? hamR.right <= winW : null,
                      floatingRight: flR ? flR.right : null,
                      floatingFits: flR ? flR.right <= winW : null,
                      waRight: waR ? waR.right : null,
                      callRight: callR ? callR.right : null
                    };
                  })()`,
                  returnByValue: true
                }
              }));
            } else if (msg.id === 2) {
              console.log('=== ' + name + ' (' + width + 'x' + height + ') ===');
              console.log(JSON.stringify(msg.result.result.value, null, 2));

              // Scroll to Mission section
              ws.send(JSON.stringify({
                id: 3,
                method: 'Runtime.evaluate',
                params: {
                  expression: `(() => {
                    const sec = document.querySelector('section[style*=\"linear-gradient\"]');
                    if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
                  })()`
                }
              }));
            } else if (msg.id === 3) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 4,
                  method: 'Page.captureScreenshot',
                  params: { format: 'png' }
                }));
              }, 400);
            } else if (msg.id === 4) {
              fs.writeFileSync('scratch/verify_overflow_' + name + '.png', Buffer.from(msg.result.data, 'base64'));
              console.log('Saved scratch/verify_overflow_' + name + '.png');
              ws.close();
              chrome.kill();
              resolve();
            }
          };
        });
      });
    }, 1500);
  });
}

async function run() {
  await testViewport('http://127.0.0.1:5501/Reliable_Website/about.html', 375, 667, 'about_375');
  await testViewport('http://127.0.0.1:5501/Reliable_Website/about.html', 505, 662, 'about_user_505');
  await testViewport('http://127.0.0.1:5501/Reliable_Website/index.html', 375, 667, 'index_375');
}

run();
