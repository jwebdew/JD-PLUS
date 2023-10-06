$(function(){
    //header
    $('.header02 > nav > ul > li').mouseover(function(){
        $(this).addClass('on');
        $('.menu_whole > li').eq($(this).index()).addClass('on');
        $('.menu_bg').css({'display' : 'block'});
        $('.menu_bg02').css({'display' : 'block'});
        var movebar = $(this).position().left;
        $('.menu_bar').stop().animate({
            'left' : movebar,
            'width' : '130px'
        }, 500, 'linear');
    });
    $('.menu_whole > li').mouseover(function(){
        $(this).addClass('on');
        $('.menu_bg').css({'display' : 'block'});
        $('.menu_bg02').css({'display' : 'block'});
    });
    $('.header02 > nav > ul > li').mouseout(function(){
        $('header02 > nav > ul > li').removeClass('on');
        $('.menu_whole > li').removeClass('on');
        $('.menu_bg').css({'display' : 'none'});
        $('.menu_bg02').css({'display' : 'none'});
        var movebar = $(this).stop().position().left;
        $('.menu_bar').animate({
            'width' : '0px'
        }, 500, 'linear');
    });

    $('.menu_whole > li').mouseout(function(){
        $(this).removeClass('on');
        $('.menu_bg').css({'display' : 'none'});
        $('.menu_bg02').css({'display' : 'none'});
    });

    //width768px 이하
    if($(window).width() <= 768) {
        $('.header_mobile > .m_menu').click(function(){
            $('.header_mobile > .m_menu').hide(500);
            $('.header_mobile > .m_close').show(500);
            $('.header_pc > div.header02').css({'left' : '0'}, 800);
        });
        $('.header_mobile > .m_close').click(function(){
            $('.header_mobile > .m_close').hide(500);
            $('.header_mobile > .m_menu').show(500);
            $('.header_pc > div.header02').css({'left' : '-100%'}, 800);
        });
        $('.header02>nav>ul>li').click(function(){
            $('.header_mobile > .m_prev').show(500).siblings().hide(500);
            $('.menu_whole').css({'left' : '0'});
            var idx = $(this).index();
            $('.menu_whole > li').css({
                'display' : 'none',
                'left' : '-100%'
            });
            $('.menu_whole > li.depth02').eq(idx).css({
                'display' : 'block',
                'left' : '0'
            });
        });
        $('.header_mobile > .m_prev').click(function(){
            $('.menu_whole').css({'left' : '-100%'});
            $('.menu_whole > li.depth02').css({
                'display' : 'none',
                'left' : '-100%'
            });
            $('.header_mobile > .m_close').show(500).siblings().hide(500);
        });
    }
    
    //button
    $('.button').mouseover(function(){
        $(this).css({
            'background-color' : '#70bdb5'
        });
    });
    $('.button').mouseout(function(){
        $(this).css({
            'background-color' : '#fff'
        });
    });

    //.cont02
    $('.cont02_in > ul > li > h3').mouseover(function(){
        $(this).stop().animate({'opacity' : '1'});
        $(this).parent().addClass('on');
        $('.on > .cont02_main').stop().animate({'opacity' : '1'}, 1000);
        $('.on > .cont02_bg').stop().animate({'opacity' : '0.4'}, 1000);
        $('.on').siblings().addClass('off');
        $('.on').removeClass('off');
        $('.off > .cont02_main').stop().animate({'opacity' : '0'}, 200);
        $('.off > .cont02_bg').stop().animate({'opacity' : '0'}), 200;
        $('.off > h3').stop().animate({'opacity' : '0.5'}, 200);
    });
    $('.cont02_in > ul > li > h3').mouseout(function(){
        $(this).parent().removeClass('on');
        $('.off > .cont02_main').stop().animate({'opacity' : '0'}, 200);
        $('.off > .cont02_bg').stop().animate({'opacity' : '0'}, 200);
        $('.off > h3').stop().animate({'opacity' : '0.5'}, 200);
    });

    //.cont03
    $('.cont03_right > .cont03_click > li').click(function(){
        if($(this).children('.plus').css('display') == 'block') {
            $(this).addClass('on').siblings().removeClass('on');
            $(this).children('.minus').css({'display' : 'block'});
            $('.cont03_left > .cont03_click > li').removeClass('on');
            $('.cont03_left > .cont03_product > li').removeClass('on');
            var idx = $(this).index();
            $('.cont03_right > .cont03_product > li').eq(idx).addClass('on').siblings().removeClass('on');
            return false;
        } else {
            $('.cont03_right > .cont03_click > li').removeClass('on');
            $('.cont03_right > .cont03_product > li').removeClass('on');
            $(this).children('.plus').css({'display' : 'block'});
        }
    });
    $('.cont03_left > .cont03_click > li').click(function(){
        if($(this).children('.plus').css('display') == 'block') {
            $(this).addClass('on').siblings().removeClass('on');
            $(this).children('.minus').css({'display' : 'block'});
            $('.cont03_right > .cont03_click > li').removeClass('on');
            $('.cont03_right > .cont03_product > li').removeClass('on');
            var idx = $(this).index();
            $('.cont03_left > .cont03_product > li').eq(idx).addClass('on').siblings().removeClass('on');
            return false;
        } else {
            $('.cont03_left > .cont03_click > li').removeClass('on');
            $('.cont03_left > .cont03_product > li').removeClass('on');
            $(this).children('.plus').css({'display' : 'block'});
        }
    });

    //.cont04
    $('.cont04_in').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 5,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
              }
            },
            {
              breakpoint: 481,
              settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
              }
            }
          ]
    });
});

//sub-page
$(function(){
    $(window).scroll(function(){
        var scroll_window = $(window).scrollTop();
        $('.category > div').each(function(){
            var scroll_this = $(this).offset().top;
            if(scroll_window > scroll_this - 500) {
                $(this).addClass('on')
            }
            if(scroll_window < 50) {
                $('.category > div').removeClass('on');
            }
        });
    });

    $('.prd_like > .far.fa-heart').click(function(){
        $(this).hide();
        $(this).next().show();
    });
    $('.prd_like > .fas.fa-heart').click(function(){
        $(this).hide();
        $(this).prev().show();
    });

    $('.prd > a > div').mouseenter(function(){
        $(this).children('.prdImg_default').hide();
        $(this).children('.prdImg_hover').show();
    });
    $('.prd > a > div').mouseleave(function(){
        $('.prd > a > div > img.prdImg_hover').hide();
        $('.prd > a > div > img.prdImg_default').show();
    });
});