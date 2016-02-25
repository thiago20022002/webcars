var express = require('express');

var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var path = require("path");

var router = express.Router();

/**
 * GET requests, url available to let the user navagate.
 */


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('pages/index', {user: req.user, collection : JSON.stringify(collection_ad) });
});


/* GET login page. */
router.get('/login', function (req, res) {
    res.render('pages/login', {user: req.user});
});

/*Redirect user to root page after logout. */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


/* GET login page. */
router.get('/home', function (req, res, next) {
    //isauthorized = true;
    res.render('pages/index', {user: req.user});
});

router.get('/register', function (req, res) {
    res.render('pages/register', {user: req.user});
});
router.get('/ad', function (req, res) {

    res.render('pages/ad', {user: req.user, adJson: JSON.stringify(single_object)});
});

router.get('/profile', function (req, res) {
    res.render('pages/profile', {user: req.user});
});

var single_object = {
    "_id": 4324956743,
    "Make": "Subaru",
    "Model": "Impreza WRX",
    "Year": 2005,
    "Views": 0,
    "Seller": "sellerName",
    "Price": 25000,
    "Description": "Car looks great.",
    "Picture": [
        "http://www.theautochannel.com/news/2005/06/23/134049.1-lg.jpg",
        "http://www.theautochannel.com/news/2005/06/23/134049.1-lg.jpg",
        "http://www.theautochannel.com/news/2005/06/23/134049.1-lg.jpg",
        "http://www.theautochannel.com/news/2005/06/23/134049.1-lg.jpg"
    ]
}


var collection_ad  = {collections : [single_object,single_object,single_object,single_object,single_object,single_object,single_object]}


/**
 * POST requests, url where client will be sending information to the server
 */

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/home'); //goto home-page when logged in
});

router.post('/register', function (req, res) {
    Account.register(new Account({user: req.user, username: req.body.username}), req.body.password, function (err, account) {
        if (err) {
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/home');
        });
    });
});


//wsc.connect('ws://localhost:8080/MavenTrends/websocket');
module.exports = router;