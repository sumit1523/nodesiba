var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var Book = require('../models/book');



//**List Book on Admin Profile */
router.get('/',function(req,res){
	var success_msg='';
    Book.allBooks(function(err,books){ 
		res.render('adminProfilePage', {bookList : books,success_msg : ''});
	});	
});



//**Add New Book */
router.post('/add-book',function(req,res){

	var success_msg='';
	Book.create(req.body,function(err,book){
		if(err)
			success_msg = "Error occured while saving the book.";
		else{
			success_msg = "One Book Added to the dataBase"
			var books=Book.allBooks(function(err,books){ 
				res.render('adminProfilePage', {bookList : books,success_msg : success_msg});
			});
		}		

	});	
});

//* Delete Book *//
router.post('/delete-book',function(req,res){
	var title = req.body.title;
	var success_msg = "";
	Book.remove({title : title},function(err){
		if(err) 
			success_msg = "Book could not be deleted";
		else{
			success_msg = "Book deleted Successfully";
			var books=Book.allBooks(function(err,books){ 
				res.render('adminProfilePage', {bookList : books,success_msg : success_msg});
			});
		}
	});
});

//**Edit Book Details */
//Get Book Name To Edit
router.post('/showId',function(req,res){
	var title = req.body.title;
	Book.findOne({title : title}).exec(function(err,book){
		
		if(err){
				success_msg = "Book Name Could not found in DataBase";
				var books = Book.allBooks(function(err,books){ 
				res.render('adminProfilePage', {bookList : books,success_msg : success_msg});
			});
			}
			else{
				res.render('editbookPage',{book : book});
			}
		});
});

router.post('/edit-book',function(req,res){
	var query = { _id : req.body.bookid };
	var success_msg = "";
	var ubook = {title : req.body.title, author :req.body.author, category: req.body.category };
	Book.findOneAndUpdate(query, ubook, function(err, data){
		if (err) {
			var success_msg = "Details Could Not be updated";
		}
		else{
			success_msg = "book details Updated" 
			var books=Book.allBooks(function(err,books){ 
				res.render('adminProfilePage', {bookList : books,success_msg : success_msg});
			});

		}

	});
});



router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/');
});

module.exports = router;