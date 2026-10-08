const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'topographical-survey.html');
let original = fs.readFileSync(filePath, 'utf8');

const layoutA = `<p style="margin: 0; line-height: 1.45;"><strong>Proprietors:</strong><br>Mahesh Deshmukh<br><a href="tel:+919604648777">+91 96046 48777</a><br><span style="display:inline-block; margin-top: 6px;">Sharad Pingale</span><br><a href="tel:+918600044688">+91 86000 44688</a></p>`;

function runOne(isMobile, outName) {
  return new Promise((resolve) => {
    const targetPattern = /<p style="margin: 0; line-height: 1\.4;"><strong>Proprietors:<\/strong><br>Mahesh Deshmukh<br>Sharad Pingale<\/p>\s*<p><a href="tel:\+919604648777">\+91 96046 48777<\/a>\s*<br>\s*<a href="tel:\+918600044688">\+91 86000 44688<\/a><\/p>/;
    fs.writeFileSync(filePath, original.replace(targetPattern, layoutA), 'utf8');

    const port = 9992;
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
            const metrics = isMobile
              ? { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
              : { width: 1280, height: 750, deviceScaleFactor: 1, mobile: false };
            ws.send(JSON.stringify({
              id: 1,
              method: 'Emulation.setDeviceMetricsOverride',
              params: metrics
            }));
          };

          ws.onmessage = e => {
            const msg = JSON.parse(e.data);
            if (msg.id === 1) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `(() => {
                      const footer = document.querySelector('footer');
                      if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
                    })()`
                  }
                }));
              }, 1000);
            }
            if (msg.id === 2) {
              setTimeout(() => {
                ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
              }, 500);
            }
            if (msg.id === 3) {
              fs.writeFileSync(path.join(__dirname, outName), Buffer.from(msg.result.data, 'base64'));
              console.log('Saved ' + outName);
              ws.close();
              chrome.kill();
              fs.writeFileSync(filePath, original, 'utf8');
              resolve();
            }
          };
        });
      });
    }, 1200);
  });
}

async function main() {
  await runOne(false, 'layout_A_desktop.png');
  await runOne(true, 'layout_A_mobile.png');
}

main().catch(console.error);
