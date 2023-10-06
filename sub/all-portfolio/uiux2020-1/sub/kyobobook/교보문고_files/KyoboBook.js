function SwitchMenu(LayerName, ClassName, objRow, imgName){
	if(document.getElementById){
	var el = document.getElementById(objRow);
	var im = document.getElementById(imgName);
	var ar = document.getElementById(LayerName).getElementsByTagName("span");
		if(el.style.display != "block") {
			for (var i=0; i<ar.length; i++){
				if (ar[i].className==ClassName)
				ar[i].style.display = "none";
			}
			el.style.display = "block";
			im.src = "images/Search/Btn_SearchCate02.gif";
		}else{
			el.style.display = "none";
			im.src = "images/Search/Btn_SearchCate01.gif";
		}
	}
}

// ??? ?? ????
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

var ns = (document.layers)? true:false;
var ie = (document.all)? true:false;

function show(id) {
	if (ns) document.layers[id].visibility = "visible";
  else if (ie) document.all[id].style.visibility = "visible";
}
function hide(id) {
	if (ns) document.layers[id].visibility = "hidden";
  else if (ie) document.all[id].style.visibility = "hidden";
}
function hide_all() {
	if (ns) document.layers.visibility = "hidden";
  else if (ie) document.all.style.visibility = "hidden";
}

/**
*  html ?? ?? id ??? object ??
*/
function getObject(objectId) { 
	// checkW3C DOM, then MSIE 4, then NN 4. 
	if(document.getElementById && document.getElementById(objectId)) { 
		return document.getElementById(objectId); 
	} else if (document.all && document.all(objectId)) { 
		return document.all(objectId); 
	} else if (document.layers && document.layers[objectId]) { 
		return document.layers[objectId]; 
	} else { 
		return false; 
	} 
}


function addCart(barcode, ejkGb, qty, saleGb) {
	if( typeof(barcode)=="undefined" || typeof(ejkGb)=="undefined" ){
		alert("????? ?????? ????? ?????.");
	} else {
		if( typeof(qty)=="undefined" ) qty = 1; 
		if( typeof(saleGb)=="undefined" ) saleGb = "A"; 
		//	bookitem : barcode | ejkGb | ?? | ??????(Y/[N]/[A:??])
		document.location.href="/cart/cartAdd.laf?bookitem="+barcode+"|"+ejkGb+"|"+qty+"|"+saleGb;
	}
}
//	우편번호검색
//	- param frm 은 팝업을 호출하는 페이지의 formname 이며 해당 form 에 zip1,zip2,address1 필드가 정의되어있어야한다.
//2011.08.31 혜은 - 새주소 추가 
function _pop_zipsearch(frm,zip1,zip2,address1,address2,address3){
	var url = "";
	if( typeof(frm) != "undefined" ){
		url += "?openerfrm=" + frm;
	}
	if( typeof(zip1) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "zip1=" + zip1;
	}
	if( typeof(zip2) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "zip2=" + zip2;
	}
	if( typeof(address1) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address1=" + address1;
	}
	if( typeof(address2) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address2=" + address2;
	}
	if( typeof(address3) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address3=" + address3;
	}
	do_open_popup("zipsearch", "/common/zipSearch.laf" + url, 0, 0, 350, 202, false, false, false, false, false);
}

// 주소 검색 - 2014.04.16 이정연
//	param frm 은 팝업을 호출하는 페이지의 formname 이며 해당 form 에 zip1,zip2,address1,address2, address3, address4 필드가 정의되어있어야한다.
function _pop_address_search(frm,zip1,zip2,address1,address2,address3,address4){
	var url = "";
	if( typeof(frm) != "undefined" ){
		url += "?openerfrm=" + frm;
	}
	if( typeof(zip1) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "zip1=" + zip1;
	}
	if( typeof(zip2) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "zip2=" + zip2;
	}
	if( typeof(address1) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address1=" + address1;
	}
	if( typeof(address2) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address2=" + address2;
	}
	if( typeof(address3) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address3=" + address3;
	}
	if( typeof(address4) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address4=" + address4;
	}
	do_open_popup("address_search", "/common/addressSearch.laf" + url, 0, 0, 613, 829, false, false, false, false, false);
}

//주소 검색 - 2016.07.22 김수호 생성, 도로명주소 팝업 개편(홍지애)
//param frm 은 팝업을 호출하는 페이지의 formname 이며 해당 form 에 zip1,zip2,address1,address2, address3, address4 필드가 정의되어있어야한다.
function _pop_address_search_renew(frm,zip1,zip2,address1,address2,address3,address4){
	var url = "";
	if( typeof(frm) != "undefined" ){
		url += "?openerfrm=" + frm;
	}
	if( typeof(zip1) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "zip1=" + zip1;
	}
	if( typeof(zip2) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "zip2=" + zip2;
	}
	if( typeof(address1) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address1=" + address1;
	}
	if( typeof(address2) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address2=" + address2;
	}
	if( typeof(address3) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address3=" + address3;
	}
	if( typeof(address4) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address4=" + address4;
	}
	do_open_popup("address_search", "/common/newAddressSearch.laf" + url, 0, 0, 605, 825, false, false, false, false, false);
}

//주소 검색 - 2016.07.22 김수호 생성, 도로명주소 팝업 개편(홍지애)-- 제휴사이트용
//param frm 은 팝업을 호출하는 페이지의 formname 이며 해당 form 에 zip1,zip2,address1,address2, address3, address4 필드가 정의되어있어야한다.
function _pop_address_search_renew_iframe(frm,zip1,zip2,address1,address2,address3,address4){
	var url = "";
	if( typeof(frm) != "undefined" ){
		url += "?openerfrm=" + frm;
	}
	if( typeof(zip1) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "zip1=" + zip1;
	}
	if( typeof(zip2) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "zip2=" + zip2;
	}
	if( typeof(address1) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address1=" + address1;
	}
	if( typeof(address2) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address2=" + address2;
	}
	if( typeof(address3) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address3=" + address3;
	}
	if( typeof(address4) != "undefined" ){
		url += url.length>0 ? "&" : "?";
		url += "address4=" + address4;
	}
	
	url += url.length>0 ? "&iframeysno=Y" : "?iframeysno=Y";
	
	do_open_popup("address_search", "/common/newAddressSearch.laf" + url, 0, 0, 605, 825, false, false, false, false, false);
}

function do_open_popup(name, url, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable)
{
	toolbar_str = toolbar ? 'yes' : 'no';
	menubar_str = menubar ? 'yes' : 'no';
	statusbar_str = statusbar||typeof(scrollbar)=='undefined' ? 'yes' : 'no';
	scrollbar_str = scrollbar||typeof(scrollbar)=='undefined' ? 'yes' : 'no';
	resizable_str = resizable||typeof(scrollbar)=='undefined' ? 'yes' : 'no';
	width = width ? width : screen.width / 3 * 2;
	height = height ? height : screen.height / 2;
	top	= top > 0 ? top : (screen.height - height) / 2;
	left  = left > 0 ? left : (screen.width - width) / 2;
	window.open(url, name, 'left='+left+',top='+top+',width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
}

//주소 검색 - 2016.08.30 양현호 생성, 도로명주소 팝업  임직원우편번호 연동
//param frm 은 팝업을 호출하는 페이지의 formname 이며 해당 from에 zip, zip1,zip2,address1,address2, address3, address4 필드가 정의되어있어야한다.
//zip 객체는 display로 사용
function _pop_address_search_employee(frm, zip, zip1, zip2, address1, address2, address3, address4) {
	var params = "";
	if( typeof(frm) != "undefined" ){
		params += "?openerfrm=" + frm;
	}
	if( typeof(zip) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "zip=" + zip;
	}
	if( typeof(zip1) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "zip1=" + zip1;
	}
	if( typeof(zip2) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "zip2=" + zip2;
	}
	if( typeof(address1) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "address1=" + address1;
	}
	if( typeof(address2) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "address2=" + address2;
	}
	if( typeof(address3) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "address3=" + address3;
	}
	if( typeof(address4) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "address4=" + address4;
	}
	// 공통 주소찾기 팝업에서 document.domain 설정을 위한 파라미터
	//params += params.length>0 ? "&" : "?";
	//params += "domainYn=Y";
	
	var popUrl = "/common/newAddressSearch.laf"+params;
	do_open_popup("address_search", popUrl, 0, 0, 605, 825, false, false, false, false, false);
}

//주소 검색 - 2016.08.30 양현호 생성, 도로명주소 팝업 꽃피는 아침마을 연동
//param frm 은 팝업을 호출하는 페이지의 formname 이며 해당 from에 zip, zip1,zip2,address1,address2, address3, address4 필드가 정의되어있어야한다.
//zip 객체는 display로 사용
function _pop_address_search_cconma(frm, zip, zip1, zip2, address1, address2, address3, address4) {
	var params = "";
	if( typeof(frm) != "undefined" ){
		params += "?openerfrm=" + frm;
	}
	if( typeof(zip) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "zip=" + zip;
	}
	if( typeof(zip1) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "zip1=" + zip1;
	}
	if( typeof(zip2) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "zip2=" + zip2;
	}
	if( typeof(address1) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "address1=" + address1;
	}
	if( typeof(address2) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "address2=" + address2;
	}
	if( typeof(address3) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "address3=" + address3;
	}
	if( typeof(address4) != "undefined" ){
		params += params.length>0 ? "&" : "?";
		params += "address4=" + address4;
	}
	// 공통 주소찾기 팝업에서 document.domain 설정을 위한 파라미터
	//params += params.length>0 ? "&" : "?";
	//params += "domainYn=Y";
	
	var popUrl = "/common/newAddressSearch.laf"+params;
	do_open_popup("address_search", popUrl, 0, 0, 605, 825, false, false, false, false, false);
}


/**
 * ??? ???
 * - body ? ? table ? width ? ???? ???? ???? ????.
 */
function popup_init(dbg) {
	try {
		var el = getObject("popup");
		if( el ){
			self.resizeTo(el.offsetWidth+10, el.offsetHeight+29);
			if(typeof(dbg)!="undefined" && dbg)
				alert((el.offsetWidth+10)+","+(el.offsetHeight+29));
		} else {
			el = document.getElementsByTagName("TABLE")[0];
			self.resizeTo(el.offsetWidth+10, el.offsetHeight+29);
		}
	} catch(e) {
		alert(e.message);
	}
}

/**
* ???? ?? tab ? ????? ????.
* @param idkey	-html ?? object idkey
* @param attr	-?? object ? attribute ?
* @param val	-attribute ?? ??? ?.
* @return null
*/
function do_change_tab(idkey,attr,val){
	try{
		var trobj = _get_elements_by_id(idkey);
		if( typeof(trobj.length) == 'undefined'){
			if(trobj.getAttribute(attr)!=null)
			_el_active( trobj, eval("/^("+trobj.getAttribute(attr)+")$/"+".test(val)") );
		} else {
			for(i=0;i<trobj.length;i++){
				if(trobj[i].getAttribute(attr)!=null)
					_el_active( trobj[i], eval("/^("+trobj[i].getAttribute(attr)+")$/"+".test(val)") );
			}
		}
	} catch(e){
		alert(e.message);
	}
}

function _get_elements_by_id(idkey){
	if (document.all){
		return document.all[idkey];
	} else {
		var _return = new Array();
		var tagarray = new Array('TABLE','TR','TD','SPAN','DIV');
		for(var i=0; i < tagarray.length; i++) {
			el = document.getElementsByTagName(tagarray[i]);
			if( typeof(el.length) == 'undefined'){
				if( el.getAttribute('ID') == idkey ) {
					_return[_return.length] = el;
				}
			} else {
				for(i0=0;i0<el.length;i0++) {
					if( el[i0].getAttribute('ID') == idkey ){
						_return[_return.length] = el[i0];
					}
				}
			}
		}
		return _return;
	}
}

function _el_active(el,active){
	try {
		el.style.display = active ? "" : "none";
		//el.style.visibility = active ? "visible" : "hidden";;
		//el.contentEditable = active;
		el.disabled = !active;
	} catch(e){}
}


/******************************************
 *	iframe ????
 ******************************************/
//	- iframe ?? ??????????
// mistyi edit - setTimeout ????
function open_iframe(name,oURL){
	var timeArray = new Array(200, 500, 1500, 3500, 7000, 12000, 20000);
	var obj = getObject(name);
	obj.src=oURL;
	obj.style.display='';
	//if( obj.getAttribute("resized") == null){
	for(var i=0; i < timeArray.length; i++) {
		setTimeout('resizeIframe(\''+name+'\')', timeArray[i]);
	}
		//obj.setAttribute("resized","true");
	//}
}

//	- iframe ?????? ????????
function resizeIframe(frameid){
	try{
		if (frameid=='') {
			return;
		}
		var currentfr=document.getElementById(frameid);
		if (currentfr && !window.opera){
			currentfr.style.display="block"
			if (currentfr.contentDocument && currentfr.contentDocument.body.offsetHeight) {//ns6 syntax
				currentfr.height = currentfr.contentDocument.body.offsetHeight; 
			}else if (currentfr.Document && currentfr.Document.body.scrollHeight) {//ie5+ syntax
				currentfr.height = currentfr.Document.body.scrollHeight;
			}
			/*
			if (currentfr.addEventListener){
				currentfr.addEventListener("load", readjustIframe, false);
			}else if (currentfr.attachEvent){
				currentfr.attachEvent("onload", readjustIframe);
			}*/
		}
	}catch(e){}
}

//	- iframe ???????????? ????
function readjustIframe(loadevt) {
	var crossevt=(window.event)? event : loadevt
	var iframeroot=(crossevt.currentTarget)? crossevt.currentTarget : crossevt.srcElement
	if (iframeroot) {
		resizeIframe(iframeroot.id);
	}
}

//	- iframe ???????? ???????????? ????
function resizeInIframe() {
	var timeArray = new Array(200, 500, 1500, 3500, 7000, 12000, 20000);
	for(var i=0; i < timeArray.length; i++) {
		setTimeout('resizeIn()', timeArray[i]);
	}
}

function resizeIn() {
	var heightDoc = document.body.scrollHeight;
	var widthDoc = document.body.scrollWidth;
	document.body.style.width = widthDoc;
	document.body.style.Height = heightDoc;
}

/******************************************
 *	????
 ******************************************/
//	????? ??
function only_number(){
	var c = window.event.keyCode;
	var e = window.event.srcElement;
	var s = window.event.shiftKey;
	if( s && !(c==9) ){
		window.event.returnValue = false;
		return false;
	}
	var isNumber    = (c >= 48 && c <= 57) || (c >= 96 && c <=105);
	var isDirection = (c >= 37 && c <= 40) || (c ==  9 && window.event.shiftKey) || (c ==  9);
	var isDelete    = (c ==  8 || c == 46);
	var isEnter     = (c == 13);

	window.event.returnValue = isNumber || isDirection || isDelete || isEnter;
	return isNumber || isDirection || isDelete || isEnter;
}

function moneyFormats(num){
	num = new String(num);
	num = num.replace(/,/gi,"");
	return moneyFormatChange(num);
}

function moneyFormatChange(num){
var sign="";
	if(isNaN(num)){
		alert("??? ??? ? ????.");
		return 0;
	}
	if(num == 0)
 	return num;
	if(num < 0){
  	num= num*(-1);
    sign = "-";
  } else {
    num = num*1;
  }
	var temp = "";
  var pos = 3;
	num = new String(num)
  num_len = num.length;
	while(num_len>0) {
  	num_len = num_len-pos;
		if(num_len < 0){
			pos = num_len+pos;
			num_len = 0;
		}
    temp = ","+ num.substr(num_len,pos) + temp;
  }
	return sign + temp.substr(1);
}

function _check_words_length(tgt,max){
	var el = window.event.srcElement;
	if( typeof(max)!="undefined" && el.value.length >= parseInt(max)){
		alert(max+"자 까지만 입력하실 수 있습니다");
		el.value = el.value.substring(0,max-1);
	}
	tgt.innerText = el.value.length;
}


/******************************************
 *	For Form Check
 ******************************************/
// mistyi edit (2006.03.30) - error when check box is only one...
function formAllCheck(checkobj, forms, targetName) {
	var chk = checkobj.checked;
	if (forms.elements.length==null) {
		if(forms.elements.name == targetName) {
			if(forms.elements.type == 'checkbox') {
				forms.elements.checked = chk;
			}
		}
	}else{
		for( var i=0; i<forms.elements.length; i++) {
			if(forms.elements[i].name == targetName) {
				if(forms.elements[i].type == 'checkbox') {
					forms.elements[i].checked = chk;
				}
			}
		}
	}
	eval("var checkName = forms." + checkobj.name + ";");
	if (typeof(checkName) == "undefined") {
		checkobj.checked = chk;
	}else{
		for( var i=0; i<checkName.length; i++) {
			if(checkName[i].type == 'checkbox') {
				checkName[i].checked = chk;
			}
		}
	}
}

function formQtyChange(obj, changeQty){
	tmp = parseInt(obj.value) + parseInt(changeQty);
	if(tmp<1) {
		tmp = 1;
	}
    if (tmp>999) {
        tmp = 999
    }
	obj.value = tmp;
}
function getvaluebyindex(obj,idx){
    if( typeof(obj) != 'undefined'){
    	return typeof(obj.length) == 'undefined' ? obj.value : obj[idx].value;
    } else {
    	return null;
    }
}
function setvaluebyindex(obj,idx,val){
    if( typeof(obj) != 'undefined'){
    	var el = typeof(obj.length) == 'undefined' ? obj : obj[idx]; 
    	el.value = val;
    } else {
    	return null;
    }
}
//	- input type=radio 의 값 반환
function getvalueofradio(el){
	if( typeof(el)!='undefined' ){
		var ret = null;
		for(i=0;i<el.length;i++){
			if(el[i].checked){	ret = el[i].value;	break;	}
		}
		return ret;
	} else {
		alert(el+"이 정의되어있지 않습니다");
	}
}
//	- input type=radio 에 값으로 check
function setradiobyvalue(el,val){
	if( typeof(el)!='undefined' ){
		for(i=0;i<el.length;i++){
			el[i].checked = (el[i].value == val);
		}
	} else {
		alert(el+"이 정의되어있지 않습니다");
	}
}

// get image url from barcode or music_cd
// do not update image path
function getCoverImageUrl(barcode, music_cd) {
	var url = "";
	if (music_cd == null) {
		url="http://image.kyobobook.co.kr/images/book/medium/";
		url+=barcode.substring(10,13);
		url+="/m"+barcode+".jpg";
	}else{
		url="http://image.kyobobook.co.kr/images/music/midi/";
		url+=music_cd.substring(4,5)+music_cd.substring(3,4)+music_cd.substring(2,3)+music_cd.substring(1,2);
		url+="/"+music_cd+".jpg";
	}

	return url;
}

/** *****************************************
 * 쿠키관련 메소드 정의
 ****************************************** */
function getCookieVal (offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
	var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return getCookieVal (j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break; 
	}
	return null;
}

//  Function to create or update a cookie.
//    name - String object object containing the cookie name.
//    value - String object containing the cookie value.  May contain any valid string characters.
//    [expires] - Date object containing the expiration data of the cookie.  If omitted or null, expires the cookie at the end of the current session.
//    [path] - String object indicating the path for which the cookie is valid. If omitted or null, uses the path of the calling document.
//    [domain] - String object indicating the domain for which the cookie is valid.  If omitted or null, uses the domain of the calling document.
//    [secure] - Boolean (true/false) value indicating whether cookie transmission requires a secure channel (HTTPS).  
//
function SetCookie (name, value) {
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	document.cookie = name + "=" + escape (value) +
		((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
		((path == null) ? "" : ("; path=" + path)) +
		((domain == null) ? "" : ("; domain=" + domain)) +
		((secure == true) ? "; secure" : "");
	//alert(document.cookie);
}

function setCookie(name,value,expires,path,domain,secure) {
	document.cookie = name + '=' + escape(value) + ';'
	+ ((expires) ? ' expires=' + expires.toGMTString() + ';' : '')
	+ ((path) ? ' path=' + path + ';' : '')
	+ ((domain) ? ' domain=' + domain + ';' : '')
	+ ((secure) ? ' secure' + ';' : '');
}

function DeleteCookie (name) {
	var exp = new Date();
	exp.setTime (exp.getTime() - 1);  // This cookie is history
	var cval = GetCookie (name);
	document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

// String 에서 양쪽공백문자 제거 script

function Trim(strSrc) 
{
	var strLTrim = strSrc.replace(/^\s+/,'');
	return strLTrim.replace(/\s+$/,'');
}


//주민등록번호 체크
function isJuminNum(jumin1, jumin2){
 var tot=0, result=0, re=0, se_arg=0;
 var chk_num="";
 var jumin = jumin1 + jumin2;

 if (jumin.length != 13){
	 return false;
 }else{
	 for (var i=0; i <12; i++){
		 if (isNaN(jumin.substr(i, 1)))
			 return false;
		 se_arg = i;
		 if (i >= 8)
			 se_arg = i - 8;
		 tot = tot + Number(jumin.substr(i, 1)) * (se_arg + 2)
  }
  if (chk_num != "err"){
	  re = tot % 11;
	  result = 11 - re;
	  if (result >= 10) result = result - 10;
	  if (result != Number(jumin.substr(12, 1))) return false;
	  if ((Number(jumin.substr(6, 1)) < 1) || (Number(jumin.substr(6, 1)) > 4)) return false;
  }
 }
 return true;
}

// 재외국인 번호 체크
/*
function isFgnNo(fgnno){
	var sum=0;
    var odd=0;
    buf = new Array(13);
    try{
		for(i=0; i<13; i++){
			buf[i]=parseInt(fgnno.charAt(i));
		}
        odd = buf[7]*10 + buf[8];
		if(odd%2 != 0){
			return  false;
		}
        if((buf[11]!=6) && (buf[11]!=7) && (buf[11]!=8) && (buf[11]!=9)){
			return false;
		}
        multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
        for(i=0, sum=0; i<12; i++){
			sum +=  (buf[i] *= multipliers[i]);
        }
        sum = 11 - (sum%11);
        if(sum >= 10){
			sum -= 10;
        }
        sum += 2;
        if(sum >= 10){
            sum -= 10;
        }
        if(sum != buf[12]){
            return  false
        }
        return true;
    }catch(e){
        return false;
    }
}
*/

//2012.11.01 이주희(외국인등록번호 체크함수 변경)
function isFgnNo(rrn){
	var sum = 0;  
     if (rrn.length != 13) {  
         return false;  
     }  

     else if (rrn.substr(6, 1) != 5 && rrn.substr(6, 1) != 6 && rrn.substr(6, 1) != 7 && rrn.substr(6, 1) != 8) {  
         return false;  
     }  

     if (Number(rrn.substr(7, 2)) % 2 != 0) {  
         return false;  
     }  

     for (var i = 0; i < 12; i++) {  
         sum += Number(rrn.substr(i, 1)) * ((i % 8) + 2);  
     }  

     if ((((11 - (sum % 11)) % 10 + 2) % 10) == Number(rrn.substr(12, 1))) {  
         return true;  
     }  

     return false;  
}

// 사업자등록번호 체크
function check_busino(vencod){

	vencod = vencod.substr(0,3) + vencod.substr(4,2) + vencod.substr(7);

    var sum = 0;
    var getlist = new Array(10);
    var chkvalue =new Array("1","3","7","1","3","7","1","3","5");
    try{
        for(var i=0; i<10; i++){
            getlist[i] = vencod.substring(i, i+1);
        }
        for(var i=0; i<9; i++){
            sum += getlist[i]*chkvalue[i];
        }
        sum = sum + parseInt((getlist[8]*5)/10);
        sidliy = sum % 10;
        sidchk = 0;
        if(sidliy != 0){
            sidchk = 10 - sidliy;
        }else{
            sidchk = 0;
        }
        if(sidchk != getlist[9]){
            return false;
        }
        return true;
    }catch(e){
        return false;
    }
}

// trim
String.prototype.trim = function()
{
	a = this
	var search = 0
	while ( a.charAt(search) == " "){
		search = search + 1
	}
	a = a.substring(search, (a.length))
	search = a.length - 1
	while (a.charAt(search) ==" ") {
		search = search - 1
	}
	return a.substring(0, search + 1)
}

function addBookmark(bUrl, bTitle) {
	if (document.all) {
		window.external.AddFavorite(bUrl,bTitle)
	}
}

// 출판사 CI 이미지 없을 때 보여주는 NoImage 이미지 
function noPubCiImage(obj){
	obj.src = "http://image.kyobobook.co.kr/newimages/apps/b2b_academy/common/noimage_publish.gif";
}
// 출판사 기타 이미지 없을 때 보여주는 NoImage 이미지 
function noPubEtcImage(obj){
	obj.src = "http://image.kyobobook.co.kr/newimages/apps/b2b_academy/common/noimage_publish02.gif";
}

// 출판사 CI 이미지 없을 때 보여주는 NoImage 이미지 (B2C)
function noPublishImg(obj){
	obj.src = "http://image.kyobobook.co.kr/newimages/apps/b2c/coupon/NoImage.gif";
}