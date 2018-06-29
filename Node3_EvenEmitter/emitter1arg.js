var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on("customEvent_name",function(arg1){
    console.log("Your Event triggered and the argument was "+arg1);
});

//Call The Event

setTimeout(function(){
    eventEmitter.emit('customEvent_name', '1st_arg_Sibajee')},2000);