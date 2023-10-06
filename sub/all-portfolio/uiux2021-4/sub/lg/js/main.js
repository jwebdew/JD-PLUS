$(function(){
    $('.depth01 > li').mouseenter(function(){
        $('.depth01 > li').removeClass('on');
        $(this).addClass('on');
        $('.depth02').show();
        var idx = $(this).index();
        $('.depth02 > div').eq(idx).addClass('on').siblings().removeClass('on');
    });
    $('.depth02 > div').mouseenter(function(){
        $(this).addClass('on').siblings().removeClass('on');
        var idx = $(this).index();
        $('.depth01 > li').eq(idx).addClass('on').siblings().removeClass('on');
    });
    $('.depth01 > li').mouseleave(function(){
        $('.depth01 > li').removeClass('on');
    });
    $('.depth02').mouseleave(function(){
        $('.depth02').hide();
        $('.depth01 > li').removeClass('on');
        $('.depth02 > div').removeClass('on');
    });
    
    $('.visual').slick({
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplaySpeed: 15000,
        
      });

    $('.top').click(function(){
        $('html, body').animate({scrollTop : 0}, 500)
    });


    $('.mobile_menu > .m_menu_icon').click(function(){
        $('header > div.header_bottom').addClass('on');
        $('header > div.depth02').addClass('on');
        $('header > div.mobile_bg').addClass('on');
    });
    $('header .bottom_nav h1 > i').click(function(){
        $('header > div.header_bottom').removeClass('on');
        $('header > div.depth02').removeClass('on');
        $('header > div.mobile_bg').removeClass('on');
    });
    $('#product > .pdt_more > i').click(function(){
        $('#product > div.product_bottom').addClass('on');
        $('#product > div.pdt_more').css({'display' : 'none'});
    });
});