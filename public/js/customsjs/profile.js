/**
 * Created by Mulky on 2/25/16.
 */


function placeProfileContent( jsonFile ){

    var profileContent = "";

    profileContent += "<div class='container row'>";
    profileContent += "<div class='col-xs-6 col-md-3'>";
    profileContent += "<a href='#' class='thumbnail'>";
    profileContent += "<img src='http://www.moibbk.com/images/acura-rsx-8.jpg' alt='...'>";
    profileContent += "</a>";
    profileContent += "</div>";

    /*
    * Contact information
    *
    *   @param firstName
    *   @param lastName
    *   @param Address
    * */
    profileContent += "<div><h1>" + jsonFile.firstName + " " + jsonFile.lastName + "</h1>";
    profileContent += "<h5>" + jsonFile.Address + "</h5>";

    /*
    * For loops for phone numbers
    * */
    for( var phoneNumbers = 0; phoneNumbers < jsonFile.Phone.length; phoneNumbers++ ){
        profileContent += "<h5>" + jsonFile.Phone[phoneNumbers] + "</h5>;"
    }

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
    profileContent += "<a><h4>More ads by" + jsonFile.firstName + " " + jsonFile.lastName + " (" + jsonFile.UserAdIds.length + ")</h4></a>";
    profileContent += "<div class='row moreAdsDiv container-inner'>";

    for( var moreAds = 0; moreAds < jsonFile.UserAdIds.length; moreAds++ ){
        profileContent += "<div class='col-xs-6 col-md-3 user-ads'>";
        profileContent += "<a href='#' class='thumbnail'>";
        profileContent += "<img src='http://www.moibbk.com/images/acura-rsx-8.jpg' alt='...'>";
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
    profileContent += "<h4>Feedback:</h4>";
    profileContent += "<div class='container-inner'>";
    profileContent += "<textarea rows='4' cols='80'></textarea>";
    profileContent += "</div>";

    profileContent += "<div class='feedBackPanels'>";

    for( var feedBack = 0; feedBack < jsonFile.FeedBack.length; feedBack++ ){
        profileContent += "<div class='panel panel-default'>";
        profileContent += "<div class='panel-heading'>" + jsonFile.FeedBack[feedBack].firstName + " " + jsonFile.FeedBack[feedBack].lastName +"</div>";
        profileContent += "<div class='panel-body'>";
        profileContent += "<p>" + jsonFile.FeedBack[feedBack].comment + "</p>";
        profileContent += "</div>";
        profileContent += "</div>";
    }
    profileContent += "</div>";
    profileContent += "</div>";



    $('#userProfile').html(profileContent);
}
