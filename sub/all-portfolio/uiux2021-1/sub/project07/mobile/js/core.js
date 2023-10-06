$('.mainSlider ul').bxSlider({
            auto: true,
            autoControls: true,
            stopAutoOnClick: true,
            pager: true,
            autoControlsCombine:true,
            pause : 2500,
            speed : 1500,
        })
$(".openMenu").click(function(){
		$(".Mnbg").fadeIn(300)
		$(".Menu").animate({right:0},(300))
	})
$(".Mnbg, .closeMn").click(function(){
		$(".Mnbg").fadeOut(300)
		$(".Menu").animate({right:-200},(300))	
	})

$(".gnb .d1 .m1").click(function(){
	var dis = $(this).siblings(".depth2").css("display")
	if(dis=="block"){
			//만약에 변수dis의 값이 block과 같다면~
			//= 현재 화면상에 .sub가 보이고 있다면~
			// 1) .m모두를 선택해서 .on클래스 삭제
			// 2) .sub모두를 선택해서 안보이게 함.
			$(".gnb .d1 .m1").removeClass("on")
			$(".gnb .d1 .depth2").slideUp(500)
		}
	if(dis=="none"){
		// 만약에 변수 dis값이 none과 같을때~
		// = 현재 화면상에 .sub가 보이지 않을때~
		// 1) .m을 모두 선택 .on삭제
		// 2) 현재 클릭한 대상에게 .on 추가
		// 3) .sub모두를 선택해 사라지게 함
		// 4) 현재 클릭한 대상과 짝이되는 .sub보이게함.
		$(".gnb .d1 .m1").removeClass("on")
		$(this).addClass("on")
		$(".gnb .d1 .depth2").slideUp(500)
		$(this).siblings(".depth2").slideDown(500)
		}
		return false	
	})