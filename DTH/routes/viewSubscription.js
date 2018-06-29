var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url='mongodb://localhost:27017';
router.get('/', function(req, res) {
  res.render('subscriptionDetails');
});



router.post('/details', function(req,res){
  var channelId_list=[];
  var sum=0;
  var channelAndCost=[];
  var subscriptionId = req.body.csid;
  console.log(subscriptionId);
  MongoClient.connect(url,function(err,db){
    var dbo = db.db('test');
    //console.log("Subscription Id: " +subscriptionId);
    dbo.collection('subscription_channel').find({subscriber_id:subscriptionId}).toArray(function(err,result){
      if(err) throw err;

      result.forEach(function(list){
         channelId_list.push(list.channel_id);
      });

      channelId_list.forEach(function(item){
        var temp = {channel_id:parseInt(item)};
        dbo.collection('channels').find(temp).toArray(function(err,res){
          if(err) throw err;
          sum=sum+ res[0].cost_per_month;
            console.log('Sum : '+ sum)

            channelAndCost.push(res[0]);
        });
      });
   });
  });

  setTimeout(function(){
    res.render('details',{subscriptionID:subscriptionId,sum:sum,channelAndCost:channelAndCost});
  },3000);
});

module.exports = router; 