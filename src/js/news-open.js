var newsOpen = (function() {

    var images = $('.js-news-open__image');

    if(images.children().length > 1) {
        images.slick({
            prevArrow: '<div class="gallery-arrow gallery-arrow_news-open gallery-arrow_news-open-prev"><i class="arrow arrow-prev"></i></div>',
            nextArrow: '<div class="gallery-arrow gallery-arrow_news-open gallery-arrow_news-open-next"><i class="arrow arrow-next"></i></div>',
        });
    }
    
})();