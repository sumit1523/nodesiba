var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var bodyParser=require('body-Parser');
var url='mongodb://localhost:27017/';
var channel_list=[];
var i=0;
var msg='';
router.use(bodyParser());
/* GET home page. */
router.get('/', function(req, res) {

  MongoClient.connect(url, function(err,db){
    if(err)throw err;
   var  dbo = db.db('test');
    console.log('Connected to DB');
    dbo.collection('channels').find({}).toArray(function(err,res){
      if(err) throw err;  
      channel_list=res;
    });
  });
  res.render('subscriptionForm',{cd:channel_list});
  res.end();
});

/** AFTER SUBMISSION */
router.post('/submit',function(req,res){

  
  MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var  dbo = db.db('test');  
    var subscriberId=req.body.csid;
    var datee= req.body.datee;
    var channelId= req.body.channel;
    if(subscriberId==''|| datee==''||channelId=='Select')
      {
        msg="Could not subscribe!! Plz insert correct data.";
      }
    else
    {
        var obj={subscription_date:datee,channel_id:channelId,subscriber_id:subscriberId};
        dbo.collection('subscription_channel').insertOne(obj,function(err,res){
        
          if(err) throw err;
          msg='Channel subscription done successfully';
          console.log('1 data inserted to subscription_channel')
        });
    }
  });
  setTimeout(function() {
  res.render('index',{data:msg});},2000); 
  //res.end();
});


router.get('/clear', function(req,res){
  res.redirect('/subscribe');
})

module.exports = router;