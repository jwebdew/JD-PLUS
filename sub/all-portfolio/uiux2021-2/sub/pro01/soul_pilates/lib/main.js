$(function(){

    $(window).resize(function(){
        var width = $(window).width();
        if (width >= 1025) {
            $('#banner > .close').click(function(){
                $('#banner').hide();
            }); //[1] 상단배너닫기
        
            $('.popup_bottom > .btn_close').click(function(){
                $('#popup').css({'right' : '-410px'});
            }); // [2] 팝업창 닫기

            $('.bars').click(function(){
                $('.menu_mo').stop().animate({'left' : 0});
                $(this).hide();
                $('.close').show();
            }); // [3] 햄버거메뉴 클릭시 1) 모바일메뉴 2) 클로즈아이콘 나타남
            $('.close').click(function(){
                $('.menu_mo').stop().animate({'left' : '-100%'});
                $(this).hide();
                $('.bars').show();
            }); // [4] 클로즈아이콘 클릭 시 1)모바일메뉴 2)클로즈아이콘 사라지고 3) 햄버거메뉴 나타남
        
            $('.content04__event__pc').slick({
                dots: true,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                autoplay: true,
                autoplaySpeed: 2000,
                customPaging : function(slider, i) {
                    console.log($(slider.$slides[i]).html());
                    return '<button class="tab">' + $(slider.$slides[i]).find('.content04-item').attr('data-dot-title') + '</button>';
                },
            }); // [5] 슬릭슬라이더 페이드, 도트 버튼 커스터마이징
        
        
            TweenMax.set('preview-img', {width : 0});
        
            var t1 = new TimelineLite();
        
            $(document).on('mouseover', '.list-item > a', function(evt){
                t1 = new TimelineLite();
                t1.to($('.preview-img'), 1, {
                    width : '800px',
                    ease : Expo.easeInOut
                });
            }).on('mouseout', '.list-item > a', function(evt){
                t1 = new TimelineLite();
                t1.to($('.preview-img'), 0.2, {
                    width : 0,
                    ease : Expo.easeInOut
                });
            }); //[6] section02 content01 클래스 리스트 호버시 각 배경이미지 나타남
        
            $('.item01').hover(function(){
                $('.preview-img').css({'background-image' : 'url(img/class01.png)'}).css({'top' : '10%'});
            });
            $('.item02').hover(function(){
                $('.preview-img').css({'background-image' : 'url(img/class02.png)'}).css({'top' : '15%'});
            });
            $('.item03').hover(function(){
                $('.preview-img').css({'background-image' : 'url(img/class03.png)'}).css({'top' : '20%'});
            });
            $('.item04').hover(function(){
                $('.preview-img').css({'background-image' : 'url(img/class04.png)'}).css({'top' : '25%'});
            });
            // [7] section02 content01 클래스리스트별 배경이미지 호출

            var tlbtn;
            $('.img-mask').hover(function(){
                tlbtn = new TimelineMax();
                tlbtn.to($(this).find('.btn_enrol'), {duration : 0.5, y : -110, ease : 'elastic'});
            },
            function(){
                tlbtn.reverse();
            }); 
            // [8] section03 content02 이미지 호버 시 버튼 올라오기
            
            AOS.init();
            //width >= 1025px

        } else if ( width > 720) {

            $('#banner > .close').click(function(){
                $('#banner').hide();
                $('.menu_mo_icon').css({'top' : '20px'});
                $('.logo').css({'top' : '20px'});
            }); //[1]

            $('.popup_bottom > .btn_close').click(function(){
                $('#popup').css({'right' : '-410px'});
            }); //[2]

            $('.bars').click(function(){
                $('.menu_mo').stop().animate({'left' : 0});
                $(this).hide();
                $('.close').show();
            }); //[3]
            $('.close').click(function(){
                $('.menu_mo').stop().animate({'left' : '-100%'});
                $(this).hide();
                $('.bars').show();
            }); //[4]

            $('.main_mo > li > a').click(function(){
                if($(this).next().css('display') == 'none'){
                    $('.sub_mo').slideUp();
                    $(this).next().slideDown();
                    $(this).css({'transform' : 'translateX(100px)'}).css({'color' : '#fff'});
                } else {
                    $(this).next().slideUp();
                    $(this).css({'transform' : 'translateX(0px)'}).css({'color' : '#333'});
                }
            }); // [4-1] 모바일메뉴 메인메뉴 클릭시 서브메뉴 효과

            // jQuery('.list-item').click(function () {
            //     return false;
            // });

            $('.content04__event__mo').slick({
                dots: true,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                autoplay: true,
                autoplaySpeed: 2000,
                customPaging : function(slider, i) {
                    console.log($(slider.$slides[i]).html());
                    return '<button class="tab">' + $(slider.$slides[i]).find('.content04-item').attr('data-dot-title') + '</button>';
                },
            }); //[5]

            var windowObj = $(window);
            var menuIcon = $('.menu_mo_icon');
            var menuIconTop = menuIcon.offset().top;

            windowObj.scroll(function(){
                if(windowObj.scrollTop() > 50) {
                    menuIcon.css({'top' : '20px'});
                } else {
                    menuIcon.css({'top' : '60px'});
                }
            }); // [9] 스크롤탑값 50 이상일 때 햄버거메뉴 위치 상향조절

            AOS.init();
            //width >= 720px

        } else {

            $('#banner > .close').click(function(){
                $('#banner').slideUp();
                $('.menu_mo_icon').css({'top' : '20px'});
                $('.logo').css({'top' : '20px'});
            }); // [1]

            $('.popup_bottom > .btn_close').click(function(){
                $('#popup').css({'right' : '-410px'});
            }); //[2]

            $('.bars').click(function(){
                $('.menu_mo').stop().animate({'left' : 0});
                $(this).hide();
                $('.close').show();
            }); //[3]
            $('.close').click(function(){
                $('.menu_mo').stop().animate({'left' : '-100%'});
                $(this).hide();
                $('.bars').show();
            }); //[4]

            $('.main_mo > li > a').click(function(){
                if($(this).next().css('display') == 'none'){
                    $('.sub_mo').slideUp();
                    $(this).next().slideDown();
                    $(this).css({'transform' : 'translateX(50px)'}).css({'color' : '#fff'});
                } else {
                    $(this).next().slideUp();
                    $(this).css({'transform' : 'translateX(0px)'}).css({'color' : '#333'});
                }
            }); // [4-1]


            $('.content04__event__mo').slick({
                dots: true,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                autoplay: true,
                autoplaySpeed: 2000,
                customPaging : function(slider, i) {
                    console.log($(slider.$slides[i]).html());
                    return '<button class="tab">' + $(slider.$slides[i]).find('.content04-item').attr('data-dot-subTitle') + '</button>';
                },
            }); //[5] 모바일 버전 슬릭슬라이더 도트 변화

            var windowObj = $(window);
            var menuIcon = $('.menu_mo_icon');
            var menuIconTop = menuIcon.offset().top;

            windowObj.scroll(function(){
                if(windowObj.scrollTop() > 50) {
                    menuIcon.css({'top' : '20px'});
                } else {
                    menuIcon.css({'top' : '60px'});
                }
            }); //[9]

            AOS.init();
        }

    });
    $(window).trigger('resize');
});
