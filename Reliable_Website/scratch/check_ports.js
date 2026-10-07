const http = require('http');
[5500, 5501, 8080, 3000].forEach(p => {
  http.get('http://127.0.0.1:' + p + '/', r => {
    console.log('Port ' + p + ' is ACTIVE (' + r.statusCode + ')');
  }).on('error', () => {});
});
