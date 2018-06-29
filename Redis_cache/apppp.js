var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var path = require('path');
const redis = require('redis');
var book = require('./models/book');
var i =0;

var app = express();

var client = redis.createClient();
client.on('connect', function(){
  console.log('Connected to Redis...');
});

mongoose.connect('mongodb://localhost/test',() => {
    console.log('Connection to DB Established');
});
var db=mongoose.connection;

//view Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var main = app.get('/',function(req,res){
    var msg='';
    book.find({}).exec(function(err, books){
        res.render('mainPage', {bookList:books, msg : msg});
    })
});

app.get('/add', function(req, res){
    var msg='';
    res.render('addBook',{msg : msg});
});

app.post('/add-cache', function(req, res){
    var title = req.body.title;
    var author = req.body.author;
    var category = req.body.category;
    var msg='';
    var bid = 'book'+i;
  
    client.hmset(bid, [
      'title', title,
      'author', author,
      'category', category
    ], function(err, reply){
      if(err){
        console.log(err);
        msg='Sorry, Details Could not added to Cache ';
      }
      else{
      msg= 'A Book Details Added To Cache'
      i=i+1;
      console.log(reply);
      res.render('addBook',{msg:msg});
      }
    });

});

app.post('/add-db', function(req,res){
    client.keys('*', function(err, bookidList) {
        var keys = Object.keys(bookidList);
        var j = 0;
        var msg='';
           
        keys.forEach(function (num) {
            client.hgetall(bookidList[num],  function(err, newbook) {
                j++;
                if (err) {
                    console.log(err)
                } 
                else {
                    temp_data = newbook;
                    console.log(newbook);
                    book.create(newbook,function(err,sbook){
                        if(err) throw err;
                        console.log('book saved')
                    });	
                }
    
                if (j == keys.length) {
                        //res.render('logger/list', {logs:return_dataset});
                    msg = 'All Books successfully Added to DB from Cache ';
                    book.find({}).exec(function(err, books){
                        res.redirect('/');
                    })
                }
            });
        });
        client.FLUSHALL();
       // res.redirect('/');
    });
});





app.listen(3000, function(){
    console.log('Listen to port no 3000');
});