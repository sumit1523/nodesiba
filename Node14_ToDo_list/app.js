var express = require('express');

var todocontroller=require('./controllers/todocontroller');

var app= express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

todocontroller(app);

app.listen(3000,function(){console.log('Listen to port 3000')});