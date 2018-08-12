var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');
	
module.exports = {
	development: {
		rootPath: rootPath,
		 db: 'mongodb://snj_kumar:admin1@ds143971.mlab.com:43971/gathering_db',
		// db : 'mongodb://anurag_f:future123@ds141464.mlab.com:41464/wedding',
		port: process.env.PORT || 8000
	},
	production: {
		rootPath: rootPath,
		// db: process.env.MONGOLAB_URI || 'you can add a mongolab uri here ($ heroku config | grep MONGOLAB_URI)',
		port: process.env.PORT || 80
	}
};

// mongoose.connect('mongodb://localhost/meantutorial',function(res,err){
//     if(err){
//         console.log('Not connected' + err);
//     } else {
//         console.log('Successfully connected to MongoDB');
//     }
// });