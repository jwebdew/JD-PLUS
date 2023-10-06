window.onload = function () {
    //course onmouseenter image change
    let course = document.querySelector('.course');
    let courseList = course.querySelectorAll('.lib_wrap div');
    let courseListImg = course.querySelector('.course .lib img')

    for (let i = 0; i < courseList.length; i++) {
        let imgNum = i + 1;
        courseList[i].onmouseenter = function () { 
            courseListImg.src = 'img/webcourse_swiper' + imgNum + '.jpg';
        }//
    }
 

    var swiper = new Swiper(".courseSlide", {
        slidesPerView: 4,
        spaceBetween: 10, 
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          speed:1500, //속도
     
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4.5,
                spaceBetween: 24,
            },
        },
    });//swiper end

    //courseSlide tabMenu 
    let courseBtn = course.querySelectorAll('.tab_menu li');
    let courseSlideCont = course.querySelectorAll('.courseSlide');
    
    for(let i = 0; i < courseBtn.length; i++){
        courseBtn[i].onclick = function(){
            courseBtn.forEach(function(index){
                index.classList.remove('on')
            });
            courseBtn[i].classList.add('on');

            courseSlideCont.forEach(function(index){
                index.classList.remove('on')
            });
            courseSlideCont[i].classList.add('on');

        }//click
    }


    //data_inner_menu 버튼 hover스타일 변화
    let dataMenuList = document.querySelector('.data_inner_menu');
    let dataMenu = dataMenuList.querySelectorAll('li');
    for(let i = 0; i < dataMenu.length; i++) {
        dataMenu[i].onmouseenter = function(){
            dataMenu.forEach(function(index){
                index.style.opacity = '0.3'
            })
            dataMenu[i].style.opacity = 1;
            // dataMenu[i].style.backgroundColor = '#BFFF00'
        }
        dataMenuList.onmouseleave = function(){
            dataMenu.forEach(function(index){
                index.style.opacity = '1'
            })
        }
    }


}//end