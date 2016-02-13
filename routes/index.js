var express = require('express');
var router = express.Router();
var path    = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
   // var db = { title: 'home' };
    
      res.render('index', { title: 'home' });   
});

router.get('/login', function(req, res, next) {
   // var collection = req.db.get('test');
  //  console.log(collection.find());
   /// collection.find({},{},function(e,docs){
   /// console.log(docs);
   // res.render('index', {
  //        "list" : docs
  //   });
  // });
    
    var db = { title: 'login', 
        user_name : 'Talik Kasozi',
        date : "feb 14",
        segments : [
            {user : talik},
            {user : thiago},
            {user : kasozi}
        ]
    };
    res.render('login', db);
});

router.get('/search', function(req, res, next) {
   //  var db = { title: 'search' };
    res.render('search', { title: 'search' });
});

router.get('/my_profile', function(req, res, next) {
    res.render('my_profile', { title: 'my_profile' });
});
router.get('/user_profile', function(req, res, next) {
    res.render('user_profile', { title: 'user_profile' });
});

module.exports = router;
