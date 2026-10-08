const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function capture() {
  const port = 9996;
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
            params: { width: 1280, height: 950, deviceScaleFactor: 1, mobile: false }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);

          if (msg.id === 1) {
            // Scroll to capabilities section
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `
                  const cap = document.querySelector('.capabilities-theme-section');
                  if (cap) cap.scrollIntoView({ behavior: 'instant', block: 'start' });
                `
              }
            }));
          }

          if (msg.id === 2) {
            setTimeout(() => {
              ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
            }, 600);
          }

          if (msg.id === 3) {
            fs.writeFileSync(path.join(__dirname, 'cap_to_faqs_desktop.png'), Buffer.from(msg.result.data, 'base64'));
            console.log('Saved cap_to_faqs_desktop.png');

            // Scroll down to show faqs and cta
            ws.send(JSON.stringify({
              id: 4,
              method: 'Runtime.evaluate',
              params: {
                expression: `
                  const faqs = document.querySelector('.faqs-theme-section');
                  if (faqs) faqs.scrollIntoView({ behavior: 'instant', block: 'start' });
                `
              }
            }));
          }

          if (msg.id === 4) {
            setTimeout(() => {
              ws.send(JSON.stringify({ id: 5, method: 'Page.captureScreenshot', params: { format: 'png' } }));
            }, 600);
          }

          if (msg.id === 5) {
            fs.writeFileSync(path.join(__dirname, 'faqs_and_cta_desktop.png'), Buffer.from(msg.result.data, 'base64'));
            console.log('Saved faqs_and_cta_desktop.png');

            // Switch to mobile
            ws.send(JSON.stringify({
              id: 6,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
            }));
          }

          if (msg.id === 6) {
            ws.send(JSON.stringify({
              id: 7,
              method: 'Runtime.evaluate',
              params: {
                expression: `
                  const cap = document.querySelector('.capabilities-theme-section');
                  if (cap) cap.scrollIntoView({ behavior: 'instant', block: 'start' });
                `
              }
            }));
          }

          if (msg.id === 7) {
            setTimeout(() => {
              ws.send(JSON.stringify({ id: 8, method: 'Page.captureScreenshot', params: { format: 'png' } }));
            }, 600);
          }

          if (msg.id === 8) {
            fs.writeFileSync(path.join(__dirname, 'cap_to_faqs_mobile.png'), Buffer.from(msg.result.data, 'base64'));
            console.log('Saved cap_to_faqs_mobile.png');

            ws.close();
            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1000);
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
