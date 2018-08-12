var Category = require('../models/category');
// Users API
module.exports = function (apiRouter, transporter, cat_upload) {

    // get all posts
    apiRouter.get('/categories', function (req, res) {
          
        Category.find({}, function (err, allcats) {
            if (err)
                res.send(err);
            res.json(allcats);
        });
    });

    apiRouter.get('/categories/getsinglecat/', function(req, res) {
        console.log(req.query.id);
        Category.findById({'_id': req.query.id}, function(err, category) {
            if (err)
                res.send(err);
            res.json(category);
        });
    });


    apiRouter.post('/categories', function (req, res) {
        var newcat = new Category();
        console.log(req.body.name);
        newcat.name = req.body.name;
        newcat.ar_name = req.body.ar_name;
        newcat.type = req.body.type;
//        newcat.vendorid = req.body.vendorid;
        newcat.image = req.body.image;
        newcat.save(function (err, post) {
            if (err) res.send(err);
            res.json({ 'status': true, 'data': post });
        })

    });

    /* DELETE Category */
     apiRouter.post('/deletecategory', function(req, res) {
        Category.remove({
            _id: req.body.id
        }, function(err, products) {
            if (err)
                res.send(err);
            res.json({message: 'Category has been deleted!'});
        })
    });
    apiRouter.post('/categories/uploadimage', cat_upload.array('file', 3), function (req, res, next) {
        // console.log(req.body);
        console.log(req.files);
        res.send(req.files);
    });
};