var mongoose = require('mongoose');

var webPageSchema = new mongoose.Schema({
	mission: { type: String},
	vision: { type: String},
	about: { type: String},
  abouts: { type: String},
  ar_mission: { type: String},
	ar_vision: { type: String},
	ar_about: { type: String},
	ar_abouts: { type: String},
  image:{ type: String, default: ''},
    image1:{ type: String, default: ''},
      image2:{ type: String, default: ''},
        image3:{ type: String, default: ''},

  // employee detail
  // employee1: { type: String},
	// employee2: { type: String},
	// employee3: { type: String},
  // employee4: { type: String},
  // ar_employee1: { type: String},
	// ar_employee2: { type: String},
	// ar_employee3: { type: String},
  // ar_employee4: { type: String},

  // social media links
  instagram: { type: String},
  twitter: { type: String},

  created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('webPage', webPageSchema);