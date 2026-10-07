const http = require('http');
const { spawn } = require('child_process');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9246',
  '--no-sandbox',
  '--disable-gpu',
  'file:///E:/MindAxis_Web/Reliable_Website/about.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9246/json', res => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', () => {
      const tab = JSON.parse(d)[0];
      const ws = new WebSocket(tab.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `({
              href: location.href,
              title: document.title,
              readyState: document.readyState,
              bodyHtmlLength: document.body ? document.body.innerHTML.length : 0
            })`,
            returnByValue: true
          }
        }));
      };
      ws.onmessage = ev => {
        console.log(JSON.stringify(JSON.parse(ev.data).result, null, 2));
        ws.close();
        chrome.kill();
      };
    });
  });
}, 2500);
