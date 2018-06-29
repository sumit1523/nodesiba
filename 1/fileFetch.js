var express=require('express');
var url=require('url');

var app=express();
app.get('/*',function(req,res){

    var pathname = url.parse(req.url).pathname; 
    if(pathname=='/')
        {
            res.sendFile('home.html',{root:__dirname+'/views'});
        }
    res.sendFile(pathname+'.html',{root:__dirname+'/views'},function(err){
        if(err)
            {
                res.sendFile('error.html',{root:__dirname+'/views'});
            }
            else{
                console.log("file Sent");
            }
    });

}).listen(3000);