const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9238',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=1280,720',
  'file:///E:/MindAxis_Web/Reliable_Website/about_test.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9238/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const pageTab = tabs.find(t => t.type === 'page' || t.url.includes('about_test.html')) || tabs[0];
      const wsUrl = pageTab.webSocketDebuggerUrl;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const nextBtn = document.querySelector('.exp-side-next');
                if (nextBtn) nextBtn.click();
                const card = document.querySelector('.exp-slider-card');
                const section = card.closest('section');
                window.scrollTo({ top: section.offsetTop - 80, behavior: 'instant' });
                return true;
              })()`,
              returnByValue: true
            }
          }));
        }, 1000);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          // Wait for slide transition (300ms + buffer)
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  return {
                    title: document.getElementById('exp-title').innerText,
                    tag: document.getElementById('exp-tag-text').innerText,
                    img: document.getElementById('exp-img').src,
                    activeDotIndex: Array.from(document.querySelectorAll('.exp-dot-btn')).findIndex(d => d.classList.contains('active'))
                  };
                })()`,
                returnByValue: true
              }
            }));
          }, 600);
        } else if (msg.id === 2) {
          console.log('Slide 2 state:', JSON.stringify(msg.result.value));
          ws.send(JSON.stringify({
            id: 3,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        } else if (msg.id === 3) {
          if (msg.result && msg.result.data) {
            fs.writeFileSync('scratch/test_slide2_next_click.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/test_slide2_next_click.png');
          }
          ws.close();
          chromeProc.kill();
          process.exit(0);
        }
      };
    });
  });
}, 1500);
