$(function(){
    // pc메뉴
    $('.depth01').mouseover(function(){
        $(this).children('.depth02').addClass('on');
    });
    $('.depth01').mouseout(function(){
        $(this).children('.depth02').removeClass('on');
    });
    $('.pc_header .search').click(function(){
        $('.pc_header .search_box').slideToggle();
    });
    $('.pc_header .search_box > span').click(function(){
        $('.pc_header .search_box').slideUp();
    });

    // 모바일 찾기
    $('.mobile_header .search').click(function(){
        $('.mobile_header .search_box').slideDown();
        $('.mobile_header .search').css('display', 'none');
        $('.mobile_header .close').css('display', 'block');
    });
    $('.mobile_header .close').click(function(){
        $('.mobile_header .search_box').slideUp();
        $('.mobile_header .search').css('display', 'block');
        $('.mobile_header .close').css('display', 'none');
    });
    // 모바일메뉴
    $('.mobile_header .hg').click(function(){
        $('.mobile_menu').css('left', '0')
        $('body > .bacground').css('display', 'block')
    });
    $('.m_menu_close').click(function(){
        $('.mobile_menu').css('left', '-100%')
        $('body > .bacground').css('display', 'none')
    });
    $('.mobile_menu .depth01 > a').click(function(){
        if($(this).next().css('display')==('none')){
            $('.mobile_menu .depth02').stop().slideUp();
            $(this).next().stop().slideDown();

            $('.mobile_menu .depth01').removeClass('on');
            $(this).parent().addClass('on')

            $('.mobile_menu .depth01 > a img').removeClass('on');
            $(this).children('img').addClass('on');
        }else{
            $(this).next().slideUp();
            $(this).parent().removeClass('on');
            $(this).children('img').removeClass('on');
        }
    });
});