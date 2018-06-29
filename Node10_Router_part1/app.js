var express = require('express');

var app=express();

var myrouter = express.Router();

app.use('/goRouter', myrouter); ///Extra URL /goRouter will be added after localhost:300 and then get() url

myrouter.get('/routed1',function(req,res){
    res.end('Hii there !! how are you ???');
});

myrouter.get('/routed2',function(req,res){
    res.end('I am doing Fine. Bye...!!!');
});

app.listen(3000,function(){console.log('Listen to port 3000')});