$(function(){
    $(window).scroll(function(){
        $('.cont01_in').each(function(){
            //each : 반복문 => 선택한요소를 찾아서 반복실행

            //스크롤 수직 값 $(window).scrollTop()
            //보여지는 화면의 높이 값 $(window).height();

            //문서의 높이 값 $('.title').height();
            //브라우저 시작점에서 부터 문서가 떨어진 높아값 $('.title).offset().top; 

            var scroll_window = $(window).scrollTop() + $(window).height();
            //var scroll_window = 스크롤 수직 값 + 보여지는 화면의 높이 값
            var scroll_object = $('.cont01_in').offset().top + $('.cont01_in').height();
            //var scroll_object = 시작좀에서 부터 문서가 떨어진 높이값 + 문서가 가지고 있는 높이값 

            console.log(scroll_window);
            console.log(scroll_object);

            if(scroll_window >= scroll_object) {
                $(this).animate({'opacity' : '1'});
                $('.cont01_in > p').animate({'opacity':'1'}, 800);
                $('.cont01_in > div').delay(500).animate({'opacity':'1'}, 800);
                /* $('.cont01 dl:nth-child(3)').delay(1000).animate({'opacity':'1'}, 800);
                $('.cont01 dl:nth-child(4)').delay(1500).animate({'opacity':'1'}, 800);
                $('.cont01 dl:nth-child(5)').delay(2000).animate({'opacity':'1'}, 800); */
            }
        });
    });
});