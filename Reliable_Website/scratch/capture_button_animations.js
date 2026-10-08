const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureServiceButtons() {
  const port = 9998;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'http://127.0.0.1:5501/Reliable_Website/topographical-survey.html'
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
            params: { width: 1200, height: 800, deviceScaleFactor: 1, mobile: false }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);

          if (msg.id === 1) {
            // Scroll to the service specification section
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const btnGrid = document.querySelector('.service-spec-cta-grid');
                  if (btnGrid) {
                    btnGrid.scrollIntoView({ behavior: 'instant', block: 'center' });
                    const rect = btnGrid.getBoundingClientRect();
                    const quoteBtn = document.querySelector('.btn-spec-quote');
                    const waBtn = document.querySelector('.btn-spec-whatsapp');
                    return {
                      quoteText: quoteBtn ? quoteBtn.textContent.trim() : null,
                      waText: waBtn ? waBtn.textContent.trim() : null,
                      gridRect: rect
                    };
                  }
                  return null;
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('Button verification info:', msg.result.result.value);
            // Capture resting state screenshot
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/service_buttons_resting.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/service_buttons_resting.png');

            // Now dispatch mousemove / hover over the Request Quote button
            ws.send(JSON.stringify({
              id: 4,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const quoteBtn = document.querySelector('.btn-spec-quote');
                  const rect = quoteBtn.getBoundingClientRect();
                  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 4) {
            const pos = msg.result.result.value;
            ws.send(JSON.stringify({
              id: 5,
              method: 'Input.dispatchMouseEvent',
              params: {
                type: 'mouseMoved',
                x: pos.x,
                y: pos.y
              }
            }));
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 6,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 500);
          } else if (msg.id === 6) {
            fs.writeFileSync('scratch/service_buttons_hover_quote.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/service_buttons_hover_quote.png');

            // Now dispatch mousemove / hover over WhatsApp Us button
            ws.send(JSON.stringify({
              id: 7,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const waBtn = document.querySelector('.btn-spec-whatsapp');
                  const rect = waBtn.getBoundingClientRect();
                  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 7) {
            const pos = msg.result.result.value;
            ws.send(JSON.stringify({
              id: 8,
              method: 'Input.dispatchMouseEvent',
              params: {
                type: 'mouseMoved',
                x: pos.x,
                y: pos.y
              }
            }));
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 9,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 500);
          } else if (msg.id === 9) {
            fs.writeFileSync('scratch/service_buttons_hover_wa.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/service_buttons_hover_wa.png');

            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1200);
}

captureServiceButtons();
