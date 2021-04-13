document.addEventListener('DOMContentLoaded', () => {
    $('.dropdown .btn-group').hover(function() {
        var dropdownMenu = $(this).children('.dropdown-menu');
        if (dropdownMenu.is(':visible')) {
            dropdownMenu.parent().toggleClass('open');
        }
    });

    $(document).scroll(() => {
        if ($(document).scrollTop() > 30) {
            $('a.navbar-brand img').css('height', '20px');
            $('.navbar')
                .removeClass('py-3')
                .addClass('py-1');
        } else {
            $('a.navbar-brand img').css('height', '30px');
            $('.navbar')
                .removeClass('py-1')
                .addClass('py-3');
        }
    });

    AOS.init();
    
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
});
