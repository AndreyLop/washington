//  =====================================================================================================================
var homePageSliders = (function() {

    function CustomSlider(parent, options) {
        var that = this;
        this.parent = parent;
        this.totalSlides = $(parent).children().length;
        this.statusBarContainer = $(parent + '_container');
        this.satusBarLoaded = $(this.statusBarContainer).find('.js-gallery-status-bar_loaded');
        this.currentSlideText = $(this.statusBarContainer).find('.js-gallery_current-slide');
        this.totalSldiesText = $(this.statusBarContainer).find('.js-gallery_total-slides');

        this.sliderInstance = $(parent).slick(options ? options : {});
        this.sliderInstance.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            that.setLoadedWidth(nextSlide + 1);
            that.setText(that.currentSlideText, nextSlide + 1);
        });
        this.setLoadedWidth(1);
        this.setText(this.totalSldiesText, this.totalSlides);
    };

    CustomSlider.prototype.setText = function(target, slideNumber) {
        if(slideNumber <= 9) {
            target.html('0' + slideNumber);
        } else {
            target.html(slideNumber);
        }
    }

    CustomSlider.prototype.setLoadedWidth = function(slideNumber) {
        var width = (slideNumber / this.totalSlides) * 100;
        this.satusBarLoaded.css({'width': width + '%'});
    }

    // Hero slider
    var heroSlider = new CustomSlider('.js-hp-gallery_hero', {
        prevArrow: '<div class="gallery-arrow gallery-arrow_hero gallery-arrow_prev"><i class="arrow arrow-prev"></i></div>',
        nextArrow: '<div class="gallery-arrow gallery-arrow_hero gallery-arrow_next"><i class="arrow arrow-next"></i></div>',
        autoplay: true,
    });

    // Advantages slider
    var advantagesSlider = new CustomSlider('.js-hp-gallery_advantages', {
        prevArrow: '<div class="gallery-arrow gallery-arrow_advantages gallery-arrow_prev"><i class="arrow arrow-prev"></i></div>',
        nextArrow: '<div class="gallery-arrow gallery-arrow_advantages gallery-arrow_next"><i class="arrow arrow-next"></i></div>',
        autoplay: true,
    });

    // Values slider
    var valuesSlider = new CustomSlider('.js-hp-gallery_values',{
        prevArrow: '<div class="gallery-arrow gallery-arrow_values gallery-arrow_prev"><i class="arrow arrow-prev"></i></div>',
        nextArrow: '<div class="gallery-arrow gallery-arrow_values gallery-arrow_next"><i class="arrow arrow-next"></i></div>',
        autoplay: true
    });

    // other projecs slider
    $('.hp-other-projects-gallery').slick({
        prevArrow: '<div class="gallery-arrow gallery-arrow_projects gallery-arrow_prev"><i class="arrow arrow-prev"></i></div>',
        nextArrow: '<div class="gallery-arrow gallery-arrow_projects gallery-arrow_next"><i class="arrow arrow-next"></i></div>',
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            }
          ]
    })

})();
//  =====================================================================================================================


