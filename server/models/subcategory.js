var mongoose = require('mongoose');

var Subcategory = new mongoose.Schema({
	// image:{type: String},
	name:{type: String, required:'{PATH} is required!'},
	ar_name:{type: String, required:'{PATH} is required!'},
        image:{type: String, required:'{PATH} is required!'},
	categoryid:{type: String, required:'{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use email for username field


module.exports = mongoose.model('Subcategory', Subcategory);