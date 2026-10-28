const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function run() {
  const port = 9994;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'file:///e:/MindAxis_Web/Reliable_Website/index.html'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  http.get('http://127.0.0.1:' + port + '/json', res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const tabs = JSON.parse(data);
      const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

      const send = (method, params = {}) => new Promise(resolve => {
        const id = Math.floor(Math.random() * 1000000);
        const handler = e => {
          const m = JSON.parse(e.data);
          if (m.id === id) {
            ws.removeEventListener('message', handler);
            resolve(m.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });

      ws.onopen = async () => {
        const viewports = [
          { name: 'ipad_768', width: 768, height: 1024 },
          { name: 'ipad_air_820', width: 820, height: 1180 },
          { name: 'ipad_landscape_1024', width: 1024, height: 768 },
          { name: 'mobile_390', width: 390, height: 844 },
          { name: 'desktop_1280', width: 1280, height: 800 }
        ];

        for (const vp of viewports) {
          await send('Emulation.setDeviceMetricsOverride', {
            width: vp.width,
            height: vp.height,
            deviceScaleFactor: 1,
            mobile: vp.width < 1000
          });

          await new Promise(r => setTimeout(r, 600));

          const infoRes = await send('Runtime.evaluate', {
            expression: `(() => {
              const footer = document.querySelector('.footer');
              const grid = document.querySelector('.footer-grid');
              const mapCol = document.querySelector('.footer-col-map');
              const mapCard = document.querySelector('.footer-map-card');
              const bottom = document.querySelector('.footer-bottom');
              const cols = Array.from(grid ? grid.children : []).map(c => ({
                tag: c.tagName,
                className: c.className,
                rect: c.getBoundingClientRect()
              }));
              return {
                footerRect: footer ? footer.getBoundingClientRect() : null,
                gridDisplay: grid ? getComputedStyle(grid).display : null,
                gridCols: grid ? getComputedStyle(grid).gridTemplateColumns : null,
                gridFlexDir: grid ? getComputedStyle(grid).flexDirection : null,
                cols,
                bottomRect: bottom ? bottom.getBoundingClientRect() : null
              };
            })()`,
            returnByValue: true
          });

          console.log(`=== VIEWPORT: ${vp.name} (${vp.width}x${vp.height}) ===`);
          console.log(JSON.stringify(infoRes.result ? infoRes.result.value : infoRes, null, 2));

          // Also capture footer screenshot
          const footerRes = await send('Runtime.evaluate', {
            expression: `(() => {
              const footer = document.querySelector('.footer');
              if (!footer) return null;
              footer.scrollIntoView();
              const rect = footer.getBoundingClientRect();
              return {
                x: 0,
                y: Math.max(0, rect.top + window.scrollY),
                width: window.innerWidth,
                height: rect.height
              };
            })()`,
            returnByValue: true
          });

          const val = footerRes.result ? footerRes.result.value : footerRes.value;
          if (val) {
            const clip = {
              x: val.x,
              y: val.y,
              width: val.width,
              height: val.height,
              scale: 1
            };
            const shot = await send('Page.captureScreenshot', { format: 'png', clip });
            if (shot && shot.data) {
              fs.writeFileSync(`C:/Users/HP/.gemini/antigravity-ide/brain/e419adda-178e-4737-97b0-cf828728f817/footer_${vp.name}.png`, Buffer.from(shot.data, 'base64'));
              console.log(`Saved footer_${vp.name}.png`);
            }
          }
        }

        chrome.kill();
        process.exit(0);
      };
    });
  });
}

run().catch(console.error);
