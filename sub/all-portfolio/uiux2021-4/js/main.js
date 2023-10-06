$(function(){
    var myFullpage = new fullpage('#fullpage', {
        //sectionsColor: ['#d2dee4', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['p00','p01', 'p02', 'p03', 'p04', 'p05', 'p06', 'p07'],
        menu: '#menu'
    });

    $('header div.menu_button_box').click(function(){
        $('header').toggleClass('on');
        $('header nav .menu_close span').removeClass('on');
    });
    $('header nav .menu_close').click(function(){
        $('header').removeClass('on');
        $(this).children('span').addClass('on');
        $('header div.menu_mobile').show(300);
    });
    $('header div.menu_mobile').click(function() {
        $('header').toggleClass('on');
        $('header nav .menu_close span').removeClass('on');
        $(this).hide(300);
    });
    
});