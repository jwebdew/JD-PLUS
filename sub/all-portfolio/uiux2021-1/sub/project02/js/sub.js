$(function(){
    $('.sub_in > ul li').click(function(){
        $('.sub_in > ul li').removeClass('on');
        $(this).addClass('on');
        $('.sub_in > article > div').removeClass('on')
        $('.sub_in > article > div').eq($(this).index()).addClass('on');
    });
});