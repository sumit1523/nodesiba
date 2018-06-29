var express = require('express');
var bodyparser = require('body-parser');
var router = express.Router();
var urlencoading = bodyparser.urlencoded({extended:false});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err)
        {
            throw err;
        } 
        else
        {
            var dbo = db.db("PlayList_DB");
            dbo.collection("songs").find({}).toArray(function(err, result) {
                if (err)
                {
                    throw err;
                } 
                else
                {
                    //get playlist
                    var playlistWithSongs = [];
                    dbo.collection("playList").find({}).toArray(function(err, resultplayList) {
                        if (err)
                        {
                            throw err;
                        } 
                        else
                        {
                            for(let i=0;i<resultplayList.length;i++)
                            {
                                var playlistname = resultplayList[i].playlistname;
                                var songslist = JSON.parse(resultplayList[i].songsList);

                                let PlaylistSongs = [];
                                for(let j=0;j<songslist.length;j++)
                                {
                                    var songid = songslist[j];
                                   for(let k=0;k<result.length;k++)
                                    {
                                        if(result[k]._id == songid)
                                        {
                                            let content = {songname : result[i].songname,songId :result[i]._id };
                                            PlaylistSongs.push(content);
                                        }
                                    } 
                                }
                                playlistWithSongs.push({playlistname : playlistname,PlaylistSongs : PlaylistSongs});
                            }
                        }    
                    });

                    setTimeout(function() {
                        var data =  {results: result,playlistWithSongs:playlistWithSongs}
                        res.render('csPlaylist',{data: data});
                        db.close();
                    }, 3000);
                   
                }    
            });
        }    
    });
  
});

router.post('/createplaylist',urlencoading, function(req, res) {
    var playlistname = req.body.PlayListName;
    var SongsArray = req.body.SongsArray;
    var myobj = { playlistname: playlistname, songsList: SongsArray };

    console.log("playlistname : "+playlistname);
    console.log("SongsArray : "+SongsArray);

    MongoClient.connect(url, function(err, db) {
        if (err)
        {
          throw err;
        } 
        else
        {
          var dbo = db.db("PlayList_DB");
          dbo.collection("playList").insertOne(myobj, function(err, res) {
            if (err)
            {
              throw err;
            }
            else
            {
                console.log("1 document inserted to playlist");
                

              
              db.close();
              
            } 
          });
        }
      });
  
});


module.exports = router;
