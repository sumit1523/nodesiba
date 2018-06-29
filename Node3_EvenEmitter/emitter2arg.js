var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on("customEvent_name",function(arg1,arg2){
    console.log("Welcome back "+arg1+" "+arg2);
});

//Call The Event with Arguments

setTimeout(function(){
    eventEmitter.emit('customEvent_name', 'Sibajee','Ray');
},2000);