var img_dir = "kdphotography/portfolio/static/portfolio/media-private";

document.addEventListener('DOMContentLoaded', () => {
    $('#v-pills-tab a').each(function() {
        $(this).on('click', function(e) {
            e.preventDefault();
            $(this).tab('show');
        });
    });

    lightbox.option({
        resizeDuration: 200,
        wrapAround: true,
    });

    const $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
    });

    $grid.imagesLoaded().progress(function() {
        $grid.masonry('layout');
    });
});
