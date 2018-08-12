var Subcategory = require('../models/subcategory');
// Users API
module.exports = function (apiRouter, transporter, cat_upload) {

    // get all posts
    apiRouter.get('/subcategories', function (req, res) {
        Subcategory.find({}, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

    apiRouter.post('/subcategories', function (req, res) {
        var newsubcat = new Subcategory();
        console.log(req.body);
        newsubcat.name = req.body.name;
        newsubcat.ar_name = req.body.ar_name;
        newsubcat.categoryid = req.body.categoryid;
        newsubcat.image = req.body.image;
        newsubcat.save(function (err, post) {
            if (err) res.send(err);
            res.json({ 'status': true, 'data': post });
        })

    });

    apiRouter.get('/subcategories/getsinglecat/', function(req, res) {
        console.log(req.query.id);
        Subcategory.findById({'_id': req.query.id}, function(err, category) {
            if (err)
                res.send(err);
            res.json(category);
        });
    });
    
    
    /* get subcategory according to category id */
    apiRouter.post('/subcategories/byCategory', function(req, res) {
        console.log(req.body.categoryid);
        Subcategory.find({'categoryid': req.body.categoryid}, function(err, category) {
            if (err)
                res.json({'status' : false, 'error' : err});
            res.json({'status' : true, 'data' : category});
        });
    });

     /* DELETE all subcats of a category*/
     apiRouter.post('/del_subcats', function(req, res) {
        Subcategory.deleteMany({ 'categoryid': req.body.id }, function(err, products) {
            if (err)
                res.send(err);
            res.json({message: 'Subcategories has been deleted!'});
        })
    });

    apiRouter.post('/subcategories/uploadimage', cat_upload.array('file', 3), function (req, res, next) {
        // console.log(req.body);
        console.log(req.files);
        res.send(req.files);
    });
};