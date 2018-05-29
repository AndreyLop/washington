var architectureGallery = (function() {

    var mainGal = $('.js-architecture__gallery');
    var navGal = $('.js-architecture__nav-gallery');
    

    mainGal.slick({
        prevArrow: $('.gallery-arrow_architecture-prev'),
        nextArrow: $('.gallery-arrow_architecture-next'),
    });

    navGal.slick({
        nextArrow: $('.gallery-arrow_architecture-nav-next'),
        prevArrow: $('.gallery-arrow_architecture-nav-prev'),
        asNavFor: mainGal,
        slidesToShow: 7,
        focusOnSelect: true
    });
})();