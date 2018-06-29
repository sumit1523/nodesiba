var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var morgan = require('morgan');
var winston = require('./config/winston');




var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var profileRouter = require('./routes/adminProfile');

mongoose.connect('mongodb://localhost/test');
var db=mongoose.connection;

//init app

var app = express();

//view Engine

app.set('views',path.join(__dirname,'views'));
// set the view engine to ejs
app.set('view engine', 'ejs');

//bodyparser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.use(morgan('combined', { stream: winston.stream }));

//express session
app.use(session({
secret : 'secret',
saveUninitialized : true,
resave : true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'), root = namespace.shift(), formParam = root;
    while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param : formParam,
        msg : msg,
        value : value
    };
}}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
res.locals.user = req.user || null;
next();
});

// Set Port
app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function(){
  console.log('Server started on port '+app.get('port'));
});



app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/adminProfile', profileRouter);

app.get('/',function(req,res){
  res.render('index');
});


module.exports = app; 


