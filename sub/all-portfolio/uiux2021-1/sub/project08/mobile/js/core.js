$('.mainSlider ul').bxSlider({
            auto: true,
            autoControls: true,
            stopAutoOnClick: true,
            pager: true,
            autoControlsCombine:true,
            pause : 2500,
            speed : 1500,
        })
$(function(){
		$(".openMenu").click(function(){
			$(".sideBg").fadeIn(300)
			$("#side").animate({left:0},(300))
			})
			$("#side .close, .sideBg").click(function(){
			$(".sideBg").fadeOut(300)
			$("#side").animate({left:-240},(300))	
			})
			
			$("#side .gnb li .m").click(function(){
				var tg = $(this).siblings(".sub")
				var dis = tg.css("display")
				if(dis=="block"){
					$(this).removeClass("on")
					tg.slideUp(300)
					}
				if(dis=="none"){
					$("#side .gnb li .m").removeClass("on")
					$(this).addClass("on")
					$("#side .gnb li .sub").slideUp(300)
					tg.slideDown(300)
				}
				return false
		})
		})