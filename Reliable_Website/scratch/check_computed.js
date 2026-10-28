const http = require('http');
const { spawn } = require('child_process');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9245',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=1280,720',
  'file:///E:/MindAxis_Web/Reliable_Website/about.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9245/json', (res) => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      const tabs = JSON.parse(d);
      const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              const prev = document.querySelector('.exp-side-prev');
              const next = document.querySelector('.exp-side-next');
              const card = document.querySelector('.exp-slider-card');
              return {
                prevComputedLeft: window.getComputedStyle(prev).left,
                nextComputedRight: window.getComputedStyle(next).right,
                cardRect: card.getBoundingClientRect(),
                prevRect: prev.getBoundingClientRect(),
                nextRect: next.getBoundingClientRect(),
                overlapLeft: card.getBoundingClientRect().left - prev.getBoundingClientRect().right,
                overlapRight: next.getBoundingClientRect().left - card.getBoundingClientRect().right
              };
            })()`,
            returnByValue: true
          }
        }));
      };
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        console.log('Result:', JSON.stringify(msg.result.value, null, 2));
        chromeProc.kill();
        process.exit(0);
      };
    });
  });
}, 1500);
