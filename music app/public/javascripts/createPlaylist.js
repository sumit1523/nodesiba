$(document).ready(function(){
        
      $('#CreatePlayList').on('click', function(){
          var PlayListName = $("#PlayListName").val();
          var SongsArray=[];

          $('input[type="checkbox"]:checked').each(function(){
            SongsArray.push($(this).val());
          });
          var SongsArrayString = JSON.stringify(SongsArray);
          $.ajax({
            type: 'POST',
            url: '/csPlaylist/createplaylist',
            data: {SongsArray : SongsArrayString,PlayListName : PlayListName },
            success: function(){

              location.reload();
            }
          });
      });
    
    });
    