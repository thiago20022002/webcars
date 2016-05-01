/**
 * Created by Mulky on 2/23/16.
 * 
 * --Deprecated 
 * 
 * 
 */

function placeCarAd(jsonFile) {
    /*
     * adContent will hold all the content to display Car ads read from a json file.
     * */
    var adContent = "";

    /*
     * Divs containing the bootstrap thumbnail.
     * */
    adContent += "<div class='row'>";
    adContent += "<div class='col-md-6 adInner'>";
    adContent += "<div class='adThumbnail'>";

    /*
     * Holds the Car Make, Model and Price
     * */
    adContent += "<h3>" + jsonFile.make + " " + jsonFile.model +  "<span class='adPrice'>$" + jsonFile.price + "</span></h3>";

    /*
     * Starts the Bootstrap Carousel to be able to click through multiple images.
     * */
    adContent += "<div id='myCarousel' class='carousel slide' data-ride='carousel'>";
    adContent += "<ol class='carousel-indicators'>";
    adContent += "<li data-target='#myCarousel' data-slide-to='0' class='active'></li>";


    /*
     * This loop will go through all the images adding the appropriate amount of data targets for the amount of images
     * uploaded for the car.
     * */
    for( var carouselLen = 1; carouselLen < jsonFile.picture.length; carouselLen++ ){
        console.log("Inside Carousel Length: " + carouselLen);
        adContent += "<li data-target='#myCarousel' data-slide-to='" + carouselLen + "'></li>";
    }
    adContent += "</ol>";


    /*
     * This loop will go through all the images and add them to the carousel.
     *
     * The first image must be active so only when the loop is 0 it will output a different line.
     * */
    adContent += "<div class='carousel-inner' role='listbox'>";
    for( var carouselImages = 0; carouselImages < jsonFile.picture.length; carouselImages++ ){
        console.log("Inside Carousel Images: " + carouselImages);
        if( carouselImages == 0){
            adContent += "<div class='item active'>";
        }
        else{
            adContent += "<div class='item'>";
        }
        adContent += "<img class='adCarousel-img' src='" + jsonFile.picture[carouselImages] + "' alt='Chania' width='460' height='345'>";
        adContent += "</div>";
    }
    adContent += "</div>";


    /*
     * These two blocks add the controls to the carousel allowing to go back and forth between pictures.
     *
     * */
    adContent += "<a class='left carousel-control' href='#myCarousel' role='button' data-slide='prev'>";
    adContent += "<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>";
    adContent += "<span class='sr-only'>Previous</span>";
    adContent += "</a>";

    adContent += "<a class='right carousel-control' href='#myCarousel' role='button' data-slide='next'>";
    adContent += "<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>";
    adContent += "<span class='sr-only'>Next</span>";
    adContent += "</a>";


    /*
     * This is where the Seller's name, Views and description of the car will be.
     * */
    adContent += "<div class='caption'>";
    adContent += "<a href=../profile/"+jsonFile.seller+"><p><span class='adUserName'>" + jsonFile.seller + "</span><span class='price'>Views: " + jsonFile.views + "</span></p></a>";
    adContent += "<div class='container'>";
    adContent += "<p>"+jsonFile.description+"</p>";
    adContent += "<ul>";
    adContent += "<li>Year: " + jsonFile.year + "</li>";
    adContent += "<li>Make: " + jsonFile.make + "</li>";
    adContent += "<li>Model: " + jsonFile.model + "</li>";
    adContent += "</ul>";

    /*
     * These just close off all of the divs used to make the page.
     * */
    adContent += "</div>";
    adContent += "</div>";
    adContent += "</div>";
    adContent += "</div>";
    adContent += "</div>";



    /*
     * This places the html held in adContent and places it into he carAds div.
     * */
    $('#carAds').html(adContent);
}