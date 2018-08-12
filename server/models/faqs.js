var mongoose = require('mongoose');

 var faqsSchema = new mongoose.Schema({
	 type : { type: String, required: '{PATH} is required!'},
   	question : { type: String, required: '{PATH} is required!'},
 	ar_question : { type: String}, 
	 answer : { type: String, required: '{PATH} is required!'},
 	ar_answer : { type: String}, 

    created_at: { type: Date, default: Date.now },
 	updated_at: { type: Date, default: Date.now },
 });
 
module.exports = mongoose.model('faqs', faqsSchema);
