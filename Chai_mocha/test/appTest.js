var assert = require('chai').assert;
var app = require('../app');

describe("App", function(){
    var result = app(5);
    
    it("This should return 10 ", function(){
        assert.equal(result,10);
    });


    it("This should return 'number'", function(){
        assert.typeOf(result,'number');
    });
});