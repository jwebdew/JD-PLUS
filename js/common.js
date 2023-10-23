$(function(){  
    $(window).mousemove(function(e){
        //마우스위치값 구하기
        //x축 e.pageX
        //y축 e.pageY
        let mouseX = e.pageX;
        let mouseY = e.pageY;
        // console.log(mouseX)
        // console.log(mouseY)
        $('.mouse').css({
            'top' : mouseY,
            'left' : mouseX,
             
        })

    });
    $('a').on({
        mouseenter: function(){
            $('.mouse').css({
                'transform' : 'scale(4) translateX(15px)',
                // 'background-color' : 'unset', 
                 
            })
        },
        mouseleave: function(){
            $('.mouse').css({
                'transform' : 'scale(1)',
                'background-color' : '#BFFF00',  

            })
        }
    });

    let menu = $('.menu_list li');
    let list = $('.list')

    menu.click(function(){
        menu.removeClass('on');
        $(this).addClass('on');

        list.removeClass('on');
        list.eq($(this).index()).addClass('on');
    })

    let topEvent =  $('.portfolio').offset().top - $(window).height();
    let study_resultTop = $('.study_result').offset().top;
    let portfolioTop = $('.portfolio').offset().top
    $(window).scroll(function(){
        let scrollBar = $(window).scrollTop();
        if(topEvent <= scrollBar && study_resultTop > scrollBar) {
            $('aside.top figure').addClass('on');
        }  else {
            $('aside.top figure').removeClass('on');
        }

        if(topEvent <= scrollBar) {    
            $('aside.top').addClass('on');
        } else {
            $('aside.top').removeClass('on');   
        }
    })

    $('aside.top').click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 2000)

    })
    
});//jquery end