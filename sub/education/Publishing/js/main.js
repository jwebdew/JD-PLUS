$(function () { 
    //onkeyup() 사용자가 키보드 눌렀다가 땠을 때
    let searchBox = document.querySelector('#search')
    function filter() {
        let search = document.getElementById("search").value;
        let listInner = document.getElementsByClassName("item");

        for (let i = 0; i < listInner.length; i++) {
            city = listInner[i].getElementsByTagName("h4");
            country = listInner[i].getElementsByTagName("p");
            if (city[0].innerHTML.indexOf(search) != -1 ||
                country[0].innerHTML.indexOf(search) != -1
            ) {
                listInner[i].style.display = 'block'
            } else {
                listInner[i].style.display = 'none'
            }
            console.log(listInner[i])
        }
    }
    searchBox.onkeyup = function () {
        filter()

    }

    //탭메뉴 .content_menu
    const contentMenu = $('.content_menu li');
    let content = $('.work_list');

    const contentMenuCate = $('.content_menu__category li');
    let contentList = $('.work_list.on > .list')

    contentMenu.click(function(){
        contentMenu.removeClass('on')
        $(this).addClass('on');

        content.removeClass('on')
        content.eq($(this).index()).addClass('on')

        
        // contentMenuCate.removeClass('on')
        // contentMenuCate.eq(0).addClass('on')
    })

    //javascript/jquery메뉴의 카테고리 메뉴
    contentMenuCate.click(function(){
        contentMenuCate.removeClass('on')
        $(this).addClass('on');

        contentList.removeClass('on')
        contentList.eq($(this).index()).addClass('on')
    })

    const itemNum = $('.page');
    itemNum.text($('.work_list.on > .list.on .item').length);
   
    //console.log( $('.work_list.on > .list .item').length)

    //iframe popup
   /*  let listItem = $('.itemWrap > a'); 
    let num = $('.itemWrap .num');
    let popup = $('#numList');
    
    listItem.click(function(){ 
        
        let thisnum = $(this).find(num).text();
        console.log(thisnum)
        popup.addClass('on')

        //클릭한 번호와 동일한 html파일 열기
        //window.open('sub/vol' + thisnum + '.jpg', 'popup01', 'width=1000, height=500') 
    }) */

    let archiveBtn = $('.itemWrap__btn-pdf');
    let archive = $('.itemWrap__archive');

    archiveBtn.click(function(){
        $(this).find(archive).css({
            'display' : 'block'
        });
        $('body').addClass('itemWrap__archive_on');
    })

    /* mouseup : 마우스 누르고 있는 상태에서 뗐을 경우 */
    $(window).mouseup(function(){
        archive.css({
            'display' : 'none'
        });
        $('body').removeClass('itemWrap__archive_on');

    })
});//jquery end

