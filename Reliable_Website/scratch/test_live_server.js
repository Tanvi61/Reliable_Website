const http = require('http');
http.get('http://127.0.0.1:5501/Reliable_Website/gallery.html', res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => {
    const m = d.match(/<div class="floating-actions"[^>]*>/);
    console.log('Floating actions HTML:', m ? m[0] : 'NONE');
    const cssLinks = [...d.matchAll(/href="([^"]*\.css[^"]*)"/g)].map(x => x[1]);
    console.log('CSS links:', cssLinks);
  });
}).on('error', e => console.error(e.message));
