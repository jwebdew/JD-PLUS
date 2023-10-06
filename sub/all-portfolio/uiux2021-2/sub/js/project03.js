$(function(){
    const width = $('.cursor').outerWidth()*0.005;
    const height = $('.cursor').outerHeight();
    
    $('body').mousemove(function(e){
        gsap.to('.cursor', { duration: 0.3, left: e.pageX -     width, top: e.pageY - height });
    });

    $('a, .menu__wrap >ul > li > a').mouseover(function(){
        $('.cursor').css({'width' : '80px'}).css({'height' :    '80px'});
        $('.cursor').addClass('atag');
    });
    $('a').mouseleave(function(){
        $('.cursor').css({'width' : '10px'}).css({'height' :    '10px'});
        $('.cursor').removeClass('atag');
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

    $('.cont01List > ul > li > a').hover(function(){
        $('.cont01List > ul > li').removeClass('active');
        $(this).parent().toggleClass('active');
    });

    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.cont01', {
        scrollTrigger : {
            trigger : '.cont01',
            start : 'top 50%',
            end : 'bottom',
            scrub : true
        },
        delay : 1,
        y : '50%',
        ease : 'power.inOut'
    });

    gsap.to('.cont02', {
    scrollTrigger : {
        trigger : '.cont02',
        start : 'top 5%',
        end : 'bottom 10%',
        scrub : true
    },
    delay : 0.3,
    y : '-20%',
    ease : 'expo'
    });

    gsap.to('.cont03', {
        scrollTrigger : {
            trigger : '.cont03',
            start : 'top 10%',
            end : 'bottom 10%',
            scrub : true
        },
        delay : 1,
        y : '50%',
        ease : 'power.inOut'
    });

    gsap.to('.cont04', {
        scrollTrigger : {
            trigger : '.cont04',
            start : 'top 10%',
            end : 'bottom 10%',
            scrub : true
        },
        delay : 1,
        y : '-20%',
        ease : 'power.inOut'
    });

    gsap.to('.cont05', {
        scrollTrigger : {
            trigger : '.cont05',
            start : 'top 10%',
            end : 'bottom 10%',
            scrub : true
        },
        delay : 1,
        y : '50%',
        ease : 'power.inOut'
    });


    $('.sec02__list .listItem').mouseover(function(){
        $('.sec02__list .listItem').removeClass('active');
        $(this).addClass('active');
        $('.sec02__img .sec02__imgWrap').removeClass('active');
        $('.sec02__img .sec02__imgWrap').eq($(this).index()).addClass('active');
    });

    var titlAnimation = gsap.timeline();
    titlAnimation
        .to('.pageTitle', {duration : 1, y:-100});

});