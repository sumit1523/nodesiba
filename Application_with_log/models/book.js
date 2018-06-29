var mongoose = require('mongoose');

// Book Schema
var bookSchema = new mongoose.Schema({
    
        title : String,
        author : String,
        category : String
    });
    
var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.allBooks = function(callback){
        Book.find({}).exec(callback); 
     };

