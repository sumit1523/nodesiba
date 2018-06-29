var express=require('express');
//var path=require('path');

var app=express();

app.use('/cssFiles', express.static(__dirname+'/assets'));
//make the css file available to Express, so that it could be linked to HTML page.
app.get('/',function(req,res){
    
    res.sendFile('index.html', {root:__dirname+'/files'});

});
app.listen(3000,function(){console.log("Listen to port no 3000");})