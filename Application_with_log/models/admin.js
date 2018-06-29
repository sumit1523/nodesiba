var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
    },
    email: {
		type: String
	},
	password: {
		type: String
	},
});

var Admin = module.exports = mongoose.model('Admin', UserSchema);

module.exports.createAdmin = function(newAdmin, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newAdmin.password, salt, function(err, hash) {
	        newAdmin.password = hash;
	        newAdmin.save(function(err, user){
                if(err) throw err;
                else console.log('One Admin created : '+ user);
            });
	    });
	});
}

module.exports.getAdminByName = function(adminName, callback){
	var query = {name : adminName};
	Admin.findOne(query, callback);
}

module.exports.getAdminById = function(id, callback){
	Admin.findById(id, callback);
}

module.exports.comparePassword = function(adminPassword, hash, callback){
	bcrypt.compare(adminPassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}