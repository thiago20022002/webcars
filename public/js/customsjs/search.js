

function collectionPaser(collection) {

    var searchContent = "";

    /*
     * Starts the row container.
     * */
    searchContent += "<div class='row'>";

    /*
     * For loop places each car ad into the html
     * */

    for (var searchAds = 0; searchAds < collection.length; searchAds++) {

        searchContent += "<div class='col-sm-6 col-md-4'>";
        searchContent += "<div class='thumbnail'>";
        searchContent += "<h3><a href='http://localhost:3000/ad/"+collection[searchAds]._id+"'>" + collection[searchAds].make + " " + collection[searchAds].model + "</a><span class='price'>$" + collection[searchAds].price + "</span></h3>";
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
            console.log("Inside Carousel Images: " + carouselImages);
            if (carouselImages == 0) {
                searchContent += "<div class='item active'>";
            }
            else {
                searchContent += "<div class='item'>";
            }
            console.log(collection[searchAds]);
            searchContent += "<img class='carousel-img' src='" + collection[searchAds].picture[carouselImages] + "' alt='Chania' width='460' height='345'>";
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
        searchContent += "<p><span class='price'>Views: " + collection[searchAds].views + "</span></p>";
        searchContent += "</div>";

        /*
         * Closes Thumbnail
         * */
        searchContent += "</div>";

        /*
         * Closes "col-sm-6 col-md-4"
         * */
        searchContent += "</div>";
    }

    /*
     * End of row container.
     * */
    searchContent += "</div>";
    $('#adsSearch').html(searchContent);
}
