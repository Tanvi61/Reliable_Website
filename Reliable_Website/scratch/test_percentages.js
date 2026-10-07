const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testPercentages() {
  const port = 9990;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'http://127.0.0.1:5501/Reliable_Website/about.html'
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
            params: { width: 505, height: 662, deviceScaleFactor: 1, mobile: true }
          }));
        };

        const percentages = [40, 42, 45, 48];
        let currentIdx = 0;

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);
          
          if (msg.id === 1 || msg.id.startsWith('shot_done_')) {
            if (currentIdx >= percentages.length) {
              ws.close();
              chrome.kill();
              console.log('All percentages tested!');
              return;
            }
            const pct = percentages[currentIdx++];
            ws.send(JSON.stringify({
              id: 'eval_' + pct,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const el = document.querySelector('.floating-actions');
                  el.style.setProperty('top', '${pct}%', 'important');
                  el.style.setProperty('bottom', 'auto', 'important');
                  el.style.setProperty('transform', 'translateY(-50%)', 'important');
                  el.style.setProperty('-webkit-transform', 'translateY(-50%)', 'important');
                  el.style.setProperty('right', '16px', 'important');

                  const r = el.getBoundingClientRect();
                  const call = document.querySelector('.float-btn.call').getBoundingClientRect();
                  return {
                    pct: ${pct},
                    callTop: call.top,
                    callBottom: call.bottom,
                    distanceFromScreenBottom: window.innerHeight - call.bottom
                  };
                })()`,
                returnByValue: true
              }
            }));
          } else if (msg.id.startsWith('eval_')) {
            const val = msg.result.result.value;
            console.log('Tested pct:', val);
            const pct = val.pct;
            ws.send(JSON.stringify({
              id: 'shot_' + pct,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          } else if (msg.id.startsWith('shot_')) {
            const pct = msg.id.split('_')[1];
            fs.writeFileSync(`scratch/test_about_top_${pct}.png`, Buffer.from(msg.result.data, 'base64'));
            console.log(`Saved scratch/test_about_top_${pct}.png`);
            ws.send(JSON.stringify({ id: 'shot_done_' + pct, method: 'Runtime.evaluate', params: { expression: '1' } }));
          }
        };
      });
    });
  }, 1500);
}

testPercentages();
