document.addEventListener('DOMContentLoaded', () => {
    $('.dropdown, .btn-group').hover(function() {
        var dropdownMenu = $(this).children('.dropdown-menu');
        if (dropdownMenu.is(':visible')) {
            dropdownMenu.parent().toggleClass('open');
        }
    });
});
