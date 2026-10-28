const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testCombined() {
  const port = 9977;
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    'file:///E:/MindAxis_Web/Reliable_Website/index.html'
  ]);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      http.get(`http://127.0.0.1:${port}/json`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const tabs = JSON.parse(data);
            const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
            const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

            ws.onopen = () => {
              ws.send(JSON.stringify({
                id: 1,
                method: 'Emulation.setDeviceMetricsOverride',
                params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
              }));
            };

            ws.onmessage = (event) => {
              const msg = JSON.parse(event.data);
              if (msg.id === 1) {
                setTimeout(() => {
                  ws.send(JSON.stringify({
                    id: 2,
                    method: 'Runtime.evaluate',
                    params: {
                      expression: `(() => {
                        const style = document.createElement('style');
                        style.innerHTML = \`
                          @media (max-width: 768px) {
                            .footer {
                              padding-top: 30px !important;
                              padding-bottom: 30px !important;
                            }
                            .footer-grid {
                              gap: 20px !important;
                              margin-bottom: 25px !important;
                            }
                            .footer-col h4 {
                              margin-bottom: 12px !important;
                            }
                            .footer-links {
                              gap: 7px !important;
                            }
                            .footer-links a {
                              font-size: 0.88rem !important;
                              line-height: 1.35 !important;
                            }
                            .footer-col:nth-child(3) .footer-links {
                              display: grid !important;
                              grid-template-columns: 1fr 1fr !important;
                              gap: 8px 12px !important;
                            }
                          }
                        \`;
                        document.head.appendChild(style);
                        const footer = document.querySelector('footer');
                        footer.scrollIntoView({ behavior: 'instant', block: 'end' });
                      })()`
                    }
                  }));
                }, 800);
              } else if (msg.id === 2) {
                setTimeout(() => {
                  ws.send(JSON.stringify({
                    id: 3,
                    method: 'Page.captureScreenshot',
                    params: { format: 'png' }
                  }));
                }, 800);
              } else if (msg.id === 3) {
                fs.writeFileSync('e:/MindAxis_Web/Reliable_Website/scratch/test_combined_upper.png', Buffer.from(msg.result.data, 'base64'));
                console.log('Saved screenshot: e:/MindAxis_Web/Reliable_Website/scratch/test_combined_upper.png');
                ws.close();
                chromeProc.kill();
                resolve();
              }
            };

            ws.onerror = (err) => {
              chromeProc.kill();
              reject(err);
            };
          } catch (e) {
            chromeProc.kill();
            reject(e);
          }
        });
      }).on('error', (err) => {
        chromeProc.kill();
        reject(err);
      });
    }, 1500);
  });
}

testCombined();
