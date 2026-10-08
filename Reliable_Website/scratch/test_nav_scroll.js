const http = require('http');
const { spawn } = require('child_process');

const port = 9998;
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
          params: { width: 375, height: 667, deviceScaleFactor: 2, mobile: true }
        }));
      };

      ws.onmessage = e => {
        const msg = JSON.parse(e.data);
        if (msg.id === 1) {
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const nav = document.querySelector('.nav-exact');
                const beforeScrollW = nav ? nav.scrollWidth : null;
                const links = document.querySelector('.nav-exact .nav-links');
                
                // Test 1: display none
                links.style.setProperty('display', 'none', 'important');
                const withDisplayNone = nav ? nav.scrollWidth : null;

                // Test 2: right: 0; transform: translateX(100%);
                links.style.setProperty('display', 'block', 'important');
                links.style.setProperty('right', '0', 'important');
                links.style.setProperty('transform', 'translateX(100%)', 'important');
                const withTransform = nav ? nav.scrollWidth : null;

                return { beforeScrollW, withDisplayNone, withTransform };
              })()`,
              returnByValue: true
            }
          }));
        } else if (msg.id === 2) {
          console.log('NAV SCROLLWIDTH TEST:', msg.result.result.value);
          ws.close();
          chrome.kill();
        }
      };
    });
  });
}, 1500);
