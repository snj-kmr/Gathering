var mongoose = require('mongoose');
//var ObjectId = require('mongodb').ObjectID;
var Address = new mongoose.Schema({
	userid: { type: String, required: '{PATH} is required!' },
	// productid: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!' },
	fname: { type: String, required: '{PATH} is required!' },
	lname: { type: String, required: '{PATH} is required!' },
    city: { type: String, required: '{PATH} is required!' },
    address: { type: String, required: '{PATH} is required!' },
    street: { type: String, required: '{PATH} is required!' },
    mobileno: { type: String, required: '{PATH} is required!' },
    state: { type: String },
    country: { type: String, required: '{PATH} is required!' },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Address', Address);