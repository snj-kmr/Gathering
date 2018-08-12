var Cart = require('../models/cart');
var Product = require('../models/product');
var User = require('../models/user');
var ObjectId = require('mongodb').ObjectID;
// Products API
module.exports = function (apiRouter) {


    //addnewcart
    apiRouter.post('/carts/addtocart', function (req, res) {
        var newPro; //= new Cart();
        console.log(req.body.userid);
        Cart.find({ "userid": ObjectId(req.body.userid), "productid": ObjectId(req.body.productid) }, function (err, list) {
            if (err) {
                res.json(err);
            } else {
                console.log(list.length)
                if (list.length > 0) {
                    res.json({ 'status': false, 'message': 'Product already exists in your cart' });
                } else {

                    newPro = new Cart({
                        userid: req.body.userid,
                        productid: ObjectId(req.body.productid),
                        time: req.body.time,
                        date: req.body.date,
                        comments: req.body.comments,
                        quantity: req.body.quantity,
                        vendorid: req.body.vendorid,
                        location: req.body.location
                    })
                    console.log(newPro);
                    newPro.save(function (err, post) {
                        if (err) res.send(err);
                        res.json({ 'status': true, 'message': 'Product added in your cart' });
                    })
                }
            }
        })

    });


    apiRouter.post('/carts/updateQty', function (req, res) {
        console.log(req.body._id, req.body.qty);
        var id = req.body._id
        Cart.findByIdAndUpdate(id, { quantity: req.body.qty }, function (err, cart) {
            if (err)
                res.json({ 'status': false, 'error': err });

            console.log(cart)
            res.json({ 'status': true, 'data': 'Updated' });
        });

    });

    //// show cart
    apiRouter.post('/carts/showCart', function (req, res) {
        console.log("get cart..");
        console.log(req);
        var id = req.body.userid
        console.log(id);
        Cart.aggregate(
            [{
                "$lookup":
                {
                    localField: "productid",
                    from: "products",
                    foreignField: "_id",
                    as: "product_info"
                }
            },
            {
                "$match": { userid: id },
            }
                , {
                $unwind: "$product_info"
            },
            ]
            , function (err, cart) {
                if (err)
                    res.json({ 'status': false, 'error': err });

                console.log(cart)
                res.json({ 'status': true, 'data': cart });
            });
    });
    /////

    //delete product from cart
    apiRouter.post('/carts/deleteproduct', function (req, res) {
        console.log(req.body.cartid);
        Cart.findOneAndRemove(req.body.cartid, function (err, result) {
            if (err)
                res.json(err);
            res.json({ status: true, message: 'Removed item from cart!', data: result });
        })
    });
    
    // delete user's cart after checkout
    apiRouter.post('/carts/deletecart', function (req, res){
        console.log(req.body.userid);
        Cart.remove( { userid : req.body.userid }, function (err, result) {
            if (err)
                res.json(err);
            res.json({ status: true, message: 'Cart emptied', data: result });
        })
    })

};