document.addEventListener('DOMContentLoaded', () => {
    $('.dropdown, .btn-group').hover(function() {
        var dropdownMenu = $(this).children('.dropdown-menu');
        if (dropdownMenu.is(':visible')) {
            dropdownMenu.parent().toggleClass('open');
        }
    });

    $('.navbar-toggle').on('click', function() {
        $('.overlay').fadeIn('slow');
    });
    $('.navbar-overlay').on('click', function() {
        $(this).fadeOut();
        $('.navbar-collapse').removeClass('in').addClass('collapse');
    });
});
