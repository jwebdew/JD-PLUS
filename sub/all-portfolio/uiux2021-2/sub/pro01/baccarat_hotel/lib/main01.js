$(function(){
    var myFullpage = new fullpage('#fullpage', {
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        navigation: true,
        navigationPosition: 'left',
        navigationTooltips: ['HOME', 'ROOMS & SUITES', 'DINING', 'AMENITIES', 'OFFERS', 'THIS IS BACCARAT', '&nbsp;'],
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: true,
        controlArrows: true,
        verticalCentered: true,
        menu: '#menu'
    });

    $('.cont04__slide').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        dots : true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
    });

    var header = $('#header');
    var headerTop = header.offset().top;
    var windowObj = $(window);

    windowObj.scroll(function(){
        if(headerTop < windowObj.scrollTop()) {
            header.addClass('down');
            header.children().addClass('down');
        } else {
            header.removeClass('down');
            header.children().removeClass('down');
        }
    });


    $('.main_pc > li > a').click(function(){
        $('#header').addClass('on');
        $('#header').children().addClass('on');
        if($(this).next().css('display') == 'none') {
            $('.sub').slideUp();
            $(this).next().slideDown();
            $('.main_pc > li').removeClass('active');
            $(this).parent().addClass('active');
        } else {
            $(this).next().slideUp();
            $(this).parent().removeClass('active');
            $('#header').removeClass('on');
            $('#header').children().removeClass('on');
        }
    });

    $('.main_mo > li > a').click(function(){
        if($(this).next().css('display') == 'none') {
            $('.m_sub').slideUp();
            $(this).next().slideDown();
        } else {
            $(this).next().slideUp();
        }
    });

    $('.fa-bars').click(function(){
        $('.mo_mask').show();
        $('.mobile_wrap').stop().animate({'left':0});
        $('.fa-bars').hide();
        $('.fa-times').show();
    });
    $('.mo_mask, .fa-times').click(function(){
        $('.mo_mask').hide();
        $('.fa-times').hide();
        $('.fa-bars').show();
        $('.mobile_wrap').stop().animate({'left':'-80%'});
    });

});
