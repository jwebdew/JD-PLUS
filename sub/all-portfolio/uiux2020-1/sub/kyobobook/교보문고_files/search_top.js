// 상세버튼
function goCondition(val)
{
	var searchMain ;
	var sCategory ;
	var sUrl ;
	var orderClick = "";
 
	// 상단, 하단 구분
	if(val == "t") {
		sCategory = document.searchTop.searchCategory.value ;
		orderClick = "LJQ";
	} else {
		sCategory = document.searchBot.searchCategory.value ;
		orderClick = "LJS";
	}
	if (sCategory == "ENG") {
			sUrl ="/search/sub/SearchEngbookCondition.jsp";
	} else if (sCategory == "MUC") {
			sUrl ="/search/sub/SearchMusicClassicCond.jsp";
	} else if (sCategory == "DVD") {
			sUrl ="/search/sub/SearchDvdCondition.jsp";
	} else if (sCategory == "GFT") {
			sUrl ="/search/sub/SearchGiftCondition.jsp";
	} else if (sCategory == "UMI") {
			sUrl ="/search/sub/SearchEngpaperCondition.jsp";
	}else  if (sCategory == "DUM") {
			sUrl ="/search/sub/SearchKorpaperCondition.jsp";
	}else{
			sUrl ="/search/sub/SearchKorbookCondition.jsp";
			sCategory = "KOR";
	}
	
	sUrl = sUrl + "?Kc=SEHHETdetailsearch";
	
	if (orderClick != ""){
		sUrl = sUrl + "&orderClick=" + orderClick;
	}

	document.searchTop.vPtotalTotcnt.value = "";
	document.searchTop.vPkorBookTotcnt.value = "";
	document.searchTop.vPengBookTotcnt.value = "";
	document.searchTop.vPmusicTotcnt.value = "";
	document.searchTop.vPdvdTotcnt.value = "";
	document.searchTop.vPgiftTotcnt.value = "";
	document.searchTop.vPdigitalTotcnt.value = "";
	document.searchTop.vPusedTotcnt.value = "";
	document.searchTop.vPreviewTotcnt.value = "";
	document.searchTop.vPqaTotcnt.value = "";
	document.searchTop.vPbooknewsTotcnt.value = "";
	document.searchTop.vPcategoryTotcnt.value = "";
	document.searchTop.vPstrKeyWord.value = "";

	document.searchTop.vPstrCategory.value = sCategory;
	document.searchTop.action = sUrl;
	document.searchTop.submit();
}

function goCate(val){
	
	document.searchTop.eventurl.value = "";
	// document.searchTop.vPcateSearch.value = "1";
	/*  document.searchTop.vPtotalcnt.value    =document.searchFrm.vPtotalcnt.value;
	document.searchTop.vPkorcnt.value    =document.searchFrm.vPkorcnt.value;
	document.searchTop.vPengcnt.value    =document.searchFrm.vPengcnt.value;
	document.searchTop.vPmuccnt.value    =document.searchFrm.vPmuccnt.value;
	document.searchTop.vPdvdcnt.value    =document.searchFrm.vPdvdcnt.value;
	document.searchTop.vPgiftcnt.value    =document.searchFrm.vPgiftcnt.value;
	document.searchTop.vPdigitcnt.value    =document.searchFrm.vPdigitcnt.value;*/
	
	document.searchFrm.vPviewOption.value = "";
	document.searchFrm.vPviewSearch.value = "";
	document.searchFrm.vPejkGB.value = "EBK";
	
	var category = document.searchTop.vPstrCategory.value;
	if (category == 'KOR' || category == 'TOT' || category == 'ENG' || category == 'MUC' || category == 'DVD' || category == 'GFT' || category == 'DIG'){
		document.searchFrm.vUCateFirstName.value = "";
		document.searchFrm.vUCateSecondName.value = "";
		document.searchFrm.cateClassCode1.value = "";
		document.searchFrm.cateClassCode1.value = "";
	}
	
	if(val =="BOD")document.searchFrm.orderClick.value ="LFB";
	
	//멀티그룹바이 값을 초기화 시켜준다.
	if (category == 'KOR' || category == 'TOT'){
		document.searchFrm.vUMultilinkClassID.value = "";
		document.searchFrm.vUTempMultiID.value = "";
		document.searchFrm.vUMultiCateSecondName.value = "";
		document.searchFrm.vUMultiCateFirstName.value = "";
		document.searchFrm.vUMultiCateThirdName.value = "";
	}
	if( document.searchTop.searchKeyword.value == "" && document.searchFrm.vPstrKeyWord.value != "") {
		document.searchTop.searchKeyword.value = document.searchFrm.vPstrKeyWord.value;
	}
	
	/*var submitFlag = "false";
	var frmMain = document.searchFrm;
	if(val == "TOT" && ( frmMain.vPtotalTotcnt.value != "0" ||  frmMain.vPusedTotcnt.value != "0" ||  frmMain.vPreviewTotcnt.value != "0"  ||  frmMain.vPqaTotcnt.value != "0"  ||  frmMain.vPbooknewsTotcnt.value != "0"  ||  frmMain.vPcategoryTotcnt.value != "0" )) {
		submitFlag = "true";
	}else if(val == "KOR" && frmMain.vPkorBookTotcnt.value != "0") {
		submitFlag = "true";
	}else if(val == "ENG" && frmMain.vPengBookTotcnt.value != "0") {
		submitFlag = "true";
	}else if(val == "MUC" && frmMain.vPmusicTotcnt.value != "0") {
		submitFlag = "true";
	}else if(val == "DVD" && frmMain.vPdvdTotcnt.value != "0") {
		submitFlag = "true";
	}else if(val == "GFT" && frmMain.vPgiftTotcnt.value != "0") {
		submitFlag = "true";
	}else if(val == "DIG" && frmMain.vPdigitalTotcnt.value != "0") {
		submitFlag = "true";
	}else if(val == "USE" && frmMain.vPusedTotcnt.value != "0") {
		submitFlag = "true";
	}else if(val == "REV" && frmMain.vPreviewTotcnt.value != "0") {
		submitFlag = "true";
	}else if(val == "IQA" && frmMain.vPqaTotcnt.value != "0") {
		submitFlag = "true";
	}else if(val == "BNS" && frmMain.vPbooknewsTotcnt.value != "0") {
		submitFlag = "true";
	}else if(val == "CAT" && frmMain.vPcategoryTotcnt.value != "0") {
		submitFlag = "true";
	}
	
	if(submitFlag == "true") {
		document.searchTop.searchCategory.value = val;
		document.searchFrm.vPplace.value ="mid";  //라디오버트에 의한 검색
		document.searchTop.submit();
	}*/
	
	document.searchTop.searchCategory.value = val;
	document.searchFrm.vPplace.value ="mid";
	document.searchTop.submit();
	return;
}


function goEbookCate(val){

	document.searchTop.eventurl.value = "";
	
	document.searchFrm.vPviewOption.value = "";
	document.searchFrm.vPviewSearch.value = "";
	document.searchFrm.vPejkGB.value = "EBK";
	document.searchTop.vPschSam.value = "1";
		
	var category = document.searchTop.vPstrCategory.value;
	if (category == 'KOR' || category == 'TOT' || category == 'ENG' || category == 'MUC' || category == 'DVD' || category == 'GFT' || category == 'DIG'){
		document.searchFrm.vUCateFirstName.value = "";
		document.searchFrm.vUCateSecondName.value = "";
		document.searchFrm.cateClassCode1.value = "";
		document.searchFrm.cateClassCode1.value = "";
	}
	
	if(val =="BOD")document.searchFrm.orderClick.value ="LFB";
	
	//멀티그룹바이 값을 초기화 시켜준다.
	if (category == 'KOR' || category == 'TOT'){
		document.searchFrm.vUMultilinkClassID.value = "";
		document.searchFrm.vUTempMultiID.value = "";
		document.searchFrm.vUMultiCateSecondName.value = "";
		document.searchFrm.vUMultiCateFirstName.value = "";
		document.searchFrm.vUMultiCateThirdName.value = "";
	}
	if( document.searchTop.searchKeyword.value == "" && document.searchFrm.vPstrKeyWord.value != "") {
		document.searchTop.searchKeyword.value = document.searchFrm.vPstrKeyWord.value;
	}
	
	document.searchTop.searchCategory.value = val;
	document.searchFrm.vPplace.value ="mid";
	document.searchTop.submit();
	return;
}

// 우측 검색 - 학술 더보기
function goPaper()
{
  var query =  document.searchTop.vPstrKeyWord.value;
  
  if( query == '' ){
  	query = document.searchFrm.vPcondKeyWord.value;
  }
  var urlm ="./SearchKorpaperMain.jsp?vPstrKeyWord="+query+"&vPcateGb=DUM&vPstrCategory=DUM";
  window.open(urlm);
}

// 검색의 발견 더보기
function goDiscoverMore() {  
	document.searchDiscover.submit();
}

// 우측 검색 - 수록곡 더보기
function goMoresongtrack(){
  var query =  document.searchTop.vPstrKeyWord.value;
  
  if( query == '' ){
   query = document.searchFrm.vPcondKeyWord.value;
  }
  var urlm ="/search/SearchTracksongMain.jsp?vPstrKeyWord="+query+"&vPcateGb=TRA&vPstrCategory=TRA"+"&vPplace=top&vPtagSearch=N";
  window.open(urlm);
}

// 우측 검색 - 목차내검색 더보기
function goMoreContents(){
  var query =  document.searchTop.vPstrKeyWord.value;
  if( query == '' ){
   query = document.searchFrm.vPcondKeyWord.value;
  }
  var urlm ="/search/SearchAgendaMain.jsp?vPstrKeyWord="+query+"&vPstrCategory=AGN"+"&vPplace=top&vPtagSearch=N";
  window.open(urlm);
}

// 우측 검색 - 연관상품검색 더보기
function goMoreRel(){
 document.searchRel.submit();
}

// byte 길이를 리턴해주는 함수
function getMsgSize(thisStrvalue){	
	var strLen = 0;

	for(i = 0; i < thisStrvalue.length;i++){
		if(escape(thisStrvalue.charAt(i)).length >= 4){
			strLen +=2;
		}
		else{
			if(escape(thisStrvalue.charAt(i)) !="%0D")
				strLen++;
		}
	}
		return strLen;
}

// 쿠키 설정
function setCookie(name,value,expires,path,domain,secure) {
	document.cookie = name + '=' + escape(value) + ';'
	+ ((expires) ? ' expires=' + expires.toGMTString() + ';' : '')
	+ ((path) ? ' path=' + path + ';' : '')
	+ ((domain) ? ' domain=' + domain + ';' : '')
	+ ((secure) ? ' secure' + ';' : '');
}


//------------------ MY 교보 레이어 시작 --------------//
function viewLayer() {
	document.getElementById("layer1").style.display = "inline";
}

function hideLayer() {
	document.getElementById("layer1").style.display = "none";
}

function showGuide() {
	document.getElementById("layer2").style.display = "inline";
}

function hideGuide() {
	document.getElementById("layer2").style.display = "none";
}

function layerMyKyobo_On(){
    //document.all['MyKyobo'].style.display = "";
    document.getElementById('MyKyobo').style.display = "";
}
function layerMyKyobo_Off(){
    //document.all['MyKyobo'].style.display = "none";
    document.getElementById('MyKyobo').style.display = "none";
}

function MoreLayer_On(){
    //document.all['MoreLayer'].style.display = "";
    document.getElementById('MoreLayer').style.display = "";
}
function MoreLayer_Off(){
    //document.all['MoreLayer'].style.display = "none";
    document.getElementById('MoreLayer').style.display = "none";
}

function MoreViewLayer_On(){
    //document.all['MoreViewLayer'].style.display = "";
    document.getElementById('MoreViewLayer').style.display = "";
}
function MoreViewLayer_Off(){
    //document.all['MoreViewLayer'].style.display = "none";
    document.getElementById('MoreViewLayer').style.display = "none";
}

function viewMyKyobo(obj){
	if(document.getElementById(obj).style.display == "block"){
		document.getElementById(obj).style.display = "none";
	}else{
		document.getElementById(obj).style.display = "block";
	}
}

//------------------ MY 교보 레이어 끝 --------------//

//searchKeyword에  focus 설정
function getNavigatorType(){
	if(navigator.appName=="Microsoft Internet Explorer")
		return 1;else if(navigator.appName=="Netscape")
		return 2;else
		return 0;
}

function setFocusSearchKeyword(event){

	var textbox;
	var _event;
	textbox=document.searchTop.searchKeyword;
	switch(getNavigatorType()){
		case 1:
			_event=window.event;
			node=_event.srcElement;
			nodeName=_event.srcElement.nodeName;
			break;
		case 2:
			_event=event;
			node=_event.target;
			nodeName=_event.target.nodeName;
			break;
		default:
			_event=window.event;
			node=_event.srcElement;
			nodeName=_event.srcElement.nodeName;
			break;
	}
	key=_event.keyCode;
	if(!(nodeName=="INPUT"||nodeName=="SELECT"||nodeName=="TEXTAREA"||(_event.ctrlKey&&key!=86))){
		if(key==8||(key>32&&key<41)||(key!=21&&key<32)||_event.altKey||key==91||key==92||_event.metaKey){}
		else if(key==32){
			if(_event.shiftKey){
				textbox.focus();
				textbox.style.imeMode="active";
				textbox.select();
				_event.returnValue=false;
			}
		}else if(key==21){
			scrollTo(0,0);textbox.focus();
			textbox.style.imeMode="active";
			textbox.select();
			_event.returnValue=false;
		}else if(node!=textbox){
			scrollTo(0,0);textbox.focus();
			textbox.style.imeMode="inactive";
			textbox.select();
		}
	}
	//try{document.getElementById("hFrame").contentWindow.eventHandler(event);}catch(e){}
}


function createAjaxObj()
{
	// IE이외
	if(window.XMLHttpRequest) {
		ajax = new XMLHttpRequest();
	// IE용
	} else if(window.ActiveXObject) {
		try {
			ajax = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return ajax;
}

function getAjaxData(serverURL, objID) 
{
	var ajax = createAjaxObj();
	ajax.open("GET", serverURL);
	ajax.onreadystatechange = function() 
	{
		if (ajax.readyState == 4 && ajax.status == 200) {
			var obj = document.getElementById(objID);
			var outText = ajax.responseText;
			obj.innerHTML = outText;
		}
	}
	ajax.send(null);
} 

function getAjaxData2(serverURL, objID) 
{
	
	var ajax = createAjaxObj();
	ajax.open("GET", serverURL);
	ajax.onreadystatechange = function() 
	{
		if (ajax.readyState == 4 && ajax.status == 200) {
			var obj = document.getElementById(objID);
			var outText = ajax.responseText;
			obj.innerHTML = outText;
			obj.style.display = "";
		}
	}
	ajax.send(null);
} 

//function getRelProductViewCk(serverURL, objID, cnt) {
function getRelProductViewCk(serverURL, objID) {
	var obj = document.getElementById(objID);
	
	if(obj.style.display == "none"){
		getAjaxData2(serverURL, objID);
	}else{
		obj.style.display = "none";
	}
}

// 신규 로그인 로직
function loginSSLPop() {
	window.open('/login/loginSSLPop.laf?popup=Y',"LoginPop", "width=737,height=420,left=100,top=100,status=yes");
}	

// 자동완성 로그인 체크
function autoSrcloginChk() {
	var mem_id = '<c:out value="${sessionScope._KIS_USER_SESSION.memid}"/>';

	if(mem_id == null || mem_id == '') {
		if(confirm('로그인이 필요한 상품입니다. 로그인하시겠습니까?')){
			loginSSLPop();
			return 'N';
		}
	}else{
		return 'Y';
	}
}	

function goAddCartChk(formname, target, idx){
	
	if( formname.indexCnt.length > 1 ){
		if(!formname.indexCnt[idx-1].checked){
			formname.indexCnt[idx-1].checked = "true";
		}
	}else{
		formname.indexCnt.checked = "true";
	}
	
	goAddCartList(formname, target);
}

function goAddCartDigiChk(formname, target, idx){
	
	var mem_id = '<c:out value="${sessionScope._KIS_USER_SESSION.memid}"/>';

	if(mem_id == null || mem_id == '') {
		if(confirm('로그인이 필요한 상품입니다. 로그인하시겠습니까?')){
			loginSSLPop();
		}
	}else{
		if(typeof(idx) != "undefined"){
			if( formname.indexCnt.length > 1 ){
				if(!formname.indexCnt[idx-1].checked){
					formname.indexCnt[idx-1].checked = "true";
				}
			}else{
				formname.indexCnt.checked = "true";
			}
		}
		goAddCartList(formname, target);
	}
}

// 보관함 담기
function goAddWishOneSrc(searchFrm, index){
	var mem_id = '<c:out value="${sessionScope._KIS_USER_SESSION.memid}"/>';

	if(mem_id == null || mem_id == '') {
		 loginSSLPop();
	}else{
		goAddWishOne(searchFrm, index);
	}
}

function goAddWishListSrc(searchFrm){
	var mem_id = '<c:out value="${sessionScope._KIS_USER_SESSION.memid}"/>';

	if(mem_id == null || mem_id == '') {
		 loginSSLPop();
	}else{
		goAddWishList(searchFrm, '_top');
	}
}