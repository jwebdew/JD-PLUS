$(function(){
    const width = $('.cursor').outerWidth()*2;
    const height = $('.cursor').outerHeight()*2;

    $('body').mousemove(function(e){
        gsap.to('.cursor', { duration: 0.3, left: e.pageX - width, top: e.pageY - height });
    });
    $('a, .menu__wrap >ul > li > a').mouseover(function(){
        $('.cursor').css({'width' : '80px'}).css({'height' : '80px'});
        $('.cursor').addClass('atag');
    });
    $('a').mouseleave(function(){
        $('.cursor').css({'width' : '10px'}).css({'height' : '10px'});
        $('.cursor').removeClass('atag');
    });



    $('.menu__icon').click(function(){
        if($('.menu__wrap').css('left') == '0px') {
            $(this).removeClass('opened');
            $('.menu__wrap').stop().animate({'left':'-100%'}, 500);
        } else {
            $(this).addClass('opened');
            $('.menu__wrap').stop().animate({'left':'0px'}, 500);
        }
    });

    $('.mainMenu > li, .subMenu').mouseover(function(){
        $('.subMenu').stop().slideUp();
        $(this).children('.subMenu').stop().slideDown();
    });
    $('.mainMenu > li, .subMenu').mouseleave(function(){
        $(this).children('.subMenu').stop().slideUp();
    });

    $('.cont01List > ul > li > a').hover(function(){
        $('.cont01List > ul > li').removeClass('active');
        $(this).parent().toggleClass('active');
    });
});