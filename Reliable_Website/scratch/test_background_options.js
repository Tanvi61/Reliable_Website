const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testBackgroundOptions() {
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
            params: { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);

          if (msg.id === 1) {
            // Apply Option 1: On service-spec-grid card
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const card = document.querySelector('.service-spec-grid');
                  card.style.backgroundImage = "url('assets/images/engineering-survey-bg.png')";
                  card.style.backgroundSize = "cover";
                  card.style.backgroundPosition = "center";
                  card.scrollIntoView({ behavior: 'instant', block: 'center' });
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
            fs.writeFileSync('scratch/test_opt1_card_bg.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/test_opt1_card_bg.png');

            // Apply Option 2: On the entire section (with semi-transparent or styled card)
            ws.send(JSON.stringify({
              id: 4,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const card = document.querySelector('.service-spec-grid');
                  const sec = card.closest('section');
                  card.style.backgroundImage = 'none';
                  card.style.background = 'rgba(255, 255, 255, 0.88)';
                  card.style.backdropFilter = 'blur(10px)';
                  sec.style.backgroundImage = "url('assets/images/engineering-survey-bg.png')";
                  sec.style.backgroundSize = "cover";
                  sec.style.backgroundPosition = "center";
                  sec.style.backgroundRepeat = "no-repeat";
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
            fs.writeFileSync('scratch/test_opt2_section_bg.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/test_opt2_section_bg.png');

            // Now test Mobile for Option 1
            ws.send(JSON.stringify({
              id: 6,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
            }));
          } else if (msg.id === 6) {
            ws.send(JSON.stringify({
              id: 7,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const card = document.querySelector('.service-spec-grid');
                  card.style.backgroundImage = "url('assets/images/engineering-survey-bg.png')";
                  card.style.backgroundSize = "cover";
                  card.style.backgroundPosition = "center";
                  const sec = card.closest('section');
                  sec.style.backgroundImage = 'none';
                  card.scrollIntoView({ behavior: 'instant', block: 'start' });
                  return true;
                })()`
              }
            }));
          } else if (msg.id === 7) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 8,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);
          } else if (msg.id === 8) {
            fs.writeFileSync('scratch/test_opt1_mobile_card.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/test_opt1_mobile_card.png');

            // Also test 4-Step Engineering Workflow section just in case!
            ws.send(JSON.stringify({
              id: 9,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const h2s = Array.from(document.querySelectorAll('h2'));
                  const workflowH2 = h2s.find(h => h.textContent.includes('Engineering Workflow'));
                  if (workflowH2) {
                    const sec = workflowH2.closest('section');
                    sec.style.backgroundImage = "url('assets/images/engineering-survey-bg.png')";
                    sec.style.backgroundSize = "cover";
                    sec.style.backgroundPosition = "center";
                    sec.scrollIntoView({ behavior: 'instant', block: 'center' });
                  }
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
            fs.writeFileSync('scratch/test_opt3_workflow_bg.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/test_opt3_workflow_bg.png');

            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1200);
}

testBackgroundOptions();
