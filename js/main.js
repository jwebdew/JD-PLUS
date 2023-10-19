$(function () {
  //course onmouseenter image change
  let course = document.querySelector(".course");
  let courseList = course.querySelectorAll(".lib_wrap div");
  let courseListImg = course.querySelector(".course .lib img");

  for (let i = 0; i < courseList.length; i++) {
    let imgNum = i + 1;
    courseList[i].onmouseenter = function () {
      courseListImg.src = "img/webcourse_swiper" + imgNum + ".jpg";
    }; //
  }

  var swiper = new Swiper(".courseSlide", {
    slidesPerView: 4,
    spaceBetween: 10,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 1500, //속도

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
  }); //swiper end

  //courseSlide tabMenu
  let courseBtn = course.querySelectorAll(".tab_menu li");
  let courseSlideCont = course.querySelectorAll(".courseSlide");

  for (let i = 0; i < courseBtn.length; i++) {
    courseBtn[i].onclick = function () {
      courseBtn.forEach(function (index) {
        index.classList.remove("on");
      });
      courseBtn[i].classList.add("on");

      courseSlideCont.forEach(function (index) {
        index.classList.remove("on");
      });
      courseSlideCont[i].classList.add("on");
    }; //click
  }

  //data_inner_menu 버튼 hover스타일 변화
  let dataMenuList = document.querySelector(".data_inner_menu");
  let dataMenu = dataMenuList.querySelectorAll("li");
  for (let i = 0; i < dataMenu.length; i++) {
    dataMenu[i].onmouseenter = function () {
      dataMenu.forEach(function (index) {
        index.style.opacity = "0.3";
      });
      dataMenu[i].style.opacity = 1;
      // dataMenu[i].style.backgroundColor = '#BFFF00'
    };
    dataMenuList.onmouseleave = function () {
      dataMenu.forEach(function (index) {
        index.style.opacity = "1";
      });
    };
  }

  $(window).mousemove(function (e) {
    //마우스위치값 구하기
    //x축 e.pageX
    //y축 e.pageY
    let mouseX = e.pageX;
    let mouseY = e.pageY;
    // console.log(mouseX)
    // console.log(mouseY)
    $(".mouse").css({
      top: mouseY,
      left: mouseX,
    });
  });

  // .study_result.list 의 전체 너비(가로값) 구하기
  let studyResult = $(".study_result .list");
  let itemWidth = $(".study_result .list .item").length;

  let studyResultWidth = studyResult.width() * itemWidth;
  // console.log(studyResultWidth)
  studyResult.css({
    width: studyResultWidth,
  });

  $('.carouselTicker').carouselTicker({
    speed: 2,
    delay: 30,
    // reverse: true
 });

  /* study_result 슬라이드  */
  /* let studyResult = $(".study_result .list");
  let itemWidth = $(".study_result .list .item").length;

  let studyResultWidth = studyResult.width() * itemWidth;
  // console.log(studyResultWidth)
  studyResult.css({
    width: studyResultWidth,
  });

  function studyResultSlid(){
    studyResult.animate(
        {
          left: "-350px",
        },
        4000,
        "linear",
        function () {
          studyResult.css({
            left: "0",
          });
          //마지막slide뒤에 첫번째 slide추가
          //insertAter() : 요소뒤에 추가
          $(".study_result .list .item:first-child").insertAfter(
            ".study_result .list .item:last-child"
          );
        }
      );
  } 

  let itemSlide = setInterval(studyResultSlid, 4000)

  // clearInterval(refreshIntervalId);
  
  studyResultSlid()
  function stop()  {
    clearInterval(itemSlide);
  }
  studyResult.on('mouseenter', function(){ 
    clearInterval(itemSlide);
  });

  studyResult.mouseleave(function(){ 
    studyResultSlid()
    itemSlide = setInterval(studyResultSlid, 4000);
  }); */
}); //jquery end
