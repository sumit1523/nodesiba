var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var urlEncoder = bodyParser.urlencoded({extended:false});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addSongs');
});

//Adding songs
router.post('/addsongstolist',urlEncoder, function(req, res) {
  let songname = req.body.songname;
  let artist = req.body.artist;
  let location = req.body.location;
  let albumb = req.body.albumb;
  let duration = req.body.duration;
  let tag = req.body.tag;
  var myobj = { songname: songname, artist: artist,location:location,albumb:albumb,duration:duration,tag:tag };
  
  MongoClient.connect(url, function(err, db) {
    
    if (err)
    {
      throw err;
    } 
    else
    {
      var dbo = db.db("PlayList_DB");
      dbo.collection("songs").insertOne(myobj, function(err, res) {
        if (err)
        {
          throw err;
        }
        else
        {
          console.log("1 document inserted");
          
          db.close();
          
        } 
      });
    }
  });
  var result = {message1 :songname+' added successfully!!!'};
  console.log("result : "+result.message1);
  res.render('index',{message : result});
});

module.exports = router;
