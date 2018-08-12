var mongoose = require('mongoose');

var problemSchema = new mongoose.Schema({
	email: {type: String,required: '{PATH} is required!'},
	type: { type: String, required: '{PATH} is required!' },
	name: { type: String, required: '{PATH} is required!' },
	phone: { type: Number, required: '{PATH} is required!' },
	message: { type: String, required: '{PATH} is required!' },

	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('problem', problemSchema);
