var bcrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');


var feedbackSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastname : String,
    url : String,
    comment: String
});


var adSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: String,
    views: Number,
    seller: String,
    price: Number,
    description: String,
    picture: [String]
});


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    profilePictureUrl: String,
    phone: String,
    feedbacks: [feedbackSchema],
    postedAds: [adSchema]
});

adSchema.methods.store = function (req) {
    // add some stuff to the users name
    this.make = req.body.make;
    this.model =  req.body.model;
    this.year =  req.body.year;
    this.views = 0;
    this.seller =  req.user.username;
    this.price =  req.body.price;
    this.description =  req.body.description;
    this.picture.push(req.body.imageUrl);
};


mongoose.model('Users_col', userSchema);
mongoose.model('Ads_col', adSchema);
mongoose.model('feedback_col', feedbackSchema);

//module.exports =  mongoose.model('Ads', adSchema);
//module.exports =  mongoose.model('User', userSchema);

module.exports = {
    User : mongoose.model('Users_col', userSchema),
    Ad : mongoose.model('Ads_col', adSchema)
};

