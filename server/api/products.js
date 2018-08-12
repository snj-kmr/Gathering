var Product = require('../models/product');
var Wishlist = require('../models/wishlist');
var User = require('../models/user');
var ObjectId = require('mongodb').ObjectID;
var Category = require('../models/category');
// Products API
module.exports = function (apiRouter, transporter, cat_upload) {

    // get all posts
    apiRouter.get('/products', function (req, res) {
        Product.find({}, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

    // get categories according to vendor
    apiRouter.post('/products/vendors_products', function(req, res) {
        Product.find({'vendorid': req.body.vendorid}, function(err, user) {
            if (err)
                res.json(err);
            
                var vendor = [];
                for(var x in user){
                    if (vendor.indexOf(user[x].categoryid) == -1) {
                        vendor.push(user[x].categoryid)
                     }
                }
                Category.find({'_id': vendor}, function(err1, user1) {
                    if (err1)
                        res.json(err1);


                    res.json(user1);
                });
//            res.json(vendor);
        });
    });
    
    /// get product by vendor id
    apiRouter.post('/products/vendor_id', function(req, res) {
        Product.find({'vendorid': req.body.vendorid}, function(err, products) {
            if (err)
                res.json(err);
                res.json(products);
        });
    });
    
    ///// get Products according to subcategory
        apiRouter.post('/products/bySubcategory', function(req, res) {
        Product.find({'subcategoryid': req.body.subcategoryid}, function(err, prods) {
            if (err)
                res.json({ 'status' : false, 'err' : err }); 
            
                res.json({ 'status' : true, 'data' : prods });
        });
    });
    
    
    
   
    
    ///// get Products by id
        apiRouter.post('/products/singleproduct', function(req, res) {
        Product.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.json({ 'status' : false, 'err' : err }); 
            
                res.json({ 'status' : true, 'data' : user });
 
        });
    });
    
    
    ///// get Trending products
    apiRouter.get('/products/trending', function(req, res) {
        Product.find({'trending': true}, function(err, user) {
            if (err)
                res.json({ 'status' : false, 'err' : err }); 
            
                res.json({ 'status' : true, 'data' : user });
 
        });
    });
    
    
    apiRouter.post('/products', function (req, res) {
        var newPro= new Product();
        console.log(req.body.name);
        newPro.name = req.body.name;
        newPro.image = req.body.image;
        newPro.ar_name = req.body.ar_name;
        newPro.ar_description = req.body.ar_description;
        newPro.price = req.body.price;
        newPro.stock = req.body.stock;
        newPro.days_prior = req.body.days_prior;
        newPro.rating = req.body.rating;
        newPro.trending = req.body.trending;
        newPro.description = req.body.description;
        newPro.categoryid = req.body.categoryid;
        newPro.subcategoryid = req.body.subcategoryid;
        newPro.vendorname = req.body.vendorname;
        newPro.vendorid = req.body.vendorid;
        newPro.save(function (err, post) {
            if (err) res.send(err);
            res.json({ 'status': true, 'data': post });
        })

    });

    /* DELETE PRODUCT*/
     apiRouter.post('/deleteproduct', function(req, res) {
        Product.remove({
            _id: req.body.id
        }, function(err, products) {
            if (err)
                res.send(err);
            res.json({message: 'Product has been deleted!'});
        })
    });
    
     /* DELETE PRODUCT related to category*/
     apiRouter.post('/del_cat_products', function(req, res) {
        Product.deleteMany({ 'categoryid': req.body.id }, function(err, products) {
            if (err)
                res.send(err);
            res.json({message: 'Product has been deleted!'});
        })
    });

    
    /* DELETE PRODUCT related to vendor*/
     apiRouter.post('/del_user_products', function(req, res) {
        Product.deleteMany({ 'vendorid': req.body.id }, function(err, products) {
            if (err)
                res.send(err);
            res.json({message: 'User has been deleted!'});
        })
    });


    /** SINGLE USER DATA */
    apiRouter.post('/editproduct', function(req, res) {
        Product.findById({'_id': req.body.path}, function(err, product) {
            if (err)
                res.send(err);
            res.json(product);
        });
    });

    /** UPDATE USER DATA */
    apiRouter.post('/editproID', function(req, res) {
        //console.log(req.body);
        Product.findById({'_id': req.body.id}, function(err, product) {
            if (err)
                res.send(err);
                 product.name = req.body.name;
                 product.ar_name = req.body.ar_name;
                 product.description = req.body.description;
                 product.ar_description = req.body.ar_description;
                 product.price = req.body.price;
                  product.image = req.body.image;
                  product.days_prior = req.body.days_prior;
                  product.trending = req.body.trending;
                 product.stock = req.body.stock;            
            product.save(function(err) {
                if (err){
                    res.send(err);}else{
                res.json({'status':true,'message':'Updated Successfully'});
            }
            })

        });
    });

    apiRouter.post('/products/uploadimage', cat_upload.array('file', 3), function (req, res, next) {
        // console.log(req.body);
        console.log(req.files);
        res.send(req.files);
    });
    
    ///wish list apis ///
     
     
     ///add wishlist
    apiRouter.post('/wishlists/add', function (req, res) {
        var newWish= new Wishlist();
        console.log(req.body.userid);
        newWish.userid = req.body.userid;
        newWish.productid = req.body.productid;
        if(!newWish.userid){
            res.json({ 'status': false, 'message': 'Please login to add item in your wishlist' });
        } else {
            Wishlist.find({"userid" : ObjectId(newWish.userid), "productid": ObjectId(newWish.productid)}, function(err, list) {
                if (err){
                       res.json(err);
                      
                } else {
                     var list = list;
                     console.log(list.length);
                     if(list.length > 0){
                          res.json({ 'status': false, 'message': "Product already exists in your wishlist" });
                     } else {
                        newWish.save(function (err, post) {
                            if (err) 
                             res.json(err);
                             res.json({ 'status': true, 'data': post });
                        })
                     }
//                    
                }
             });
            
        }
        

    });
    
     //// show wishlist
        apiRouter.get('/products/showWishlist', function(req, res) {
        console.log("get showWishlist..");
        Wishlist.aggregate(
        [
            { 
             "$lookup":
             {
                "localField": "userid",
                "from": "users",
                "foreignField": "_id",
                "as": "user_info"
             }
             },
                {
                    $unwind: "$user_info"
                },
            {    
             "$lookup": 
             {
                "localField": "productid",
                "from": "products",
                "foreignField": "_id",
                "as": "product_info"
             }
            },
            {
                    $unwind: "$product_info"
                
            }
        ]
            , function(err, wishlist) {
            if (err)
                res.json({'status' : false, 'error' : err});
            console.log("yes get wishlist..");
            console.log(wishlist);
            res.json({'status' : true, 'data' : wishlist});
        });
    });
    /////
    
    //delete product from wishlist
    apiRouter.post('/wishlists/deleteproduct', function(req, res) {
        Wishlist.findOneAndRemove(req.body.wishlistid, function(err, result) {
            if (err)
                res.send(err);
            res.json({status: true, message: 'Removed from wishlist!', data : result});
        })
    });
    
    
};