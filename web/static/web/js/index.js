document.addEventListener('DOMContentLoaded', () => {
    $(window).scroll(function() {
        if ($(this).scrollTop() < 30) {
            $('.navbar')
                .css('background', 'rgba(0, 0, 0, 0.0)');
        } else {
            $('.navbar')
                .css('background', 'rgba(0, 0, 0, 0.75)');
        }
    });
});
