const http = require('http');
http.get('http://127.0.0.1:5501/Reliable_Website/about.html', res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const m = d.match(/<div class="floating-actions"[^>]*>/);
    console.log('Floating action match:', m ? m[0] : 'NONE');
    const scrollM = d.match(/<a[^>]*id="scrollTopBtn"[^>]*>/);
    console.log('Scroll top match:', scrollM ? scrollM[0] : 'NONE');
    const cssLinks = [...d.matchAll(/href="([^"]*\.css[^"]*)"/g)].map(x => x[1]);
    console.log('CSS links:', cssLinks);
  });
});
