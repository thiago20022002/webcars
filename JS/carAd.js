/**
 * Created by Mulky on 2/23/16.
 */



function placeCarAd( jsonFile ){
    var adContent = "";

    adContent += "<div class='row'>";
    adContent += "<div class='col-md-6 inner'>";
    adContent += "<div class='thumbnail'>";
    adContent += "<h3>Subaru <span class='price'>" + jsonFile.Price + "</span></h3>";
    adContent += "<div id='myCarousel' class='carousel slide' data-ride='carousel'>";
    adContent += "<ol class='carousel-indicators'>";
    adContent += "<li data-target='#myCarousel' data-slide-to='0' class='active'></li>";

    /*
    for( var carouselLen = 1; carouselLen < jsonFile.Picture.length; carouselLen++ ){
        adContent += "<li data-target='#myCarousel' data-slide-to='" + carouselLen + "'></li>";
    }
    adContent += "</ol>";

    adContent += "<div class='carousel-inner' role='listbox'>";
    for( var carouselImages = 0; carouselImages < jsonFile.Picture.length; carouselImages++ ){
        adContent += "<div class='item active'>";
        adContent += "<img class='carousel-img' src='" + jsonFile.Picture[carouselImages] + "' alt='Chania' width='460' height='345'>";
        adContent += "</div>";
    }
    adContent += "</div>";

    adContent += "<a class='left carousel-control' href='#myCarousel' role='button' data-slide='prev'>";
    adContent += "<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>";
    adContent += "<span class='sr-only'>Previous</span>";
    adContent += "</a>";

    adContent += "<a class='right carousel-control' href='#myCarousel' role='button' data-slide='next'>";
    adContent += "<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>";
    adContent += "<span class='sr-only'>Next</span>";
    adContent += "</a>";

    adContent += "<div class='caption'>";
    adContent += "<p><span class='userName'>Bob Smith</span><span class='price'>Views: 234</span></p>";
    adContent += "<div class='container'>";
    adContent += "<p>This 2015 Sti has 500 miles on it all highway. Practically brand new. Must make serious offer to take it for a test drive.</p>";
    adContent += "<ul>";
    adContent += "<li>Year: " + jsonFile.Year + "</li>";
    adContent += "<li>Make: " + jsonFile.Make + "</li>";
    adContent += "<li>Model: " + jsonFile.Model + "</li>";
    adContent += "</ul>";
    adContent += "</div>";
    adContent += "</div>";

    */


    $('#carAds').html(adContent);
}