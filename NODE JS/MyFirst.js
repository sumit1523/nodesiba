var http = require('http');
var fs=require('fs');
http.createServer(
    
    function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('Hello World');
    }
  ).listen(3000);



