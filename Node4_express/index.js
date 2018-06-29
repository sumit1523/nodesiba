var express=require('express');

var app=express();

app.get('/',function(req,res){

    res.send("This is Express World.!");
}).listen(3000);