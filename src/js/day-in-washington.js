
var diw = (function() {


    var sliderSelector = '.js-diw__slider';
    var slideBars = $('.slide-bar');
    var slideSquare = $('.slide-square');

    $(sliderSelector).slick({
        arrows: false,
        infinite: false
    });

    fillActiveSlideBars(0);

    hideScrollBar();

    function fillActiveSlideBars(numb) {
        for(var i = 0; i < slideBars.length; i++) {
            if(parseInt($(slideBars[i]).data('slide')) < numb) {
            $(slideBars[i]).addClass('slide-bar-active');
            $(slideBars[i]).removeClass('slide-bar-last');
            } else {
            $(slideBars[i]).removeClass('slide-bar-active');
            $(slideBars[i]).removeClass('slide-bar-last');
            }
        }
        $('.slide-bar[data-slide="' + numb + '"]').addClass('slide-bar-last');
    }

    $(sliderSelector).on('beforeChange', function(event, slick, currentSlide, nextSlide){

        fillActiveSlideBars(nextSlide);

        // if(nextSlide+1 === slick.slideCount) {
        //     showScrollBar();
        // } else {
        //     hideScrollBar();
        // }
      });

      
      $(slideSquare).on('click', function() {
        $(sliderSelector).slick('slickGoTo', $(this).parent().data('slide'));
      });

      $(document).bind('wheel', debounce(showNextSlide));

      function showNextSlide(e) {
        if(e.originalEvent.deltaY > 0) {
          $(sliderSelector).slick('slickNext');
        }else{
          $(sliderSelector).slick('slickPrev');
        }
      }
})();

