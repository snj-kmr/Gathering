var User = require('../models/user');
var uuid = require('uuid'),
    fs = require('fs');

// Users API
module.exports = function(apiRouter,s3,randomString, passport, transporter,cat_upload) {
    
    // get all posts
    apiRouter.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

  
    // add a user // from admin
    apiRouter.post('/users', function(req, res) {
        console.log(req.body.city)
        User.register(new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            gender: req.body.gender,
            phone: req.body.phone,
            email: req.body.email,
            password : req.body.password,
            title : req.body.title,
            org_name : req.body.org_name,
//            org_type : req.body.type,
            org_description : req.body.org_description,
            product : req.body.product,
            delivery : req.body.delivery,
            org_phone : req.body.org_phone,
            org_address : req.body.org_address,
            city : req.body.city,
            account: req.body.account, // facebook/insta/etc
            username : req.body.email,
            image : req.body.image,
            cont_email : req.body.cont_email,
            status: req.body.status,
            role: req.body.role,
        }), req.body.password, function(err, user) {
            if (err) {
               
                console.error('ERROR IS:' +err.message);
                res.json({status : false, message : err.message});
            } else {
                res.json({status : true, message: "Registered successfully"});
            }

        });
    });
    // end
    
    
    /*ADDED LATER */
    // add new vendor //from front end
    apiRouter.post('/users/requestnew', function(req, res) {
        console.log(req.body.city)
        User.register(new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            gender: req.body.gender,
            phone: req.body.phone,
            email: req.body.email,
            cont_email : req.body.cont_email,
            title : req.body.title,
            status: "0",
            org_name : req.body.org_name,
            org_type : req.body.type,
            org_description : req.body.org_description,
            product : req.body.product,
            delivery : req.body.delivery,
            org_phone : req.body.org_phone,
            org_address : req.body.org_address,
            city : req.body.city,
            account: req.body.account, // facebook/insta/etc
            username : req.body.email,
            role : req.body.role,
        }), req.body.password, function(err, user) {
            if (err) {
               
                console.error('ERROR IS:' +err.message);
                res.json({status : false, message : err.message});
            } else {
                res.json({status : true, message: "You are successfully registered at : Gathering"});
            }

        });
    });
    /*END*/
    apiRouter.post('/users/home', function(req, res) {

        User.register(new User({
            //firstname: req.body.firstname,
           // lastname: req.body.lastname,
            dob: req.body.dob,
            status: 1,
            role: "user",
            email: req.body.email
        }), req.body.password, function(err, usr) {
            if (err) {
               // console.error(err.message);
                res.send(err.message);
            } else {
                //res.send("You have successfully registered");
               // console.error(user);
                host = req.get('host');//remember the server (i.e host) address
                link = "http://" + req.get('host') + "/verify?id=" + usr._id;//create a url of the host server
                var mailOptions = {
                    from: 'simerjit@avainfotech.com',
                    to: usr.email,
                    subject: 'Welcome To MEAN',
                    html: "Hello " + usr.email + ",<br> Please Click on the link to verify.<br><a href=" + link + ">Click here to verify</a>"
                };
                transporter.sendMail(mailOptions, function(error, info) {
                   
                    if (error) {
                        res.send(error);
                    } else {
                        res.send("You have successfully registered.Please verify your email!");
                    }
                });
               
            }

        });
    });
    apiRouter.post('/users/forgetpass', function(req, res) {
        User.findOne({ 'email': req.body.email }).select('+salt +hash').exec(function(err, usr) {
                if (usr) {
                host = req.get('host');//remember the server (i.e host) address
                link = "http://" + req.get('host') + "/forgotpassword?id=" + usr.salt;//create a url of the host server
                var mailOptions = {
                    from: 'simerjit@avainfotech.com',
                    to: usr.email,
                    subject: 'Forgot Password',
                    html: "Hello " + usr.email + ",<br> Please Click on the link to change password.<br><a href=" + link + ">Click here to Change Password</a>"
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        res.json("Email has not been sent!");
                    } else {
                        res.json("Email has been sent please check your email");
                    }
                });
            } else {
                res.json("Email has not been registered!");
            }

    });

    });
  apiRouter.post('/users/changepass', function(req, res) {
      console.log('changepass')
      console.log(req.body)
      User.findOne({'_id': req.body.id}, function(err, sanitizedUser) {  
       // console.log(sanitizedUser);
        if (sanitizedUser) {
            sanitizedUser.setPassword(req.body.password, function() {
                sanitizedUser.save();
                res.send({'status':true,message:'Password has been updated successfully!'});
            });
        } else {
            res.send({'status':false,message:'User does not exist'});
        }

 });
    });
    
    apiRouter.post('/users/resetpassword', function(req, res) {
      console.log('changepass')
      console.log(req.body)
//      User.findOne({'_id': req.body.id}, function(err, sanitizedUser) {  
   User.findOne({'salt': req.body.id}, function(err, sanitizedUser) {
       // console.log(sanitizedUser);
        if (sanitizedUser) {
            sanitizedUser.setPassword(req.body.password, function() {
                sanitizedUser.save();
                res.send({'status':true,message:'You have got yourself a new password!'});
            });
        } else {
            res.send({'status':false,message:'user does not exist'});
        }

 });

    });
//    apiRouter.post('/users/login', function(req, user, res) {
//        passport.authenticate('local')(req, user, res,function(req, user,  res) {
//            console.log('Im here')
//            if(!user){
//                res.json(err);  
//            }
//            res.json(req.user);
//            //console.log(req.user)
//            // res.send("You have successfully login");
//        });
//    });
    
    
    apiRouter.post('/users/login', function(req, res, next) {
                passport.authenticate('local', function(err, user, info) {
                 
                  // Redirect if it fails
                  if (!user) { 
                        if (err) { return res.json(info); }
                  }  
                  req.logIn(user, function(err) {
                    if (err) { return res.json(info); }
                    
                    //here
                   
//                    var mailOptions = {
//                        from: 'honey@avainfotech.com',
//                        to: 'simerjit@avainfotech.com',
//                        subject: 'Login',
//                        html: "Hello"
//                    };
//                    transporter.sendMail(mailOptions, function(error, info) {
//
//                        if (error) {
//                            res.json(error);
//                        } else {
////                            res.send("You have successfully registered.Please verify your email!");
//                            res.json({ status : true, data : req.user});
//                        }
//                    });
               // ends
                    res.json({ status : true, data : req.user});
                  });
                })(req, res, next);
    })
    
    // get a single user
    apiRouter.post('/edituser', function(req, res) {
        User.findById({'_id': req.body.path}, function(err, user) {
            if (err)
                res.json(err);

            res.json(user);
        });
    });
    
    //get single user for APP
    apiRouter.post('/getsingleuser', function(req, res) {
        User.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.json(err);

            res.json(user);
        });
    });
    
    // get only vendors
    apiRouter.get('/users/all_vendors', function(req, res) {
        User.find({'role': 'vendor'}, function(err, user) {
            if (err)
                res.json(err);

            res.json(user);
        });
    });

     // get only individual event planner
    apiRouter.get('/users/all_individual', function(req, res) {
        User.find({'role': 'planner'}, function(err, user) {
            if (err)
                res.json(err);

            res.json(user);
        });
    });

    // get only event planning companies
    apiRouter.get('/users/all_planning_comp', function(req, res) {
           User.find({'role': 'planner_comp'}, function(err, user) {
               if (err)
                   res.json(err);

               res.json(user);
           });
       });
  

    // update a post
    apiRouter.post('/editusrID', function(req, res) {
        //console.log(req.body);
        User.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.send(err);
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.age=req.body.age,
            user.image = req.body.image;
            user.cont_email = req.body.cont_email;
            user.org_name = req.body.org_name;
            user.org_description = req.body.org_description;
            user.title = req.body.title;
            user.city = req.body.city;
            user.gender = req.body.gender;
            user.delivery = req.body.delivery;
            user.phone = req.body.phone;
            user.org_phone = req.body.org_phone;
            user.account = req.body.account;
            user.address = req.body.address;
            user.role = req.body.role;
            user.status = req.body.status;
            
            user.save(function(err) {
                if (err){
                    res.send(err);}else{
                res.json({'status':true,'message':'User updated!'});
            }
            })

        });
    });
    
    //
    // edit user from the APP
     apiRouter.post('/edit_user', function(req, res) {
        User.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.send(err);
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.image = req.body.image;
            user.gender = req.body.gender;
            user.phone = req.body.phone;
            user.save(function(err) {
                if (err){
                    res.json(err);}else{
                res.json({'status':true,'message':'Profile has been updated!'});
            }
            })

        });
    });
 
        // update a user
    apiRouter.post('/editusrhome', function(req, res) {
        //console.log(req.body);
        User.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.send(err);
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.gin = req.body.gin;
            user.pin = req.body.pin;
            user.phone = req.body.phone;
            user.address = req.body.address;
            user.country = req.body.country;
            user.dob = req.body.dob;
            user.profilepic = req.body.profilepic;
            user.doca = req.body.doca;
            user.docb = req.body.docb;
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json('User updated!');
            })

        });
    });
    
    
    apiRouter.post('/users/uploaduserimage',cat_upload.array('file',3), function(req, res, next) {
       // console.log(req.body);
        console.log(req.files);
        res.send(req.files);
    }); 
  
    
    // delete a user
    apiRouter.post('/deleteuser', function(req, res) {
        User.remove({
            _id: req.body.id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({message: 'User deleted!'});
        })
    });
    
    // get all organizers
    apiRouter.get('/users/organizers', function(req, res) {
        User.find({'role':'organizer'}, function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

    //Base 64 Image upload

    apiRouter.post('/post_user_image_app', function(req, res) {

    var user_id = req.body.id;
    var pic = req.body.image;
    buf = new Buffer(pic.replace(/^data:image\/\w+;base64,/, ""),'base64');
    var data = {
     Body: buf,
     ContentEncoding: 'base64',
     ContentType: 'image/jpeg'
    };
   //console.log(data);   
     s3.putObject(data, function(err, data){
//        console.log("https://s3.eu-central-1.amazonaws.com/gatheringmanal/blogimage/"+randomString+".jpg");
        var pro_pic = "https://s3.eu-central-1.amazonaws.com/gatheringmanal/blogimage/"+randomString+".jpg";
      
            if (err) {
                console.error(err.message);
//                res.send(err.message);
                res.json({"message": err.message, "error": "1"})
            } else {
                var userdata = {
                    "image": pro_pic,
                    "updated_at": Date.now()
                };

                User.update({_id: user_id}, {$set: userdata}, function(err_up, post_up) {
                    if (err_up) {
                        res.send(err_up);
                    }
                    else {
                        res.json({'status': true, 'message': 'Image updated Successfully'});
                    }
                })
            }
      });
  });
};