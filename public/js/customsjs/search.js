

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
        searchContent += "<fieldset>";
        searchContent += "<legend>";
        searchContent += "<span class='ad-small-make'>" + collection[searchAds].make + "</span>";
        searchContent += "<span class='ad-small-model'>" + collection[searchAds].model + "</span>";
        searchContent += "<span class='price pull-right'>$" + collection[searchAds].price + "</span>";
        searchContent += "</legend>";

        searchContent += "<div id='myCarousel" + searchAds + "' class='carousel slide' data-ride='carousel'>";

        /*
         * For loop to add data targets to bootstrap thumbnail.
         * */
        searchContent += "<ol class='carousel-indicators'>";
        searchContent += "<li data-target='#myCarousel" + searchAds + "' data-slide-to='0' class='active'></li>";
        for (var dataTargets = 1; dataTargets < collection[searchAds].picture.length; dataTargets++) {
            searchContent += "<li data-target='#myCarousel" + searchAds + "' data-slide-to=" + dataTargets + "></li>";
        }
        searchContent += "</ol>";

        searchContent += "<div class='carousel-inner' role='listbox'>";
        for (var carouselImages = 0; carouselImages < collection[searchAds].picture.length; carouselImages++) {
            // console.log("Inside Carousel Images: " + carouselImages);
            if (carouselImages === 0) {
                searchContent += "<div class='item active'>";
            }
            else {
                searchContent += "<div class='item'>";
            }
            // console.log(collection[searchAds]);
            searchContent += "<a href='/ad/" + collection[searchAds]._id + "'>";
            searchContent += "<img class='carousel-img user-ads' src='" + collection[searchAds].picture[carouselImages] + "' alt='Chania'>";
            searchContent += "</a>";
            searchContent += "</div>";
        }
        searchContent += "</div>";


        searchContent += "<a class='left carousel-control' href=#myCarousel" + searchAds + "' role='button' data-slide='prev'>";
        searchContent += "<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>";
        searchContent += "<span class='sr-only'>Previous</span>";
        searchContent += "</a>";

        searchContent += "<a class='right carousel-control' href=#myCarousel" + searchAds + "' role='button' data-slide='next'>";
        searchContent += "<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>";
        searchContent += "<span class='sr-only'>Next</span>";
        searchContent += "</a>";

        searchContent += "<div class='caption'>";
        searchContent += "</div>";

        /*
         * Closes Thumbnail
         * */
        searchContent += "</div>";
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
