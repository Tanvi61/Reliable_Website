const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const baseDir = 'e:/MindAxis_Web/Reliable_Website';
const pages = fs.readdirSync(baseDir).filter(f => f.endsWith('.html') && f !== 'hero-test.html');

async function testAllPagesOverflow() {
  const port = 9999;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'http://127.0.0.1:5501/Reliable_Website/index.html'
  ]);

  setTimeout(async () => {
    http.get('http://127.0.0.1:' + port + '/json', async res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', async () => {
        const tabs = JSON.parse(data);
        const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

        let wsSend = (payload) => ws.send(JSON.stringify(payload));

        ws.onopen = () => {
          wsSend({
            id: 1,
            method: 'Emulation.setDeviceMetricsOverride',
            params: { width: 375, height: 667, deviceScaleFactor: 2, mobile: true }
          });
        };

        let currentIdx = 0;
        const results = [];

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);

          if (msg.id === 1 || msg.id === 'next') {
            if (currentIdx >= pages.length) {
              console.log('=== OVERFLOW SCAN ACROSS ALL 16 PAGES ===');
              results.forEach(r => {
                console.log(r.page + ' -> docScrollW: ' + r.docW + ', bodyScrollW: ' + r.bodyW + (r.hasOverflow ? ' [OVERFLOW!]' : ' [OK]'));
              });
              ws.close();
              chrome.kill();
              return;
            }
            const page = pages[currentIdx++];
            wsSend({
              id: 'nav_' + page,
              method: 'Page.navigate',
              params: { url: 'http://127.0.0.1:5501/Reliable_Website/' + page }
            });
          } else if (typeof msg.id === 'string' && msg.id.startsWith('nav_')) {
            const page = msg.id.replace('nav_', '');
            setTimeout(() => {
              wsSend({
                id: 'eval_' + page,
                method: 'Runtime.evaluate',
                params: {
                  expression: `(() => {
                    const winW = window.innerWidth;
                    const docW = document.documentElement.scrollWidth;
                    const bodyW = document.body.scrollWidth;
                    return { page: '${page}', winW, docW, bodyW, hasOverflow: docW > winW || bodyW > winW };
                  })()`,
                  returnByValue: true
                }
              });
            }, 600);
          } else if (typeof msg.id === 'string' && msg.id.startsWith('eval_')) {
            results.push(msg.result.result.value);
            wsSend({ id: 'next', method: 'Runtime.evaluate', params: { expression: '1' } });
          }
        };
      });
    });
  }, 1500);
}

testAllPagesOverflow();
