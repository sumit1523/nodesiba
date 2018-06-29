var express = require('express');
var app = express();

app.set('port',process.env.PORT || 3000);


app.get('/', function(req, res){

    res.send('<h1>Port alorted Dynamically and app strated<h1>');
});

app.listen(app.get('port'), function(){

   console.log('Please Listen to '+app.get('port'));
} );