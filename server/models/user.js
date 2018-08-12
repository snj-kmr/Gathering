var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose');
var User = new mongoose.Schema({
 email: {
  type: String,
  required: '{PATH} is required!',
  unique: true
 },
 firstname: { type: String, required: '{PATH} is required!' },
 lastname: { type: String, required: '{PATH} is required!' },
 age: { type: String },
 image:{type: String},
 // required: '{PATH} is required!'
 gender: { type: String },
 phone: { type: Number },
cont_email:{type: String},
 password: { type: String },
 // required: '{PATH} is required!'
 title: { type: String },
 org_name: { type: String },
 org_description: { type: String },
 org_type: { type: String },
 product: { type: String },
 delivery: { type: String },
 role:{type: String,required:'{PATH} is required!'},
 org_phone: { type: Number },
 org_address: { type: String },
 // required: '{PATH} is required!'
 account: { type: String },
 city: { type: Array },
 status: { type: String, required: '{PATH} is required!' },
 created_at: { type: Date, default: Date.now },
 updated_at: { type: Date, default: Date.now },
 username: { type: String, required: '{PATH} is required!', unique: true },
});
// var User = new mongoose.Schema({
// 	email: {
// 		type: String, 
// 		required: '{PATH} is required!',
// 		unique :true
// 	},
// 	firstname:{type: String, required:'{PATH} is required!'},
// 	lastname:{type: String, required:'{PATH} is required!'},
// 	city:{type: Array},
// 	address:{type: String},
//         org_name : {type: String},
//         org_description : {type: String},
//         ar_org_name : {type: String},
//         ar_org_description : {type: String},
//         cont_email:{type: String},
//         gender:{type: String},
// 	image:{type: String},
// 	phone:{type: String},
// 	role:{type: String,required:'{PATH} is required!'},
// 	status:{type: String,required:'{PATH} is required!'},
// 	created_at: { type: Date, default: Date.now },
// 	updated_at: { type: Date, default: Date.now },
// 	username : {type: String, required:'{PATH} is required!',unique :true},
// });

/*var User = new mongoose.Schema({
	email: {
		type: String,
		required: '{PATH} is required!',
		unique: true
	},
	firstname: { type: String, required: '{PATH} is required!' },
	lastname: { type: String, required: '{PATH} is required!' },
	age: { type: String },
	// required: '{PATH} is required!'
	gender: { type: String },
	phone: { type: Number, required: '{PATH} is required!' },

	password: { type: String },
	// required: '{PATH} is required!'
	title: { type: String },
	org_name: { type: String },
	org_description: { type: String },
	org_type: { type: String },
	product: { type: String },
	delivery: { type: String },

	org_phone: { type: Number },
	org_address: { type: String },
	// required: '{PATH} is required!'
	account: { type: String },
	city: { type: Array },

	status: { type: String, required: '{PATH} is required!' },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	username: { type: String, required: '{PATH} is required!', unique: true },
});*/

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use email for username field
User.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', User);