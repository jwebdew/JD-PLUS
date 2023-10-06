$(function(){
    // cont01 메인슬라이더
    $('.cont01 .main_slider').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        pauseOnHover: false,
        arrows: false,
        dots: true, /* 도트 생성 */
        dotsClass: 'page_number', /* 페이징 클래스명 설정 */
        customPaging: function (slider, i){
            console.log(slider);
            return (i + 1) + '/' + slider.slideCount; /* 도트 페이징을 숫자로 표현함 */
        }
    });
    $('.cont01 .slick_prev').on('click', function(){
        $('.cont01 .main_slider').slick('slickPrev');
    });
    $('.cont01 .slick_next').on('click', function(){
        $('.cont01 .main_slider').slick('slickNext');
    });
    $('.cont01 .slick_play').on('click', function(){
        $('.cont01 .main_slider').slick('slickPlay');
        $(this).css('display', 'none');
        $('.cont01 .slick_pause').css('display', 'inline-block');
    });
    $('.cont01 .slick_pause').on('click', function(){
        $('.cont01 .main_slider').slick('slickPause');
        $(this).css('display', 'none');
        $('.cont01 .slick_play').css('display', 'inline-block');
    });

    // cont01 메인슬라이더 - 모바일
    $('.mobile_cont01 .main_slider').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        pauseOnHover: false,
        arrows : false,
        dots: true,
        dotsClass: 'page_number',
        customPaging: function (slider, i){
            console.log(slider);
            return (i + 1) + '/' + slider.slideCount;
        }
    });
    $('.mobile_cont01 .slick_play').on('click', function(){
        $('.mobile_cont01 .main_slider').slick('slickPlay');
        $(this).css('display', 'none');
        $('.mobile_cont01 .slick_pause').css('display', 'inline-block');
    });
    $('.mobile_cont01 .slick_pause').on('click', function(){
        $('.mobile_cont01 .main_slider').slick('slickPause');
        $(this).css('display', 'none');
        $('.mobile_cont01 .slick_play').css('display', 'inline-block');
    });

    // cont02 슬라이더
    $('.cont02 .cont02_slider').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        pauseOnHover: false,
        arrows : false,
        fade : true,
        dots: true,
        dotsClass: 'page_number',
        customPaging: function (slider, i){
            console.log(slider);
            return (i + 1) + '/' + slider.slideCount;
        }
    });
    $('.cont02 .slick_prev').on('click', function(){
        $('.cont02 .cont02_slider').slick('slickPrev');
    });
    $('.cont02 .slick_next').on('click', function(){
        $('.cont02 .cont02_slider').slick('slickNext');
    });
    $('.cont02 .slick_play').on('click', function(){
        $('.cont02 .cont02_slider').slick('slickPlay');
        $(this).css('display', 'none');
        $('.cont02 .slick_pause').css('display', 'inline-block');
    })
    $('.cont02 .slick_pause').on('click', function(){
        $('.cont02 .cont02_slider').slick('slickPause');
        $(this).css('display', 'none');
        $('.cont02 .slick_play').css('display', 'inline-block');
    })
    // 모바일 mobile_cont02 슬라이더
    $('.mobile_cont02 .cont02_slider').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        pauseOnHover: false,
        arrows : false,
        fade : true,
        dots: true,
        dotsClass: 'page_number',
        customPaging: function (slider, i){
            console.log(slider);
            return (i + 1) + '/' + slider.slideCount;
        }
    });
    $('.mobile_cont02 .slick_play').on('click', function(){
        $('.mobile_cont02 .cont02_slider').slick('slickPlay');
        $(this).css('display', 'none');
        $('.mobile_cont02 .slick_pause').css('display', 'inline-block');
    })
    $('.mobile_cont02 .slick_pause').on('click', function(){
        $('.mobile_cont02 .cont02_slider').slick('slickPause');
        $(this).css('display', 'none');
        $('.mobile_cont02 .slick_play').css('display', 'inline-block');
    })

    // cont03 슬라이더
    $('.cont03 .cont03_slider').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        pauseOnHover: false,
        arrows : false,
        dots: true,
        dotsClass: 'page_number',
        customPaging: function (slider, i){
            console.log(slider);
            return (i + 1) + '/' + slider.slideCount;
        }
    });
    $('.cont03 .slick_prev').on('click', function(){
        $('.cont03 .cont03_slider').slick('slickPrev');
    });
    $('.cont03 .slick_next').on('click', function(){
        $('.cont03 .cont03_slider').slick('slickNext');
    });
    $('.cont03 .slick_play').on('click', function(){
        $('.cont03 .cont03_slider').slick('slickPlay');
        $(this).css('display', 'none');
        $('.cont03 .slick_pause').css('display', 'inline-block');
    })
    $('.cont03 .slick_pause').on('click', function(){
        $('.cont03 .cont03_slider').slick('slickPause');
        $(this).css('display', 'none');
        $('.cont03 .slick_play').css('display', 'inline-block');
    })

    // 모바일 mobile_cont03 슬라이더
    $('.mobile_cont03 .cont03_slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        pauseOnHover: false,
        arrows : false,
        dots: true,
        dotsClass: 'page_number',
        customPaging: function (slider, i){
            console.log(slider);
            return (i + 1) + '/' + slider.slideCount;
        }
    });
    $('.mobile_cont03 .slick_play').on('click', function(){
        $('.mobile_cont03 .cont03_slider').slick('slickPlay');
        $(this).css('display', 'none');
        $('.mobile_cont03 .slick_pause').css('display', 'inline-block');
    })
    $('.mobile_cont03 .slick_pause').on('click', function(){
        $('.mobile_cont03 .cont03_slider').slick('slickPause');
        $(this).css('display', 'none');
        $('.mobile_cont03 .slick_play').css('display', 'inline-block');
    })
});