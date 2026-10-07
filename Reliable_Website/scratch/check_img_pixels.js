const http = require('http');
const { spawn } = require('child_process');

async function checkImgPixels() {
  const port = 9955;
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    'about:blank'
  ]);

  setTimeout(() => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const tabs = JSON.parse(data);
        const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

        ws.onopen = () => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Runtime.evaluate',
            params: {
              expression: `new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                  const canvas = document.createElement('canvas');
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0);
                  const data = ctx.getImageData(0, 0, img.width, img.height).data;
                  
                  // Check for green (WhatsApp: r ~ 37, g ~ 211, b ~ 102)
                  // Check for orange (Call: r ~ 244, g ~ 123, b ~ 32)
                  let greenCount = 0;
                  let orangeCount = 0;
                  for (let i = 0; i < data.length; i += 4) {
                    const r = data[i], g = data[i+1], b = data[i+2];
                    if (g > 180 && r < 60 && b < 130) greenCount++;
                    if (r > 200 && g > 90 && g < 150 && b < 60) orangeCount++;
                  }
                  resolve({ width: img.width, height: img.height, greenPixels: greenCount, orangePixels: orangeCount });
                };
                img.src = 'file:///C:/Users/HP/.gemini/antigravity-ide/brain/e55c7ff4-e048-4027-8697-c6bfa5996ea8/.user_uploaded/media_1791355237269.png';
              })`,
              awaitPromise: true,
              returnByValue: true
            }
          }));
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === 1) {
            console.log('IMAGE PIXEL CHECK:', JSON.stringify(msg.result.result.value, null, 2));
            ws.close();
            chromeProc.kill();
          }
        };
      });
    });
  }, 1500);
}

checkImgPixels();
