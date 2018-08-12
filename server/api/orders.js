var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var User = require('../models/user');
var ObjectId = require('mongodb').ObjectID;
// Products API
module.exports = function (apiRouter) {


    //addnewcart
    apiRouter.post('/orders/checkout', function (req, res) {
        var newOrder;
        var ordernumber  = Date.now().toString().replace('.', '7');
        console.log(ordernumber);
        if(req.body.userid){
            newOrder = new Order({
                userid: req.body.userid,
                orderitems: req.body.orderitems,
                billing_address: req.body.billing_address,
                method: req.body.method,
                total: req.body.total,
                ordernumber : ordernumber,
            })
            console.log(newOrder);
            newOrder.save(function (err, post) {
                if (err) res.json({'status' : false, 'message': 'Order could not be placed.', 'err' : err});
                
               
                res.json({ 'status': true, 'message': 'Order has been placed successfully.', 'ordernumber' : ordernumber });
            })
        }
        
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

};