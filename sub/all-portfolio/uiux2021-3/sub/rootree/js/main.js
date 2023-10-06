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

    // pc_메뉴 싱글 드롭다운
     $('.main > li').mouseover(function(){
        $(this).children('.sub').stop().slideDown(500);
    });
    $('.main > li').mouseleave(function(){
        $(this).children('.sub').stop().slideUp();
    });

    // 메인비주얼 슬라이드
    $('.slider, .m_slider').slick({
        infinite: true, // 무한반복
        dots : true, // 도트 네비게이션
        autoplay : true, // 자동 스크롤
    });

    // cont01 : Best Product 슬라이드
    $('.product_slide').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{ 
            breakpoint: 1024, 
            settings: "unslick" // destroys slick 
        }]
  
      });
});