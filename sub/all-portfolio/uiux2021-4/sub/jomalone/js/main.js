$(function(){
    $('.header_menu > ul li.depth01').mouseenter(function(){
      $('.header_menu > ul li.depth01').removeClass('on');
      $(this).addClass('on');
      $('.header_menu .depth01 > ul.depth02').removeClass('on');
      $(this).children('ul.depth02').addClass('on');
    });
  
    $('.header_menu .depth01 > ul.depth02').mouseleave(function(){
      $('.header_menu > ul li.depth01').removeClass('on');
      $('.header_menu .depth01 > ul.depth02').removeClass('on');
    });

    $('.best_in').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    $('.scents_list li').click(function(){
        $('.scents_list li').removeClass('on');
        $(this).addClass('on');
        var idx = $(this).index();
        $('.scents_cont li').removeClass('on');
        $('.scents_cont li').eq(idx).addClass('on');
    });

    $(window).scroll(function(){
      var scroll_window = $(window).scrollTop();
      $('section').each(function(){
        var scroll_this = $(this).offset().top;
        if(scroll_window > scroll_this - 380) {
          $(this).addClass('on');
        }
        if(scroll_window < 200) {
          $('section').removeClass('on');
        }
      });
    });

    if($(window).width() <= 768) {
      $('.depth01 > a').click(function(){
        if($(this).next().css('display') == 'none' ) {
          $('.depth02').slideUp(500);
          $(this).next().slideDown(500);
          $('.depth01').removeClass('on');
          $(this).parent('.depth01').addClass('on');
        } else {
          $(this).next().slideUp(500);
          $(this).parent('.depth01').removeClass('on');
        }
      });

      $('.menu_icon_mobile').click(function(){
        $('.header_in > nav.header_menu').addClass('on');
      });
      $('.header_mobile > i').click(function(){
        $('.header_in > nav.header_menu').removeClass('on');
      });
    }
});