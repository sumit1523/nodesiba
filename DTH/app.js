var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var subscribeRouter = require('./routes/subscribe');
var viewSubscriptionRouter = require('./routes/viewSubscription');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/subscribe', subscribeRouter);
app.use('/viewSubscription', viewSubscriptionRouter);

app.listen(3000, function(){
     console.log('Please Listen to '+3000);
  } );
module.exports = app;
