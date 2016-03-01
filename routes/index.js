var express = require('express');
var passport = require('passport');
var router = express.Router();
var path = require("path");
var mongoose = require('mongoose');
var Ads = mongoose.model('Ads_col');
var Users = mongoose.model('Users_col');
var Feedback = mongoose.model('feedback_col');
var router = express.Router();
/**
 * GET requests, url available to let the user navagate.
 */


/* GET home page. */
router.get('/', function (req, res, next) {

    Ads.find({}, function (err, ads) {
        if (err)
            throw err;
        res.render('pages/index', {user: req.user, collection: JSON.stringify(ads)});
    });
});

/* GET login page. */
router.get('/login', function (req, res) {
    res.render('pages/login', {user: req.user, errorMessage: req.flash('loginMessage')});
});
/*Redirect user to root page after logout. */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


/* GET login page. */
router.get('/home', isLoggedIn, function (req, res) {
    //isauthorized = true;
    // res.render('pages/profile', {user: req.user, home: true});
    res.redirect('/profile/' + req.user.username);

});
router.get('/register', function (req, res) {
    //console.log(req.flash('registerMessage'));
    res.render('pages/register', {user: req.user, errorMessage: req.flash('registerMessage')});
});
router.get('/ad/:id', function (req, res) {
    Ads.findOne({'_id': req.params.id}, function (err, ad) {
        res.render('pages/ad', {user: req.user, adJson: JSON.stringify(ad)});
    });
});

router.get('/profile/:client', isLoggedIn, function (req, res) {
    var isHome = false;
    if (req.user) {
        if (req.params.client === req.user.username) {
            //    res.redirect("/home");
            //    return;
            isHome = true;

        }
    }

    Users.findOne({username: req.params.client}, function (err, client) {
        if (client) {
            if (client.username) {
                res.render('pages/profile', {user: req.user, home: isHome, client: req.params.client, profileData: client});
            } else {
                res.redirect('/register'); //user does exist redirect somewhere else
            }
        } else {
            res.redirect('/register'); //user does exist redirect somewhere else
        }
    });

});

router.get('/viewUsers', isLoggedIn, function (req, res) {
    Users.find({}, function (err, client) {

        res.render('pages/viewUsers', {user: req.user, clients: client});
    });
});

router.get('/profile/:client/postAd', isLoggedIn, function (req, res) {

    res.render('pages/postForm', {user: req.user});

});

/**
 * POST requests, url where client will be sending information to the server
 */

router.post('/login', passport.authenticate('login', {
    successRedirect: '/home', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
router.post('/register', passport.authenticate('signup', {
    successRedirect: '/home', // redirect to the secure profile section
    failureRedirect: '/register', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
router.post('/profile/:client/postAd', isLoggedIn, function (req, res) {
    // console.log(req.user.username);
    // if(req.user.username !== req.params.client){

    // }

    var ad = new Ads({});
    ad.store(req);
    ad.save();
    Users.update(
            {
                username: req.user.username
            },
    {
        $push: {"postedAds": ad}
    },
    {
        new : true
    },
    function (err, user) {
        if (err)
            throw err;
        res.redirect("/profile/" + req.user.username);

    });

});

router.post('/profile/:client/addFeedback', isLoggedIn, function (req, res) {

    var fed = new Feedback();
    fed.username = req.user.username;
    fed.comment = req.body.feedback;

    Users.update(
            {
                username: req.params.client
            },
    {
        $push: {"feedbacks": fed}
    },
    {
        new : true
    },
    function (err, user) {
        if (err)
            throw err;

    });
    res.redirect("/profile/" + req.params.client);
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/register');
}

module.exports = router;