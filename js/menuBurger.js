var objMenuBurger = {
    
    initBurger: function () {

        $('.nav_burger').click(function () {
            $('#div_burger').show('slow');
        });
        $('#close_menu').click(function () {
            $('#div_burger').hide('slow');
        })
    }
}
