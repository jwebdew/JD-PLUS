$(function(){
    /* #cont04 탭 */
    $('.tab_list li').mouseover(function(){
        $('.tab_list li').removeClass('on');
        $(this).addClass('on');
        $('.tab_cont article').removeClass('on');
        $('.tab_cont article').eq($(this).index()).addClass('on');
    });


    /* #cont06 슬릭슬라이더 */
    $('.cont06_contents').slick({
        infinite : true,
        vertical : true,
        verticalSwiping : true,
        autoplay : true,
        pauseOnHover : false,
        pauseOnFocus : false
    });
});