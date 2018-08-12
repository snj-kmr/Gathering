var problemSchema = require('../models/problem');

module.exports = function (apiRouter) {

	// get all Problem
    apiRouter.get('/problem', function (req, res) {
		problemSchema.find({}, function (err, problem) {
			if (err) res.send(err);
			res.json(problem);
		})
	});
    //add Problem
	apiRouter.post('/problem', function (req, res) {

		var values = new problemSchema({
			"type" : req.body.type,
			"name": req.body.name,
			"email": req.body.email,
			"phone": req.body.phone,
			"message": req.body.message,
			"updated_at": Date.now()
		});
		values.save(function (err, problem) {
			if (err) {
				console.log(err);
				 res.json({ 'status': false, 'error': err });
			}
			res.json({ 'status': true, 'data': problem });
		})

	});

   /* // update a Problem
	apiRouter.post('/problem/update', function (req, res) {
		problemSchema.update({
			"name": req.body.name,
			"email": req.body.email,
			"phone": req.body.phone,
			"message": req.body.message,
			"updated_at": Date.now()
		},
			function (err, Question) {
				if (err) res.send({ 'status': false, 'error': err });

				res.json({ 'status': true, 'data': Question });
			})
	});
    // remove a Problem
	apiRouter.post('/problem/remove', function(req, res) {
        problemSchema.remove({
            _id: req.body.id
        }, function(err, Question) {
            if (err)
                res.send(err);
            res.json({message: 'Question has been deleted!'});
        })
    });

	// get a single Problem
    apiRouter.post('/editProblem', function(req, res) {
        problemSchema.findById({'_id': req.body.path}, function(err, Question) {
            if (err)
                res.send(err);

            res.json(Question);
        });
    });
	// get a single Problem
    apiRouter.post('/problem/find', function(req, res) {
       problemSchema.find({"type": req.body.type},function(err, Question) {
            if (err)
                res.send(err);
				//console.log(Question);
      	      res.json(Question);
        });
    });*/
};