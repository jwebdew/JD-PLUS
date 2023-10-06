$(function(){
    $('.left > li').mouseover(function(){
        $(this).children('.sub').stop().slideDown(500);
    });
    $('.left > li').mouseleave(function(){
        $(this).children('.sub').stop().slideUp();
    });

    var navBar = $('.left > li');
    navBar.mouseover(function(){
        navBar.removeClass('active');
        $(this).addClass('active');
        navBar.mouseleave(function(){
            $(this).removeClass('active');
        });
    });

    $('.slickslider').slick({
        infinite: true, // 무한반복
        autoplay : true, // 자동 스크롤
        autoplaySpeed : 3000 // 자동 스크롤 시 다음으로 넘어가는 시간
      });

    AOS.init();
});