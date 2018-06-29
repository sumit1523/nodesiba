var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');


var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test"
});

router.get('/admin',function(req,res){
    res.render('adminRegistrationForm',{errors: null});
});

router.get('/student', function(req,res){
    res.render('studentRegistrationForm',{errors: null});
});

/** Register New Admin */
router.post('/admin/save', function(req,res){
    var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    
    var errors = req.validationErrors();
    if (errors) {
		res.render('adminRegistrationForm', {
			errors: errors
		});
	}
	else {
        var newAdmin = new Admin({
            name: name,
            email: email,
            password: password
        });
        Admin.createAdmin(newAdmin, function (err, user) {
            if (err) throw err;
            console.log(user);
        });
     
        res.render('adminLogin',{success_msg : 'You are registered and can now login'});
    }

});



/** Register New Student */
router.post('/student/save', function(req,res){
    var sname = req.body.name;
    var spassword = req.body.password;
	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    
    var errors = req.validationErrors();
    if (errors) {
		res.render('studentRegistrationForm', {errors: errors});
	}
	else {
        con.connect(function(err) {
            if (err) throw err;
            var sql = "INSERT INTO student (Name,  password) VALUES ('"+sname+"','"+spassword+"')";
            con.query(sql, function (err, result) {
                console.log(err);
              if (err) throw err;
              console.log("1 record inserted");
            });
          });
        res.render('studentLogin',{success_msg : 'You are registered and can now login'});
    }
});




module.exports = router;