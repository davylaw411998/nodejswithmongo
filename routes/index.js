var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Hello Man' });
});

module.exports = router;

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
module.exports = router;

router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

module.exports = router;
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });

});

module.exports = router;

router.get('/userdetail', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var collection = db.get('usercollection');

    // Submit to the DB
    //console.log(req.query.user);
    collection.find({username:req.query.user},{},function(e,docs){
        res.render('userdetail', {
            "userlist" : docs
        });
    });

});

module.exports = router;

router.post('/update', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Get our form values. These rely on the "name" attributes
    var collection = db.get('usercollection');

    // Submit to the DB
    console.log(req.query.user);
    collection.update({username : req.query.user},{$set:{username:userName,email:userEmail}},function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            console.log("");
            res.redirect("userlist");
        }
    });
});

module.exports = router;

router.get('/delete', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var collection = db.get('usercollection');

    // Submit to the DB
    //console.log(req.query.user);
    collection.remove({"username" : req.query.user},{},function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
