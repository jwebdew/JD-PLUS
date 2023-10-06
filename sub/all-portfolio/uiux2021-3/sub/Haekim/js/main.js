$(function(){
  // $(window).scroll(function(){ 
  //   var scroll = $(window).scrollTop(); 
  //   if(scroll<1){ 
  //     $("header").css("background","none"); 
  //   } 
  //   else{ 
  //     $("header").css("background","rgba( 255, 255, 255, 0.3 )"); 
  //   } 
  // });

  // pc_gnb : 메뉴싱글드롭다운
  $('.main > li').mouseover(function(){
      $(this).children('.sub').stop().slideDown();
      $(this).addClass('active');
  });
  $('.main > li').mouseleave(function(){
      $(this).children('.sub').stop().slideUp();
      $(this).removeClass('active');
  });

  // 모바일 햄버거 메뉴
  $('.menu_btn').click(function(){
    $('.mobile_header').toggleClass('open');
  //   $('this').addClass('open');
  //   $('.mobile').animate({'left':'0px'}, 1000);
  //   $("html, body").css({overflow:'hidden'}).bind('touchmove');
  // });
  // $('.menu_btn').click(function(){
  //   $(this).parent().removeClass('open');
  //   $('.mobile').animate({'left':'-100%'}, 1000);
  //   $("html, body").css({overflow:'inherit'});
  });


  $('.m_main > li > a').click(function(){
    if($(this).next().css('display') == 'none') {
        $('.m_main .sub').stop().slideUp();
        $(this).next().stop().slideDown();

        $('.m_main > li').removeClass('on');
        $(this).parent().addClass('on');
        // 클릭한 .m_main > li > a 기준 
        // 부모태그한테 class "on" 붙이기
        // 1차메뉴에 class명 on 붙여주기 -> 1차메뉴 클릭 시 컬러 바뀌게

    } else if ($(this).next().css('display') == 'block') {
        // 다시 1차메뉴 클릭 시 
        // display:block 되어 있는 2차메뉴 슬라이드 업
        $(this).next().stop().slideUp();
        $(this).parent().removeClass('on');
        // class명 on 지우기 -> 다시 컬러 돌아오게
    }
  }); 

});