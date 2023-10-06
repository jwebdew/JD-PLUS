$(function(){
  var windowObj = $(window);
  var header = $('header');
  var headerTop = header.offset().top;

  windowObj.scroll(function(){
    if(windowObj.scrollTop() > 116) {
      $('header').addClass('fixed');
    } else {
      $('header').removeClass('fixed');
    }
  });

  $('.main > li').mouseover(function(){
    $(this).children().addClass('on');
  });
  $('.main > li').mouseleave(function(){
    $(this).children().removeClass('on');
  });

///데스크탑 메뉴///
  $('.main > li, .sub_bg').mouseover(function(){
    $('.sub, .sub_bg').stop().slideDown(250);
  });
  $('.main > li, .sub_bg').mouseleave(function(){
    $('.sub, .sub_bg').stop().slideUp(250);
  });

  $('.cont01_box:first-of-type').mouseover(function(){
    $('.bg1').fadeIn();
    $('.cont01_box').mouseleave(function(){
      $('.bg1').fadeOut();
    });
  });
  $('.cont01_box:last-of-type').mouseover(function(){
    $('.bg2').fadeIn();
    $('.cont01_box').mouseleave(function(){
      $('.bg2').fadeOut();
    });
  });
///모바일메뉴 - max-width : 1001 일 때///
/// 1. 햄버거 아이콘 클릭 -> 좌측메뉴 left : 0///
/// 2. X클릭 -> 좌측메뉴 left : -100%///
  $(function(){
    $('.m_gnb').click(function(){
      $('.m_menu_wrap').stop().animate({'left':'0'});
      $('.m_close').stop().show();
      $('.m_close').click(function(){
        $('.m_menu_wrap').stop().animate({'left':'-100%'});
      });
    });
    //1차메뉴 클릭 시 2차메뉴(바로 뒤의 자식 요소) 열리고 닫힘
    $('.m_main > li > a').click(function(){
      $(this).toggleClass('active');
      $(this).next().slideToggle();
      $(this).siblings('.m_plus').toggleClass('on');
      $(this).siblings('.m_minus').toggleClass('on');
    });
  });

  $(function(){
    $('.main_img').slick({
      dots : true,
      autoplay : true,
      autoplaySpedd : 2000
    });

    $('.play').click(function(){
      $('.main_img').slick('slickPlay');
    });
    $('.stop').click(function(){
      $('.main_img').slick('slickPause');
    });

    $('.main_button button').click(function(){
      $('.main_button button').toggleClass('on');
    });
    AOS.init();
  });


    $(window).resize(function(){
      var width = window.innerWidth;
      if(width < 1001){
      $('.main_img .i1').attr('src', 'img/m_main01.jpg');
      $('.main_img .i2').attr('src', 'img/m_main02.jpg');
      $('.main_img .i3').attr('src', 'img/m_main01.jpg');
      $('.main_img .i4').attr('src', 'img/m_main03.jpg');
      $('.cont02_box .cont02_m1').attr('src','img/mainCon2_img1_m.jpg');
      $('.cont02_box .cont02_m2').attr('src','img/mainCon2_img2_m.jpg');
      $('.cont02_box .cont02_m3').attr('src','img/mainCon2_img3_m.jpg');
      }
      else {
        $('.main_img .i1').attr('src','img/main01.jpg');
        $('.main_img .i2').attr('src','img/main02.jpg');
        $('.main_img .i3').attr('src','img/main01.jpg');
        $('.main_img .i4').attr('src','img/main03.jpg');
        $('.cont02_box .cont02_m1').attr('src', 'img/mainCon2_img1.jpg');
        $('.cont02_box .cont02_m2').attr('src', 'img/mainCon2_img2.jpg');
        $('.cont02_box .cont02_m3').attr('src', 'img/mainCon2_img3.jpg');
      }
      }).resize();

  });