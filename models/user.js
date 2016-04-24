/* global module */

var bcrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');


var feedbackSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastname: String,
    url: String,
    comment: String
});


var adSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: String,
    views: Number,
    seller: String,
    long: String,
    latt: String,
    address: String,
    price: Number,
    sellerImg: String,
    zipCode: String,
    description: String,
    picture: [String]
});


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    long: String,
    latt: String,
    zipCode: String,
    profilePictureUrl: String,
    phone: String,
    feedbacks: [feedbackSchema],
    postedAds: [adSchema]
});

adSchema.methods.store = function (req) {
    // add information to the users ad
    this.make = req.body.make;
    this.model = req.body.model;
    this.year = req.body.year;
    this.views = 0;
    this.long = req.user.long;
    this.latt = req.user.latt;
    this.address = req.user.address;
    this.zipCode = req.user.zipCode;
    this.seller = req.user.username;
    this.sellerImg = req.user.profilePictureUrl;
    this.price = req.body.price;
    this.description = req.body.description;

    var pathID = Math.floor(Math.random() * 400000) + 1;

    var format = getFormat(req.body.imageUrl);
    if (format.indexOf("default") === -1) {
        pathID = "images/carAds/" + pathID + "." + format;

        var regexVar = "data:image/" + format + ";base64,";
        var regex = new RegExp(regexVar, 'g');
        var base64Data = req.body.imageUrl.replace(regex, "");
        require("fs").writeFile("public/" + pathID, base64Data, 'base64', function (err) {
            console.log(err);
        });
        this.picture.push(pathID);
    } else {
        this.picture.push(req.body.imageUrl);
    }
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


mongoose.model('Users_col', userSchema);
mongoose.model('Ads_col', adSchema);
mongoose.model('feedback_col', feedbackSchema);

//module.exports =  mongoose.model('Ads', adSchema);
//module.exports =  mongoose.model('User', userSchema);

module.exports = {
    User: mongoose.model('Users_col', userSchema),
    Ad: mongoose.model('Ads_col', adSchema)
};

