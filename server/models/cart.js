var mongoose = require('mongoose');
//var ObjectId = require('mongodb').ObjectID;
var Cart = new mongoose.Schema({
	quantity: { type: String, required: '{PATH} is required!' },
	productid: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!' },
	vendorid: { type: String, required: '{PATH} is required!' },
	userid: { type: String, required: '{PATH} is required!' },
        location: { type: String, required: '{PATH} is required!' },
//      long: { type: String, required: '{PATH} is required!' },
//      lat: { type: String, required: '{PATH} is required!' },
        date: { type: String, required: '{PATH} is required!' },
        time: { type: String, required: '{PATH} is required!' },
	comments: { type: String, },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use email for username field


module.exports = mongoose.model('Cart', Cart);