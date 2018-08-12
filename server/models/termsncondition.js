var mongoose = require('mongoose');

var termsnCondition = new mongoose.Schema({
	terms: {
		type: String, 
		required: '{PATH} is required!'
	},
        ar_terms: {
		type: String, 
		required: '{PATH} is required!'
	},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model('termsnCondition', termsnCondition);