document.addEventListener('DOMContentLoaded', () => {
    $('div.col-md-2').remove();
    $('div.col-md-10')
        .removeClass('col-md-10')
        .addClass('col');
});
