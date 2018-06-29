var fs=require('fs');

fs.writeFile('./WrittenFile.txt','This is the data Written to the file.','utf8',function(error){
 if(error) throw error;

});