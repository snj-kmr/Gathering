var mongoose = require('mongoose');



var Wishlist = new mongoose.Schema({
	productid:{type: mongoose.Schema.Types.ObjectId, required:'{PATH} is required!'},
	userid: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!' },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use email for username field


module.exports = mongoose.model('Wishlist',Wishlist);
