const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const files = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html',
  'review.html', 'cad-gis-processing.html', 'dgps-gnss-control.html',
  'drone-photogrammetry.html', 'lidar-3d-scanning.html', 'rail-metro.html',
  'road-highway.html', 'rtk-drone-mapping.html', 'topographical-survey.html',
  'total-station-survey.html'
];

async function testAll() {
  for (const f of files) {
    const port = 9340 + Math.floor(Math.random() * 50);
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      '--window-size=390,844',
      `file:///E:/MindAxis_Web/Reliable_Website/${f}`
    ]);

    await new Promise(r => setTimeout(r, 1500));

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
                  expression: `(() => {
                    const el = document.querySelector('.floating-actions');
                    if (!el) return { error: 'No .floating-actions element' };
                    const r0 = el.getBoundingClientRect();
                    const comp0 = window.getComputedStyle(el);
                    const wa = el.querySelector('.whatsapp');
                    const call = el.querySelector('.call');
                    const topEl = document.elementFromPoint(r0.left + 10, r0.top + 10);
                    return {
                      top: Math.round(r0.top),
                      left: Math.round(r0.left),
                      width: Math.round(r0.width),
                      height: Math.round(r0.height),
                      display: comp0.display,
                      visibility: comp0.visibility,
                      opacity: comp0.opacity,
                      waDisplay: wa ? window.getComputedStyle(wa).display : 'none',
                      callDisplay: call ? window.getComputedStyle(call).display : 'none',
                      topElTag: topEl ? topEl.tagName + '.' + topEl.className : 'null'
                    };
                  })()`,
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

testAll();
