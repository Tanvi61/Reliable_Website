const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureFaqs() {
  const port = 9999;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'http://127.0.0.1:5501/Reliable_Website/contact.html'
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
            params: { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);
          if (msg.id === 1) {
            // Scroll to FAQ section
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const faq = document.querySelector('.faq-list');
                  if (faq) faq.scrollIntoView({ behavior: 'instant', block: 'center' });
                  return { count: document.querySelectorAll('.faq-card').length };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id === 2) {
            console.log('FAQ cards count:', msg.result.result.value);
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 400);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/verified_contact_6_faqs_desktop.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/verified_contact_6_faqs_desktop.png');

            // Now test mobile view
            ws.send(JSON.stringify({
              id: 4,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
            }));
          } else if (msg.id === 4) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 5,
                method: 'Runtime.evaluate',
                params: {
                  expression: `(() => {
                    const faq = document.querySelector('.faq-list');
                    if (faq) faq.scrollIntoView({ behavior: 'instant', block: 'center' });
                  })()`
                }
              }));
            }, 200);
          } else if (msg.id === 5) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 6,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 400);
          } else if (msg.id === 6) {
            fs.writeFileSync('scratch/verified_contact_6_faqs_mobile.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/verified_contact_6_faqs_mobile.png');
            ws.close();
            chrome.kill();
          }
        };
      });
    });
  }, 1500);
}

captureFaqs();
