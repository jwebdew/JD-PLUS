// fullpage
$(function(){
    var myFullpage = new fullpage('#fullpage', {
        responsiveWidth: 1024,
        navigation: true,
        navigationPosition: 'right',
        hybrid: true,
        slidesNavigation: true
    });
});
// main_visual
$(function(){
    function getDistance(x1, y1, x2, y2){
        return Math.sqrt( (x1-x2) * (x1-x2) + (y1-y2) * (y1-y2) ); //Distance.
    };
    
    //Function:
    function update(e){
    //Window center (array):
    var winCenter = [$(window).width()/2, $(window).height()/2]; // => winCenter[width, height];
    //Cursor position (array):
    var cursorPos = [e.clientX, e.clientY]; //cursorPos[left, top];
    //Find SVG 'viewBox' shorter side (circle size fit the shorter size of the 'viewBox'):
    var viewBoxSize = Math.min(winCenter[0], winCenter[1]);
    //Distance between circle center and mouse position (px):
    var distancePx = getDistance(winCenter[0], winCenter[1], cursorPos[0], cursorPos[1]);
    //Distance between circle center and mouse position (%):
    //Multiply by 100 to get the diameter or multiply by 50 to get the radius.
    var distancePercent = parseInt( (distancePx/viewBoxSize) * 50 );
    //Circle radius attribute update:
    circle.setAttribute("r", distancePercent);
    //Debug:
    // console.log(distancePercent);
    };
    
    //Event handler:
    $(window).mousemove(function(e){
    update(e);
    });
});
// hamburger menu
$(function(){
    $('.h_btn').click(function(){
        $('.h_btn').toggleClass('open');
        $('.h_menu').toggleClass('open')
    });
    $('.h_main > li').click(function(){
        $('.h_btn').removeClass('open');
        $('.h_menu').removeClass('open')
    });
});

// Works ; tab_menu
$(function(){
    $('.works_tab li').mouseover(function(){
        $('.works_tab li').removeClass('on'); 
        $(this).addClass('on');
        $('.info li').removeClass('on');
        $('.info li').eq($(this).index()).addClass('on');
    });
});
