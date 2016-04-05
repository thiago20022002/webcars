
function loadNavBar() {
    $('.navbar-nav [data-toggle="tooltip"]').tooltip();
    $('.navbar-twitch-toggle').on('click', function (event) {
        event.preventDefault();
        $('.navbar-twitch').toggleClass('open');
        $("body").css("padding-left", "265");

    });

    $('.nav-style-toggle').on('click', function (event) {

        event.preventDefault();
        var $current = $('.nav-style-toggle.disabled');
        $(this).addClass('disabled');
        $current.removeClass('disabled');
        $('.navbar-twitch').removeClass('navbar-' + $current.data('type'));
        $('.navbar-twitch').addClass('navbar-' + $(this).data('type'));
        $("body").css("padding-left", "65");
    });
    $('body').toggleClass('on');

}