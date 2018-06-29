var assert = require('chai').assert ;
var first = require('../first');

describe("First", function(){
    it("First Should return Hello World", function(){
        assert.equal(first(), 'Hello World');
    });
});