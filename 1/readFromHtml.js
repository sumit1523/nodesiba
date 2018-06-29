var express=require('express');
var app=express();
var fs= require('fs');

app.get('/', function(req,res){

    fs.readFile('./views/about.html',function(err,data){
        res.write(data);
        res.end();
    });
}).listen(3000);