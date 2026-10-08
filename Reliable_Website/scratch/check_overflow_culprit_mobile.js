const http = require('http');
const { spawn } = require('child_process');

async function checkOverflow(url, width, height) {
  return new Promise((resolve) => {
    const port = 9994;
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
              params: { width: width, height: height, deviceScaleFactor: 1, mobile: true }
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
                    const docWidth = document.documentElement.offsetWidth;
                    const winWidth = window.innerWidth;
                    const scrollWidth = document.documentElement.scrollWidth;
                    const bodyScrollWidth = document.body.scrollWidth;

                    const culprits = [];
                    document.querySelectorAll('*').forEach(el => {
                      const rect = el.getBoundingClientRect();
                      if (rect.right > winWidth + 1 || rect.width > winWidth + 1) {
                        culprits.push({
                          tag: el.tagName,
                          id: el.id,
                          className: el.className,
                          right: rect.right,
                          width: rect.width,
                          scrollWidth: el.scrollWidth,
                          htmlSnippet: el.outerHTML.substring(0, 150)
                        });
                      }
                    });

                    return {
                      url: window.location.pathname,
                      winWidth,
                      docWidth,
                      scrollWidth,
                      bodyScrollWidth,
                      hasOverflow: scrollWidth > winWidth,
                      culpritsCount: culprits.length,
                      topCulprits: culprits.sort((a,b) => b.right - a.right).slice(0, 10)
                    };
                  })()`,
                  returnByValue: true
                }
              }));
            } else if (msg.id === 2) {
              console.log('OVERFLOW CHECK (' + url + ' @ ' + width + 'px):');
              console.log(JSON.stringify(msg.result.result.value, null, 2));
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
  await checkOverflow('http://127.0.0.1:5501/Reliable_Website/about.html', 390, 844);
  await checkOverflow('http://127.0.0.1:5501/Reliable_Website/about.html', 505, 662);
  await checkOverflow('http://127.0.0.1:5501/Reliable_Website/index.html', 390, 844);
}

run();
