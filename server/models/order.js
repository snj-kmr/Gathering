var mongoose = require('mongoose');
//var ObjectId = require('mongodb').ObjectID;
var Order = new mongoose.Schema({
	total: { type: String, required: '{PATH} is required!' },
        billing_address: { type: Object, required: '{PATH} is required!' },
        orderitems: { type: Object, required: '{PATH} is required!' },
        userid: { type: String, required: '{PATH} is required!' },
        method: { type: String, required: '{PATH} is required!' },
        ordernumber: { type: String, required: '{PATH} is required!' },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use email for username field


module.exports = mongoose.model('Order', Order);