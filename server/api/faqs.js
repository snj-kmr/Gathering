var faqsSchema = require('../models/faqs');

module.exports = function (apiRouter) {

	// get all Faqs
    apiRouter.get('/faqs', function (req, res) {
		faqsSchema.find({}, function (err, faqs) {
			if (err) res.send(err);
			res.json(faqs);
		})
	});
    //add Faq
	apiRouter.post('/faqs', function (req, res) {

		var values = new faqsSchema({
			"type" : req.body.type,
			"question": req.body.question,
			"ar_question": req.body.ar_question,
			"answer": req.body.answer,
			"ar_answer": req.body.ar_answer,
			"updated_at": Date.now()
		});
		values.save(function (err, Question) {
			if (err) res.send({ 'status': false, 'error': err });
			res.json({ 'status': true, 'data': Question });
		})
	});

    // update a Faq
	apiRouter.post('/faqs/update', function (req, res) {
		faqsSchema.update({
			"question": req.body.question,
			"ar_question": req.body.ar_question,
			"answer": req.body.answer,
			"ar_answer": req.body.ar_answer,
			"updated_at": Date.now()
		},
			function (err, Question) {
				if (err) res.send({ 'status': false, 'error': err });

				res.json({ 'status': true, 'data': Question });
			})
	});
    // remove a Faq
	apiRouter.post('/faqs/remove', function(req, res) {
        faqsSchema.remove({
            _id: req.body.id
        }, function(err, Question) {
            if (err)
                res.send(err);
            res.json({message: 'Question has been deleted!'});
        })
    });

	// get a single Faq
    apiRouter.post('/editFaqs', function(req, res) {
        faqsSchema.findById({'_id': req.body.path}, function(err, Question) {
            if (err)
                res.send(err);

            res.json(Question);
        });
    });
	// get a single Faq
    apiRouter.post('/faqs/find', function(req, res) {
       faqsSchema.find({"type": req.body.type},function(err, Question) {
            if (err)
                res.send(err);
				//console.log(Question);
      	      res.json(Question);
        });
    });
};
