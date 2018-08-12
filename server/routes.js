var express = require('express'),
	path = require('path'),	
	User = require('./models/user'),
	Category = require('./models/category'),
	Address = require('./models/address'),
	Subcategory = require('./models/subcategory'),
	Termsncondition = require('./models/termsncondition'),
	Webpage = require('./models/webPages'),
	faqs = require('./models/faqs'),
	problem = require('./models/problem'),
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router(),
	sr = require('simple-random'),
        // serialize = require('node-serialize'),
        randomString = sr();


	// mail
	nodemailer = require('nodemailer'),

	//image options 
	aws = require('aws-sdk'),
	multer = require('multer'),
	multerS3 = require('multer-s3'),
	dateNow = Date.now();


router = express.Router();

// mail  	

var transporter = nodemailer.createTransport({
	host: 'email-smtp.us-east-1.amazonaws.com',
	port: 465,
	auth: {
		user: '',//"AKIAJPLIFTWJYOTB5P3A",
		pass: ''//"Am2u3Jhx6/p+YFpVumnh5nyRcmA8Vtca5Ixk6WGCW/ZQ"
	}
});

var mailOptions = {
	from: '',//'honey@avainfotech.com',
	to: '',//'simerjit@avainfotech.com',
	subject: 'Test mail',
	text: 'Success'
};
/* image upload */
aws.config.update({
	secretAccessKey: '',//'00uQf2lLuxiJfjjxWvsgEpPS/L6so8KJxJYHlSF4',
	accessKeyId: '',//'AKIAITZFU42Q7S43SDWA' //AKIAJQKNYXOHZXOD4NCQ //AKIAITZFU42Q7S43SDWA
});

//var key = randomString + ".jpg";
//var s3 = new aws.S3({
//	endpoint: 'https://s3.eu-central-1.amazonaws.com',
//	region: 'eu-central-1',
//	signatureVersion: 'v4',
//	ACL: 'public-read'
//});

var key = randomString + ".jpg";
var s3 = new aws.S3({
    endpoint: 'https://s3.eu-central-1.amazonaws.com',
    region: 'eu-central-1',
    signatureVersion: 'v4',
    ACL: 'public-read',
    params: {
        Bucket: '',//'gatheringmanal/blogimage',
        Key: key
    }
});

var cat_upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'gatheringmanal',
		key: function (req, file, cb) {
			//console.log(file);
			var flname = file.originalname;
			cb(null, 'blogimage/' + dateNow + '' + flname); //use Date.now() for unique file keys
		}
	})
});

module.exports = function (app, passport) {
	app.use('/api', apiRouter);
	app.use('/', router);

	// API routes
	require('./api/posts')(apiRouter);
	require('./api/users')(apiRouter, s3, randomString, passport, transporter, cat_upload);
	require('./api/categories')(apiRouter, passport, cat_upload);
	require('./api/subcategories')(apiRouter, passport, cat_upload);
	require('./api/products')(apiRouter, passport, cat_upload);
	require('./api/carts')(apiRouter);
	require('./api/addresses')(apiRouter);
	require('./api/orders')(apiRouter);
	require('./api/termsnconditions')(apiRouter);
	require('./api/webPages')(apiRouter, cat_upload);
	require('./api/faqs')(apiRouter);
	require('./api/problem')(apiRouter);

	// home route
	router.get('/', function (req, res) {
		res.render('index', { user: '' });

	});

	/*ADD*/
	// home route
	router.get('/', function (req, res) {
		console.log('its me')
		res.render('index');

	});

	// recommandation page
	router.get('/recommandation', function (req, res) {
		console.log('its me')
		res.render('home/recomand');
	});
	router.get('/technical', function (req, res) {
		console.log('its me')
		res.render('home/technical');
	});

	// Faq page
	router.get('/faq', function (req, res) {

		res.render('home/faq');
	});
	router.get('/faqs', function (req, res) {
		res.render('home/faqs');
	});

	//Registeration form
	router.get('/form', function (req, res) {

		res.render('home/register');
	});
	//View more clients
	router.get('/client', function (req, res) {

		res.render('home/client');
	});

	/*End*/


	//
	// admin route
	router.get('/admin', function (req, res) {
		res.render('admin/login');
	});

	router.get('/admin/register', function (req, res) {
		res.render('admin/register');
	});

	router.get('/admin/dashboard', isAdmin, function (req, res) {
		res.render('admin/dashboard', { user: req.user });
	});


	router.post('/register', function (req, res) {

		// passport-local-mongoose: Convenience method to register a new user instance with a given password. Checks if username is unique
		console.error('Im here');
		User.register(new User({
			email: req.body.email
		}), req.body.password, function (err, user) {
			if (err) {
				console.error(err);
				return;
			}

			// log the user in after it is created
			passport.authenticate('local')(req, res, function () {
				console.log('authenticated by passport');
				res.redirect('/admin/dashboard');
			});
		});
	});

	//	router.post('/login', passport.authenticate('local'), function (req , res) {
	//            console.log('Im heree')
	//            res.redirect('/admin/dashboard');
	//                
	//	}, function(err){
	//            console.log(err)
	//             res.send({'error': err})
	//        });

	router.post('/login', function (req, res, next) {
		passport.authenticate('local', function (err, user, info) {

			// Redirect if it fails
			if (!user) {
				console.log('err')

				return res.send({ 'err': 'Incorrect email or password' });
				//                        res.redirect('/admin'); 
			}
			req.logIn(user, function (err) {
				console.log('hh')
				if (err) { return res.send({ 'err': 'Error' }); next(err); res.redirect('/admin'); }
				// Redirect if it succeeds
				return res.redirect('/admin/dashboard');
			});
		})(req, res, next);
	});

	/* image upload ends */


	app.use(function (req, res, next) {
		res.status(404);

		res.render('404');
		return;
	});
};

function isAdmin(req, res, next) {


	// console.log(req.isAuthenticated());

	if (req.isAuthenticated() && req.user.email === 'honey@avainfotech.com') {
		console.log('cool, carry on your way');
		next();

	} else {
		if (req.user.role == 'vendor' || req.user.role == 'planner' || req.user.role == 'planner_comp') {
			console.log('Vendor login');
			next();
		} else {
			console.log('You are not an admin');
			res.redirect('/admin');
		}
	}
}