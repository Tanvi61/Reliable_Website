const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testRefined() {
  const port = 9995;
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
            // Design A: Section has background image, card is frosted glassmorphism
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const card = document.querySelector('.service-spec-grid');
                  const sec = card.closest('section');
                  sec.style.background = "url('assets/images/engineering-survey-bg.png') no-repeat center center";
                  sec.style.backgroundSize = "cover";
                  card.style.background = "rgba(255, 255, 255, 0.88)";
                  card.style.backdropFilter = "blur(16px)";
                  card.style.webkitBackdropFilter = "blur(16px)";
                  card.style.boxShadow = "0 16px 45px rgba(8, 43, 76, 0.1)";
                  card.style.border = "1px solid rgba(255, 255, 255, 0.9)";
                  window.scrollTo(0, sec.offsetTop - 80);
                  return true;
                })()`
              }
            }));
          } else if (msg.id === 2) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          } else if (msg.id === 3) {
            fs.writeFileSync('scratch/design_A_section_glass.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/design_A_section_glass.png');

            // Design B: Background image directly on card (service-spec-grid)
            ws.send(JSON.stringify({
              id: 4,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const card = document.querySelector('.service-spec-grid');
                  const sec = card.closest('section');
                  sec.style.background = "#f4f8fb";
                  card.style.background = "linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.82)), url('assets/images/engineering-survey-bg.png') no-repeat center center";
                  card.style.backgroundSize = "cover";
                  card.style.backdropFilter = "none";
                  card.style.border = "1px solid #e2e8f0";
                  window.scrollTo(0, sec.offsetTop - 80);
                  return true;
                })()`
              }
            }));
          } else if (msg.id === 4) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 5,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          } else if (msg.id === 5) {
            fs.writeFileSync('scratch/design_B_card_direct.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/design_B_card_direct.png');

            // Design C: Section has background image, AND card has crisp semi-translucent styling with transparent table
            ws.send(JSON.stringify({
              id: 6,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const card = document.querySelector('.service-spec-grid');
                  const sec = card.closest('section');
                  sec.style.background = "url('assets/images/engineering-survey-bg.png') no-repeat center center";
                  sec.style.backgroundSize = "cover";
                  card.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.84) 100%)";
                  card.style.backdropFilter = "blur(12px)";
                  card.style.webkitBackdropFilter = "blur(12px)";
                  card.style.border = "1px solid rgba(255, 255, 255, 0.95)";
                  card.style.boxShadow = "0 18px 45px rgba(8, 43, 76, 0.08)";
                  return true;
                })()`
              }
            }));
          } else if (msg.id === 6) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 7,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          } else if (msg.id === 7) {
            fs.writeFileSync('scratch/design_C_both.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/design_C_both.png');

            // Also capture Mobile for Design C
            ws.send(JSON.stringify({
              id: 8,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
            }));
          } else if (msg.id === 8) {
            ws.send(JSON.stringify({
              id: 9,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const card = document.querySelector('.service-spec-grid');
                  const sec = card.closest('section');
                  window.scrollTo(0, sec.offsetTop - 70);
                  return true;
                })()`
              }
            }));
          } else if (msg.id === 9) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 10,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          } else if (msg.id === 10) {
            fs.writeFileSync('scratch/design_C_mobile.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/design_C_mobile.png');

            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1200);
}

testRefined();
