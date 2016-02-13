var express = require('express');
var router = express.Router();
var path    = require("path");



/* GET home page. */
router.get('/', function(req, res, next) {
  
    res.render('index', { title: 'home' });
        
    //res.sendFile(path.join(__dirname+'/index.html'));

   //- var db = req.db;
   //- var collection = db.get('test');
    //var coll2 = db.collection('test');
  //  console.log(collection.find());
    //console.log(coll2.find());
   /* collection.insert({
        "TWO" : 2
    },function (err, doc) {
        if (err) {
            // If it failed, return error
       console.log(err) }
        else {
            // And forward to success page
          console.log("good");
        }
    });
    */
   //- collection.find({},{},function(e,docs){
   //-     console.log(docs);
   //-     res.render('test', {
   //-         "list" : docs
   //-    });
   //- });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'login' });
});

router.get('/search', function(req, res, next) {
    res.render('search', { title: 'search' });
});

router.get('/my_profile', function(req, res, next) {
    res.render('my_profile', { title: 'my_profile' });
});
router.get('/user_profile', function(req, res, next) {
    res.render('user_profile', { title: 'user_profile' });
});

module.exports = router;
