var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Ads = mongoose.model('Ads_col');
var Users = mongoose.model('Users_col');
var Feedback = mongoose.model('feedback_col');

var passport = require('passport');


/* GET home page. */
router.get('/', function (req, res, next) {
    //{user: req.user}
    res.render('templates/main', {user: req.user});
});

router.get('/api/userData/:username', function (req, res) {

    var user = req.params.username;
    console.log(user);

    // if (req.user) {
    Users.findOne({username: user}, function (err, client) {
        if (err) {
            //send a modified client json, password security
            res.header(400).send({'username': 'error'});
        } else {
            res.send(client);
        }
    });
    //  } else {
    //      res.header(400).send({'username': 'not-found'});
    ///  }
});


router.get('/api/getData', function (req, res) {

    Ads.find({}, function (err, ads) {
        if (err) {
            throw err;
        }
        res.json(ads);
        return;
    });
    // res.status(400).send({error : "ADS find not working"});
});

router.get('/api/search/:queryType/:query', function (req, res) {
    var queryString = req.params.query;
    var query;
    switch (req.params.queryType) {
        case 'year':
            query = {'year': {'$regex': queryString, '$options': 'i'}};
            break;
        case 'model':
            query = {'model': {'$regex': queryString, '$options': 'i'}};
            break;
        case 'make':
            query = {'make': {'$regex': queryString, '$options': 'i'}};
            break;
        case 'ALL':
             query = {};
             break;
            
    }
    
    Ads.find(query, function (err, ads) {
        if (err) {
            throw err;
        }
        console.log(ads);
        res.json(ads);
        return;
    });
    // res.status(400).send({error : "ADS find not working"});
});


router.get('/api/getCarData/:id', function (req, res) {

    //Increment views
    Ads.update({"_id": req.params.id}, {$inc: {views: 1}}, function (err, res, ad) {
        if (err) {
            //   console.log('not good');
        } else {
            //   console.log('update succes ', ad);
        }
    });


    Ads.findOne({'_id': req.params.id}, function (err, ad) {

        //res.render('pages/ad', {user: req.user, adJson: JSON.stringify(ad)});
        res.send(ad);

    });
});



router.get('/partials/:name', function (req, res)
{

    var name = req.params.name;
    console.log("GETTING PARTIAL " + name);
    res.render('partials/' + name, {user: req.user});
});

router.get('/api/authenticate/denied', function (req, res) {
    var msg = req.flash('message');
    if (msg[0]) {
        msg = msg[0];
    }
    console.log(msg);
    res.status(400).json({'message': msg, error: true});
});

router.get('/api/authenticate/success', function (req, res) {
    if (req.isAuthenticated()) {
        res.json({user: req.user.username});
    } else {

        res.status(400).json({message: "session not authenticate", error: true});
    }
});

router.get('/api/logout', function (req, res) {
    req.logout();
    res.header(200).json({message: "success"});
});

router.get('*', function (req, res, next) {
    console.log("ERROR REQUEST : " + req.originalUrl, req.params);
    res.render('templates/main', {user: req.user});
});

router.post('/api/register', passport.authenticate('signup', {
    successRedirect: '/api/authenticate/success', // redirect to the secure profile section
    failureRedirect: '/api/authenticate/denied', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// process the login form
router.post('/api/login', passport.authenticate('login', {
    successRedirect: '/api/authenticate/success', // redirect to the secure profile section
    failureRedirect: '/api/authenticate/denied', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.post('/api/postAd', function (req, res) {

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
        if (err) {
            res.header(401).send("ERROR");
        }
        res.json({'message': 'success'});
    });

});


router.post('/api/:client/feedback', isLoggedIn, function (req, res) {

    var fed = new Feedback();
    fed.username = req.user.username;

    //console.log(req.body.feedback);

    fed.url = req.user.profilePictureUrl;
    fed.comment = req.body.feedback;

   // console.log(fed);

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
        if (err) {
            res.json({'message': 'failed'});

            return;
        }
        res.json({'message': 'success'});

    });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(400).send("user is not auth");
}

module.exports = router;
