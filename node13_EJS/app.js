var express = require('express');
var app=express();
app.set('view engine','ejs');

app.get('/profile/:name',function(req,res){

  res.render('profile',{person:req.params.name});
  
});
app.listen(3000, function(){console.log('Listen to port 3000');}); 