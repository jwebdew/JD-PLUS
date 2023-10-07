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
            'left' : mouseX
        })

    });
    $('a').on({
        mouseenter: function(){
            $('.mouse').css({
                'transform' : 'scale(2) translateX(10px)', 
            })
        },
        mouseleave: function(){
            $('.mouse').css({
                'transform' : 'scale(1)'
            })
        }
    })

});//jquery end