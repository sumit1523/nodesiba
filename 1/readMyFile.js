
var fs=require('fs');

fs.readFile('./data/file.txt', 'utf8' , function(error,data){

    console.log(data);
});