$(document).ready(function () {
    $('.js-projects-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: 'linear',
        appendArrows: $('.js-projects-slider-nav'),
        prevArrow:"<button type='button' class='slick-prev slick-arrow'><img src='images/left.svg' alt=''></button>",
        nextArrow:"<button type='button' class='slick-next slick-arrow'><img src='images/right.svg' alt=''></button>"
    }).on('afterChange', function(event, slick, currentSlide){
        let allEl = $('.js-projects-slider').find('.project-slider__item');
        if(allEl[currentSlide + 1] != undefined) {
            rebuildNextPreview(allEl[currentSlide + 1])
        } else {
            rebuildNextPreview(allEl[0]);
        }
    });

    function rebuildNextPreview(el) {
        console.log(el)
        let nextSlide = $(el),
            src = nextSlide.find('.project-slider__img img').attr('src'),
            title = nextSlide.find('.h2-title').text();

        $('.js-next-project-name').text(title);
        $('.js-next-project-img').attr('src', src);

    }

    $('.js-next-project').on('click',function () {
        $('.js-projects-slider').slick('slickNext');
    })
});