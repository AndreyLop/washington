var developerSlider = (function(){

    var slider = $('.js-developer__slider');

    slider.slick({
        prevArrow: $('.gallery-arrow_developer-prev'),
        nextArrow: $('.gallery-arrow_developer-next'),
        slidesToShow: 4,
        slidesToScroll: 1
    })

})();