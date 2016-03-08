/**
 * Created by Mulky on 2/25/16.
 */


function placeProfileContent____(jsonFile) {
    
    var profileContent = "";

    profileContent += "<div class='container row'>";
    profileContent += "<div class='col-xs-6 col-md-5'>";


    //make sure the user provided a url to profile image.
    if (jsonFile.profilePictureUrl.length > 10 || jsonFile.profilePictureUrl !== undefined) {
        profileContent += "<a href='#' class='thumbnail'>";
        profileContent += "<img src='" + jsonFile.profilePictureUrl + "' alt='...'>";
        profileContent += "</a>";
    }
    profileContent += "</div>";

    /*
     * Contact information
     *
     *   @param firstName
     *   @param lastName
     *   @param address
     * */
    profileContent += "<div class='col-md-6'><h1>" + jsonFile.firstName + " " + jsonFile.lastName + "</h1>";
    profileContent += "<h5>" + jsonFile.address + "</h5>";

    /*
     * For loops for phone numbers
     * */
    // for( var phoneNumbers = 0; phoneNumbers < jsonFile.phone.length; phoneNumbers++ ){
    profileContent += "<h5>" + jsonFile.phone + "</h5>";
    //profileContent += "<h5>" + jsonFile.Phone[phoneNumbers] + "</h5>;"
    //  }

    profileContent += "</div>";
    /*
     * End of Contact information div
     * */
    profileContent += "</div>";

    /*
     * Div to hold more ads by the user.
     * */
    profileContent += "<div class='innerDiv'>";
    profileContent += "<div class='container-outer'>";
    profileContent += "<h4>Ads by <a href=http://localhost:3000/'" + jsonFile.username + "'>" + jsonFile.firstName + " " + jsonFile.lastName + "</a> (" + jsonFile.postedAds.length + ")</h4>";
    profileContent += "<div class='row moreAdsDiv container-inner'>";

    for (var moreAds = 0; moreAds < jsonFile.postedAds.length; moreAds++) {
        profileContent += "<div class='col-xs-6 col-md-3 user-ads'>";
        profileContent += "<a href='http://localhost:3000/ad/" + jsonFile.postedAds[moreAds]._id + "' class='thumbnail'>";
        profileContent += "<img src='" + jsonFile.postedAds[moreAds].picture[0] + "' alt='...'>";
        profileContent += "</a>";
        profileContent += "</div>";
    }
    profileContent += "</div>";
    /*
     * End of the more ads by user div.
     * */
    profileContent += "</div>";


    /*
     * User feedback.
     * */


    if (jsonFile.feedbacks.length !== 0) {
        profileContent += "<h4>Feedback:</h4>";

// profileContent += "<div class='container-inner'>";
        // profileContent += "<textarea rows='4' cols='80'></textarea>";
        // profileContent += "</div>";

        profileContent += "<div class='feedBackPanels'>";

        for (var feedBack = 0; feedBack < jsonFile.feedbacks.length; feedBack++) {
            profileContent += "<div class='panel panel-default'>";
            //profileContent += "<div class='panel-heading'>" + jsonFile.feedbacks[feedBack].firstName + " " + jsonFile.feedbacks[feedBack].lastName + "</div>";
            profileContent += "<div class='panel-heading'>" + jsonFile.feedbacks[feedBack].username + "</div>";
            profileContent += "<div class='panel-body'>";
            profileContent += "<p>" + jsonFile.feedbacks[feedBack].comment + "</p>";
            profileContent += "</div>";
            profileContent += "</div>";
        }
        profileContent += "</div>";
    }
    profileContent += "</div>";

    $('#userProfile').html(profileContent);
}
