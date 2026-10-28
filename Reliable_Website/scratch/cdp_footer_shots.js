const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function run() {
  const port = 9993;
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

          await send('Runtime.evaluate', {
            expression: `window.scrollTo(0, document.body.scrollHeight);`
          });

          await new Promise(r => setTimeout(r, 800));

          const evalRes = await send('Runtime.evaluate', {
            expression: `(() => {
              const footer = document.querySelector('.footer');
              if (!footer) return null;
              const rect = footer.getBoundingClientRect();
              return {
                x: 0,
                y: Math.max(0, rect.y + window.scrollY),
                width: vp.width,
                height: rect.height
              };
            })()`,
            returnByValue: true
          });

          const rect = evalRes.value;
          console.log(vp.name, 'rect:', rect);

          const clip = rect ? {
            x: rect.x,
            y: rect.y,
            width: vp.width,
            height: rect.height,
            scale: 1
          } : undefined;

          const shot = await send('Page.captureScreenshot', {
            format: 'png',
            clip: clip
          });

          if (shot && shot.data) {
            fs.writeFileSync(`C:/Users/HP/.gemini/antigravity-ide/brain/e419adda-178e-4737-97b0-cf828728f817/capture_${vp.name}.png`, Buffer.from(shot.data, 'base64'));
            console.log(`Saved capture_${vp.name}.png`);
          }
        }

        chrome.kill();
        process.exit(0);
      };
    });
  });
}

run().catch(console.error);
