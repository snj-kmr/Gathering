var webPageSchema = require('../models/webPages');

module.exports = function (apiRouter, cat_upload) {

	// get all webPages
	apiRouter.get('/webPages', function (req, res) {
		webPageSchema.find({}, function (err, webPages) {
			if (err) res.send(err);
			res.json(webPages);
		})
	});

	//add a WebPage
	apiRouter.post('/webPages', function (req, res) {
		var values = new webPageSchema({
			"about": req.body.about,
			"abouts": req.body.abouts,
			"vision": req.body.vision,
			"mission": req.body.mission,
			"ar_about": req.body.ar_about,
			"ar_abouts": req.body.ar_abouts,
			"ar_vision": req.body.ar_vision,
			"ar_mission": req.body.ar_mission,

			"image": req.body.image,
			"image1": req.body.image1,
			"image2": req.body.image2,
			"image3": req.body.image3,
			"updated_at": Date.now()
		})
		values.save(function (err, webPage) {
			if (err) {
				res.send({ 'status': false, 'error': err });
			} else {
				res.json({ 'status': true, 'data': webPage });
			}


		})
	});



	//add Employee
/*	apiRouter.post('/webPages/Employee', function (req, res) {
		var employee_data = {
			"employee1": req.body.employee1,
			"employee2": req.body.employee2,
			"employee3": req.body.employee3,
			"employee4": req.body.employee4,
			"ar_employee1": req.body.ar_employee1,
			"ar_employee2": req.body.ar_employee2,
			"ar_employee3": req.body.ar_employee3,
			"ar_employee4": req.body.ar_employee4,
			"updated_at": Date.now()
		}

		webPageSchema.update({ _id: '59d899c84da1f1114415d04b' }, { $set: employee_data }, function (err_up, post_up) {
			if (err_up) { res.send(err_up); }
			else {
				res.json({ 'status': true, 'message': 'Data updated Successfully' });
			}
		})
	});
*/
	//add a link
	apiRouter.post('/webPages/Link', function (req, res) {
		var values = {
			"instagram": req.body.instagram,
			"twitter": req.body.twitter,
			"updated_at": Date.now()

		}
		webPageSchema.update({ _id: '59d899c84da1f1114415d04b' }, { $set: values }, function (err, Link) {
			if (err) res.send({ 'status': false, 'error': err });
			res.json({ 'status': true, 'data': Link });

		})

	});

	// update a webPage
	apiRouter.post('/webPages/update', function (req, res) {
		var employee_data = {
			"about": req.body.about,
			"abouts": req.body.abouts,
			"vision": req.body.vision,
			"mission": req.body.mission,
			"ar_about": req.body.ar_about,
			"ar_abouts": req.body.ar_abouts,
			"ar_vision": req.body.ar_vision,
			"ar_mission": req.body.ar_mission,
			"image": req.body.image,
			"image1": req.body.image1,
			"image2": req.body.image2,
			"image3": req.body.image3,
			"updated_at": Date.now()
		}
		webPageSchema.update({ _id: '59d899c84da1f1114415d04b' }, { $set: employee_data }, function (err_up, post_up) {
			if (err_up) { res.send(err_up); } else {
				res.json({ 'status': true, 'message': 'Data updated Successfully' });
			}
		})
	});
/*	// update a employee
	apiRouter.post('/webPages/update/Employee', function (req, res) {
		var employee_data = {
			"employee1": req.body.employee1,
			"employee2": req.body.employee2,
			"employee3": req.body.employee3,
			"employee4": req.body.employee4,
			"ar_employee1": req.body.ar_employee1,
			"ar_employee2": req.body.ar_employee2,
			"ar_employee3": req.body.ar_employee3,
			"ar_employee4": req.body.ar_employee4,
			"updated_at": Date.now()
		}

		webPageSchema.update({ _id: '59d899c84da1f1114415d04b' }, { $set: employee_data }, function (err_up, post_up) {
			if (err_up) { res.send(err_up); }
			else {
				res.json({ 'status': true, 'message': 'Data updated Successfully' });
			}
		})
	});*/

	// update a link
	apiRouter.post('/webPages/update/Link', function (req, res) {

		var employee_data = {
			"instagram": req.body.instagram,
			"twitter": req.body.twitter,
			"updated_at": Date.now()

		}
		webPageSchema.update({ _id: '59d899c84da1f1114415d04b' }, { $set: employee_data }, function (err, Link) {
			if (err) res.send({ 'status': false, 'error': err });

			res.json({ 'status': true, 'data': Link });

		})

	});

	apiRouter.post('/webPages/uploadimage', cat_upload.array('file', 3), function (req, res, next) {

		res.send(req.files);
	});
	// get a single image
	apiRouter.post('/webPages/find', function (req, res) {
		webPageSchema.find({ "_id": req.body._id }, function (err, file) {
			if (err)
				res.send(err);
			//console.log(file);
			res.json(file);
		});
	});
};