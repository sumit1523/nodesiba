var express = require('express');

var app = express();

app.use('/assets', express.static(__dirname+'/cssFiles/myCss.css'));

//This is to hide the original directory from end user.
//Here by use() we have declared one static url i.e /assets to our original url of the myCss.css file
//so that end user can not know the real path of our file.


app.get('/',function(req,res){
    res.send('Hii.. This the page Body.');
});

app.listen(3000, function(){console.log("Listen to port no 3000.");});

