$(function(){
    $('.menu_main > li').mouseover(function(){
        $(this).children('.menu_sub').stop().slideDown(500);
    });
    $('.menu_main > li').mouseleave(function(){
        $(this).children('.menu_sub').stop().slideUp(500);
    });
    var navBar = $('.menu_main > li');
    navBar.mouseover(function(){
        navBar.removeClass('active');
        $(this).addClass('active');
        navBar.mouseleave(function(){
            $(this).removeClass('active');
        });
    });
    var subBar = $('.menu_sub > li');
    subBar.mouseover(function(){
        subBar.removeClass('active');
        $(this).addClass('active');
        subBar.mouseleave(function(){
            $(this).removeClass('active');
        });
    });
    var footerBar = $('.menu_footer > li');
    footerBar.mouseover(function(){
        footerBar.removeClass('active');
        $(this).addClass('active');
        footerBar.mouseleave(function(){
            $(this).removeClass('active');
        });
    });
});
$(function(){
    $('.cont05').slick({
        infinite: true, //무한반복
        slidesToShow: 6, //표출되는 개수
        slidesToScroll: 1, //움직이는 개수
        dots : true, //도트 네비게이션
        autoplay : true, //자동슬라이드 재생
        autoplaySpeed : 300, //자동 슬라이드 재생시 속도
        responsive: [
            {
              breakpoint: 650,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            }
          ]
      });
      AOS.init(); //slick slide 충돌 방지를 위해 slcik slide함수 내부에서 가장 아래에 작성
});
