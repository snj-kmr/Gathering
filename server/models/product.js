var mongoose = require('mongoose');

var Product = new mongoose.Schema({
	image:{type: String, required:'{PATH} is required!'},
	name: { type: String, required: '{PATH} is required!' },
        trending : {type: Boolean,},
	ar_name: { type: String, required: '{PATH} is required!' },
	stock: { type: String, required: '{PATH} is required!' },
	vendorname: { type: String, required: '{PATH} is required!' },
	vendorid: { type: String, required: '{PATH} is required!' },
	description: { type: String, required: '{PATH} is required!' },
	ar_description: { type: String, required: '{PATH} is required!' },
	days_prior: { type: String, },
	price: { type: Number, required: '{PATH} is required!' },
	rating: { type: Number, required: '{PATH} is required!' },
	categoryid: { type: String, required: '{PATH} is required!' },
	subcategoryid: { type: String, required: '{PATH} is required!' },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use email for username field


module.exports = mongoose.model('Product', Product);