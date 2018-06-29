var fs = require('fs');
console.log('Executed Before Reading file\n\n');
fs.readFile('./file.txt','utf8',function(error,data){

    console.log(data);
});
