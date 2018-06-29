var express=require('express');

var app=express();

app.get('/',function(req,res){

    res.send("This is Express World.!!");
});

app.listen(3000,function(){console.log('Listen to port no 3000.');});