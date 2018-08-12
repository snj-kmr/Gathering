var Address = require('../models/address');
var User = require('../models/user');
var ObjectId = require('mongodb').ObjectID;
// Products API
module.exports = function (apiRouter) {


    //addnewcart
    apiRouter.post('/address/add', function (req, res) {
       
        var  newPro = new Address({
                userid: req.body.userid,
                fname: req.body.fname,
                lname: req.body.lname,
                city: req.body.city,
                state: req.body.state,
                street: req.body.street,
                mobileno: req.body.mobileno,
                country: req.body.country,
                address: req.body.address
            })
            console.log(newPro);
            newPro.save(function (err, post) {
                if (err) res.send(err);
                res.json({ 'status': true, 'message': 'New address added' });
            })

    });


    //// show all addresses
    apiRouter.post('/address/viewall', function (req, res) {
        console.log("get addrs..");
        console.log(req);
        var id = req.body.userid
        console.log(id);
        Address.find({'userid' : id}, function (err, addrs) {
                if (err)
                    res.json({ 'status': false, 'message': 'Could not load addresses.' });

                console.log(addrs)
                res.json({ 'status': true, 'data': addrs });
            });
    });

    ///// show single address by id
    
    apiRouter.post('/address/viewbyid', function (req, res) {
        console.log("get addrs..");
        console.log(req);
        var id = req.body.addressid
        console.log(id);
        Address.findById({'_id' : id}, function (err, addrs) {
                if (err)
                    res.json({ 'status': false, 'message': 'Could not load address.' });

                console.log(addrs)
                res.json({ 'status': true, 'data': addrs });
            });
    });

     ///// edit address by id
    apiRouter.post('/address/editaddress', function (req, res) {
        console.log("get addrs..");
        console.log(req);
        var id = req.body.addressid
        Address.findByIdAndUpdate(id, 
              { fname: req.body.fname,
                lname: req.body.lname,
                city: req.body.city,
                state: req.body.state,
                street: req.body.street,
                mobileno: req.body.mobileno,
                country: req.body.country,
                address: req.body.address 
            }, function (err, addrs) {
              if (err)
                res.json({ 'status': false, 'error': err });

                console.log(addrs)
                res.json({ 'status': true, 'message': 'Updated' });
        });

    });

    //delete product from addresses
    apiRouter.post('/carts/deleteproduct', function (req, res) {
        console.log(req.body.cartid);
        Cart.findOneAndRemove(req.body.cartid, function (err, result) {
            if (err)
                res.json(err);
            res.json({ status: true, message: 'Removed item from cart!', data: result });
        })
    });

};