


/* global module */

var LocalStrategy = require('passport-local').Strategy;
require('../models/user')
var mongoose = require('mongoose');
var User = mongoose.model('Users_col');
//var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

// load the auth variables
//var configAuth = require('./auth'); // use this one for testing


module.exports = function (passport) {


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

// passport/login.js
    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        // check in mongo if a user with username exists or not
        User.findOne({'username': username},
        function (err, user) {
            // In case of any error, return using the done method
            if (err)
                return done(err);
            // Username does not exist, log error & redirect back
            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false,
                        req.flash('message', 'User Not found.'));
            }
            // User exists but wrong password, log the error 
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false,
                        req.flash('message', 'Invalid Password'));
            }
            // User and password both match, return user from 
            // done method which will be treated like success
            console.log("SUCCESSSSS");
            return done(null, user);
        }
        );
    }));


    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        findOrCreateUser = function () {
            // find a user in Mongo with provided username
            User.findOne({'username': username}, function (err, user) {
                // In case of any error return
                if (err) {
                    // console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // already exists
                console.log(username);
                if (user) {
                    console.log('User already exists');
                    return done(null, false,
                            req.flash('message', 'User Already Exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = password;
                    newUser.zipCode = req.body.zipCode;
                    newUser.long = req.body.lng;
                    newUser.latt = req.body.lat;
                    newUser.firstName = req.body.fname;
                    newUser.lastName = req.body.lname;
                    newUser.phone = req.body.phone;
                    newUser.address = req.body.address;
                    newUser.profilePictureUrl = req.body.profileURL;
                    //console.log(newUser);
                    //console.log("DATA ", req.body);
                    // save the user
                    var format = getFormat(newUser.profilePictureUrl);

                    if (format.indexOf("default") === -1) {
                        newUser.profilePictureUrl = "images/profile/" + username + "." + format;
                        var regexVar = "data:image/" + format + ";base64,";
                        var regex = new RegExp(regexVar, 'g');
                        var base64Data = req.body.profileURL.replace(regex, "");

                        require("fs").writeFile("public/" + newUser.profilePictureUrl, base64Data, 'base64', function (err) {
                            console.log(err);
                        });
                    }
                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute 
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }));
};


function getFormat(imageData) {
    if (imageData.indexOf("jpeg;base64") > -1) {
        return "jpeg";
    } else if (imageData.indexOf("jpg;base64") > -1) {
        return "jpg";
    } else if (imageData.indexOf("png;base64") > -1) {
        return "png";
    }
    else if (imageData.indexOf("bmp;base64") > -1) {
        return "bmp";
    } else {
        return "default";
    }
}

var isValidPassword = function (user, password) {
    return user.password === password;

    // return bCrypt.compareSync(password, user.password);
};


