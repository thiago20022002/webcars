var express = require('express');

var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

//var WebSocketClient = require('websocket').client;
//var wsc = new WebSocketClient();

var router = express.Router();

var isauthorized = false;
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', {'data': ""});
});

/* GET search page. */
router.get('/search', function (req, res, next) {

    res.render('search', {title: 'Search Express'});
});


/* GET login page. */
router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/home'); //goto home-page when logged in
});

/*Redirect user to root page after logout. */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


/* GET login page. */
router.get('/home', function (req, res, next) {
    //isauthorized = true;
    res.render('home', { user : req.user });
});

router.get('/signup', function(req, res) {
    res.render('signup', { });
});

router.post('/signup', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render("signup", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/home');
        });
    });
});

/*
wsc.on('connect', function (connection_local) {
    console.log('WebSocket Client Connected');
    connection_local.on('open', function () {
        console.log('open');
    });
    connection_local.on('message', function (event) {
       // console.log('message', event.utf8Data);
    
        client_json_data.push(event.utf8Data);
      //  console.log(event.utf8Data);
      //  console.log(client_json_data);
    });

    connection_local.on('close', function () {
        console.log('close');
    });
    connection = connection_local;
});
*/

//wsc.connect('ws://localhost:8080/MavenTrends/websocket');
module.exports = router;