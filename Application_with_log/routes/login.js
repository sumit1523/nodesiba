var express = require('express');
var Admin = require('../models/admin');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();



/* GET login page for ADMIN */
router.get('/admin', function(req, res, next) {
  res.render('adminLogin',{success_msg : ''});
});
/* GET login page for Student */
router.get('/student', function(req, res, next) {
  res.render('studentLogin');
});



/* Paaport Stratergy */
passport.use(new LocalStrategy(
	function (adminName, password, done) {
		Admin.getAdminByName(adminName, function (err, admin) {
			if (err) throw err;
			if (!admin) {
				return done(null, false, { message: 'Unknown User' });
			}

			Admin.comparePassword(password, admin.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, admin);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (admin, done) {
	done(null, admin.id);
});

passport.deserializeUser(function (id, done) {
	Admin.getAdminById(id, function (err, admin) {
		done(err, admin);
	});
});

/* Admin Login by passport */
router.post('/admin/auth',
  passport.authenticate('local', { successRedirect: '/adminProfile', failureRedirect: '/login/admin', failureFlash: true }),
	function (req, res) {
		//res.redirect('/');

});

router.post('/student/auth', function(req,res){

	var success_msg = "";
	var name = req.body.name;
	var password = req.body.password;

	var mysql = require('mysql');
	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "root",
	  database: "test"
	});

	con.connect(function(err) {
		if (err) throw err;
		var sql = "select id,password from student where Name='"+name+"'";
		con.query(sql, function (err, result) {
			if (err){
				success_msg = "Colud not logged in. Login with correct ID"
				res.render('studentLogin',{success_msg : success_msg});
			};
			var tmp = JSON.stringify(result);
			var tmp1 = JSON.parse(tmp);
			var pass = tmp1[0].password;
			var id = tmp1[0].id;
			if(password!=pass)
			{
				success_msg = "Colud not logged in. Please check your password"
				res.render('studentLogin',{success_msg : success_msg});
			}
		    else{

				var mysql = require('mysql');
				var con = mysql.createConnection({
				  host: "localhost",
				  user: "root",
				  password: "root",
				  database: "test"
				});
			
				con.connect(function(err) {
					if(err) throw err;
					 var sql = "select * from issuedbook where student_id="+id;
					 con.query(sql, function (err, result) {

						var tmp = JSON.stringify(result);
						var list = JSON.parse(tmp);

						res.render('studentProfile',{success_msg : 'Welcome '+name, list : list});
						
					 });	 
				});
			}
		});
	  });
});

module.exports = router;



