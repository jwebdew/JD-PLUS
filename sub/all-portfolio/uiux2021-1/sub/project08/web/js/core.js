$("#head2In .gnb .g1").mouseover(function(){
    $(this).find(".sub").stop().slideDown(300)
}).mouseout(function(){
    $(this).find(".sub").stop().slideUp(300)
})
$("#head2In .gnb .g2").mouseover(function(){
    $(this).find(".sub").stop().slideDown(300)
}).mouseout(function(){
    $(this).find(".sub").stop().slideUp(300)
})
$("#head2In .gnb .g4").mouseover(function(){
    $(this).find(".sub").stop().slideDown(300)
}).mouseout(function(){
    $(this).find(".sub").stop().slideUp(300)
})


$('.slider ul').bxSlider({
            auto: true,
            autoControls: true,
            stopAutoOnClick: true,
            pager: true,
            autoControlsCombine:true, //재생, 정지 버튼 교차 출력
            pause : 4000, //자동재생시 이미지 움직일 시간
            speed : 2000, //슬라이더가 움직이는 속도
        })

$('.card ul').bxSlider({
            auto: true,
            autoControls: true,
            stopAutoOnClick: true,
            pager: true,
            controls : false,
            autoControlsCombine:true, //재생, 정지 버튼 교차 출력
            pause : 2000, //자동재생시 이미지 움직일 시간
            speed : 1000, //슬라이더가 움직이는 속도
        })
