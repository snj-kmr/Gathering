var termsnCondition = require('../models/termsncondition');
// Users API
module.exports = function(apiRouter) {
    
    // get all posts
    apiRouter.get('/termsnconditions', function(req, res) {
        termsnCondition.find({}, function(err, terms) {
            if (err)
                res.send(err);
            res.json(terms);
        });
    });
  
    // add a post
    apiRouter.post('/termsnconditions', function(req, res) {
       
        termsnCondition.update({terms: req.body.terms,ar_terms: req.body.ar_terms,  updated_at: Date.now()}, function(err, terms){
            if(err)
                res.json({status : false, error : err});
            res.json({status : true});
        });
    });
   
};