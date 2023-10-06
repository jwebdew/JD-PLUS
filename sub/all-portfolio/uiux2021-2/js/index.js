$(function(){

    //popup
    $(function(){
        $('h1').click(function(){
            $('.popup').css({'transform':'translateX(-200%)'});
        });
    });

    //cursor
    const width = $('.cursor').outerWidth()*0.05;
    const height = $('.cursor').outerHeight()*0.05;

    $('body').mousemove(function(e){
        gsap.to('.cursor', { duration: 0.3, left: e.pageX - width, top: e.pageY - height });
    });
    $('.mainP__wrap').mouseover(function(){
        $('.cursor').css({'width' : '200px'}).css({'height' : '200px'}).css({'transform' : 'translate(-50%, -50%)'});
        $('.cursor').addClass('bgImg');
    });
    $('.mainP__wrap').mouseleave(function(){
        $('.cursor').css({'width' : '10px'}).css({'height' : '10px'});
        $('.cursor').removeClass('bgImg');
    });
    $('a, .menu__wrap > ul > li > a').mouseover(function(){
        $('.cursor').css({'width' : '80px'}).css({'height' : '80px'});
        $('.cursor').addClass('atag');
    });
    $('a').mouseleave(function(){
        $('.cursor').css({'width' : '10px'}).css({'height' : '10px'});
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

    var tlbtn;
    $('.cont02Frame').hover(function(){
            tlbtn = new TimelineMax();
            tlbtn.to($(this).find('.button'), { duration : 0.5, y : - 130, ease : 'elastic'});
        },
        function(){
            tlbtn.reverse();
    });

    //carousel
    $(".cont03__img").carouselTicker();
    $(".cont03__img").carouselTicker({
          // animation speed
          speed: 0.3,
          // animation delay
          delay: 30,
          // or 'next'
          direction:"prev",
          // or 'vertical'
          mode:"horizontal",
          // callback
          onCarouselTickerLoad:function () {},
    });
    


    $('.-item01 a').hover(function(){
        $('.macbook_img img').attr('src','img/cont01_item_soul_pc.png');
        $('.iphone_img img').attr('src','img/cont01_item_soul_mo.png');
        $('.iphone').css({'display' : 'block'});
    });
    $('.-item02 a').hover(function(){
        $('.macbook_img img').attr('src','img/cont01_item_baccarat_pc.png');
        $('.iphone_img img').attr('src','img/cont01_item_baccarat_mo.png');
        $('.iphone').css({'display' : 'block'});
    });
    $('.-item03 a ').hover(function(){
        $('.macbook_img img').attr('src','img/cont01_item_koreanair_pc.png');
        $('.iphone_img img').attr('src','img/cont01_item_koreanair_mo.png');
        $('.iphone').css({'display' : 'block'});
    });
    $('.-item04 a').hover(function(){
        $('.macbook_img img').attr('src','img/cont01_item_museum_pc.png');
        $('.iphone_img img').attr('src','img/cont01_item_museum_mo.png');
        $('.iphone').css({'display' : 'block'});
    });
    $('.-item05 a').hover(function(){
        $('.macbook_img img').attr('src','img/cont01_item_thespace_pc.png');
        $('.iphone').css({'display' : 'none'});
    });


    AOS.init();
});