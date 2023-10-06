$(function () {

    //pc 2차메뉴 드롭다운
    
    
    let hd = $('header');
    let pcHdMenu1 = $('.pc .depth01')
    let pcHdMenu2 = $('.pc .depth02')
    
    pcHdMenu1.mouseenter(function(){
        $(this).children().stop().slideDown()
    })

    pcHdMenu1.mouseleave(function(){
        pcHdMenu2.stop().slideUp()
    })
    
    //모바일 내비
    let wrap = $('#wrap'); 

    let mobilMenu = $('.mobile_menu');
    let mobileHd = $('.mobile_gnb');
    let mobileHdMenu1 = $('.mobile_gnb .depth01 > a');
    let mobileHdMenu2 = $('.mobile_gnb .depth02 li');
 
    let windowWidth = -$(window).width();
    
    
    mobileHd.css({
        'left': windowWidth
    })
     
    // console.log(mobileHd.offset().left)
    // console.log(-$(window).width())

    //모바일 메뉴 열고 닫기
    mobilMenu.click(function () {
        if (mobileHd.offset().left == -$(window).width()) { 
            $(this).addClass('on');
            wrap.addClass('on');
            mobileHd.animate({
                'left': '0'
            })
        } else { 
            $(this).removeClass('on');
            wrap.removeClass('on');

            mobileHd.animate({
                'left': windowWidth
            })
        }
    })
     

    //모바일2차메뉴
    mobileHdMenu1.click(function () {
        $(this).next().slideToggle()
        mobileHdMenu2.toggleClass('on')

    })


    //비주얼 슬라이드
    var swiper = new Swiper(".visual", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });


   //레시피 슬라이드
    var swiper = new Swiper(".recipe", {
        slidesPerView: 1,
        //spaceBetween: 120,
        //centeredSlides: true, 
        // loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        //speed : 9000,
        centeredSlides: true, //true가 아니면 반복슬라이드 진행이 안됨
        grabCursor: true,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            400: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 40,
            },
            1440: {
                slidesPerView: 5,
                spaceBetween: 60,
            },
        },
    });

});//jquery end