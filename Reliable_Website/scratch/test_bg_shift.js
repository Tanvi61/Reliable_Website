const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testStyle(cssPatch, filename) {
  const port = 9930 + Math.floor(Math.random() * 40);
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
                        style.innerHTML = \`${cssPatch}\`;
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
                fs.writeFileSync(filename, Buffer.from(msg.result.data, 'base64'));
                console.log(`Saved screenshot: ${filename}`);
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

async function run() {
  // Test A: background-position: center bottom -150px
  const cssA = `
    @media (max-width: 768px) {
      .footer {
        background-position: center bottom -150px !important;
      }
    }
  `;
  await testStyle(cssA, 'e:/MindAxis_Web/Reliable_Website/scratch/test_bg_A.png');

  // Test B: background-position: center bottom -250px
  const cssB = `
    @media (max-width: 768px) {
      .footer {
        background-position: center bottom -250px !important;
      }
    }
  `;
  await testStyle(cssB, 'e:/MindAxis_Web/Reliable_Website/scratch/test_bg_B.png');

  // Test C: background-position: center bottom -180px with 2-column services
  const cssC = `
    @media (max-width: 768px) {
      .footer {
        background-position: center bottom -180px !important;
      }
      .footer-col:nth-child(3) .footer-links {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 8px 12px !important;
      }
    }
  `;
  await testStyle(cssC, 'e:/MindAxis_Web/Reliable_Website/scratch/test_bg_C.png');

  // Test D: Keep 1 column services, but shift background down -220px and compact gaps
  const cssD = `
    @media (max-width: 768px) {
      .footer {
        background-position: center bottom -220px !important;
      }
      .footer-grid {
        gap: 22px !important;
        margin-bottom: 25px !important;
      }
      .footer-links {
        gap: 8px !important;
      }
      .footer-links a {
        font-size: 0.9rem !important;
        line-height: 1.3 !important;
      }
      .footer-bottom {
        background: #082b4c !important;
        margin-top: 20px !important;
        padding-top: 20px !important;
        padding-bottom: 20px !important;
        margin-left: -20px !important;
        margin-right: -20px !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
    }
  `;
  await testStyle(cssD, 'e:/MindAxis_Web/Reliable_Website/scratch/test_bg_D.png');
}

run();
