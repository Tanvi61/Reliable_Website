const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testVariation(cssPatch, filename) {
  const port = 9920 + Math.floor(Math.random() * 50);
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
  // Option 1: Services column 2-column grid
  const patch1 = `
    @media (max-width: 768px) {
      .footer-col:nth-child(3) .footer-links {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 9px 14px !important;
      }
      .footer-col:nth-child(3) .footer-links a {
        font-size: 0.88rem !important;
        line-height: 1.35 !important;
      }
    }
  `;
  await testVariation(patch1, 'e:/MindAxis_Web/Reliable_Website/scratch/footer_upper_opt1.png');

  // Option 2: Services 2-column grid + Quick Links 2-column grid + compact gaps
  const patch2 = `
    @media (max-width: 768px) {
      .footer-grid {
        gap: 24px !important;
        margin-bottom: 30px !important;
      }
      .footer-col:nth-child(2) .footer-links {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 9px 14px !important;
      }
      .footer-col:nth-child(3) .footer-links {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 9px 14px !important;
      }
      .footer-col:nth-child(3) .footer-links a,
      .footer-col:nth-child(2) .footer-links a {
        font-size: 0.88rem !important;
        line-height: 1.35 !important;
      }
    }
  `;
  await testVariation(patch2, 'e:/MindAxis_Web/Reliable_Website/scratch/footer_upper_opt2.png');

  // Option 3: Quick Links & Services side-by-side as two columns in mobile
  const patch3 = `
    @media (max-width: 768px) {
      .footer-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 24px 16px !important;
        margin-bottom: 30px !important;
      }
      .footer-col:nth-child(1) { grid-column: span 2; order: 1; }
      .footer-col:nth-child(4) { grid-column: span 2; order: 2; margin-bottom: 5px; }
      .footer-col:nth-child(2) { grid-column: span 1; order: 3; }
      .footer-col:nth-child(3) { grid-column: span 1; order: 4; }
      .footer-links a {
        font-size: 0.88rem !important;
        line-height: 1.3 !important;
      }
      .footer-links {
        gap: 8px !important;
      }
    }
  `;
  await testVariation(patch3, 'e:/MindAxis_Web/Reliable_Website/scratch/footer_upper_opt3.png');

  // Option 4: Keep single column, but compact gaps and increase footer bottom breathing space / background adjustment
  const patch4 = `
    @media (max-width: 768px) {
      .footer {
        padding-bottom: 90px !important;
      }
      .footer-grid {
        gap: 20px !important;
        margin-bottom: 25px !important;
      }
      .footer-col h4 {
        margin-bottom: 14px !important;
      }
      .footer-links {
        gap: 7px !important;
      }
      .footer-links a {
        font-size: 0.88rem !important;
        line-height: 1.25 !important;
      }
    }
  `;
  await testVariation(patch4, 'e:/MindAxis_Web/Reliable_Website/scratch/footer_upper_opt4.png');
}

run();
