$(function(){
     // 메인비주얼_슬라이드
     $('.main_visual').slick({
        infinite: true,
        dots: true,
        autoplay : true, // 자동 스크롤
        speed: 300
    });
});

$(function() {
    // datepicker
    $("#datepicker1, #datepicker2").datepicker({
        dateFormat: 'yy/mm/dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });
});
$(function(){
    // pc_gnb : 메뉴싱글드롭다운
    $('.main > li').mouseover(function(){
        $(this).children('.sub').stop().slideDown();
        $(this).addClass('active');
    });
    $('.main > li').mouseleave(function(){
        $(this).children('.sub').stop().slideUp();
        $(this).removeClass('active');
    });
});
$(function(){
  $('.m_main > li > a').click(function(){
    if($(this).next().css('display') == 'none') {
        $('.m_main .sub').stop().slideUp();
        $(this).next().stop().slideDown();

        $('.m_main > li').removeClass('on');
        $(this).parent().addClass('on');
        // 클릭한 .m_main > li > a 기준 
        // 부모태그한테 class "on" 붙이기
        // 1차메뉴에 class명 on 붙여주기 -> 1차메뉴 클릭 시 컬러 바뀌게

    } else if ($(this).next().css('display') == 'block') {
        // 다시 1차메뉴 클릭 시 
        // display:block 되어 있는 2차메뉴 슬라이드 업
        $(this).next().stop().slideUp();
        $(this).parent().removeClass('on');
        // class명 on 지우기 -> 다시 컬러 돌아오게
    } 
    
    });

    // 햄버거메뉴 / 닫기 버튼 
    $('.xi-bars').click(function(){
        $('.mobile').animate({'left':'0px'}, 1000);
        $("html, body").css({overflow:'hidden'}).bind('touchmove');
    });
    $('.xi-close').click(function(){
        $('.mobile').animate({'left':'-100%'}, 1000);
        $("html, body").css({overflow:'inherit'});
    });
});

$(function(){
    // 객실 인원 수 증감
    $(document).ready(function(){
        $('.count_range input[count_range]').click(function(e){
            e.preventDefault();
            var type = $(this).attr('count_range');
            var $count = $(this).parent().children('input.count');
            var count_val = $count.val(); // min 1
            if(type=='m'){
                if(count_val<1){
                    return;
                }
                $count.val(parseInt(count_val)-1);
            }else if(type=='p'){
                $count.val(parseInt(count_val)+1);
            }
        });
    });
});
$(function(){
    // 객실 인원 수 슬라이드토글
    $('.xi-angle-down').click(function(){
        $('.count_range_wrap').stop().slideToggle();
    });
});

$(function(){
    //cont03 : 숙소 유형 슬라이드
    $('.accomodation').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    // infinite: true,
                    // dots: true
              }
            },
            {
                breakpoint: 600,
                settings: {
                    dots : true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
              }
        ]
    });
});