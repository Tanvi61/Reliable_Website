const http = require('http');
const { spawn } = require('child_process');

const files = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html',
  'review.html', 'cad-gis-processing.html', 'dgps-gnss-control.html',
  'drone-photogrammetry.html', 'lidar-3d-scanning.html', 'rail-metro.html',
  'road-highway.html', 'rtk-drone-mapping.html', 'topographical-survey.html',
  'total-station-survey.html'
];

async function checkWidths() {
  for (const f of files) {
    const port = 9410 + Math.floor(Math.random() * 50);
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      `file:///E:/MindAxis_Web/Reliable_Website/${f}`
    ]);

    await new Promise(r => setTimeout(r, 1200));

    await new Promise(resolve => {
      http.get(`http://127.0.0.1:${port}/json`, res => {
        let d = ''; res.on('data', c => d += c);
        res.on('end', () => {
          const tabs = JSON.parse(d);
          const pageTab = tabs.find(t => t.url.includes(f)) || tabs[0];
          const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

          ws.onopen = () => {
            ws.send(JSON.stringify({
              id: 1,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
            }));
          };

          ws.onmessage = ev => {
            const msg = JSON.parse(ev.data);
            if (msg.id === 1) {
              ws.send(JSON.stringify({
                id: 2,
                method: 'Runtime.evaluate',
                params: {
                  expression: `({
                    docW: document.documentElement.scrollWidth,
                    bodyW: document.body.scrollWidth,
                    floatRight: document.querySelector('.floating-actions') ? Math.round(document.querySelector('.floating-actions').getBoundingClientRect().right) : null,
                    floatLeft: document.querySelector('.floating-actions') ? Math.round(document.querySelector('.floating-actions').getBoundingClientRect().left) : null,
                    floatTop: document.querySelector('.floating-actions') ? Math.round(document.querySelector('.floating-actions').getBoundingClientRect().top) : null
                  })`,
                  returnByValue: true
                }
              }));
            } else if (msg.id === 2) {
              console.log(f.padEnd(26), JSON.stringify(msg.result?.result?.value));
              ws.close();
              chrome.kill();
              resolve();
            }
          };
        });
      });
    });
  }
}

checkWidths();
