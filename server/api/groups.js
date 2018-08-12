var Group = require('../models/group');

// Posts API
module.exports = function(apiRouter){
	
	// get all posts
	apiRouter.get('/groups', function(req, res){
		Group.find({}, function(err, posts){
			if (err) res.send(err);

			res.json(posts);
		});
	});

	// add a post
	apiRouter.post('/groups', function(req, res){
		
		var post = new Group();
		post.name = req.body.name;
		post.eamil = req.body.email;
                post.conference_time = req.body.conference_time;
                post.date = req.body.date;

		post.save(function(err, post){
			if(err) res.send(err);

			res.json({'status':true,'data':post});
		})
	});

	// get a single post
	apiRouter.get('/posts/:id', function(req, res){
		Post.findById(req.params.id, function(err, post){
			if (err) res.send(err);

			res.json(post);
		});
	});

	// update a post
	apiRouter.put('/posts/:id', function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err) res.send(err);

			post.title = req.body.title;
			post.body = req.body.body;

			post.save(function(err){
				if(err) res.send(err);

				res.json({ message: 'Post updated!' });
			})
		});
	});

	// delete a post
	apiRouter.delete('/posts/:id', function(req, res){
		Post.remove({
			_id: req.params.id
		}, function(err, post){
			if(err) res.send(err);

			res.json({ message: 'Post deleted!' });
		})
	});
};