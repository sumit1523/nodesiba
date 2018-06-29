var http=require('http');

var myServer= http.createServer(function(req,res){

    res.writeHead(200,{"content-type":"text/html"});
    res.write("<h1>Connection established</h1>");
});
myServer.listen(3000);
console.log('Lsten to 3000');