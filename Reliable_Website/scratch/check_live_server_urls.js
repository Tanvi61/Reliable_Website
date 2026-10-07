const http = require('http');

function get(url) {
  http.get(url, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      console.log(`URL: ${url} -> Status: ${res.statusCode}, Length: ${d.length}`);
      const m = d.match(/<title>([^<]*)<\/title>/);
      console.log('Title:', m ? m[1] : 'none');
    });
  }).on('error', e => console.log(`Error ${url}:`, e.message));
}

get('http://127.0.0.1:5501/Reliable_Website/index.html');
get('http://127.0.0.1:5501/index.html');
get('http://127.0.0.1:5501/');
