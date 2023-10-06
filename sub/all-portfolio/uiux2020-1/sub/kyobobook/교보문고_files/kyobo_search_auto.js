/**
 * @file kyobo_search_auto.js
 * @doc PC 자동완성 기능 사용시 기능정리
 */
/*
var curCursorPos = -1;
var totalKeywordCount = 0 ; 
var cursorEvent = false ;
*/ 
	var sOrderClick = "LAG";
	var isRcntShow = true; // 최근검색어 노출 여부설정.
	
	if(window.location.hostname.indexOf("local.kyobobook") > -1 || window.location.hostname.indexOf("localhost.kyobobook") > -1 || window.location.hostname.indexOf("searchdev.kyobobook") > -1) {
		//로컬
		var autoSearchDomain = "";
		var autoSearchDomain2= "";
		var autoOrderDomain = "//ordertest.kyobobook.co.kr/cart/addCart";
		var autoWwwDomain = "http://dev.kyobobook.co.kr";  //20190917 추가
		var autoGiftDomain = "http://gift.kyobobook.co.kr";
		var autoMusicDomain = "http://music.kyobobook.co.kr";
		var autoSamDomain = "http://sam.kyobobook.co.kr";
		var autoDigitalDomain = "http://digidev.kyobobook.co.kr";
		//var autoDigitalDomain = "http://digital.kyobobook.co.kr";
		var autoPodDomain = "http://pod.kyobobook.co.kr";
		var autoOrderDomain2 = "//ordertest.kyobobook.co.kr";
	} else if(window.location.hostname.indexOf("dev.kyobobook") > -1 || window.location.hostname.indexOf("test.kyobobook") > -1) {
		//테스트
		var autoSearchDomain2= "//searchdev.kyobobook.co.kr";
		var autoSearchDomain = "https://searchdev.kyobobook.co.kr";
		var autoOrderDomain = "//ordertest.kyobobook.co.kr/cart/addCart";
		var autoWwwDomain = "http://dev.kyobobook.co.kr";   //20190917 추가
		var autoGiftDomain = "http://gift.kyobobook.co.kr";
		var autoMusicDomain = "http://music.kyobobook.co.kr";
		var autoSamDomain = "http://sam.kyobobook.co.kr";    
		var autoDigitalDomain = "http://digidev.kyobobook.co.kr";
		//var autoDigitalDomain = "http://digital.kyobobook.co.kr";
		var autoPodDomain = "http://pod.kyobobook.co.kr";
		var autoOrderDomain2 = "//ordertest.kyobobook.co.kr";
	} else {
		//운영
		var autoSearchDomain2= "//search.kyobobook.co.kr";
		var autoSearchDomain = "https://search.kyobobook.co.kr";
		var autoOrderDomain = "//order.kyobobook.co.kr/cart/addCart";
		var autoWwwDomain = "http://www.kyobobook.co.kr";   //20190917 추가
		var autoGiftDomain = "http://gift.kyobobook.co.kr";
		var autoMusicDomain = "http://music.kyobobook.co.kr";
		var autoSamDomain = "http://sam.kyobobook.co.kr";  
		var autoDigitalDomain = "http://digital.kyobobook.co.kr";
		var autoPodDomain = "http://pod.kyobobook.co.kr";
		var autoOrderDomain2 = "//order.kyobobook.co.kr";
	}
	
	

	/**
	 * 상세URI이동
	 * @params function 기능
	 * @params kind
	 * @params ejkGb
	 * @params samCode
	 * @params barcode
	 * @params code
	 * @params orderClick
	 * @returns
	 */
	function autoView(kind, ejkGB, samCode, barcode, code, orderClick){

		var domain = "";
		var mallGb = "";
		if("JAP" == ejkGB || "JNT" == ejkGB) mallGb = "JAP";
		else if("ENG" == ejkGB || "BNT" == ejkGB) mallGb = "ENG";
		else mallGb = ejkGB;
		
		encode = encodeURIComponent(code);
	
		if("GFT" == ejkGB) {
			if("detail" == kind) domain = autoGiftDomain + "/ht/product/detail?barcode=" + barcode + "&orderClick=" + orderClick + "&Kc=";
		}
		if("DVD" == ejkGB||"MUC" == ejkGB) {
			if("detail" == kind) domain = autoMusicDomain + "/ht/record/detail/"+barcode + "?orderClick=" + orderClick + "&Kc=";
		}
		if(ejkGB == "SAM" ) {	//sam 자동완성
			if("detail" == kind) domain = autoSamDomain + "/sbweb/samclub/samclubDetail.ink?barcode=" + barcode;
		}
		if(ejkGB == "EBK" || ejkGB == "AUD") {	//ebook
			if("detail" == kind) domain = autoDigitalDomain + "/digital/ebook/ebookDetail.ink?selectedLargeCategory=001&barcode=" + barcode + "&orderClick=" + orderClick + "&Kc=";
		}
		if(ejkGB == "DUM") {
			if("detail" == kind) domain = autoDigitalDomain + "/digital/article/articleDetail.ink?selectedLargeCategory=006&barcode=" + barcode + "&orderClick=" + orderClick + "&Kc=";
		}
		if("ENG" == ejkGB || "BNT" == ejkGB || "JNT" == ejkGB || "JAP" == ejkGB) {
			if("detail" == kind) domain = autoWwwDomain + "/product/detailViewEng.laf?ejkGb=" + ejkGB + "&mallGb=" + mallGb + "&barcode=" +  barcode + "&orderClick=" + orderClick + "&Kc=";
		}
		if("KOR" == ejkGB) {
			if("detail" == kind) domain =  autoWwwDomain + "/product/detailViewKor.laf?ejkGb=" + ejkGB + "&mallGb=" + mallGb + "&barcode=" +  barcode + "&orderClick=" + orderClick + "&Kc=";
		}
		if(barcode.substring(0,2) == "14") { //POD
			if("detail" == kind) domain =  autoPodDomain + "/soldOutPODBookList/soldOutPODBookDetailView.ink?ejkGb=" + ejkGB + "&barcode=" +  barcode + "&orderClick=" + orderClick + "&Kc=";
		}
		/*
		if(barcode.substring(0, 2) == "29") {
			linkUrl = domain = autoWwwDomain + "/product/detailViewPackage.laf?mallGb=PKG";
		}
		*/
		document.location.href=domain;
	}	
	
	function GetAutoCompleteCookieCart(name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) {
		var j = i + alen;
			if (document.cookie.substring(i, j) == arg) {
				var endstr = document.cookie.indexOf (";", j);
				if (endstr == -1)
					endstr = document.cookie.length;
				return unescape(document.cookie.substring(j, endstr));
				
			}			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break; 
		}
		return null;
	}
	
	// 부모로부터 메시지 수신
	function receiveMsgFromSearch( e ) {
		// e.data가 전달받은 메시지
		if(e.origin == "https://ordertest.kyobobook.co.kr" || e.origin == "http://ordertest.kyobobook.co.kr" || e.origin == "http://order.kyobobook.co.kr" || e.origin == "https://order.kyobobook.co.kr"){
			if(e.data == 'SUCCESS'){
				if(confirm('선택한 상품이 장바구니에 담겼습니다. \n장바구니로 이동하시겠습니까?'))
				{ 
					top.location.replace(autoOrderDomain2+'/cart/cartListMain');
				}
			}else{
				alert(e.data);
			}
		}
		window.removeEventListener( 'message', receiveMsgFromSearch );
	}
	//var lYn =  GetAutoCompleteCookieCart("NECI");
	function goAutoAddCartChk(orderUrl, barcode, ejk_gb,notAge,loginYn){
		
		var domain = autoWwwDomain;
		var searchDomain = autoSearchDomain;
		var obj = new Object();
	
		//obj.cartGb = "N";			
		//obj.siteCd = "";			
		//obj.srcPageYn = "Y";		
		//obj.orderClick = "LEJ"; 파라미터 명칭 변경 19.10.08 홍지애
		obj.clickOrder = "LEJ";
		obj.qty = "1";										
		obj.barcode = barcode;			
		obj.ejkGb = ejk_gb;
		obj.auto = "auto";
		obj.notAge = notAge;
		obj.cartType = "";
		obj.rtnYsno="Y";
	
	//	obj.indexCnt = "1";
		
		retUrl = window.location.href;
		if(retUrl.indexOf("/web/search") > 0 && retUrl.indexOf("searchPcondition") < 0) retUrl += (retUrl.indexOf("?") > 0 ? "&" : "?") + "searchPconditon=1";
		retUrl = escape(retUrl);
		retUrl = encodeURIComponent(retUrl);
		/*
		if(retUrl.indexOf("/web/search") > 0 && retUrl.indexOf("searchPcondition") < 0) {
			retUrl += (retUrl.indexOf("?") > 0 ? "&" : "?") + "searchPconditon=1";
			retUrl = escape(retUrl);
		} else {
			retUrl = escape(decodeURI(retUrl));
		}
		*/
		
	//	if(lYn != null && lYn != "") loginYn = lYn;
		if((ejk_gb =="EBK" || ejk_gb =="AUD") && loginYn =="N"){//ebook에 로그인하지 않았을경우
			  if(confirm("로그인이 필요한 상품입니다. 로그인 하시겠습니까?")) {
				  	//document.location.href = domain +"/login/login.laf?Kc=GNHHNOlogin&orderClick=c03&retURL=" + searchDomain + "/web/search?vPstrKeyWord="+escape($("#searchKeyword").val());
					document.location.href = domain +"/login/login.laf?Kc=GNHHNOlogin&orderClick=c03&retURL="+ retUrl;
		            return;
			  } else {
				  return;
			  }
		}
		
		var form = document.createElement("form");
		form.setAttribute("method", "Post"); // Get 또는 Post 입력
		form.setAttribute("action", orderUrl+"?spbk_dvsn_code=002");
		form.setAttribute("target", "iframeautoblank");
		form.setAttribute("name", "autoFrm");
	//	form.setAttribute("charset", "UTF-8");
		for( var key in obj ) {
			  var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute("value", obj[key]);
				form.appendChild(hiddenField);
		}
		document.body.appendChild(form);
	//	setWebRecommShop(barcode, ejk_gb, "P"); //함께본상품 로그 
		window.addEventListener( 'message', receiveMsgFromSearch );
		form.submit();
	}

(function($){
	//자동검색어 쿠키 
	function GetAutoCompleteCookie (name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) {
		var j = i + alen;
			if (document.cookie.substring(i, j) == arg)
				return GetAutoCompleteCookieVal (j);
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break; 
		}
		return null;
	}
	function GetAutoCompleteCookieVal (offset) {
		var endstr = document.cookie.indexOf (";", offset);
		if (endstr == -1)
			endstr = document.cookie.length;
		return unescape(document.cookie.substring(offset, endstr));
	}
	function SetAutoCompleteCookie (name, value) {
		var argv = SetAutoCompleteCookie.arguments;
		var argc = SetAutoCompleteCookie.arguments.length;
		var expires = (argc > 2) ? argv[2] : null;
		var path = "/";
		var domain = ".kyobobook.co.kr";
		var secure = (argc > 5) ? argv[5] : false;
		document.cookie = name + "=" + escape (value) +
			((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
			((path == null) ? "" : ("; path=" + path)) +
			((domain == null) ? "" : ("; domain=" + domain)) +
			((secure == true) ? "; secure" : "");
	}
	function setAutoCompleteCookie (name, value, expire) {
		var expire_date = new Date(expire)
	    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expire_date.toGMTString()+"; domain=.kyobobook.co.kr";
	}
	
	function delAutoCompleteCookie(name) {
		var today = new Date();
	    var expire_date = new Date(today.getTime() - 60*60*24*1000);	
		document.cookie = name + "=; path=/; expires=" + expire_date.toGMTString()+"; domain=.kyobobook.co.kr";
	}
	
	/**
	 * 자동완성 호출
	 * @param value 키워드
	 * @returns
	 */
	function sendAutoKeyword(val1,val2,currentPage){
		//data 
		$('#topPage').val(!isNaN(currentPage)?currentPage:1);
		data_val1 =  checkAutoKeywordBlank(val1);
	
	//console.log(autoSearchDomain + "/api/webAutomaticKeyword");
	//console.log("autoKeyWord:" + val1+"/ejkGb:"+val2 + "/currentPage:" + $('#topPage').val());
	//	$.cookie('test' , 'value', { path : '/' });   
		$.ajax({
			type: "GET",
			dataType : "jsonp",
			jsonp : "callback",
			url : autoSearchDomain2 + "/api/webAutomaticKeyword",
			xhrFields: { withCredentials: true},
		    crossDomain: true,
			data : { "autoKeyWord" : data_val1 ,	 "ejkGb" : val2,"currentPage":$('#topPage').val()},
			success: function(data) {
				getAutoKeyword(data);
			} 
		});
	}
	
	//자동완성
	function getAutoKeyword(data) {
		$("#hFrame").empty();
		var pageCnt =Math.ceil(data.totalCount/3);	//총건수
		var $obj = data.result;
		var $objLink = data.link;
		var orderUrl = autoOrderDomain;
	    var url = autoSearchDomain;
	    var addHtml = "";
	    
	    if(data.result.length > 0 || data.link.length > 0) addHtml += "<div class=\"box_search_auto\">";
	    if(data.result.length > 0) {
	    	addHtml += "<div class=\"box_search_goods\">";
	    	addHtml += "	<ul class=\"list_search_goods\" >";
	    	
			$.each($obj, function(i){ //일반리스트
				var item = $obj[i];
				var splitTemp =item.tot_RELATE_HTML_LIST.split("$@");
	
				//"데이터 정의 : 
				//0|바코드 //1|분야명 //2|상품명      //3|저자     //4|출판사 //5|출판년도
				//6|출판월 //7|정가  //8|판매가      //9|할인율    //10|적립포인트
				//11|무료배송여부    //12|할인쿠폰여부 /13|상품구분  //14|이미지URL //15|성인유무(0,19)
				//16|★          //17|음반/DVD 일시품절 여부 //18|이북시리즈 여부 //19|샘 무제한 여부
				
				splitTemp[0] = splitTemp[0].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[1] = splitTemp[0].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[5] = splitTemp[5].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[6] = splitTemp[6].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[7] = splitTemp[7].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[8] = splitTemp[8].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[9] = splitTemp[9].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[10] = splitTemp[10].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[11] = splitTemp[11].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[12] = splitTemp[12].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[13] = splitTemp[13].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[14] = splitTemp[14].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[15] = splitTemp[15].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[16] = splitTemp[16].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[17] = splitTemp[17].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[18] = splitTemp[18].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				splitTemp[19] = splitTemp[19].replace(/<em>/gi, "").replace(/<\/em>/gi, "");
	
				var ejbNm="";
				if(splitTemp[13] =="EBK"){
					ejbNm = "eBook";
				} else if(splitTemp[13] =="SAM"){
					ejbNm = "SAM";
				} else if(splitTemp[13] =="MUC"){
					ejbNm = "음반";
				} else if(splitTemp[13] =="DVD"){
					ejbNm = "DVD";
				} else if(splitTemp[13] =="GFT"){
					ejbNm = "기프트";
				} else if(splitTemp[13] =="ENG" || splitTemp[13] =="JAP" || splitTemp[13] =="BNT" || splitTemp[13] =="JNT"){
					ejbNm = "외국도서";
				} else if(splitTemp[13] =="AUD"){
					ejbNm = "오디오북";
				} else {
					if(splitTemp[0].substring(0,2) == "14"){
						ejbNm ="POD";
					}else{
						ejbNm = "국내도서";
					}
					
				}
				addHtml+="<li class=\"\">";
			
				addHtml+="<div class=\"cover\">";
					
				
				isHttps = "";
				if(document.location.protocol == "https:") isHttps = "s";
	
				imgUrl = splitTemp[14];
				if(imgUrl == null) imgUrl = "";
				if(imgUrl.indexOf("http") <= -1) imgUrl = "http://image.kyobobook.co.kr" + imgUrl;
				imgUrl = imgUrl.replace("http://", "http" + isHttps + "://" + isHttps);
				
				if(splitTemp[15] == "19") imgUrl="http"+  isHttps + "://" + isHttps  + "image.kyobobook.co.kr/newimages/apps/b2c/product/19adult_m.gif";
	
				removeEmTitle = splitTemp[2];
				removeEmTitle = removeEmTitle.replace(/<em>/gi, "").replace(/<\/em>/gi, "");
				removeEmTitle = removeEmTitle.trim();
				addHtml+="<a href=\"javascript:autoView('detail','"+splitTemp[13]+"','"+splitTemp[13]+"','"+splitTemp[0]+"', '', 'LEa');\" class=\"auto_search\"><img src=\""+imgUrl+"\" alt=\""+removeEmTitle+"\" onError=\"this.src='http" + isHttps + "://" + isHttps + "image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_l.gif';\" >";
				if(splitTemp[13] =="AUD"){
					addHtml+="<span class=\"icon_audio\">오디오북</span>";
				}
				addHtml+="</a></div>";
				addHtml+="<div class=\"title\"><a href=\"javascript:autoView('detail','"+splitTemp[13]+"','"+splitTemp[13]+"','"+splitTemp[0]+"', '', 'LEa');\" data-value=\"" + removeEmTitle + "\" class=\"auto_search\">["+ejbNm+"] <strong>"+splitTemp[2]+"</strong></a></div>";
				addHtml+="<div class=\"author\" style=\"overflow: hidden; white-space: nowrap; -ms-text-overflow: ellipsis;\">";
				var isLine= 0;
				if(splitTemp[3] != "") {
					addHtml += splitTemp[3];
					if(!(splitTemp[13]=="MUC" || splitTemp[13]=="DVD" || splitTemp[13]=="GFT" || splitTemp[13]=="DUM")){
						addHtml += " 지음";
					} 
					isLine = 1;
				}
				if(splitTemp[4].trim() != "") {
					if(isLine == '1') addHtml += " | ";
					addHtml += splitTemp[4];
					if(splitTemp[13]=="AUD"){
						addHtml += " 낭독";
					} 
					isLine = 1; 
				}
				if(splitTemp[13] != "GFT") {
					if(isLine == '1') addHtml+=" | ";
					addHtml += splitTemp[5]+"년 "+splitTemp[6]+"월";
				}
				addHtml += "</div>";
				addHtml+="<div class=\"price\">";
				//가격 표시 및 장바구니 표시
				if (splitTemp[13] =="SAM"){  //  SAM일때
					if(splitTemp[19]=="4")
						addHtml+="<strong class=\"text\">sam무제한 첫달무료</strong>sam이용권 구매시 열람가능";
					addHtml+="<strong class=\"text\">sam 월 3,300원~</strong>SAM 이용권구매시 열람가능";
				} else if((splitTemp[13]=="MUC" || splitTemp[13]=="DVD") && splitTemp[17]=="1"){//가격 표시 및 장바구니 표시 ( 음악 음반 일때 )
					addHtml+="<strong class=\"text\">일시품절</strong>";
				} else if(splitTemp[13]=="EBK" && splitTemp[12] == "1") { //coupon_yn 이북연재여부
					addHtml += 	"<strong class=\"text\">-연재- </strong><strong>대여/구매 가능</strong>";
				} else if(splitTemp[13]=="EBK" && splitTemp[11] == "1") { //free_send_yn 이북무료도서
					addHtml +="<strong>무료도서</strong>";
				} else { //가격 표시 및 장바구니 표시 ( 그외 )
					if(splitTemp[7] != null && splitTemp[8] != null && splitTemp[9] != null && splitTemp[10] != null) {   
						addHtml+= (parseInt(splitTemp[7])+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"원 → <strong>"+(parseInt(splitTemp[8])+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"원</strong>" ;
						addHtml+=" ["+parseInt(splitTemp[9])+"%"+(splitTemp[9]  > -1 ? splitTemp[9]  <100 ?"↓":"↑" :"↑")+"+"+(parseInt(splitTemp[10])+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"원 <b>P</b>] ";
					}
					if (splitTemp[0].substring(0,3) != "483"  && splitTemp[0].substring(0,2) != "14" && splitTemp[18]  != "1"){////가격 표시 및 장바구니 표시 (pod가 아닐때) 
						addHtml+="<a href=\"javascript:goAutoAddCartChk('"+orderUrl+"','"+splitTemp[0]+"', '"+splitTemp[13]+"', '"+splitTemp[15]+"', '"+data.loginYn+"');\" class=\"auto_search_cart button\">장바구니 담기</a>";
					}else{
							//pod면 장바구니 필요 없음
					}
				}
				addHtml+="</div>";
				addHtml+="</li>";
			});
			addHtml+="</ul>"; 
		    
			//////////page//////
			addHtml+="<div class=\"status\">관련상품 (<strong>"+data.totalCount+"</strong>개)";
			addHtml+="<span class=\"nav_page\"><a href=\"#\" class=\"auto_search_prev btn_prev\">이전</a> ";
			addHtml+="<span class=\"page\"><strong>"+$('#topPage').val()+"</strong> /<span> "+pageCnt+"</span></span>";
			addHtml+=" <a href=\"#\" class=\"auto_search_prev btn_next\">다음</a></span>";
			addHtml+= "</div></div>";
	    }
	    
	    if(data.link.length > 0) {
		    //////Link//
			addHtml+="<ul class=\"list_search_category\">";
			$.each($objLink, function(i){//링크 리스트
				var item = $objLink[i];
				//console.log("link="+item.link_CLASS_WEB_URL);
				addHtml+="<li class=\"auto_search_category\"><a href=\""+item.link_CLASS_WEB_URL+"\" class=\"auto_search_category\">"+item.link_CLASS_FNM+"</a></li>";
			});
			addHtml+="</ul>";
	    }
		
	    if(data.result.length > 0 || data.link.length > 0) {
	    	addHtml += "<div class=\"box_search_bottom\">";
	    	addHtml += "	<a href=\"javascript:void(0);\" id=\"lately_help\">도움말</a>";
	    	addHtml += "	<div class=\"button\"><a href=\"#\" id=\"close_search_goods\">닫기</a></div>";
	    	addHtml += "</div></div>";
	    }
		$("#hFrame").append(addHtml);
		if(addHtml == "") $("#hFrame").hide(); 
	}
	
	//최근검색어
	function getRcntKeywordList(recentSch) {
		$("#hFrame").empty();
		recentWrdList = recentSch.split("$|");
		totalKeywordCount = recentWrdList.length-1 ;
		var addHtml = "";
		addHtml += "<div class=\"box_search_auto\">";
		addHtml += "	<ul class=\"list_search_recent\">";
		for(var i = 0 ; i < recentWrdList.length-1 ; i++){
			recentWrd = recentWrdList[i].split("$^|");
			addHtml += "	<li class=\"\"><a href=\"#\" class=\"keyword lately_search\">" + recentWrd[0] + "</a>  <span class=\"date\">" + recentWrd[1] + "</span> <a href=\"javascript:void(0);\" data-value=\"" + i + "\" id=\"btnLatelyRemove\" class=\"btn_delete\">삭제</a></li>";
		}
		addHtml += "	</ul>";
		addHtml += "	<div class=\"box_search_bottom\">";
		addHtml += "		<a href=\"#\" id=\"lately_help\">도움말</a>";
		addHtml += "		<div class=\"button\"><a href=\"javascript:void(0);\" id=\"btnLatelyRemoveAll\">최근검색어 삭제</a> | <a href=\"javascript:void(0);\" id=\"btnLatelyShowOff\">검색어저장 끄기</a></div>";
		addHtml += "	</div>";
		addHtml += "</div>";
		$("#hFrame").append(addHtml);
	}
	
	//최근검색어 없음
	function getRcntKeywordNoList() {
		$("#hFrame").empty();
		var addHtml = "";
		addHtml += "<div class=\"box_search_auto\">";
		addHtml += "	<div class=\"box_search_text\">최근 검색어가 없습니다.</div>";
		addHtml += "	<div class=\"box_search_bottom\">";
		addHtml += "		<a href=\"#\" id=\"lately_help\">도움말</a>";
		addHtml += "		<div class=\"button\"><a href=\"javascript:void(0);\" id=\"btnLatelyShowOff\">검색어저장 끄기</a></div>";
		addHtml += "	</div>";
		addHtml += "</div>";
		$("#hFrame").append(addHtml);
	}
	
	//검색어저장 꺼짐
	function getRcntKeywordNoShow() {
		$("#hFrame").empty();
		var addHtml = "";
		addHtml += "<div class=\"box_search_auto\">";
		addHtml += "	<div class=\"box_search_text\">검색어저장이 꺼져 있습니다.<br> 검색어저장 켜기를 클릭해 주세요.</div>";
		addHtml += "	<div class=\"box_search_bottom\">";
		addHtml += "		<a href=\"#\" id=\"lately_help\">도움말</a>";
		addHtml += "		<div class=\"button\"><a href=\"javascript:void(0);\" id=\"btnLatelyShowOn\">검색어저장 켜기</a></div>";
		addHtml += "	</div>";
		addHtml += "</div>";
		$("#hFrame").append(addHtml);
	}
	
	
	function rcntKeywordShow() {
		if(isRcntShow == false) {
			getRcntKeywordNoShow();
		} else {
			var recentSch =  GetAutoCompleteCookie("recentSch");
			if(recentSch != null && recentSch != "") {
				getRcntKeywordList(recentSch);
			} else {
				getRcntKeywordNoList();
			}
		}
	}
	
	
	//최근검색어 끄기
	function setShowOff() {
		isRcntShow = false;
		
		var today = new Date();
	    var expire_date = new Date(today.getTime() + 365*60*60*24*1000);
		SetAutoCompleteCookie ("rcntShow", "off", expire_date);
		$("#hFrame").hide();
	}
	
	//최근검색어 켜기
	function setShowOn() {
		isRcntShow = true;
		var today = new Date();
	    var expire_date = new Date(today.getTime() - 60*60*24*1000);
		SetAutoCompleteCookie ("rcntShow", "on", expire_date);
		$("#hFrame").hide();
		
	}
	
	//최근검색어 전체 삭제
	function removeKeywordAll() {
		delAutoCompleteCookie("recentSch");
		$("#hFrame").empty();
		$("#hFrame").hide();
	}
	
	
	//최근검색어 삭제
	function delSchList(idx) {
		var recentSch =  GetAutoCompleteCookie("recentSch");
	    if( recentSch != null && recentSch != ""){
	        var recentSchArray = recentSch.split("$|");
	        var str = "";
	        for( var i=0; i<recentSchArray.length - 1; i++ ){
	            if( i != idx ){
	                str += recentSchArray[i] + "$|";
	            }
	        }
	        var today = new Date();
	        var expire_date = new Date(today.getTime() + 365*60*60*24*1000);
	        setAutoCompleteCookie("recentSch", str, expire_date);
	    }	
		$("#hFrame").empty();
		rcntKeywordShow();   
	}
	
	
	
	//최근검색어 추가
	function addRcentSchList(sKeyword) {
		if(isRcntShow) {
			var maxLength = 11; //최대 저장갯수
			var delimiter = "$|"; //String 구분자
			var delimiter2 = "$^|"; //String 구분자			
			var date = new Date();	
			var mm = (date.getMonth() + 1);
		   	var dd = date.getDate();
		   	
		   	if (("" + mm).length == 1) { mm = "0" + mm; }
		    if (("" + dd).length   == 1) { dd   = "0" + dd;   }
		   	
			var dateForm = mm +"."+ dd;
	
			var recentSch = GetAutoCompleteCookie("recentSch");
			var recentWord = "";
			sKeyword	= suggest_cutString(sKeyword,52);		
			recentWord = sKeyword + delimiter2 + dateForm;
			if(recentSch == null){
				recentSch = delimiter;				
			}else{
				recentSch =  delimiter + recentSch;
			}
	
		    //과거날짜 중복 체크
			if(recentSch.indexOf(recentWord+delimiter) <= 0 && recentSch.indexOf(sKeyword + delimiter2) > 0){	//현재날짜 중복체크
				tot = parseInt(recentSch.indexOf(sKeyword + delimiter2))+ parseInt(delimiter2.length) + parseInt(sKeyword.length) + parseInt(dateForm.length)+parseInt(delimiter.length);
				dup_data = recentSch.substring(recentSch.indexOf(sKeyword + delimiter2), tot);
				//console.log("dup_data:" + dup_data);			
				recentSch = recentSch.replace(dup_data,"");
		    }
			
			if(recentSch.indexOf(recentWord+delimiter) > 0){	//현재날짜 중복체크
				recentSch = recentSch.replace(delimiter+recentWord+delimiter,delimiter);	      
			}	
			recentSch = recentWord + recentSch;	
	
			var recentSchCount = recentSch.split(delimiter).length;
			
			//최대 저장갯수를 초과하면 처음들어온거 삭제. 
		    if(recentSchCount>maxLength){
		       recentSch = recentSch.substring(0,recentSch.lastIndexOf(delimiter));
		       recentSch = recentSch.substring(0,recentSch.lastIndexOf(delimiter)+delimiter.length);
		    }
		    
			var today = new Date();
			var expire_date = new Date(today.getTime() + 365*60*60*24*1000);
	//console.log("recentSch:" + recentSch + ":" + expire_date);		
			setAutoCompleteCookie("recentSch" ,recentSch, expire_date);			
		}
	}
	
	//limitByte 의 byte 만큼 str 을 자른 후 반환한다.                                                                  
	function suggest_cutString( str , limitByte)
	{
	    var inc = 0;
	    var nbytes = 0;
	    var msg = "";
	    var msglen = str.length;
	
	    for (i=0; i<msglen; i++) {
	      
	        var ch = str.charAt(i);
	        if (escape(ch).length > 4) {
	            inc = 2;
	        } else if (ch == '') {
	            if (str.charAt(i-1) != '') {
	                inc = 1;
	            }
	        } else if (ch == '<' || ch == '>') {
	            inc = 4;
	        } else {
	            inc = 1;
	        }
	        if ((nbytes + inc) > limitByte ) {
	            break;
	        }
	        nbytes += inc;
	        msg += ch;
	        
	    }
	    
	    if( i != msglen ) msg = msg + "..";
	    
	    return msg;
	}
	
	/**
	 * 검색어 체크
	 * @param text
	 * @returns
	 */
	function checkAutoKeyword(text){
		var checkValue = text+"";
		checkValue = checkValue.replace(/&/gi, "&amp;");
		checkValue = checkValue.replace(/\\/gi, "&#92;");
		checkValue = checkValue.replace(/</gi, "&lt;");
		checkValue = checkValue.replace(/>/gi, "&gt;");
		checkValue = checkValue.replace(/'/gi, "&#39;");
		checkValue = checkValue.replace(/\[/gi, "&#91;");
		checkValue = checkValue.replace(/\]/gi, "&#93;");
		checkValue = checkValue.replace(/"/gi, "&#34;");
		return checkValue;
	}
	
	function checkAutoKeywordBlank(text){
		var checkValue = text+"";
		checkValue = checkValue.replace("&amp;", "&");
		checkValue = checkValue.replace("&#92;", "\\");
		checkValue = checkValue.replace("&lt;", "<");
		checkValue = checkValue.replace("&gt;", ">");
		checkValue = checkValue.replace("&#39;", "'");
		checkValue = checkValue.replace("&#91;", "[");
		checkValue = checkValue.replace("&#93;", "]");
		checkValue = checkValue.replace("&#34;", "\"");
		return checkValue;
	}
	
	/**
	 * 쿼리스트링 문자 URL인코딩 설정
	 * @param inum
	 * @returns
	 */
	function replaceKeyword(inum) {
		inum = inum.replace(/\+/g, "%2B"); 
		return inum; 
	}
	
	/**
	 * 검색 시작 및 페이지 이동
	 * @param value
	 * @param save
	 * @returns
	 */
	function goSearchKeywordPage(keyvalue, orderClick){
		inkeyword = keyvalue;
		if(inkeyword == ""){
			alert("검색어를 입력해주세요");
			return;
		}
	
		var $form = $('<form></form>'); 
	    $form.attr('action', autoSearchDomain + '/web/search');
	    $form.attr('method', 'get');
	    $form.appendTo('body'); 
	    
	    var keyword = $('<input type="hidden" value="'+encodeURIComponent(replaceKeyword(inkeyword))+'" name="vPstrKeyWord">');
	    $form.append(keyword);
	    if(orderClick != null){
	    	var click = $('<input type="hidden" value="'+orderClick+'" name="orderClick">');
	    	$form.append(click);
	    }
	    topEjkGb = $("#topEjkGb").val().trim();
	    if(topEjkGb != "TOT") {
	    	var ejkGb = "";
	    	var collNm = "";
	    	if(topEjkGb == "SAM") {	//sam
	    		ejkGb = $('<input type="hidden" value="SAM@DIGITAL" name="searchCategory">');
	    		collNm = $('<input type="hidden" value="DIGITAL" name="collName">');
	    	} else if(topEjkGb == "EBK") {	//ebook
	    		ejkGb = $('<input type="hidden" value="EBOOK@DIGITAL" name="searchCategory">');
	    		collNm = $('<input type="hidden" value="DIGITAL" name="collName">');
	    	} else if(topEjkGb == "KOR") {	//국내도서
	    		ejkGb = $('<input type="hidden" value="국내도서@KORBOOK" name="searchCategory">');
	    		collNm = $('<input type="hidden" value="KORBOOK" name="collName">');
	    	} else if(topEjkGb == "ENG")  {	//외국도서
	    		ejkGb = $('<input type="hidden" value="외국도서@FOREIGN" name="searchCategory">');
	    		collNm = $('<input type="hidden" value="FOREIGN" name="collName">');
	    	} else if(topEjkGb == "MUC" || topEjkGb == "DVD") {	//음반/영상
	    		ejkGb = $('<input type="hidden" value="음반/영상@HOTTRACKS" name="searchCategory">');
	    		collNm = $('<input type="hidden" value="HOTTRACKS" name="collName">');
	    	} else if(topEjkGb == "GFT") { //기프트
	    		ejkGb = $('<input type="hidden" value="기프트@GIFT" name="searchCategory">');
	    		collNm = $('<input type="hidden" value="GIFT" name="collName">');
	    	} else if(topEjkGb == "DIG") { //ebook
	    		ejkGb = $('<input type="hidden" value="EBOOK@DIGITAL" name="searchCategory">');
	    		collNm = $('<input type="hidden" value="DIGITAL" name="collName">');
	    	} else if(topEjkGb == "USE") {
	    		collNm = $('<input type="hidden" value="USED" name="collName">');
	    	}
	    	if(ejkGb != "") $form.append(ejkGb);
	    	if(collNm != "") $form.append(collNm);
	    	var searchPcondition = $('<input type="hidden" value="1" name="searchPcondition">');
	    	$form.append(searchPcondition);
	    }
	    topSbCdtnCode = $("#topSbCdtnCode").val().trim();
	    if(topSbCdtnCode != "") {
	    	var sbCdtnCode = $('<input type="hidden" value="'+ $("#topSbCdtnCode").val().trim() +'" name="searchSbCdtnCode">');
	    	$form.append(sbCdtnCode);
	    }
	    $form.submit();	
	}
	
	
	function submitSearchKeywordPage() {
		var eventurlFlag = $("#eventurlFlag").val();
		var eventurlDelFlag = $("#eventurlDelFlag").val();
		var styleEvent = $("#searchKeyword").css("background-image");
		var isEvent = "N";
		if(styleEvent != "" && styleEvent != "none") isEvent = "Y";
		var keyword = $("#searchKeyword").val();
		var ejkGb = $("#topEjkGb").val(); 
		var eventurl = $("#eventurl").val(); 
		
		if(eventurlFlag == "1" && eventurlDelFlag == "0" && isEvent == "Y"){
			document.location.href = $("#eventurl").val();
		} else if(ejkGb != "TOT" && keyword == "" && eventurl != ""){
			document.location.href = $("#eventurl").val();
		} else {
			if(keyword.trim() == "") {
				alert("검색어를 입력해주세요");
				return;
			}
			keyword = checkAutoKeyword(keyword.trim());
			addRcentSchList(keyword);
			
			topEjkGb = $("#topEjkGb").val().trim();
			orderClick = sOrderClick;		//"LAG";
		    if(topEjkGb == "SAM") orderClick = "LEK";
		    else if(topEjkGb == "EBK") orderClick = "LEH";
		    
			goSearchKeywordPage(keyword, orderClick);
		}
	}


	$(document).ready(function() {
		isRcntShow = GetAutoCompleteCookie("rcntShow")=="off" ? false : true;

		//최근검색어 남기기-pc
	    if($("#searchKeyword").val() !=null && $("#searchKeyword").val() !=''){           
	    	addRcentSchList($("#searchKeyword").val());
	    }
		//메인 상단화면에 돋보기 클릭시 이벤트
		$(".searcharea .btn_search, .searh_word .btn_search01").click(function(){
			submitSearchKeywordPage();
		});
		
		//키워드 엔터키로 검색 설정
		$("#searchKeyword").keyup(function (key) {
			var ejkGb = $("#topEjkGb").val(); 
	        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
				if(!(ejkGb == "EBK" || ejkGb == "SAM")){
					submitSearchKeywordPage();
				}
	        } else if(key.keyCode == 38) { //위 화살표
	        	if($("#hFrame").find("ul").hasClass("list_search_recent")) {
	    			$this = $(".list_search_recent").children("li.on");
	    			isAutoVal = 0;
	    		} else if($("#hFrame").find("ul").hasClass("list_search_goods")) {
	    			$this = $(".list_search_goods").children("li.on");
	    			isAutoVal = 1;
	    		}
	        	if( $this.prev().size() ) {
					$this.parent().children("li").removeClass('on');
					$this.prev().addClass('on');
					if(isAutoVal == 1) {
						$("#searchKeyword").val($this.prev().children('.title').find("a").data("value"));
					} else {
						$("#searchKeyword").val($this.prev().children('a.keyword').text());
					}
					sOrderClick = "LEA";
				} else {
					$("#hFrame").hide();
					$("#searchKeyword").val($("#from_keyword").val());
				}       	
			} else if(key.keyCode == 40) { //아래 화살표
				if($("#hFrame").find("ul").hasClass("list_search_recent")) {
	    			$this = $(".list_search_recent").children("li.on");
	    			isAutoVal = 0;
	    		} else if($("#hFrame").find("ul").hasClass("list_search_goods")) {
	    			$this = $(".list_search_goods").children("li.on");
	    			isAutoVal = 1;
	    		}
				if( $this.next().size() ) {
					$this.parent().children("li").removeClass('on');
					$this.next().addClass('on');
					if(isAutoVal == 1) {
						$("#searchKeyword").val($this.next().children('.title').find("a").data("value"));
					} else {
						$("#searchKeyword").val($this.next().children('a.keyword').text());
					}
				} else {
					$this.parent().children("li").removeClass('on');
					if(isAutoVal == 1) {
			    		$("#searchKeyword").val($(".list_search_goods li:eq(0)").children(".title").find("a").data("value"));
			    		$(".list_search_goods li:eq(0)").addClass('on');
					} else {
			    		$("#searchKeyword").val($(".list_search_recent li:eq(0) a.keyword").text());
			    		$(".list_search_recent li:eq(0)").addClass('on');
					}
				}
				sOrderClick = "LEA";
				if($("#hFrame").css("display") == "none") $("#hFrame").show();
			} else {
				if($("#searchKeyword").css("background-image") != "" && $("#searchKeyword").css("background-image") != "none") $("#searchKeyword").css("background-image", "");
				sOrderClick = "LAG";
	        	var keyword = checkAutoKeyword($("#searchKeyword").val());
	    		if(keyword != "") sendAutoKeyword(keyword,$("#topEjkGb").val(),1); 
	    		else rcntKeywordShow();
	    		$("#hFrame").show();
	        }
	        
	    });
		
		$("#searchKeyword").click(function() {
			if($("#hFrame").css("display") == "none") {
				var keyword = checkAutoKeyword($("#searchKeyword").val());
				if(keyword != "") sendAutoKeyword(keyword,$("#topEjkGb").val(),parseInt($('#topPage').val())); 
				else rcntKeywordShow();
				$("#hFrame").show();
			}
		});
	
		$(document).bind("click", function(e) {
			/*
			console.log("e.target.id:" + e.target.id);
			console.log("e.target.class:" + $(e.target).attr('class'));
			console.log("e.target.parent().find(ul) class:" + $(e.target).parent().find("ul").attr('class'));
			console.log("e.target.parent().find(div) class:" + $(e.target).parent().find("div").attr('class'));
			console.log("e.target.parent().parent().find(ul) class:" + $(e.target).parent().parent().find("ul").attr('class'));
			console.log("e.target.parent().parent().find(div) class:" + $(e.target).parent().parent().find("div").attr('class'));
			console.log("e.target.parent().parent().parent().find(ul) class:" + $(e.target).parent().parent().parent().find("ul").attr('class'));
			console.log("e.target.parent().parent().parent().find(div) class:" + $(e.target).parent().parent().parent().find("div").attr('class'));
			console.log("----------------------------------------------------");
			*/
			
			if(e.target.id == "searchKeyword"
			   || e.target.id == "close_search_goods" || $(e.target).attr("class") == "box_search_bottom"
			   || e.target.id == "lately_help" || e.target.id == "btnLatelyRemove" || e.target.id == "btnLatelyRemoveAll" || e.target.id == "btnLatelyShowOff" || e.target.id == "btnLatelyShowOn" || $(e.target).attr("class") == "keyword lately_search"
			   || $(e.target).attr("class") == "auto_search" || $(e.target).attr("class") == "auto_search_cart button" || $(e.target).attr("class") == "auto_search_prev btn_prev" || $(e.target).attr("class") == "auto_search_next btn_next"
			   || $(e.target).attr("class") == "auto_search_category"
			   || $(e.target).parent().find("ul").attr("class") == "list_search_recent"	   
			   || $(e.target).parent().find("ul").attr("class") == "list_search_goods"	
			   || $(e.target).parent().parent().find("ul").attr("class") == "list_search_goods"	
			   || $(e.target).parent().parent().parent().find("ul").attr("class") == "list_search_goods"	
			   || $(e.target).parent().find("div").attr("class") == "auto_complete"	 
			   || $(e.target).parent().find("div").attr("class") == "box_search_goods"
			   || $(e.target).parent().find("div").attr("class") == "box_search_bottom"
			   || $(e.target).parent().parent().find("div").attr("class") == "box_search_auto"
				   
			) {
				//자동완성/최신검색어 검색어 창 활성화 
			} else {
				if($("#hFrame").css("display") != "none") {
					$("#hFrame").hide();
				}
			}
		});
		
		
		//검색어 도움말
		$(document).delegate("#lately_help", "click", function() {
			$(this).attr("href", autoWwwDomain + "/cscenter/faqIndex.laf?question=%C3%D6%B1%D9%B0%CB%BB%F6%BE%EE");
			window.location.href = $(this).attr("href"); 
		});
	
		//닫기
		$(document).delegate("#close_search_goods", "click", function() {
			if($("#hFrame").css("display") != "none") {
				$("#hFrame").hide();
			}
		});
		
		
		//최근검색어 전체 삭제
		$(document).delegate("#btnLatelyRemoveAll", "click", function(){
			removeKeywordAll();
	    });
		
		//최근검색어 삭제
		$(document).delegate("#btnLatelyRemove", "click", function(){
			idx = $(this).data("value");
			delSchList(idx);
	    });
		
		//검색어저장 켜기
		$(document).delegate("#btnLatelyShowOn", "click", function(){
			setShowOn();
	    });
		
		//검색어저장 끄기
		$(document).delegate("#btnLatelyShowOff", "click", function(){
			setShowOff();
	    });	
	
		//최근검색어 검색어 링크
		$(document).delegate(".lately_search", "click", function() {
			url = autoSearchDomain + "/web/search?vPstrKeyWord=" + encodeURIComponent($(this).text());
	
			topEjkGb = $("#topEjkGb").val().trim();
			if(topEjkGb != "TOT") {
				url += "&searchPcondition=1";
				if(topEjkGb == "SAM") 	url += "&searchCategory="+ encodeURIComponent("SAM@DIGITAL") + "&collName=" + encodeURIComponent("DIGITAL");
				else if(topEjkGb == "EBK") 	url += "&searchCategory=" + encodeURIComponent("EBOOK@DIGITAL") + "&collName=" + encodeURIComponent("DIGITAL");
				else if(topEjkGb == "KOR") url += "&searchCategory="+encodeURIComponent("국내도서@KORBOOK") + "&collName=" + encodeURIComponent("KORBOOK");
		    	else if(topEjkGb == "ENG") url += "&searchCategory=" + encodeURIComponent("외국도서@FOREIGN")+ "&collName=" + encodeURIComponent("FOREIGN");
		    	else if(topEjkGb == "MUC" || topEjkGb == "DVD") url += "&searchCategory=" + encodeURIComponent("음반/영상@HOTTRACKS") + "&collName=" + encodeURIComponent("HOTTRACKS");
		    	else if(topEjkGb == "GFT") url += "&searchCategory=" + encodeURIComponent("기프트@GIFT") + "&collName=" + encodeURIComponent("GIFT");
		    	else if(topEjkGb == "DIG") url += "&searchCategory=" + encodeURIComponent("EBOOK@DIGITAL") + "&collName=" + encodeURIComponent("DIGITAL");
				else if(topEjkGb == "USE") url += "&collName=USED";
		    }
		    topSbCdtnCode = $("#topSbCdtnCode").val().trim();
		    if(topSbCdtnCode != "") {
		    	url += "&searchSbCdtnCode=" + $("#topSbCdtnCode").val().trim();
		    }
	
			orderClick = "LET";
		    if(topEjkGb == "SAM") orderClick = "LEK";
		    else if(topEjkGb == "EBK") orderClick = "LEH";		
		    url += "&orderClick=" + orderClick;
		    
			$(this).attr("href", url);
			window.location.href = $(this).attr("href"); 
		});
		
		//자동완성, 최근검색어 내  hover
		$(document).delegate(".list_search_goods li, .list_search_category li, .list_search_recent li", 'mouseover', function() {
			$(this).addClass('on');
		});
		$(document).delegate(".list_search_goods li, .list_search_category li, .list_search_recent li", 'mouseout', function(){
			$(this).removeClass('on');
		});
		
		
		
		$(document).delegate(".box_search_goods .btn_prev", "click", function(){
			if(1 < parseInt($('#topPage').val())){
			  	var keyword = checkAutoKeyword($("#searchKeyword").val());
				sendAutoKeyword(keyword,$("#topEjkGb").val(),parseInt($('#topPage').val())-1); 
			}
		});	
		
		$(document).delegate(".box_search_goods .btn_next", "click", function(){
			if(0< parseInt($('#topPage').val()) && parseInt($('#topPage').val()) < parseInt($('.box_search_goods').find('.status .page span').text()) ){
			  	var keyword = checkAutoKeyword($("#searchKeyword").val());
				sendAutoKeyword(keyword,$("#topEjkGb").val(),parseInt($('#topPage').val())+1); 
			}
		});	
	});
}) (jQuery);
