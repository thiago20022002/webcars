var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');

require('./config/passport')(passport); // pass passport for configuration

var flash    = require('connect-flash');
var configDB = require('./config/database.js');

var routes = require('./routes/api');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: false}, {limit: '10mb'}));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash()); // use connect-flash for flash messages stored in session


app.use('/', routes);


var url_str = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || configDB.url;
// mongoose

var url = "mongodb://test:test@ds019678.mlab.com:19678/heroku_b2dmx8l5";

console.log(url_str);
//var url_str = "mongodb://test:test@ds019678.mlab.com:19678/heroku_b2dmx8l5";

mongoose.connect(url);
//console.log("passsed******************");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/error', {
            message: err.message,
            error: err,
            user : req.user 
        });
        console.log(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
        message: err.message,
        error: {},
        user : req.user 
    });
    console.log(err);
    next();
});

module.exports = app;
