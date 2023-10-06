$(function(){
	$('.hamburger').click(function(){
		$(this).css('display', 'none')
		$('.menu').css('right', '0');
		$('.menu_close').css('display', 'block');
	});
	$('.menu_close').click(function(){
		$(this).css('display', 'none')
		$('.menu').css('right', '-100%');
		$('.hamburger').css('display', 'block');
	});
	$('.menu li a').click(function(){
		$('.menu').css('right', '-100%');
		$('.hamburger').css('display', 'block');
		$('.menu_close').css('display', 'none');
	});
    $('#fullpage').fullpage({
		autoScrolling:true,
		scrollHorizontally: true,
		scrollOverflow: true,
		slidesNavigation: true,
		
		anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
		afterLoad: function(origin, destination, direction){
			if(destination.index == 0){
				$('.section01').css({
					left : 0,
					opacity : 1
				});
			}
			else if(origin && origin.index == 0){
				$('.section01').css({
					left : -100 ,
					opacity : 0
				});
			};
			if(destination.index == 1){
				$('.section02').addClass('on');
			}
			else if(origin && origin.index == 1){
				$('.section02').removeClass('on');
			}
		},
		dragAndMove: true,
        
	});
});