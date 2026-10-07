const http = require('http');
const { spawn } = require('child_process');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9247',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///E:/MindAxis_Web/Reliable_Website/about.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9247/json', res => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', () => {
      const tabs = JSON.parse(d);
      const pageTab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension://')) || tabs[0];
      console.log('Selected Tab:', pageTab.url);
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              const el = document.querySelector('.floating-actions');
              if (!el) return { error: 'No .floating-actions element' };
              const rect0 = el.getBoundingClientRect();
              const style0 = window.getComputedStyle(el);
              
              // Ancestors check
              let curr = el;
              const ancestors = [];
              while (curr) {
                const s = window.getComputedStyle(curr);
                ancestors.push({
                  tag: curr.tagName,
                  id: curr.id,
                  cls: curr.className,
                  transform: s.transform,
                  filter: s.filter,
                  perspective: s.perspective,
                  contain: s.contain,
                  position: s.position,
                  overflow: s.overflow,
                  overflowX: s.overflowX,
                  overflowY: s.overflowY
                });
                curr = curr.parentElement;
              }

              // Check if visible in viewport at scroll 0
              const inViewportAt0 = (
                rect0.top >= 0 &&
                rect0.left >= 0 &&
                rect0.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect0.right <= (window.innerWidth || document.documentElement.clientWidth)
              );

              // Scroll to 500
              window.scrollTo(0, 500);
              const rect500 = el.getBoundingClientRect();
              
              // Scroll to 2000
              window.scrollTo(0, 2000);
              const rect2000 = el.getBoundingClientRect();

              return {
                windowInner: { w: window.innerWidth, h: window.innerHeight },
                rect0: { top: rect0.top, bottom: rect0.bottom, left: rect0.left, right: rect0.right, width: rect0.width, height: rect0.height },
                rect500: { top: rect500.top, bottom: rect500.bottom },
                rect2000: { top: rect2000.top, bottom: rect2000.bottom },
                isFixedAtSameScreenPos: Math.abs(rect0.top - rect500.top) < 2 && Math.abs(rect0.top - rect2000.top) < 2,
                computedPosition: style0.position,
                computedTop: style0.top,
                computedRight: style0.right,
                computedZIndex: style0.zIndex,
                computedDisplay: style0.display,
                computedVisibility: style0.visibility,
                computedOpacity: style0.opacity,
                ancestorsWithTransformOrContain: ancestors.filter(a => a.transform !== 'none' || a.filter !== 'none' || a.perspective !== 'none' || (a.contain !== 'none' && a.contain !== 'normal'))
              };
            })()`,
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
