$(function(){
    // 헤더 고정
    var windowObj = $(window);
    var header = $('header');
    var headerTop = header.offset().top;
    
    windowObj.scroll(function(){
        if(headerTop < windowObj.scrollTop()){
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }
    });

    // 풀메뉴드롭다운
    $('.main > li, .menu_bg, .leftArea ').mouseover(function(){
        $('.sub, .menu_bg, .leftArea').stop().slideDown();
    });
    $('.main > li, .menu_bg, .leftArea ').mouseleave(function(){
        $('.sub, .menu_bg, .leftArea').stop().slideUp();
    });

    // 반응형메뉴
    $('.bars').click(function(){
        $('.mobile').stop().animate({left:'0'}, 500);
        $('.bars').hide();
        $('.close').show();
    });
    $('.close').click(function(){
        $('.mobile').stop().animate({left:'-2000'}, 500);
        $('.close').hide();
        $('.bars').show();
    });
    $('.m_main > li > a').click(function(){
        $(this).next().slideToggle();
    });
    $('.m_main > li > a').click(function(){
        $(this).toggleClass('color');
    });

    // 메인비주얼_슬라이드
    $('.main_slider, .m_slider').slick({
        infinite: true, // 무한반복
        dots : true, // 도트 네비게이션
        autoplay : true, // 자동 스크롤
        autoplaySpeed : 3000, // 자동 스크롤 시 다음으로 넘어가는 시간
    });
    // 메인비주얼_재생-정지버튼
    $('.play').click(function(){
        $('.main_slider').slick('slickPlay');
    });
    $('.stop').click(function(){
        $('.main_slider').slick('slickPause');
    });
    $('.button').click(function(){
        $('.button li').toggleClass('on');
    });
    
    // cont01 : 배경 호버
    $('.cont01_cont article:first-of-type').mouseover(function(){
        $('.cont01').addClass('hover01');
    });
    $('.cont01_cont article:first-of-type').mouseleave(function(){
        $('.cont01').removeClass('hover01');
    });
    $('.cont01_cont article:last-of-type').mouseover(function(){
        $('.cont01').addClass('hover02');
    });
    $('.cont01_cont article:last-of-type').mouseleave(function(){
        $('.cont01').removeClass('hover02');
    });

    AOS.init();
});