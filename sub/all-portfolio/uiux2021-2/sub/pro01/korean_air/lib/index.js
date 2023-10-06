$(function(){

  $('a[href="#"]').click(function(e) {
    e.preventDefault();
  });



    $('.g_sub').hide();
    $('.close').hide();
    $('.main_menu_pc > ul > li > a').click(function(){
        $('.close').show();
        $('.g_sub').hide();
        $(this).next().toggle();
        $('.main_menu_pc > ul > li > a').removeClass('on');
        $(this).toggleClass('on');
    });
    $('.close').click(function(){
        $('.g_sub').hide();
        $('.close').hide();
        $('.main_menu_pc > ul > li > a').removeClass('on');
    });

    // $('.main_menu_pc > ul > li > a').click(function(){
    //   $('.close').show();
    //   if($('.g_sub').css('display') == 'none') {
    //     $('.g_sub').hide();
    //     $(this).next().toggle();
    //   }
    //   $('.main_menu_pc > ul > li > a').removeClass('on');
    //   $(this).toggleClass('on');
    // });


    //슬릭슬라이더//
    $('.cont02_img').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1060,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            }
        ]
      });
    //footer accordion menu
    // $('.footer01_list > ul > li > a').click(function(){
    //   $(this).next().toggleClass('on');
    // });

    $('.footer01_list > ul > li > a').click(function(){
      if($(this).next().css('display') == 'none') {
        $('.footer_sub').hide();
        $(this).next().show();
      } else {
        $(this).next().hide();
      }
    });


    // $('.footer01_list > ul > li > a').click(function(){
    //   $(this).next().toggle();
    // });

    $('.footer03_left > div > a').click(function(){
      $(this).parents().toggleClass('on');
      $('.footer03_left > ul').toggleClass('on');
      $('.footer03_right').toggleClass('on');
    });

});
