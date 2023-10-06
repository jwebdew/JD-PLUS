$(function(){
    const width = $('.cursor').outerWidth()/2;
    const height = $('.cursor').outerHeight()/2;

    $('.mainP__wrap').mousemove(function(e){
        gsap.to('.cursor', { duration: 0.5, left: e.pageX - width, top: e.pageY - height });
    });
    $('.mainP__wrap').mouseover(function(){
        $('.cursor').css({'width' : '200px'}).css({'height' : '200px'});
    });
    $('.mainP__wrap').mouseleave(function(){
        $('.cursor').css({'width' : '0px'}).css({'height' : '0px'});
    });


    $('.menu__icon').click(function(){
        if($('.menu__wrap').css('left') == '0px') {
            $(this).removeClass('opened');
            $('.menu__wrap').stop().animate({'left':'-100%'}, 500);
        } else {
            $(this).addClass('opened');
            $('.menu__wrap').stop().animate({'left':'0px'}, 500);
        }
    });

    $('.mainMenu > li, .subMenu').mouseover(function(){
        $('.subMenu').stop().slideUp();
        $(this).children('.subMenu').stop().slideDown();
    });
    $('.mainMenu > li, .subMenu').mouseleave(function(){
        $(this).children('.subMenu').stop().slideUp();
    });

    $('.cont01List > ul > li > a').click(function(){
        $('.cont01List > ul > li').removeClass('active');
        $(this).parent().toggleClass('active');
    });

    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.cont01 .scrollTextTop .text', {
    scrollTrigger : {
        trigger : '.cont01',
        start : 'top 80%',
        end : 'bottom 90%',
        scrub : true
    },
    delay : 0.,
    x : '-100%',
    ease : 'power.inOut'
    });

    gsap.from('.cont01 .scrollTextBottom .text', {
        scrollTrigger : {
            trigger : '.cont01',
            start : 'top 50%',
            end : 'bottom',
            scrub : true
        },
        delay : 0.,
        x : '100%',
        ease : 'power.inOut'
    });

    gsap.from('.cont02 .scrollTextTop .text', {
        scrollTrigger : {
            trigger : '.cont02',
            start : 'top 80%',
            end : 'bottom 90%',
            scrub : true
        },
        delay : 0.,
        x : '-100%',
        ease : 'power.inOut'
        });
    
        gsap.from('.cont02 .scrollTextBottom .text', {
            scrollTrigger : {
                trigger : '.cont02',
                start : 'top 50%',
                end : 'bottom',
                scrub : true
            },
            delay : 0.,
            x : '100%',
            ease : 'power.inOut'
    });

    gsap.from('.cont03 .scrollTextTop .text', {
        scrollTrigger : {
            trigger : '.cont03',
            start : 'top 80%',
            end : 'bottom 90%',
            scrub : true
        },
        delay : 0.,
        x : '-100%',
        ease : 'power.inOut'
    });
    
    gsap.from('.cont03 .scrollTextBottom .text', {
        scrollTrigger : {
            trigger : '.cont03',
            start : 'top 50%',
            end : 'bottom',
            scrub : true
        },
        delay : 0.,
        x : '100%',
        ease : 'power.inOut'
    });



    //carousel
    $(".cont03__img").carouselTicker();
    $(".cont03__img").carouselTicker({
          // animation speed
          speed: 0.8,
          // animation delay
          delay: 30,
          // or 'next'
          direction:"prev",
          // or 'vertical'
          mode:"horizontal",
          // callback
          onCarouselTickerLoad:function () {},
    });
        

});