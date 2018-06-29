var express=require('express');
var bodyParser=require('body-Parser');//Middleware which is required by express to handle post methods

var app=express();

app.use(bodyParser()); //To use BodyParser in Express.

app.get('/', function(req,res){

    res.sendFile('myform.html',{root:__dirname+"/files"});
});

app.post('/',function(req,res){

    res.send(JSON.stringify(req.body));//req.body in post method is similar like req.query in get method

});

app.listen(3000);