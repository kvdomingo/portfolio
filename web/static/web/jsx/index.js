document.addEventListener('DOMContentLoaded', () => {
    $(window).scroll(function() {
        if ($(this).scrollTop() < 30) {
            $('.navbar')
                .css('background', 'rgba(0, 0, 0, 0.0)');
        } else {
            $('.navbar')
                .css('background', 'rgba(0, 0, 0, 0.90)');
        }
    });

    var carousel_data = [
        'https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/kdphotography/portfolio/static/portfolio/media-private/portraits/20190502_1.jpg',
        'https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/kdphotography/portfolio/static/portfolio/media-private/latest/20200116_1.png',
        'https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/kdphotography/portfolio/static/portfolio/media-private/portraits/20191115_1.jpg',
        'https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/kdphotography/portfolio/static/portfolio/media-private/portraits/20191116_1.jpg',
        'https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/kdphotography/portfolio/static/portfolio/media-private/portraits/20180920_4.jpg',
        'https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/kdphotography/portfolio/static/portfolio/media-private/portraits/20190414_3.jpg',
        'https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/kdphotography/portfolio/static/portfolio/media-private/portraits/20191116_2.jpg',
    ]

    ReactDOM.render(
        <CarouselFiller urls={carousel_data} />,
        document.querySelector('.main-carousel')
    );

    var $carousel = $('.main-carousel')
        .flickity({
            autoPlay: 3000,
            cellAlign: 'center',
            imagesLoaded: true,
            friction: 0.15,
            pauseAutoPlayOnHover: false,
            percentPosition: false,
            prevNextButtons: false,
            selectedAttraction: 0.01,
            wrapAround: true,
        });

    var $imgs = $carousel.find('.carousel-cell img');

    var docStyle = document.documentElement.style;

    var transformProp = typeof docStyle.transform == 'string' ? 'transform' : 'WebkitTransform';

    var flkty = $carousel.data('flickity');

    $carousel.on('scroll.flickity', function() {
        flkty.slides.forEach(function(slide, i) {
            var img = $imgs[i];
            $('.carousel-cell').css('width', img.width);
            var x = (slide.target + flkty.x) * -1/3;
            img.style[transformProp] = `translateX(${x}px)`;
        });
    });
});
