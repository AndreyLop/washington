var valuesPage = (function() {

    $(".js-values-arrow").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.' + $(this).data('next')).offset().top - 75
        }, 1000);
    });

})();