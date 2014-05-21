
var dom = {
    $menu: $('menu'),
    $mainMenuBar: $('.mainMenuBar'),
    $rightMenuBarBt: $('.rightMenuBar button')
};

$( dom.$rightMenuBarBt ).click(function() {
    if (parseInt( $( dom.$menu ).css('width'))==50) {
        openMenu();

    } else {
        closeMenu();
    }
});

function openMenu() {
    $( dom.$mainMenuBar ).css('display', 'block');
    $( dom.$menu ).animate({width: '450px'}, 500);
    textTab.init();
}
function closeMenu() {
    $( dom.$menu ).animate({width: '50px'}, 500);
    $( dom.$mainMenuBar ).css('display', 'none');
}

