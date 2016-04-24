

function collectionPaser(collection) {
    // console.log("here ", collection);
    var searchContent = "";

    /*
     * Starts the row container.
     * */
    searchContent += "<div class='row'>";

    /*
     * For loop places each car ad into the html
     * */
    searchContent += "<div class='col-md-12'>";
    for (var searchAds = 0; searchAds < collection.length; searchAds++) {
        if (searchAds % 3 == 0) {
            searchContent += "</div>";
            searchContent += "<div class='col-md-12'>";
        }


        searchContent += "<div class='col-md-4'>";
        // searchContent += "<div class='thumbnail'>";
        searchContent += "<fieldset class='col-md-12'>";
        searchContent += "<legend class='col-md-12'>";
        searchContent += "<span class='ad-small-make'>" + collection[searchAds].make + "</span>";
        searchContent += "<span class='ad-small-model'>" + collection[searchAds].model + "</span>";
        searchContent += "<span class='price pull-right'>$" + collection[searchAds].price + "</span>";
        searchContent += "</legend>";

        searchContent += "<div class='col-md-12'>";

        // console.log(collection[searchAds]);
        searchContent += "<a href='/ad/" + collection[searchAds]._id + "' class='thumbnail'>";
        searchContent += "<img class='user-ads' src='" + collection[searchAds].picture[0] + "' >";
        searchContent += "</a>";

        /*
         * Closes Thumbnail
         * */
        searchContent += "</div>";
        searchContent += "<hr>";
        
        searchContent += "<p><span class='price pull-left'>" + collection[searchAds].address + "</span></p>";
        searchContent += "<p><span class='price pull-right'>Views: " + collection[searchAds].views + "</span></p>";

        searchContent += "</fieldset>";
        /*
         * Closes "col-sm-6 col-md-4"
         * */
        searchContent += "</div>";
    }
    searchContent += "</div>";
    /*
     * End of row container.
     * */
    searchContent += "</div>";
    $('#adsSearch').html(searchContent);
}
