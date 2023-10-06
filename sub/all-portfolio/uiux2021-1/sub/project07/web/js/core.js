$(".gnb").mouseover(function(){
    $(this).stop().animate({height:250},500)
    $(".subBg").stop().slideDown(500)
}).mouseout(function(){
    $(this).stop().animate({height:44},500)
    $(".subBg").stop().slideUp(500)
})

$('.slider ul').bxSlider({
            auto: true,
            autoControls: true,
            stopAutoOnClick: true,
            pager: true,
            autoControlsCombine:true,
            pause : 4500,
            speed : 2500,
        })
