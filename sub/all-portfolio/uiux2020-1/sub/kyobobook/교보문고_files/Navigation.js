var domain = 'http://www.kyobobook.co.kr';
var sslDomain = 'https://www.kyobobook.co.kr';
//var domain = 'http://'+document.domain;
//var sslDomain = 'http://'+document.domain;
var orderDomain = 'http://order.kyobobook.co.kr';
var orderSslDomain = 'https://order.kyobobook.co.kr';
var daumDomain = document.domain;

if(daumDomain == "my.book.daum.net" || daumDomain == "book.daum.net" || daumDomain == "daum.net")
{
    sslDomain = "";
}

//================================================================================
// top �� �Ǵ� ��ġ ã�Ƴ���.. error �� �߻��Ҷ� ���� ������ ã�´� (���޻� ������ ���� �ʿ�)
//
// �ۼ��� : mistyi
// ��뿹 : top.location.href -> findTop().location.href �̷��� ����ϼ���
//================================================================================
function findTop(){
	var dom = "";
	var par = "";

	//================================================================
	// ����� ���޻� �������� �������� �ȿ� �����Ҷ��� �����
	//================================================================
	//CoomContent ��� �����Ӿȿ� ����ִ°Ŷ�� top.CoopContent ���� �̵�
	var a = eval("top.CoopContent");
	//������ ������ �߻��ϸ� �Ʒ� return ��ũ��Ʈ�� Ÿ�� �ʴ´�.
	if (eval("top.CoopContent")!=null) {
		return top.CoopContent;
	}

	//================================================================
	// ���Ĵ� ���޻� �������� �ش� �����ο� ���� ����� ó���̴�.
	//================================================================
	try {
		//�Ʒ� ��ũ��Ʈ�� ���� �۵��ϸ� �����Ӿȿ� ������� �ʴ�
		dom = top.document.domain;
		return top;
	} catch (e) {
		//��ũ��Ʈ ������ �߻��Ѵٸ� ���޻� ������ �ȿ� �� �ִٰ� ����.
		try {
			// 3�ܰ��̻��� ������ ������ ���ٰ� ����...
			for (var i=0; i<4; i++) {
				dom = eval(par+"document.domain");
				par += "parent.";
			}
		} catch (e) {
			if (par=="parent.") {
				// ù��°�ܰ迡�� ������ �߻��ϸ� self �� ó��
				return self;
			}else{
				// �ι�°�ܰ��̻��϶� ������ parent. �� ����� ��ü�� ��ȯ�Ͽ� ��ȯ
				return eval(par.substring(0,par.length-8));
			}
		}
	}
}

// �α����� ������ �������ð� �ȵ� ��� ž�� �α��� ���� �޴� �κ��� ��ü���ش�
function loginTopRefresh() {
	findTop().document.all.loginTb.style.display='';
	findTop().document.all.noLoginTb.style.display='none';
}


/* Navigation ���� �κ�
* ���� : domain �߰� (2008.01.04 by ������)
*/
function openLogin(retURL) {
	if(retURL == null || retURL == "")
		retURL=location.href;

	if(typeof(retURL) == "undefined")	{
		window.location = domain+"/login/login.laf";
	} else {
		window.location = domain+"/login/login.laf?retURL=" + escape(retURL);
	}
}

/* 
* ��α��� ������ �߰�(2015. 8. 6 ���ȣ)
*/
function reLogin(retURL) {
	if(retURL == null || retURL == "")
		retURL=location.href;
	
	if(typeof(retURL) == "undefined")	{
		if(retURL.indexOf("https") != -1){
			window.location = sslDomain+"/myroom/reLogin.laf";
		}else{
			window.location = domain+"/myroom/reLogin.laf";
		}
	} else {
		if(retURL.indexOf("https") != -1){
			window.location = sslDomain+"/myroom/reLogin.laf?retURL=" + escape(retURL);
		}else{
			window.location = domain+"/myroom/reLogin.laf?retURL=" + escape(retURL);
		}
	}
}

// �α����� Ư�� ��ũ��Ʈ�� ���۽�Ű���� �Ҷ� (�α���â ���ַ� �����ؾ� ��. ������� opener.abc())
function openLoginScript(scr) {
	if(typeof(scr) == "undefined")	{
		window.location = domain+"/login/login.laf";
	} else {
		window.location = domain+"/login/login.laf?retScript=" + escape(scr) + "&closeYn=Y";
	}
}

function openLoginSubmit(formname) {
	window.location = domain+"/login/login.laf?formName=" + formname;
}

function openOrderSend() {
	window.location = domain+"/login/loginOrderSend.laf";
}

function goPublisher() {
	document.location.href = domain+"/publisher";
}

// �ֹ��ϱ� �α���(���� �α������� ����, 2007/06/05 by leehyunmee)
function openLoginOrder(formname) {
	eval("chkIndex = " + formname + ".indexCnt;");
	isCheck = false;
	if(typeof(chkIndex[0]) == 'undefined') {
		if(chkIndex.checked) {
			isCheck = true;
		}
	} else {
		for( var i=0; i<chkIndex.length; i++) {
			if(chkIndex[i].type == 'checkbox') {
				if(chkIndex[i].checked) {
					isCheck = true;
					break;
				}
			}
		}
	}
	if(!isCheck) { 
		alert("�ֹ��Ͻ� ��ǰ�� �ϳ� �̻� �����ϼž� �մϴ�.");
	} else {
		//window.open("/login/login.laf?formname=" + formname, "LoginPop", "width=420,height=283,left=100,top=100");

		// ���� �α������� ����, 2007/06/05 by leehyunmee
		window.open("/login/loginSSLPop.laf?formname=" + formname+"&retScript=opener.goOrderPopup('"+formname+"')&closeYn=Y&loginKind=ordersend", "LoginPop", "width=420,height=283,left=100,top=100,status=yes");

	}
}

// �ֹ� ���� �ٷε帲 �α��� ������
function openLoginOrder0(formname) {
 eval("chkIndex = " + formname + ".indexCnt;");
 isCheck = false;
 if(typeof(chkIndex[0]) == 'undefined') {
  if(chkIndex.checked) {
   isCheck = true;
  }
 } else {
  for( var i=0; i<chkIndex.length; i++) {
   if(chkIndex[i].type == 'checkbox') {
    if(chkIndex[i].checked) {
     isCheck = true; 
     break;
    } 
   }
  }
 }
 if(!isCheck) {
  alert("�ֹ��Ͻ� ��ǰ�� �ϳ� �̻� �����ϼž� �մϴ�.");
 } else {
  eval("cartGb = " + formname + ".cartGb;");
  if(typeof(cartGb) == "undefined" || cartGb.value == "" || cartGb.value == "N"){
   window.open("/login/loginSSLPop.laf?formname=" + formname+"&retScript=opener.goOrderPopup0('"+formname+"')&closeYn=Y&loginKind=ordersend", "LoginPop", "width=737,height=420,left=100,top=100,status=yes");
   //document.location = "/login/login.laf?formname=" + formname+"&retScript=self.goOrderPopup0('"+formname+"')&closeYn=Y&loginKind=ordersend";
  }else{
   //openLogin();
   window.open("/login/loginSSLPop.laf?formname=" + formname+"&retScript=opener.goOrderPopup0('"+formname+"')&closeYn=Y&loginKind=ordersend&cartGb=P", "LoginPop", "width=737,height=420,left=100,top=100,status=yes");
  }
 }
} 

//��ȸ�� �ֹ� ��ȸ �α���
function goLoginSearch () {
	document.location = "/login/loginSearch.laf";
}

//��ٱ��� �α���â���� ȸ���α����ϱ�(popup)
function goOrderLoginPop(formname){
	window.resizeTo(700,283);
	window.location.href=domain+"/login/loginSSLPop.laf?popup=Y&formname="+formname+"&retScript=opener.goOrderPopup0('"+formname+"')&closeYn=Y&loginKind=ordersend";
}

function goOrderPopup(formname) {
	eval("goOrderStep1(" + formname + ");");
}

function goOrderPopup0(formname) {
	eval("goOrderStep0(" + formname + ");");
}

function openLoginJoin(retURL, memid) {
window.open("/login/login.laf?cmemid=" + memid + "&retURL=" + retURL, "LoginPop", "width=420,height=283,left=100,top=100");
}

function openLoginJoinHottracks(retURL, memid) {
window.open("/hottracks/login/login.laf?cmemid=" + memid + "&retURL=" + retURL, "LoginPop", "width=420,height=283,left=100,top=100");
}


function logout() {
	var isFailPopKey = GetCookie('isFailPopKey');

	if(isFailPopKey == "Y")	{
		window.open('/login/PopupLogout.jsp', 'LogoutPop', 'width=325,height=178,left=100,top=100');
	}

	document.location.href = domain+"/login/logout.laf?Kc=GNHHNOlogout&orderClick=c05";
}

/*
 * ȸ������
 * 2007.07.05 ������ ���� : ssl ����(https)
 * 2011.07.14 ������ ���� : Ư������ �ð� ���� ���� ����
*/
function goMemberJoin(retURL) {
	if(typeof(retURL) == "undefined")	{
    document.location.href = sslDomain+"/member/joinMain.laf?Kc=GNHHNOmemberjoin&orderClick=c04";				
	} else {
		document.location.href = sslDomain+"/member/joinMain.laf?retURL=" + retURL;
	}
}

/*
 * ȸ������
 * 2006.04.25 ������ ���� (Ÿ���� ���� �� �ְ�)
 * 2007.07.05 ������ ���� : ssl ����(https)
*/
function goMemberJoinPop(retURL,target) {
	if (target==null) {
		if(typeof(retURL) == "undefined")	{
			opener.document.location.href = sslDomain+"/member/joinMain.laf";
		} else {
			opener.document.location.href = sslDomain+"/member/joinMain.laf?retURL=" + retURL;
		}
		self.close();
	}else{
		if(typeof(retURL) == "undefined")	{
			target.document.location.href = sslDomain+"/member/joinMain.laf";
		} else {
			target.document.location.href = sslDomain+"/member/joinMain.laf?retURL=" + retURL;
		}
	}
}

//���̵� ã��
function goMemberIDSearchForm() {
	var url = "/login/memberIDSearchForm.laf";
	window.open(url,"MemberIDSearchForm","width=420,height=283");

}

//��й�ȣã��
function goMemberPWSearchForm() {
	var url = "/login/memberPWSearchForm.laf";
	window.open(url,"MemberPWSearchForm","width=420,height=283");

}

function goCart() {
	//document.location.href = domain+"/cart/cartList.laf?Kc=GNHHNOcart&orderClick=c06";
	document.location.href = orderDomain + "/cart/cartListMain?Kc=GNHHNOcart&orderClick=c06";
}


//�̺�Ʈ ȣ��� �ű� Ŭ���� ����
function goEventOrderClickKc(barcode, eventId, ejkGb, orderClick, Kc,  targetName) {
	if(typeof(targetName) != 'undefined') {
		document.proCartOneForm.target = targetName;
	}
	//orderClick/Kc �ڵ� �߰�
	var clickParam = "";
	if(typeof(orderClick) != 'undefined'){
		if(orderClick != ""){
			clickParam = "orderClick="+orderClick;
		}
	}
	if(typeof(Kc) != 'undefined'){
		if(Kc != ""){
			clickParam = (clickParam != "") ? clickParam+"&Kc="+Kc : "Kc="+Kc;
		}
	}
	
	var goToUrl = "";
	if(ejkGb == 'ENG' || ejkGb == 'JAP' || ejkGb == 'BNT' || ejkGb == 'JNT') {
		goToUrl = domain+"/event/eventEngViewByPid.laf";
	} else if (ejkGb == 'MUC') {
		goToUrl = domain+"/event/eventMucViewByPid.laf";
	} else if (ejkGb == 'DVD') {
		goToUrl = domain+"/event/eventDvdViewByPid.laf";
	} else {
		goToUrl = domain+"/event/eventViewByPid.laf";
	}
	if(clickParam != ""){
		goToUrl = (goToUrl.indexOf("?") == -1)?(goToUrl+"?"+clickParam) : (goToUrl+"&"+clickParam);
	}
	document.proCartOneForm.action = goToUrl;
	
	document.proCartOneForm.eventId.value = eventId;
	document.proCartOneForm.barcode.value = barcode;
	document.proCartOneForm.ejkGb.value = ejkGb;
	document.proCartOneForm.Kc.value = Kc;
		
	document.proCartOneForm.submit();

}


// 20080321 �Ǳ�ȣ
//������ �������� ��ǰ�� ��� true �ƴϸ� false
function goAddCartIsDigital(ejkGb)
{
	//������ �������� ��ǰ�� ���
	if(ejkGb == 'EBK' || ejkGb == 'AUD' || ejkGb == 'VOD' || ejkGb == 'KDS' || ejkGb == 'DSE' || ejkGb == 'DUM' || ejkGb == 'DMA')
		return true;
	else
		return false;
}


// 20080321 �Ǳ�ȣ
// 1. ������ �������� ��ǰ ��ٱ��� ��� �� ������ üũ�Ͽ� �α��� â�� ���� �޼����� ����Ѵ�.
function goAddCartCheckDigital(ejkGb)
{
	//������ �������� ��ǰ
	if ( goAddCartIsDigital(ejkGb) )
	{
		if (GetCookie("EMCNO") == '' || GetCookie("EMCNO") == null )
		{
			alert("�� ��ǰ�� ����� ���� �ʴ� �����л�ǰ(����å ��)�Դϴ�.\n\n ��ǰ���Ÿ� ���ؼ��� �α����� �ʿ��մϴ�.");
			openLogin();
			return 'L';
		}
		return 'D';
	}
	else
	{
		return 'N';
	}
}

function goAddCartList(formname, targetName) {

	var clickstr = "";

	var ie = (document.all)? true:false;
	if(ie) {
		if(event != null) {
			var curTag = event.srcElement;
			var i=0;

			while(curTag.parentElement && i<40) {
				if(curTag.tagName == "SPAN" && curTag.name == "orderclick") {
					clickstr = "?clickOrder=" + curTag.value;
					break;
				}
				curTag = curTag.parentElement;
				i++;
			}
		}
	}

	if(typeof(formname.indexCnt[1]) == "undefined")
	{
		if ( formname.indexCnt.checked == true && goAddCartCheckDigital(formname.ejkGb.value) == 'L') return;
	}
	else
	{
		for(i=0;i< formname.indexCnt.length ; i++)
		{
			if ( formname.indexCnt[i].checked == true && goAddCartCheckDigital(formname.ejkGb[i].value) == 'L') return;
		}
	}

	chkIndex = formname.indexCnt;
	isCheck = false;
	if(typeof(chkIndex.length) == "undefined") {
		if(chkIndex.type == 'checkbox') {
			if(chkIndex.checked) {
				// ������α� �űԹ��� ��ũ��Ʈ ����
				try {n_click_logging("/click?button=cart&goods_no=" + formname.barcode.value + "&ejk_gb=" + formname.ejkGb.value);} catch(e){}
				isCheck = true;
			}
		}
	} else {
		for( var i=0; i<chkIndex.length; i++) {
			if(chkIndex[i].type == 'checkbox') {
				if(chkIndex[i].checked) {
					// ������α� �űԹ��� ��ũ��Ʈ ����
					try {n_click_logging("/click?button=cart&goods_no=" + formname.barcode[i].value + "&ejk_gb=" + formname.ejkGb[i].value);} catch(e){}
					isCheck = true;
					//break;
				}
			}
		}
	}
	if(!isCheck) {
		alert("��ǰ�� �ϳ��� �����ϼž� �մϴ�.");
	} else {
		if(typeof(targetName) != "undefined") {
			formname.target = targetName;
		}
		if(formname.target=="_parent")
		{
			formname.target = "HiddenActionFrame";
		}
		//formname.action = domain+"/cart/cartAdd.laf" + clickstr;
		if(clickstr != ""){
			formname.action = orderDomain+"/cart/addCart" + clickstr + "&spbk_dvsn_code=002";
		}else{
			formname.action = orderDomain+"/cart/addCart?spbk_dvsn_code=002&rtnYsno=Y";
		}
		formname.submit();
		window.addEventListener( 'message', receiveMsgFromParent );
	}
formname.action="";	
}

function goEvent(barcode, eventId, ejkGb, targetName) {
		if(typeof(targetName) != 'undefined') {
			document.proCartOneForm.target = targetName;
		}

        if(ejkGb == 'ENG' || ejkGb == 'JAP' || ejkGb == 'BNT' || ejkGb == 'JNT') {
		    document.proCartOneForm.action = domain+"/event/eventEngViewByPid.laf";
        } else if (ejkGb == 'MUC') {
            document.proCartOneForm.action = domain+"/event/eventMucViewByPid.laf";
        } else if (ejkGb == 'DVD') {
            document.proCartOneForm.action = domain+"/event/eventDvdViewByPid.laf";
        } else {
            document.proCartOneForm.action = domain+"/event/eventViewByPid.laf";
        }
		document.proCartOneForm.eventId.value = eventId;
		document.proCartOneForm.barcode.value = barcode;
		document.proCartOneForm.ejkGb.value = ejkGb;
		document.proCartOneForm.submit();

}

// �̺�Ʈ ȣ��� �ű� Ŭ���� ����
// 2011.12.14 �Ӽ���
function goEventKc(barcode, eventId, ejkGb, Kc,  targetName) {
		if(typeof(targetName) != 'undefined') {
			document.proCartOneForm.target = targetName;
		}

        if(ejkGb == 'ENG' || ejkGb == 'JAP' || ejkGb == 'BNT' || ejkGb == 'JNT') {
		    document.proCartOneForm.action = domain+"/event/eventEngViewByPid.laf";
        } else if (ejkGb == 'MUC') {
            document.proCartOneForm.action = domain+"/event/eventMucViewByPid.laf";
        } else if (ejkGb == 'DVD') {
            document.proCartOneForm.action = domain+"/event/eventDvdViewByPid.laf";
        } else {
            document.proCartOneForm.action = domain+"/event/eventViewByPid.laf";
        }
		document.proCartOneForm.eventId.value = eventId;
		document.proCartOneForm.barcode.value = barcode;
		document.proCartOneForm.ejkGb.value = ejkGb;
		document.proCartOneForm.Kc.value = Kc;
		
		document.proCartOneForm.submit();

}

function goEventPop(barcode, eventId, ejkGb, targetName) {
		if(typeof(targetName) != 'undefined') {
			document.proCartOneForm.target = targetName;

		}

        if(ejkGb == 'ENG' || ejkGb == 'JAP' || ejkGb == 'BNT' || ejkGb == 'JNT') {
		    document.proCartOneForm.action = domain+"/event/eventEngViewByPid.laf";
        } else if (ejkGb == 'MUC') {
            document.proCartOneForm.action = domain+"/event/eventMucViewByPid.laf";
        } else if (ejkGb == 'DVD') {
            document.proCartOneForm.action = domain+"/event/eventDvdViewByPid.laf";
        } else {
            document.proCartOneForm.action = domain+"/event/eventViewByPid.laf";
        }


    var w = window.open('about:blank' ,'eventpop') ;
    document.proCartOneForm.target = "eventpop";
		document.proCartOneForm.eventId.value = eventId;
		document.proCartOneForm.barcode.value = barcode;
		document.proCartOneForm.ejkGb.value = ejkGb;
		document.proCartOneForm.method = "post";
		document.proCartOneForm.submit();

}

function showAddWish(nowIndex) {
	eval("tabWish" + nowIndex + ".style.display = '';");
}

function hideAddWish(nowIndex) {
	eval("tabWish" + nowIndex + ".style.display = 'none';");
}

function showAddWishList(obj) {
	obj.style.display = "";
}

function hideAddWishList(obj) {
	obj.style.display = "none";
}


//�ٷα����ϱ� ���� ó�� ȣ���ϴ� �Լ�.
function goDirectOrder(formname, nowIndex) {
    if(typeof(formname.qty[nowIndex-1]) == "undefined") {
		if(formname.qty.value == "0") {
			alert("�ֹ������� 1�� �̻��̾�� �մϴ�.");
		} else {
			document.proCartOneForm.barcode.value = formname.barcode.value;
			document.proCartOneForm.ejkGb.value = formname.ejkGb.value;
			document.proCartOneForm.qty.value = formname.qty.value;
			switch( goAddCartCheckDigital(document.proCartOneForm.ejkGb.value))
			{
				case 'L':
					return;
					break;
				case 'D':
					document.proCartOneForm.cartType.value = (typeof(formname.cartType[nowIndex-1]) == "undefined") ? formname.cartType.value : formname.cartType[nowIndex-1].value;
					break;
			}
			document.proCartOneForm.action= domain+"/cart/TotDirectAddCart.jsp";
	 		//document.proCartOneForm.submit();
			if(document.proCartOneForm.barcode.value == "9791159931444" ){					
				NetFunnel_Action({}, document.proCartOneForm);
			} else {
				document.proCartOneForm.submit();
			}
			
		}
	} else {
		if(formname.qty[nowIndex-1].value == "0") {
			alert("�ֹ������� 1�� �̻��̾�� �մϴ�.");
		} else {
			document.proCartOneForm.barcode.value = formname.barcode[nowIndex-1].value;
			if(typeof(formname.ejkGb[nowIndex-1]) == "undefined") {
				document.proCartOneForm.ejkGb.value = formname.ejkGb.value;
			} else {
				document.proCartOneForm.ejkGb.value = formname.ejkGb[nowIndex-1].value;
			}
			document.proCartOneForm.qty.value = formname.qty[nowIndex-1].value;
			switch( goAddCartCheckDigital(document.proCartOneForm.ejkGb.value))
			{
				case 'L':
					return;
					break;
				case 'D':
					document.proCartOneForm.cartType.value = (typeof(formname.cartType[nowIndex-1]) == "undefined") ? formname.cartType.value : formname.cartType[nowIndex-1].value;
					break;
			}
			if (document.proCartOneForm.ejkGb.value == "UMI")
			{
				try {
			    document.proCartOneForm.kind.value = getvalueofradio(eval("formname.kind"+(nowIndex-1)));
			  } catch(e){}
			}
			document.proCartOneForm.action= domain+"/cart/TotDirectAddCart.jsp";
			//document.proCartOneForm.submit();
			if(document.proCartOneForm.barcode.value == "9791159931444" ){					
				NetFunnel_Action({}, document.proCartOneForm);
			} else {
				document.proCartOneForm.submit();
			}
		}
	}
}

//�ٷα����ϱ� �α��� �������� �̵�.
function goDirectOrderTot(formname, nowIndex) {

	if(typeof(formname.qty[nowIndex-1]) == "undefined") {
		if(formname.qty.value == "0") {
			alert("�ֹ������� 1�� �̻��̾�� �մϴ�.");
		} else {
			document.proCartOneForm.barcode.value = formname.barcode.value;
			document.proCartOneForm.ejkGb.value = formname.ejkGb.value;
			document.proCartOneForm.qty.value = formname.qty.value;
			
			if(formname.ejkGb.value == 'EBK' || formname.ejkGb.value == 'AUD' || formname.ejkGb.value == 'VOD' ||
	 		   formname.ejkGb.value == 'KDS' || formname.ejkGb.value == 'DUM' || formname.ejkGb.value == 'DSE' || 
	 		   formname.ejkGb.value == 'DMA' || (formname.ejkGb.value == 'KOR' && formname.cartType.value == 'BTK'))
	 		{   
				document.proCartOneForm.cartType.value = (typeof(formname.cartType[nowIndex-1]) == "undefined") ? formname.cartType.value : formname.cartType[nowIndex-1].value;
            }
            
			//�α��� ��.
     		if(formname.loginYN.value == 'N')
     		{
	 			document.proCartOneForm.method="post";
	 			document.proCartOneForm.action= sslDomain+"/login/loginDirect.laf?kindtype=directorder";
	 			document.proCartOneForm.submit();
			//�α��� ��.
	 		}else {
	 		   //�߰����� �ٷα����ϱ�.
	 		   if(formname.ejkGb.value == 'USE')
	 		   {
	 		         document.location.href= "https://used.kyobobook.co.kr/order/orderDetail.ink?barcode="+formname.barcode.value+"&qty=1&totOrderYn=Y";
	 			//ebook��ǰ �ٷα����ϱ�. 
	 		   }else{
	    			 document.proCartOneForm.method="get";
	    			 document.proCartOneForm.action= sslDomain+"/cart/cartDirectAdd.laf";
	 			     document.proCartOneForm.submit();
	 		   }	     
	 		}		
		}
	} else {
		if(formname.qty[nowIndex-1].value == "0") {
			alert("�ֹ������� 1�� �̻��̾�� �մϴ�.");
		} else {
			document.proCartOneForm.barcode.value = formname.barcode[nowIndex-1].value;
			if(typeof(formname.ejkGb[nowIndex-1]) == "undefined") {
				document.proCartOneForm.ejkGb.value = formname.ejkGb.value;
			} else {
				document.proCartOneForm.ejkGb.value = formname.ejkGb[nowIndex-1].value;
			}
			document.proCartOneForm.qty.value = formname.qty[nowIndex-1].value;
			
			if(formname.ejkGb[nowIndex-1].value == 'EBK' || formname.ejkGb[nowIndex-1].value == 'AUD' || formname.ejkGb[nowIndex-1].value == 'VOD' ||
	 		   formname.ejkGb[nowIndex-1].value == 'KDS' || formname.ejkGb[nowIndex-1].value == 'DUM' || formname.ejkGb[nowIndex-1].value == 'DSE' || 
	 		   formname.ejkGb[nowIndex-1].value == 'DMA' || (formname.ejkGb[nowIndex-1].value == 'KOR' && formname.cartType.value == 'BTK'))
	 		{   
				document.proCartOneForm.cartType.value = (typeof(formname.cartType[nowIndex-1]) == "undefined") ? formname.cartType.value : formname.cartType[nowIndex-1].value;
            }
            
			if (document.proCartOneForm.ejkGb.value == "UMI")
			{
				try {
			    document.proCartOneForm.kind.value = getvalueofradio(eval("formname.kind"+(nowIndex-1)));
			  } catch(e){}
			}
			//�α��� ��.
     		if(formname.loginYN.value == 'N')
     		{
	 			document.proCartOneForm.method="post";
	 			document.proCartOneForm.action= sslDomain+"/login/loginDirect.laf?kindtype=directorder";
	 			document.proCartOneForm.submit();
	 		//�α��� ��.
	 		}else {
	 		   //�߰����� �ٷα����ϱ�.
	 		   if(formname.ejkGb[nowIndex-1].value == 'USE')
	 		   {
	 		         document.location.href= "https://used.kyobobook.co.kr/order/orderDetail.ink?barcode="+formname.barcode[nowIndex-1].value+"&qty=1&totOrderYn=Y";
	 		   }else{
	    			 document.proCartOneForm.method="get";
	    			 document.proCartOneForm.action= sslDomain+"/cart/cartDirectAdd.laf";
	 			     document.proCartOneForm.submit();
	 		   }	     
	 		}		
		}
	}
}

//�ٷα����ϱ� ó��.
function goNomemOrder(barcode,ejkGb,qty,cartType) {
        
        if(barcode == "undefined" || ejkGb == "undefined" || qty == "undefined" || 
           barcode == "" || ejkGb == "" | qty == "" )
        {
           alert("�Է������� �����մϴ�. �Է����� Ȯ�ιٶ��ϴ�.");
           history.go(-2);
        }else{
           //�߰����� �ٷα����ϱ�.
	 	   if(ejkGb == 'USE')
	 	   {
	 	        document.location.href= "https://used.kyobobook.co.kr/order/orderDetail.ink?barcode="+barcode+"&qty=1&totOrderYn=Y";
	 	   }else{
           		//document.location.href= domain+"/cart/cartDirectAdd.laf?barcode="+barcode+"&ejkGb="+ejkGb+"&qty="+qty+"&cartType="+cartType;
           		document.location.href= orderDomain + "/cart/addCart?spbk_dvsn_code=001&barcode="+barcode+"&ejkGb="+ejkGb+"&qty="+qty+"&cartType="+cartType;
           }
        }   
}

function goDirectOrderPoster(formname) {
	if(formname.qty.value == "0") {
		alert("�ֹ������� 1�� �̻��̾�� �մϴ�.");
	} else {
		formname.posterAdd.value = "true";
		formname.action= domain+"/cart/cartDirectAdd.laf";
		formname.submit();
	}
}

function goAddCart(formname) {
	if(formname.qty.value == "0") {
		alert("�ֹ������� 1�� �̻��̾�� �մϴ�.");
	} else {
		if(typeof(document.proCartOneForm) == "undefined") {
			document.proCartOneForm.barcode.value = formname.barcode.value;
			document.proCartOneForm.ejkGb.value = formname.ejkGb.value;
			document.proCartOneForm.qty.value = formname.qty.value;
			// ������α� �űԹ��� ��ũ��Ʈ ����
			try {n_click_logging("/click?button=cart&goods_no=" + formname.barcode.value + "&ejk_gb=" + formname.ejkGb.value);} catch(e){}

			switch( goAddCartCheckDigital(document.proCartOneForm.ejkGb.value))
			{
				case 'L':
					return;
					break;
				case 'D':
					document.proCartOneForm.cartType.value = formname.cartType.value;
					break;
			}

		}

		formname.target = "iframecart";
		formname.action = orderDomain+"/cart/addCart" + "?spbk_dvsn_code=002&rtnYsno=Y";
		formname.submit();
		window.addEventListener( 'message', receiveMsgFromParent );
	}
}

/*�ٷε帲 �ٷ� �ֹ� Function 2016. 09. 30 ���漺*/
function goAddBaroDreamOrder(formname) {
	if(formname.qty.value == "0") {
		alert("�ֹ������� 1�� �̻��̾�� �մϴ�.");
	} else {
		if(typeof(document.proCartOneForm) == "undefined") {
			document.proCartOneForm.barcode.value = formname.barcode.value;
			document.proCartOneForm.ejkGb.value = formname.ejkGb.value;
			document.proCartOneForm.qty.value = formname.qty.value;

			switch( goAddCartCheckDigital(document.proCartOneForm.ejkGb.value))
			{
				case 'L':
					return;
					break;
				case 'D':
					document.proCartOneForm.cartType.value = formname.cartType.value;
					break;
			}

		}

		formname.target = "iframecart";
		formname.action = orderDomain+"/cart/addCart" + "?spbk_dvsn_code=001&rtnYsno=Y";
		formname.submit();
		window.addEventListener( 'message', receiveMsgFromParent );
	}
}

function goAddCartPoster(formname) {
	if(formname.qty.value == "0") {
		alert("�ֹ������� 1�� �̻��̾�� �մϴ�.");
	} else {
		if(typeof(document.proCartOneForm) == "undefined") {
			document.proCartOneForm.barcode.value = formname.barcode.value;
			document.proCartOneForm.ejkGb.value = formname.ejkGb.value;
			document.proCartOneForm.qty.value = formname.qty.value;
			
			// ������α� �űԹ��� ��ũ��Ʈ ����
			try {n_click_logging("/click?button=cart&goods_no=" + formname.barcode.value + "&ejk_gb=" + formname.ejkGb.value);} catch(e){}

			switch( goAddCartCheckDigital(document.proCartOneForm.ejkGb.value))
			{
				case 'L':
					return;
					break;
				case 'D':
					document.proCartOneForm.cartType.value = formname.cartType.value;
					break;
			}
		}
		formname.posterAdd.value = "true";
		formname.target = "iframecart";
		//formname.action = domain+"/cart/cartAdd.laf";
		formname.action = orderDomain+"/cart/addCart" + "?spbk_dvsn_code=002&rtnYsno=Y";
		formname.submit();
		window.addEventListener( 'message', receiveMsgFromParent );
	}
}

function goAddCartOne(formname, nowIndex, targetName) {

    /* 2012.04.16 ���� - �ܰǸ� ��ٱ��Ͽ� ��� �� �ֵ��� ���� */
	if(typeof(formname.indexCnt) != "undefined") {
		chkIndex = formname.indexCnt;
		for(i=0;i< formname.indexCnt.length ; i++){
			if(chkIndex[i].type == 'checkbox') {
				if(chkIndex[i].checked) {
					chkIndex[i].checked = false;
				}
			}
		}
	}

	if(typeof(formname.indexCnt) != "undefined") {
		chkIndex = formname.indexCnt;
		if(typeof(chkIndex[nowIndex-1]) == "undefined") {
			if(!chkIndex.checked) {
				chkIndex.checked = true;
			}
		} else {
			if(!chkIndex[nowIndex-1].checked) {
				chkIndex[nowIndex-1].checked = true;
			}
		}
		formname.target = document.proCartOneForm.target;
		if(typeof(targetName) != "undefined") {
			formname.target = targetName;
		}
		if(formname.target=="_parent")
		{
			formname.target = "HiddenActionFrame";
		}

		document.proCartOneForm.barcode.value = (typeof(formname.indexCnt[nowIndex-1]) == "undefined") ? formname.barcode.value : formname.barcode[nowIndex-1].value;
		document.proCartOneForm.ejkGb.value = (typeof(formname.indexCnt[nowIndex-1]) == "undefined") ? formname.ejkGb.value : formname.ejkGb[nowIndex-1].value;
		document.proCartOneForm.qty.value = (typeof(formname.indexCnt[nowIndex-1]) == "undefined") ? formname.qty.value : formname.qty[nowIndex-1].value;

		switch( goAddCartCheckDigital(document.proCartOneForm.ejkGb.value))
		{
			case 'L':
				return;
				break;
			case 'D':
				document.proCartOneForm.cartType.value = 'addMast';
				break;
		}
		
		// ������α� �űԹ��� ��ũ��Ʈ ����
		try {n_click_logging("/click?button=cart&goods_no=" + document.proCartOneForm.barcode.value + "&ejk_gb=" + document.proCartOneForm.ejkGb.value);} catch(e){}

		//formname.action = domain+"/cart/cartAdd.laf";
		formname.action = orderDomain+"/cart/addCart?spbk_dvsn_code=002&rtnYsno=Y";
		formname.submit();
		window.addEventListener( 'message', receiveMsgFromParent );


	} else {
		if(typeof(formname.qty[nowIndex-1]) == "undefined") {
			if(formname.qty.value == "0") {
				alert("�ֹ������� 1�� �̻��̾�� �մϴ�.");
			} else {
				document.proCartOneForm.barcode.value = formname.barcode.value;
				document.proCartOneForm.ejkGb.value = formname.ejkGb.value;
				document.proCartOneForm.qty.value = formname.qty.value;

				switch( goAddCartCheckDigital(document.proCartOneForm.ejkGb.value))
				{
					case 'L':
						return;
						break;
					case 'D':
						document.proCartOneForm.cartType.value = (typeof(formname.cartType[nowIndex-1]) == "undefined") ? formname.cartType.value : formname.cartType[nowIndex-1].value;
						break;
				}
				
				// ������α� �űԹ��� ��ũ��Ʈ ����
				try {n_click_logging("/click?button=cart&goods_no=" + document.proCartOneForm.barcode.value + "&ejk_gb=" + document.proCartOneForm.ejkGb.value);} catch(e){}
				//document.proCartOneForm.action="/cart/cartAdd.laf";
				document.proCartOneForm.action=orderDomain+"/cart/addCart?spbk_dvsn_code=002&rtnYsno=Y";
				document.proCartOneForm.submit();
				window.addEventListener( 'message', receiveMsgFromParent );

			}
		} else {
			if(formname.qty[nowIndex-1].value == "0") {
				alert("�ֹ������� 1�� �̻��̾�� �մϴ�.");
			} else {
				document.proCartOneForm.barcode.value = formname.barcode[nowIndex-1].value;
				if(typeof(formname.ejkGb[nowIndex-1]) == "undefined") {
					document.proCartOneForm.ejkGb.value = formname.ejkGb.value;
				} else {
					document.proCartOneForm.ejkGb.value = formname.ejkGb[nowIndex-1].value;
				}
				document.proCartOneForm.qty.value = formname.qty[nowIndex-1].value;

				goAddCartCheckDigital(document.proCartOneForm.ejkGb.value);
				switch( goAddCartCheckDigital(document.proCartOneForm.ejkGb.value))
				{
					case 'L':
						return;
						break;
					case 'D':
						document.proCartOneForm.cartType.value = (typeof(formname.cartType[nowIndex-1]) == "undefined") ? formname.cartType.value : formname.cartType[nowIndex-1].value;
						break;
				}
				
				// ������α� �űԹ��� ��ũ��Ʈ ����
				try {n_click_logging("/click?button=cart&goods_no=" + document.proCartOneForm.barcode.value + "&ejk_gb=" + document.proCartOneForm.ejkGb.value);} catch(e){}

				//document.proCartOneForm.action= domain+"/cart/cartAdd.laf";
				document.proCartOneForm.action= orderDomain+"/cart/addCart?spbk_dvsn_code=002&rtnYsno=Y";
				document.proCartOneForm.submit();
				window.addEventListener( 'message', receiveMsgFromParent );

			}
		}
	}
formname.action="";		
}

function goEditCartQty(formname, objname, count, barcode, key, ejkGb, mode) {
	eval("var obj = formname." + objname + ";");
	var indexCnt = parseInt(count)-1;
	var cartGb = formname.cartGb?formname.cartGb.value:"N";
	var siteCd = formname.siteCd?formname.siteCd.value:"";

	if(typeof(obj[indexCnt]) == "undefined") {
		if(obj.value == "0") {
			alert("��������� 1�� �̻��̾�� �մϴ�.");
			try { obj.value = new Number( getvaluebyindex(formname.oqty,0) ); } catch(e){}
		} else {
			if(mode == 'memid') {
				document.location.href = domain+"/cart/cartUpdateQty.laf?qty=" + obj.value + "&barcode=" + barcode + "&memid=" + key + "&ejkGb=" + ejkGb + "&cartGb=" + cartGb + "&siteCd=" + siteCd;
			} else if(mode == 'gId') {
				document.location.href = domain+"/cart/cartUpdateQty.laf?qty=" + obj.value + "&barcode=" + barcode + "&gId=" + key + "&ejkGb=" + ejkGb + "&cartGb=" + cartGb + "&siteCd=" + siteCd;
			}
		}
	} else {
		if(obj[indexCnt].value == "0") {
			alert("��������� 1�� �̻��̾�� �մϴ�.");
			try { obj[indexCnt].value = new Number( getvaluebyindex(formname.oqty,indexCnt) ); } catch(e){}
		} else {
			if(mode == 'memid') {
				document.location.href = domain+"/cart/cartUpdateQty.laf?qty=" + obj[indexCnt].value + "&barcode=" + barcode + "&memid=" + key + "&ejkGb=" + ejkGb + "&cartGb=" + cartGb + "&siteCd=" + siteCd;

			} else if(mode == 'gId') {
				document.location.href = domain+"/cart/cartUpdateQty.laf?qty=" + obj[indexCnt].value + "&barcode=" + barcode + "&gId=" + key + "&ejkGb=" + ejkGb + "&cartGb=" + cartGb + "&siteCd=" + siteCd;
			}
		}
	}
}

function goDeleteCartProduct(formname, objname, count, barcode, key, ejkGb, mode) {
	eval("var obj = formname." + objname + ";");
	var cartGb = formname.cartGb?formname.cartGb.value:"N";
	var siteCd = formname.siteCd?formname.siteCd.value:"";

	var indexCnt = parseInt(count)-1;
	if(typeof(obj[indexCnt]) == "undefined") {
		if(mode == 'memid') {
			document.location.href = domain+"/cart/cartProductDelete.laf?barcode=" + barcode + "&memid=" + key + "&ejkGb=" + ejkGb + "&cartGb=" + cartGb + "&siteCd=" + siteCd;
		} else if(mode == 'gId') {
			document.location.href = domain+"/cart/cartProductDelete.laf?barcode=" + barcode + "&gId=" + key + "&ejkGb=" + ejkGb + "&cartGb=" + cartGb + "&siteCd=" + siteCd;
		}
	} else {
		if(mode == 'memid') {
			document.location.href = domain+"/cart/cartProductDelete.laf?barcode=" + barcode + "&memid=" + key + "&ejkGb=" + ejkGb + "&cartGb=" + cartGb + "&siteCd=" + siteCd;
		} else if(mode == 'gId') {
			document.location.href = domain+"/cart/cartProductDelete.laf?barcode=" + barcode + "&gId=" + key + "&ejkGb=" + ejkGb + "&cartGb=" + cartGb + "&siteCd=" + siteCd;
		}
	}
}

function goDeleteCartProductAll(key, formname, mode) {
	if(confirm("������ �����Ͻðڽ��ϱ�?")) {
		var cartGb = formname.cartGb?formname.cartGb.value:"N";
		var siteCd = formname.siteCd?formname.siteCd.value:"";
		chkIndex = formname.indexCnt;
		isCheck = false;
		if( typeof(formname.indexCnt[0]) == 'undefined') {
			if(chkIndex.checked) {
				isCheck = true;
			}
		} else {
			for( var i=0; i<chkIndex.length; i++) {
				if(chkIndex[i].type == 'checkbox') {
					if(chkIndex[i].checked) {
						isCheck = true;
						break;
					}
				}
			}
		}
		if(!isCheck) {
			alert("�����Ͻ� ��ǰ�� �ϳ� �̻� �����ϼž� �մϴ�.");
		} else {
			if(mode == 'memid') {
				formname.action = domain+"/cart/cartProductDeleteAll.laf?memid=" + key+ "&cartGb=" + cartGb + "&siteCd=" + siteCd;
			} else if(mode == 'gId') {
				formname.action = domain+"/cart/cartProductDeleteAll.laf?gId=" + key+ "&cartGb=" + cartGb + "&siteCd=" + siteCd;
			}
			formname.submit();
		}
	}
}

function goOrderList() {

}

function goMyRoom() {
	//document.location.href = domain+"/myroom/myroomMain.laf?Kc=GNHHNOmyrom&orderClick=c08";
	document.location.href = orderDomain + "/myroom/main?Kc=GNHHNOmyrom&orderClick=c08";
}

function goSendInquiry() {
	//document.location.href = domain+"/myroom/orderList.laf?Kc=GNHHNOorderlist&orderClick=c07";
	document.location.href = orderDomain + "/myroom/order/orderList?Kc=GNHHNOorderlist&orderClick=c07";
}

function goCSCenter() {
	document.location.href = domain+"/cscenter/csCenterMain.laf?Kc=GNHHNOcscenter&orderClick=c10";
}

function goDegitory() {

}


function goOffLine() {
	document.location.href = domain+"/store/mainTopStore.laf";
}
//===============================================================
// validate checkbox , at least one must be checked... ->mistyi
//===============================================================
function isChecked(el) {
	var cnt=0;
	if (el==null) {
		return false;
	}
	if (el.length==null) {
		if(el.type == 'checkbox') {
			if(el.checked) {
				cnt++;
			}
		}
	} else {
		for( var i=0; i<el.length; i++) {
			if(el[i].type == 'checkbox') {
				if(el[i].checked) {
					cnt++;
				}
			}
		}
	}
	if (cnt>0) return true;
	else return false;
}


// TP �������� ���� ����  20091112 �ѽ¿�
//===============================================================
// add multi item to booklog mylist ->mistyi
//===============================================================
function goAddMyList(formname,targetName) {
	var frmTarget = formname.target;
	var frmAction = formname.action;

	var ejkgbList = "";
	var barcodeList = "";
	try{
		chkIndex = formname.indexCnt;
		if (!isChecked(chkIndex)) {
			alert("��ǰ�� �ϳ��� �����ϼž� �մϴ�.");
			return;
		}
		chkIndex = formname.indexCnt;
		for( var i=0; i<chkIndex.length; i++) {
			if(chkIndex[i].type == 'checkbox') {
				if(chkIndex[i].checked) {
					if(ejkgbList == ''){
						ejkgbList = formname.ejkGb[i].value;
					}else{
						ejkgbList = ejkgbList + "," + formname.ejkGb[i].value;
					}
					if(barcodeList == ''){
						barcodeList = formname.barcode[i].value;
					}else{
						barcodeList = barcodeList + "," + formname.barcode[i].value;
					}
				}
			}
		}

		var w = window.open('about:blank','addmylist','width=420,height=350,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no');
		formname.target = "addmylist";
		formname.action = "http://booklog.kyobobook.co.kr/blog/itemToBasketView.do?haabClcd="+ejkgbList+"&brcdNmbr="+barcodeList+"&viewDvcd=1";
		formname.method = "post";
		formname.submit();
	}catch(e){
		alert(e.message);
	}finally{
		formname.target=frmTarget;
		formname.action=frmAction;
	}
}

//===============================================================
// add one item to booklog mylist ->mistyi
//===============================================================
function goAddMyOne(formname, nowIndex) {
	var barcode ="";
	var ejkGb ="";

	if(typeof(formname.indexCnt) != "undefined") {
		var frmTarget = formname.target;
		var frmAction = formname.action;
		try{
			chkIndex = formname.indexCnt;
			if(typeof(chkIndex[nowIndex-1]) == "undefined") {
				if(!chkIndex.checked) {
					chkIndex.checked = true;
				}
				barcode = formname.barcode.value;
				ejkGb = formname.ejkGb.value;
			} else {
				if(!chkIndex[nowIndex-1].checked) {
					chkIndex[nowIndex-1].checked = true;
				}
				barcode = formname.barcode[nowIndex-1].value;
				ejkGb = formname.ejkGb[nowIndex-1].value;
			}
			var w = window.open('about:blank','addmylist','width=420,height=350,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no');
			formname.target = "addmylist";
			formname.action = "http://booklog.kyobobook.co.kr/blog/itemToBasketView.do?haabClcd="+ejkGb+"&brcdNmbr="+barcode+"&viewDvcd=1";
			formname.method = "post";
			formname.submit();
		}catch(e){
			alert(e.message);
		}finally{
			formname.target=frmTarget;
			formname.action=frmAction;
		}
	} else {
		var frm = document.proCartOneForm;
		var frmTarget = frm.target;
		var frmAction = frm.action;
		try{
			if(typeof(formname.qty[nowIndex-1]) == "undefined") {
				frm.barcode.value = formname.barcode.value;
				frm.ejkGb.value = formname.ejkGb.value;
			} else {
				frm.barcode.value = formname.barcode[nowIndex-1].value;
				if(typeof(formname.ejkGb[nowIndex-1]) == "undefined") {
					frm.ejkGb.value = formname.ejkGb.value;
				} else {
					frm.ejkGb.value = formname.ejkGb[nowIndex-1].value;
				}
			}
			var w = window.open('about:blank','addmylist','width=420,height=350,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no');
			frm.target = "addmylist";
			frm.action = "http://booklog.kyobobook.co.kr/blog/itemToBasketView.do?haabClcd="+formname.ejkGb.value+"&brcdNmbr="+formname.barcode.value+"&viewDvcd=1";
			frm.submit();
		}catch(e){
			alert(e.message);
		}finally{
			frm.target=frmTarget;
			frm.action=frmAction;
		}
	}
}

//===============================================================
// add multi item to booklog own list ->mistyi
//===============================================================
function goAddOwnList(formname) {
	var frmTarget = formname.target;
	var frmAction = formname.action;
	var ejkgbList = "";
	var barcodeList = "";
	
	try{
		chkIndex = formname.indexCnt;
		if (!isChecked(chkIndex)) {
			alert("��ǰ�� �ϳ��� �����ϼž� �մϴ�.");
			return;
		}

		chkIndex = formname.indexCnt;
		for( var i=0; i<chkIndex.length; i++) {
			if(chkIndex[i].type == 'checkbox') {
				if(chkIndex[i].checked) {
					if(ejkgbList == ''){
						ejkgbList = formname.ejkGb[i].value;
					}else{
						ejkgbList = ejkgbList + "," + formname.ejkGb[i].value;
					}
					if(barcodeList == ''){
						barcodeList = formname.barcode[i].value;
					}else{
						barcodeList = barcodeList + "," + formname.barcode[i].value;
					}
				}
			}
		}

		var w = window.open('about:blank','addmylist','width=420,height=350,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no');
		formname.target = "addmylist";
		formname.action = "http://booklog.kyobobook.co.kr/blog/itemToBasketView.do?haabClcd="+ejkgbList+"&brcdNmbr="+barcodeList+"&viewDvcd=3";
		formname.method = "post";
		formname.submit();
	}catch(e){
		alert(e.message);
	}finally{
		formname.target=frmTarget;
		formname.action=frmAction;
	}
}
//===============================================================
// add one item to booklog own list ->mistyi
//===============================================================
function goAddOwnOne(formname, nowIndex) {
	var barcode ="";
	var ejkGb ="";

	if(typeof(formname.indexCnt) != "undefined") {
		var frmTarget = formname.target;
		var frmAction = formname.action;
		try{
			chkIndex = formname.indexCnt;
			if(typeof(chkIndex[nowIndex-1]) == "undefined") {
				if(!chkIndex.checked) {
					chkIndex.checked = true;
				}
				barcode = formname.barcode.value;
				ejkGb = formname.ejkGb.value;
			} else {
				if(!chkIndex[nowIndex-1].checked) {
					chkIndex[nowIndex-1].checked = true;
				}
				barcode = formname.barcode[nowIndex-1].value;
				ejkGb = formname.ejkGb[nowIndex-1].value;
			}
			var w = window.open('about:blank','addmylist','width=420,height=350,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no');
			formname.target = "addmylist";
			formname.action = "http://booklog.kyobobook.co.kr/blog/itemToBasketView.do?haabClcd="+ejkGb+"&brcdNmbr="+barcode+"&viewDvcd=3";
			formname.method = "post";
			formname.submit();
		}catch(e){
			alert(e.message);
		}finally{
			formname.target=frmTarget;
			formname.action=frmAction;
		}
	} else {
		var frm = document.proCartOneForm;
		var frmTarget = frm.target;
		var frmAction = frm.action;
		try{
			if(typeof(formname.qty[nowIndex-1]) == "undefined") {
				frm.barcode.value = formname.barcode.value;
				frm.ejkGb.value = formname.ejkGb.value;
			} else {
				frm.barcode.value = formname.barcode[nowIndex-1].value;
				if(typeof(formname.ejkGb[nowIndex-1]) == "undefined") {
					frm.ejkGb.value = formname.ejkGb.value;
				} else {
					frm.ejkGb.value = formname.ejkGb[nowIndex-1].value;
				}
			}
			var w = window.open('about:blank','addmylist','width=420,height=350,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no');
			frm.target = "addmylist";
			frm.action = "http://booklog.kyobobook.co.kr/blog/itemToBasketView.do?haabClcd="+formname.ejkGb.value+"&brcdNmbr="+formname.barcode.value+"&viewDvcd=3";

			frm.submit();
		}catch(e){
			alert(e.message);
		}finally{
			frm.target=frmTarget;
			frm.action=frmAction;
		}
	}
}
//===============================================================
// add multi item to booklog wish list ->mistyi
//===============================================================
function goAddWishList(formname) {
	var frmHref = document.location.href;
	var frmTarget = formname.target;
	var frmAction = formname.action;

	var ejkgbList = "";
	var barcodeList = "";
	//==========�α��ΰ��� ����==========//
	if(formname.loginYN.value == 'N'){
		if(parent.document == null || parent.document == "undefined"){
			document.location = "/login/login.laf?retURL=" + escape(location.href);
		}else{
			parent.document.location = "/login/login.laf?retURL=" + escape(parent.location.href);
		}
		return;
	}
	//==========�α��ΰ��� ����==========//
	try{
		chkIndex = formname.indexCnt;
		if (!isChecked(chkIndex)) {
			alert("��ǰ�� �ϳ��� �����ϼž� �մϴ�.");
			return;
		}

		chkIndex = formname.indexCnt;
		for( var i=0; i<chkIndex.length; i++) {
			if(chkIndex[i].type == 'checkbox') {
				if(chkIndex[i].checked) {
					if(ejkgbList == ''){
						ejkgbList = formname.ejkGb[i].value;
					}else{
						ejkgbList = ejkgbList + "," + formname.ejkGb[i].value;
					}
					if(barcodeList == ''){
						barcodeList = formname.barcode[i].value;
					}else{
						barcodeList = barcodeList + "," + formname.barcode[i].value;
					}
				}
			}
		}

		var w = window.open('about:blank','addwishlist','width=380,height=250');
		formname.target = "addwishlist";
		formname.action = "http://booklog.kyobobook.co.kr/blog/itemToBasketView.do?haabClcd="+ejkgbList+"&brcdNmbr="+barcodeList+"&viewDvcd=2";
		//alert(formname.action);
		formname.method = "post";
		formname.submit();
	}catch(e){
		alert(e.message);
	}finally{
		formname.target=frmTarget;
		formname.action=frmAction;
	}
}
//===============================================================
// add one item to booklog wish list ->mistyi
//===============================================================
function goAddWishOne(formname, nowIndex) {
	var barcode ="";
	var ejkGb ="";
	//==========�α��ΰ��� ����==========//
	if(formname.loginYN.value == 'N'){
		if(parent.document == null || parent.document == "undefined"){
			document.location = "/login/login.laf?retURL=" + escape(location.href);
		}else{
			parent.document.location = "/login/login.laf?retURL=" + escape(parent.location.href);
		}
		return;
	}
	//==========�α��ΰ��� ����==========//
	if(typeof(formname.indexCnt) != "undefined") {
		var frmTarget = formname.target;
		var frmAction = formname.action;
		try{
			chkIndex = formname.indexCnt;
			if(typeof(chkIndex[nowIndex-1]) == "undefined") {
				if(!chkIndex.checked) {
					chkIndex.checked = true;
				}
				barcode = formname.barcode.value;
				ejkGb = formname.ejkGb.value;
			} else {
				if(!chkIndex[nowIndex-1].checked) {
					chkIndex[nowIndex-1].checked = true;
				}
				barcode = formname.barcode[nowIndex-1].value;
				ejkGb = formname.ejkGb[nowIndex-1].value;
			}

			var w = window.open('about:blank','addwishlist','width=380,height=250');
			formname.target = "addwishlist";
			formname.action = "http://booklog.kyobobook.co.kr/blog/itemToBasketView.do?haabClcd="+ejkGb+"&brcdNmbr="+barcode+"&viewDvcd=2";
			formname.method = "post";
			formname.submit();
		}catch(e){
			alert(e.message);
		}finally{
			formname.target=frmTarget;
			formname.action=frmAction;
		}
	} else {
		var frm = document.proCartOneForm;
		var frmTarget = frm.target;
		var frmAction = frm.action;
		try{
			if(typeof(formname.qty[nowIndex-1]) == "undefined") {
				frm.barcode.value = formname.barcode.value;
				frm.ejkGb.value = formname.ejkGb.value;
			} else {
				frm.barcode.value = formname.barcode[nowIndex-1].value;
				if(typeof(formname.ejkGb[nowIndex-1]) == "undefined") {
					frm.ejkGb.value = formname.ejkGb.value;
				} else {
					frm.ejkGb.value = formname.ejkGb[nowIndex-1].value;
				}
			}
			var w = window.open('about:blank','addwishlist','width=380,height=250');
			frm.target = "addwishlist";
			frm.action = "http://booklog.kyobobook.co.kr/blog/itemToBasketView.do?haabClcd="+formname.ejkGb.value+"&brcdNmbr="+formname.barcode.value+"&viewDvcd=2";

			frm.submit();
		}catch(e){
			alert(e.message);
		}finally{
			frm.target=frmTarget;
			frm.action=frmAction;
		}
	}
}

// �ֱٺ���ǰ���̾ �ƴϸ� �Է����� �ʴ´�. ex) goDetailProduct(ejkGb, linkClass, barcode)�� ~�Է�
// �ֱٺ���ǰ���̾��̶�� true
// ejkGb : ���ܼ�����, linkClass : �о��ڵ�, barcode : ���ڵ� , isRecent �ֱٺ���ǰ���̾�����
// ������������ �������� ��ũ �߰�
function goDetailProduct(ejkGb, linkClass, barcode, isRecent) {
        var sUrl = "";

        var clickstr = "";

	var ie = (document.all)? true:false;
if(ie) {
	if(event != null) {
		var curTag = event.srcElement;
		var i=0;

		while(curTag.parentElement && i<40) {
			if((curTag.tagName == "SPAN" || curTag.tagName == "span") && curTag.name == "orderclick") {
				clickstr = "&clickOrder=" + curTag.value;
				break;
			}
			curTag = curTag.parentElement;
			i++;
		}
	}
}else{
	if(typeof(isRecent) == "undefined"){
		isRecent=true;
	}
}

    var linkUrl = "";

	var subBarcode = barcode.substring(0, 2);

	if(subBarcode == '29'){
		linkUrl = domain+"/product/detailViewPackage.laf?mallGb=PKG";
	}else if (subBarcode == '14'){
		linkUrl = "http://pod.kyobobook.co.kr/newPODBookList/newPODBookDetailView.ink";
	} else {
	    if (ejkGb == 'KOR') {
	        linkUrl = domain+"/product/detailViewKor.laf?mallGb=KOR";
	    } else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=ENG";
	    } else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=JAP";
	    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
	        linkUrl = "http://music.kyobobook.co.kr/ht/record/detail/";
	    } else if (ejkGb == 'GFT') {
	        linkUrl = "http://gift.kyobobook.co.kr";
	    } else if (ejkGb == 'EBK') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?selectedLargeCategory=001";
	    } else if (ejkGb == 'AUD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/audio/audioDetail.ink?selectedLargeCategory=002";
	    } else if (ejkGb == 'VOD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/vod/vodDetail.ink?selectedLargeCategory=003";
	    } else if (ejkGb == 'KDS') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/kids/kidsDetail.ink?selectedLargeCategory=004";
	    } else if (ejkGb == 'DUM') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/article/articleDetail.ink?selectedLargeCategory=006";
		} else if (ejkGb == 'DSE') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/setDetail.laf?category=007";
		} else if (ejkGb == 'DMA') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/eMagazineDetail.laf?category=008";
		} 
	}


	 	if (subBarcode == '14'){
	 		sUrl = linkUrl + '?barcode=' + barcode;
	 	}else if(ejkGb == 'GFT') {
			sUrl = linkUrl + '/p/' + barcode;
        } else if(ejkGb == 'USE') {
			sUrl = 'http://used.kyobobook.co.kr/product/viewBookDetail.ink?cmdtBrcd='+barcode;
	    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
	        if(typeof(isRecent) == "undefined") {
				self.location.href = linkUrl+barcode;
	        }
	        else if( isRecent == true ) {
				parent.location.href = linkUrl+barcode;
	        }
		    return;
        } else  if (linkUrl != '') {
			sUrl = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode + clickstr;
	    }

        if(typeof(isRecent) == "undefined") {
			self.location.href = sUrl;
        }
        else if( isRecent == true ) {
			parent.location.href = sUrl;
        }

        return;
}

// �������� ��ũ(linkClass�� ���°��� '' �Է�)
// ejkGb : ���ܼ�����, linkClass : �о��ڵ�, barcode : ���ڵ�
// ������������ �������� ��ũ �߰�
function openDetailProduct(ejkGb, linkClass, barcode) {
    var linkUrl = "";

		var subBarcode = barcode.substring(0, 2);

		if(subBarcode == '29'){
			linkUrl = domain+"/product/detailViewPackage.laf?mallGb=PKG";
		}else if (subBarcode == '14'){
			linkUrl = "http://pod.kyobobook.co.kr/newPODBookList/newPODBookDetailView.ink";
		}else{
	    if (ejkGb == 'KOR') {
	        linkUrl = domain+"/product/detailViewKor.laf?mallGb=KOR";
	    } else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=ENG";
	    } else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=JAP";
	    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
	        linkUrl = "http://music.kyobobook.co.kr/ht/record/detail/";
	    } else if (ejkGb == 'GFT') {
	        linkUrl = "http://gift.kyobobook.co.kr";
	    } else if (ejkGb == 'EBK') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?selectedLargeCategory=001";
	    } else if (ejkGb == 'AUD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/audio/audioDetail.ink?selectedLargeCategory=002";
	    } else if (ejkGb == 'VOD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/vod/vodDetail.ink?selectedLargeCategory=003";
	    } else if (ejkGb == 'KDS') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/kids/kidsDetail.ink?selectedLargeCategory=004";
	    } else if (ejkGb == 'DUM') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/article/articleDetail.ink?selectedLargeCategory=006";
		} else if (ejkGb == 'DSE') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/setDetail.laf?category=007";
		} else if (ejkGb == 'DMA') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/eMagazineDetail.laf?category=008";
		} 
	  }

	if (subBarcode == '14'){
		var sUrl = linkUrl + '?barcode=' + barcode;
	 	window.open(sUrl,'_blank','') ;
	}else if(ejkGb == 'GFT'){
		var sUrl = linkUrl + '/p/' + barcode;
		window.open(sUrl,'_blank','') ;
    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
   	    self.location.href = linkUrl+barcode;
	    return;
  	} else if (linkUrl != '') {
        //var sUrl = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode
        var sUrl = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode;
        window.open(sUrl,'_blank','') ;
    }
    return;
}

// ��ٱ��� �󼼺��� ��â ��ũ(linkClass�� ���°��� '' �Է�)
// ejkGb : ���ܼ�����, linkClass : �о��ڵ�, barcode : ���ڵ�
function openDetailProductCart(ejkGb, linkClass, barcode) {
    var linkUrl = "";
	var sUrl = "";
	var subBarcode = barcode.substring(0, 2);

	if(subBarcode == '29'){
		linkUrl = domain+"/product/detailViewPackage.laf?mallGb=PKG";
	}else if (subBarcode == '14'){
		linkUrl = "http://pod.kyobobook.co.kr/newPODBookList/newPODBookDetailView.ink";
	}else{
	    if (ejkGb == 'KOR') {
	        linkUrl = domain+"/product/detailViewKor.laf?mallGb=KOR";
	    } else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=ENG";
	    } else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=JAP";
	    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
	        linkUrl = "http://music.kyobobook.co.kr/ht/record/detail/";
	    } else if (ejkGb == 'GFT') {
	        linkUrl = "http://gift.kyobobook.co.kr";
   	 	} else if (ejkGb == 'USE') {
	        linkUrl = "http://used.kyobobook.co.kr/product/viewBookDetail.ink";
	    } else if (ejkGb == 'EBK') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?selectedLargeCategory=001";
	    } else if (ejkGb == 'AUD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/audio/audioDetail.ink?selectedLargeCategory=002";
	    } else if (ejkGb == 'VOD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/vod/vodDetail.ink?selectedLargeCategory=003";
	    } else if (ejkGb == 'KDS') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/kids/kidsDetail.ink?selectedLargeCategory=004";
	    } else if (ejkGb == 'DUM') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/article/articleDetail.ink?selectedLargeCategory=006";
		} else if (ejkGb == 'DSE') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/setDetail.laf?category=007";
		} else if (ejkGb == 'DMA') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/eMagazineDetail.laf?category=008";
		} 
	}

	if (subBarcode == '14'){
		sUrl = linkUrl + '?barcode=' + barcode;
 	}else if(ejkGb == 'GFT'){
		sUrl = linkUrl + "/p/" + barcode;
    } else if (ejkGb == 'USE') {
		sUrl = linkUrl + "?cmdtBrcd=" + barcode;
    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
   	    sUrl = linkUrl + barcode;
  	} else if (linkUrl != '') {
        sUrl = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode;
    }
	window.open(sUrl,'_blank','') ;
    return;
}

// ȸ������������ ��ũ(linkClass�� ���°��� '' �Է�)
// ejkGb : ���ܼ�����, linkClass : �о��ڵ�, barcode : ���ڵ�
function goDetailReview(ejkGb, linkClass, barcode) {
	var sUrl = "";
	var linkUrl = "";

	var subBarcode = barcode.substring(0, 2);

	if(subBarcode == '29'){
		linkUrl = domain+"/product/detailViewPackage.laf?mallGb=PKG";
	}else{
	    if (ejkGb == 'KOR') {
	        linkUrl = domain+"/product/detailViewKor.laf?mallGb=KOR";
	    } else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=ENG";
	    } else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=JAP";
	    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
	        linkUrl = "http://music.kyobobook.co.kr/ht/record/detail/";
	    } else if (ejkGb == 'GFT') {
	        linkUrl = "http://gift.kyobobook.co.kr/p/";
	    } else if (ejkGb == 'EBK') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?selectedLargeCategory=001";
	    } else if (ejkGb == 'AUD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/audio/audioDetail.ink?selectedLargeCategory=002";
	    } else if (ejkGb == 'VOD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/vod/vodDetail.ink?selectedLargeCategory=003";
	    } else if (ejkGb == 'KDS') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/kids/kidsDetail.ink?selectedLargeCategory=004";
	    } else if (ejkGb == 'DUM') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/article/articleDetail.ink?selectedLargeCategory=006";
		} else if (ejkGb == 'DSE') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/setDetail.laf?category=007";
		} else if (ejkGb == 'DMA') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/eMagazineDetail.laf?category=008";
		} 
	}
	
	if (ejkGb == 'GFT' || ejkGb == 'MUC' || ejkGb == 'DVD') {
        sUrl = linkUrl + barcode;	    	
        self.location.href = sUrl;
        return;
    }else if (linkUrl != '') {
    	sUrl = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode+"#review";
	}
   	findTop().location.href = sUrl;
}


// ��ٱ��� �������� ��ũ(linkClass�� ���°��� '' �Է�)
// ejkGb : ���ܼ�����, linkClass : �о��ڵ�, barcode : ���ڵ�
function openPreviewDetail(ejkGb, linkClass, barcode) {
    var linkUrl = "";

    if (ejkGb == 'KOR') {
        linkUrl = '/product/detailPreviewKor.laf?mallGb=KOR';
    } else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
        linkUrl = '/product/detailPreviewEng.laf?mallGb=ENG';
    } else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
        linkUrl = '/product/detailPreviewEng.laf?mallGb=JAP';
    } else if (ejkGb == 'MUC') {
        linkUrl = '/product/detailPreviewMuc.laf?mallGb=MUC';
    } else if (ejkGb == 'DVD') {
        linkUrl = '/product/detailPreviewDvd.laf?mallGb=DVD';
    }

    if (linkUrl != '') {
        var url = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode;
        var option = 'scrollbars=no,toolbar=0,location=0,directories=0,status=1,menubar=0,resizable=0,top=300,left=300,width=450,height=450';
        window.open(url, 'CompactInfo',option);
    }
    return;
}

// �������� ��ũ(linkClass�� ���°��� '' �Է�)
// ejkGb : ���ܼ�����, linkClass : �о��ڵ�, barcode : ���ڵ�
function goDetailProductforKiosk(site, ejkGb, barcode) {
    var linkUrl = "";

    if (ejkGb == 'KOR') {
        linkUrl = '/kiosk/detailViewKor.laf';
    //} else if (ejkGb == 'ENG' || ejkGb == 'JAP' || ejkGb == 'BNT' || ejkGb == 'JNT') {
	} else if (ejkGb == 'ENG' || ejkGb == 'JAP') {
        linkUrl = '/kiosk/detailViewEng.laf';
    }

    if (linkUrl != '') {
        self.location.href = linkUrl + "?SITE=" + site + "&ejkGb=" + ejkGb + "&barcode=" +barcode;
    }
    return;
}

// �̹��� ũ�� ���� ��ũ(linkClass�� ���°��� '' �Է�)
// ejkGb : ���ܼ�����, linkClass : �о��ڵ�, barcode : ���ڵ�
function openLargeImgView(ejkGb, linkClass, barcode) {
    var linkUrl = "";

    if (ejkGb == 'KOR') {
        linkUrl = '/product/viewLargeImgKor.laf?mallGb=KOR';
    } else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
        linkUrl = '/product/viewLargeImgEng.laf?mallGb=ENG';
    } else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
        linkUrl = '/product/viewLargeImgEng.laf?mallGb=JAP';
    } else if (ejkGb == 'MUC') {
        linkUrl = '/product/viewLargeImgMuc.laf?mallGb=MUC';
    } else if (ejkGb == 'DVD') {
        linkUrl = '/product/viewLargeImgDvd.laf?mallGb=DVD';
    }

    if (linkUrl != '') {
        var url = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode;
        var option = "";
        if(ejkGb == 'DVD') {
            option = 'scrollbars=auto,toolbar=0,location=0,directories=0,status=1,menubar=0,resizable=0,top=100,left=300,width=754,height=782';
        } else {
            option = 'scrollbars=auto,toolbar=0,location=0,directories=0,status=1,menubar=0,resizable=0,top=100,left=300,width=754,height=760';
        }
        window.open(url, 'CompactInfo',option);
    }
    return;
}

// ���θ���˻�-�оߺ��˻����
// site: �����ڵ� ejkGb:���ܼ����� vPlinkClassID:�о��ڵ�
function goCategorySearchBook(site, ejkGb, linkClass){
	linkUrl = "/kiosk/search/SearchCommonMain.jsp";
	self.location.href = linkUrl + "?ejkGb="+ejkGb+"&vPlinkClassID="+linkClass+"&SITE="+site;
}

// �̸�����
// ejkGb : ���ܼ� ����, barcode : ���ڵ�
function ipqOpen(ejkGb, barcode) {
    if (ejkGb != null && ejkGb != '' && barcode != null && barcode != '') {
        var urls = "/product/ipqView.laf?ejkGb="+ejkGb+"&barcode="+barcode;
        wind6 = window.open(urls,'ibrowser','top=0 , left=0 ,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=950,height=682');
    }
}

function goOrderStep1(formname) {
	chkIndex = formname.indexCnt;
	isCheck = false;
	isZero = false;
	if( typeof(formname.indexCnt[0]) == 'undefined') {
		if(chkIndex.checked) {
			if( getvaluebyindex(formname.qty,0) == '0' ){
				chkIndex.checked = false;
				isZero = true;
			} else {
				isCheck = true;
			}
		}
	} else {
		for( var i=0; i<chkIndex.length; i++) {
			if(chkIndex[i].type == 'checkbox') {
				if(chkIndex[i].checked) {
					if( getvaluebyindex(formname.qty,i) == '0' ){
						chkIndex[i].checked = false;
						isZero = true;
					} else {
						isCheck = true;
					}
				}
			}
		}
	}
	if(isZero) {
		alert("�ֹ��Ǽ��� 1�� �̻��̾�� �մϴ�.");
	} else if(!isCheck) {
		alert("�ֹ��Ͻ� ��ǰ�� �ϳ� �̻� �����ϼž� �մϴ�.");
	} else {
		formname.action = sslDomain+"/order/orderStep1.laf";
		formname.submit();
	}
}


//������ �������� ��ٱ��� 4�����Ϸ� ���� (20100406 mjpark)
function goOrderStep2(formname) {
	chkIndex = formname.indexCnt;
	isCheck = false;
	isZero = false;
	isCount = false;
	total_count  = 0;
	var maxChecked = 4;   //���ð����� üũ�ڽ� ����

	if( typeof(formname.indexCnt[0]) == 'undefined') {
		if(chkIndex.checked) {
			if( getvaluebyindex(formname.qty,0) == '0' ){
				chkIndex.checked = false;
				isZero = true;
			} else {
				isCheck = true;
			}
		}
	} else {
		for( var i=0; i<chkIndex.length; i++) {
			if(chkIndex[i].type == 'checkbox') {
				if(chkIndex[i].checked) {
					if( getvaluebyindex(formname.qty,i) == '0' ){
						chkIndex[i].checked = false;
						isZero = true;
					} else {
						if(chkIndex[i].checked == true){
							total_count +=1;
						} else {
							total_count -=1;
						}
						if(	total_count > maxChecked){
							//alert(total_count);
							isCount = true;
						} else {
							isCheck = true;
						}
					}
				}
			}
		}
	}
	if(isZero) {
		alert("�ֹ��Ǽ��� 1�� �̻��̾�� �մϴ�.");
	} else if(!isCheck) {
		alert("�ֹ��Ͻ� ��ǰ�� �ϳ� �̻� �����ϼž� �մϴ�.");
	} else if(isCount) {
		alert("������ ��ǰ�� 4�� ���Ϸ� �ֹ������մϴ�.");
	} else {
		formname.action = sslDomain+"/order/orderStep1.laf";
		formname.submit();
	}
}

function goOrderStep111(formname) {
	chkIndex = formname.indexCnt;
	isCheck = true;
	if(typeof(formname.indexCnt[0]) == 'undefined') {
		if(chkIndex.checked) {
			if( getvaluebyindex(formname.qty,0) == '0' ){
				alert("�ֹ��Ǽ��� 1�� �̻��̾�� �մϴ�.");
				chkIndex.checked = false;
			} else {
				isCheck = true;
			}
		}
	} else {
		for( var i=0; i<chkIndex.length; i++) {
			if(chkIndex[i].type == 'checkbox') {
				if(chkIndex[i].checked) {
					if( getvaluebyindex(formname.qty,i) == '0' ){
						alert("�ֹ��Ǽ��� 1�� �̻��̾�� �մϴ�.");
						chkIndex[i].checked = false;
						isCheck = false;
					} else {
						isCheck = isCheck && true;
					}
				}
			}
		}
	}
	if(!isCheck) {
		alert("�ֹ��Ͻ� ��ǰ�� �ϳ� �̻� �����ϼž� �մϴ�.");
	} else {
		formname.action = "/order/orderStep1.laf";
		formname.submit();

	}
}


// 20090206 ����Ŭ�� �߰� �ѽ¿�
function openBookMap(site, ejkGb, barcode, orderClick){
	if(site == '' && barcode == '') {
		alert("���� ���� �� ���ڵ� ������ �������� �ʽ��ϴ�.");
	} else {
		//var urls = "/kiosk/stackView.laf";
		//var urls = "/kiosk/bookInfoPrint.laf";
		//var urls = "/kioskn/BookInfoPrintOnline.laf";
		var urls = "http://mkiosk.kyobobook.co.kr/kiosk/product/bookInfoInk.ink";
		
		var param = '?site=' + site + '&ejkGb=' + ejkGb + '&barcode=' + barcode + '&map=Y';

		if( typeof(orderClick) != 'undefined'){
        param = param + "&orderClick=" + orderClick;
    }

		window.open(urls + param, 'prints', 'width=310, height=770, scrollbars=yes');
	}
}

// ������ ��ġ ȣ��� �ű� Ŭ���� ����
// 2011.12.14 �Ӽ���
function openBookMapKc(site, ejkGb, barcode, orderClick, Kc){
	if(site == '' && barcode == '') {
		alert("���� ���� �� ���ڵ� ������ �������� �ʽ��ϴ�.");
	} else if(site =='88' || site =='89' || site == 'E1'){
		if(site == '88'){
			alert("�ش� ������ �ٷε帲 ���� �����������,\n�ֹ������� ���ҽ�Ƽ���� �������� �������ϴ�.\n\n������ ������ ����� ������ ���� ��ġ �ȳ��� �������� �ʽ��ϴ�.");
		}
		if(site == '89'){
			alert("�ش� ������ �ٷε帲 ���� �����������,\n�ֹ������� �λ����� �������� �������ϴ�.\n\n������ ������ ����� ������ ���� ��ġ �ȳ��� �������� �ʽ��ϴ�.");
		}
		if(site == 'E1'){
			alert("�ش� ������ �ٷε帲 ���� �����������,\n�ֹ������� â������ �������� �������ϴ�.\n\n������ ������ ����� ������ ���� ��ġ �ȳ��� �������� �ʽ��ϴ�.");
		}
	} else {
		//var urls = "/kiosk/stackView.laf";
		//var urls = "/kiosk/bookInfoPrint.laf";
		//var urls = "/kioskn/BookInfoPrintOnline.laf";
		var urls = "http://mkiosk.kyobobook.co.kr/kiosk/product/bookInfoInk.ink";
		
		var param = '?site=' + site + '&ejkGb=' + ejkGb + '&barcode=' + barcode + '&map=Y';

		if( typeof(orderClick) != 'undefined'){
        param = param + "&orderClick=" + orderClick;
    }

		window.open(urls + param, 'prints', 'width=310, height=770, scrollbars=yes');
	}
}


//================================================================
//�Ϸαװ���
//================================================================

//===============================================================
// del multi item from ownlist ->mistyi
//===============================================================
function deleteMulti(formname) {
	chkIndex = formname.indexCnt;
	if (!isChecked(chkIndex)) {
		alert("������ ��ǰ�� �ϳ��� �����ϼž� �մϴ�.");
		return;
	}
	if (!confirm("�����Ͻðڽ��ϱ�?")) {
		return;
	}
	formname.target = "HiddenActionFrame";
	formname.action = "/booklog/deleteWish.laf";
	formname.submit();
}

// �Ϸα� ž���� �̵�
function goBooklogTop(target) {
	if (target==null) {
		findTop().location.href=domain+"/booklog/";
	}else{
		target.location.href=domain+"/booklog/";
	}
}

// ���κϷα׷� �̵��ϱ�
function goBookLog(memid) {
	if (memid=='') {
		findTop().openLogin('/booklog/myBooklog.laf?memid=$memid$');
		return;
	}
	findTop().location.href=domain+"/booklog/myBooklog.laf?memid=" + memid;
}

// ���̸���Ʈ�������� �̵��ϱ�
function goBooklogMyListMain(memid) {
	if (memid=='') {
		findTop().openLogin("/booklog/myBooklog.laf?memid=$memid$&branch=mylist");
		return;
	}
	findTop().location.href=domain+"/booklog/myBooklog.laf?memid="+memid+"&branch=mylist";
}

// å���� �ѹ��� �̵��ϱ�
function goonelineMyList(memid) {
	if (memid=='') {
		findTop().openLogin("/booklog/myBooklog.laf?memid=$memid$&branch=oneline");
		return;
	}
	findTop().location.href=domain+"/booklog/myBooklog.laf?memid="+memid+"&branch=oneline";
}


// 20091116 �ѽ¿�
// ���̸���Ʈ�� �̵��ϱ�
function goBooklogMyList(memid,mid) {
	/*
	if (memid=='') {
		findTop().openLogin("/booklog/myBooklog.laf?memid=$memid$&mid="+mid+"&branch=mylistsub");
		return;
	}
	findTop().location.href=domain+"/booklog/myBooklog.laf?memid="+memid+"&mid="+mid+"&branch=mylistsub";
	*/

	if (memid=='') {
		findTop().openLogin("http://booklog.kyobobook.co.kr/blog/blogController.do?memid=$memid$&menuDvcd=B01");
		return;
	}
	findTop().location.href="http://booklog.kyobobook.co.kr/blog/blogController.do?memid=" + memid + "&menuDvcd=B01";
}


// ���̸���Ʈ������ �̵��ϱ�
function goBooklogMakeMyList(memid) {
	if (memid=='') {
		findTop().openLogin("/booklog/myBooklog.laf?memid=$memid$&branch=mylistmake");
		return;
	}
	findTop().location.href=domain+"/booklog/myBooklog.laf?memid="+memid+"&branch=mylistmake";
}

// �����ִ»�ǰ�����̵��ϱ�
function goBooklogOwnList(memid) {
	if (memid=='') {
		findTop().openLogin("http://booklog.kyobobook.co.kr/blog/blogController.do?memid=$memid$&menuDvcd=B03");
		return;
	}
	findTop().location.href="http://booklog.kyobobook.co.kr/blog/blogController.do?memid=" + memid + "&menuDvcd=B03";
}
// ���������ǰ���� �̵��ϱ�
function goBooklogWishList(memid, wishCatId) {
	if (memid=='') {
		findTop().openLogin("http://booklog.kyobobook.co.kr/blog/blogController.do?memid=$memid$&menuDvcd=B02&orderClick=zbc");
		return;
	}
	var id = "1";
	if (wishCatId !=null) {
		id = wishCatId;
	}
	findTop().location.href="http://booklog.kyobobook.co.kr/blog/blogController.do?memid=" + memid + "&menuDvcd=B02&orderClick=zbc";
}
// �Ϸα� ���侲��� �̵��ϱ�
function goBooklogReviewWriteForm(memid,barcode,ejkGb) {
	if (memid=='') {
		findTop().openLogin("http://booklog.kyobobook.co.kr/blog/blogController.do?memid="+memid+"&ejkGb="+ejkGb+"&barcode="+barcode+"&wrinViewDvcd=1&miniListYN=N&menuDvcd=WRT&mode=F1");
		return;
	}
	findTop().location.href="http://booklog.kyobobook.co.kr/blog/blogController.do?memid="+memid+"&ejkGb="+ejkGb+"&barcode="+barcode+"&wrinViewDvcd=1&miniListYN=N&menuDvcd=WRT&mode=F1";
}
// �Ϸα� ����������� �̵��ϱ�
function goBooklogReviewUpdateForm(memid,id) {
	if (memid=='') {
		findTop().openLogin("/booklog/myBooklog.laf?memid=$memid$&booklogId="+id+"&branch=update");
		return;
	}
	findTop().location.href=domain+"/booklog/myBooklog.laf?memid=$memid$&booklogId="+id+"&branch=update";
}
// ����󼼺���� �̵�
function goBooklogReviewDetail(memid,booklogId) {
	findTop().location.href=domain+"/booklog/myBooklog.laf?memid="+memid+"&booklogId="+booklogId;
}
// ���̽��丮�󼼺���� �̵�
function goBooklogMystoryDetail(memid,cat,id) {
	findTop().location.href=domain+"/booklog/myBooklog.laf?memid="+memid+"&board_cd="+cat+"&content_cd="+id;
}

//�Ϸα� ��õ�ϱ�
function goRecommendReview(loginid,memid,booklogid) {

	if (loginid == '') {
		//==========�α��ΰ��� ����==========//
		if(parent.document == null || parent.document == "undefined"){
			document.location = "/login/login.laf?retURL=" + escape(location.href);
		}else{
			parent.document.location = "/login/login.laf?retURL=" + escape(parent.location.href);
		}
		return;
		//==========�α��ΰ��� ����==========//
		//openLoginScript("opener.goRecommendReview('$memid$','"+memid+"',"+booklogid+")");
		return;
	}
	if (loginid == memid) {
		alert("�ڽ��� ���並 ��õ�� �� �����ϴ�");
		return;
	}
	if (!confirm("�ش縮�並 ��õ�Ͻðڽ��ϱ�?")) {
		return;
	}
	HiddenActionFrame.location.href="/booklog/updateReviewRefer.laf?memid="+memid+"&booklogId="+booklogid;
}
//�Ϸα׸��� ��ũ���ϱ�
function goBooklogScrap(loginid,memid,cat,booklogid) {

	alert("���� �������� �Ϸα� �̿��� ��� ���ѵ˴ϴ�.");
	return;

	if (loginid == '') {
		openLoginScript("opener.goBooklogScrap('$memid$','"+memid+"','"+cat+"',"+booklogid+")");
		return;
	}
	if (loginid == memid) {
		alert("�ڽ��� ���並 ��ũ�� �� �� �����ϴ�");
		return;
	}
	if (!confirm("�ش縮�並 ��ũ���Ͻðڽ��ϱ�?")) {
		return;
	}
	//HiddenActionFrame.location.href="/booklog/scrapReviewDone.laf?memid="+memid+"&booklogCatId="+cat+"&booklogId="+booklogid;
	window.open("http://booklog.kyobobook.co.kr/blog/popup/scrapMyBlogger.do?bltnWrinSrnb="+booklogid+"","getBlogPopUp","width=380, height=360, top=200,left=400" );
}
//�Ϸα� ��ũ���ϱ�
function goBooklogMystoryScrap(loginid,memid,cat,booklogid) {

	alert("���� �������� �Ϸα� �̿��� ��� ���ѵ˴ϴ�.");
	return;

	if (loginid == '') {
		openLoginScript("opener.goBooklogMystoryScrap('$memid$','"+memid+"','"+cat+"',"+booklogid+")");
		return;
	}
	if (loginid == memid) {
		alert("�ڽ��� ���̽��丮�� ��ũ�� �� �� �����ϴ�");
		return;
	}
	if (!confirm("�ش� ���̽��丮�� ��ũ���Ͻðڽ��ϱ�?")) {
		return;
	}
	HiddenActionFrame.location.href="/booklog/scrapMyBooklog.laf?memid="+memid+"&content_cd="+cat+"&board_cd="+booklogid;
}

function noImage(imgObj, imgType) {
	var iurl = "";
	try {
        switch(imgType) {
            case "L" :
                iurl = "http://image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_l.gif";
                break;
            case "M" :
                iurl = "http://image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_s.gif";
                break;
            case "S" :
                iurl = "http://image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_s.gif";
                break;
        }
		imgObj.src = iurl;
	} catch (e) {

	} finally {
		imgObj.onerror="";
	}
}

function noImage(imgObj, imgType, ejkGb) {
	var iurl = "";
	try {
        if (ejkGb == 'MUC' || ejkGb == 'DVD') {
            switch(imgType) {
                case "L" :
                    iurl = "http://image.kyobobook.co.kr/newimages/apps/b2c/product/NoimageMUC_l.gif";
                    break;
                case "M" :
                    iurl = "http://image.kyobobook.co.kr/newimages/apps/b2c/product/NoimageMUC_s.gif";
                    break;
                case "S" :
                    iurl = "http://image.kyobobook.co.kr/newimages/apps/b2c/product/NoimageMUC_s.gif";
                    break;
            }
        } else if (ejkGb == 'bcst') {
        	iurl = "http://image.kyobobook.co.kr/new_ink/bookcast/img-error.png";
        } else {
            switch(imgType) {
                case "L" :
                    iurl = "http://image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_l.gif";
                    break;
                case "M" :
                    iurl = "http://image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_s.gif";
                    break;
                case "S" :
                    iurl = "http://image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_s.gif";
                    break;
            }
        }
		imgObj.src = iurl;
	} catch (e) {

	} finally {
		imgObj.onerror="";
	}
}

// 20090206 ���� Ŭ�� �߰� �ѽ¿�
function addCouponProduct(barcode, pubCd, ejkGb) {
	var urlStr;
	if(ejkGb == 'KOR'){
		urlStr = "/coupon/couponAddList.laf?barcode=" + barcode + "&pubCd=" + pubCd + "&ejkGb=" + ejkGb + "&orderClick=JAS";
	}else if(ejkGb == 'ENG' || ejkGb == 'BNT'){
		urlStr = "/coupon/couponAddList.laf?barcode=" + barcode + "&pubCd=" + pubCd + "&ejkGb=" + ejkGb + "&orderClick=JBL";
	}else if(ejkGb == 'JAP' || ejkGb == 'JNT'){
		urlStr = "/coupon/couponAddList.laf?barcode=" + barcode + "&pubCd=" + pubCd + "&ejkGb=" + ejkGb + "&orderClick=JIL";
	}else if(ejkGb == 'MUC'){
		urlStr = "/coupon/couponAddList.laf?barcode=" + barcode + "&pubCd=" + pubCd + "&ejkGb=" + ejkGb + "&orderClick=JJL";
	}else if(ejkGb == 'DVD'){
		urlStr = "/coupon/couponAddList.laf?barcode=" + barcode + "&pubCd=" + pubCd + "&ejkGb=" + ejkGb + "&orderClick=JDX";
	}else{
		urlStr = "/coupon/couponAddList.laf?barcode=" + barcode + "&pubCd=" + pubCd + "&ejkGb=" + ejkGb;
	}

	window.open(urlStr, "CouponPop", "width=400,height=300,left=100,top=100,scrollbars=1");
}

function addCouponList(formname) {
    if(formname.indexCnt != null) {
        if(typeof(formname.indexCnt[0]) == "undefined") {
            if(!formname.indexCnt.checked) {
                alert("���ι����� ������ ���� �����ϼž� �մϴ�.");
            } else {
                formname.submit();
            }
        } else {
            isCheck = false;
            for( var i=0; i<formname.indexCnt.length; i++) {
                if(formname.indexCnt[i].type == 'checkbox') {
                    if(formname.indexCnt[i].checked) {
                        isCheck = true;
                        break;
                    }
                }
            }
            if(!isCheck) {
                alert("���ι����� ������ �ϳ��� �����ϼž� �մϴ�.");
            } else {
                formname.submit();
            }
        }
    }
}

function addCouponById(couponId, targetName) {
	var urlStr = "/coupon/couponAdd.laf?couponId=" + couponId;
	window.open(urlStr, "CouponPop", "width=400,height=300,left=100,top=100");
}

function addCouponListBarcode(formname) {
	if(typeof(formname.indexCnt[0]) == "undefined") {
		if(!formname.indexCnt.checked) {
			alert("���ι����� ������ �ϳ��� �����ϼž� �մϴ�.");
		} else {
			formname.submit();
		}
	} else {
		isCheck = false;
		for( var i=0; i<formname.indexCnt.length; i++) {
			if(formname.indexCnt[i].type == 'checkbox') {
				if(formname.indexCnt[i].checked) {
					isCheck = true;
					break;
				}
			}
		}
		if(!isCheck) {
			alert("���ι����� ������ �ϳ��� �����ϼž� �մϴ�.");
		} else {
			formname.submit();
		}
	}
}

// common login required message
function loginReqMsg() {
	alert("�α����ϼ���");
	return;
}

function goAlramMail(barcode, ejkGb) {
	window.open("/mail/noticeMailForm.laf?barcode=" + barcode + "&ejkGb=" + ejkGb , "LoginPop", "width=420,height=283,left=100,top=100");
}
//���� ���̺��԰� ���� ����Ʈ
function goMusicLabelList(labelGb) {
	location.href=domain+"/lable/musicLableGoodsList.laf?mallGb=MUC&lableGb="+labelGb;
}

//���� ���̺� ��ü ����Ʈ
function goMucLabelList(linkClass, labelNm) {
	location.href=domain+"/lable/musicLableList.laf?mallGb=MUC&linkClass="+linkClass+"&labelNm="+labelNm;
}

//DVD ���̺� ��ü ����Ʈ
function goDvdLabelList(mediaCd, labelNm) {
	location.href="/lable/dvdLableList.laf?mallGb=DVD&mediaCd="+mediaCd+"&labelNm="+labelNm;
}
//���̺�cd��  �˻� ������
function goSearchLable(vPmusicLabel,vPstrKeyword,vPstrCategory) {
    if (vPstrCategory == "MUC") {
	    location.href="/search/SearchMusicMain.jsp?vPstrCategory=MUC&vPsrThema=1&vPmusicMedia=2&vPlabelCD="+vPmusicLabel+"&vPoutSearch=1"+"&vPsKeywordInfo="+vPstrKeyword;
    } else {
	    location.href="/search/SearchDvdMain.jsp?vPstrCategory=DVD&vPsrThema=1&vPmusicMedia=2&vPlabelCD="+vPmusicLabel+"&vPoutSearch=1"+"&vPsKeywordInfo="+vPstrKeyword;
    }
}

//��õ���� ����� �˾�
function popRecommendMail (sBarcode, sEjkGb) {
	window.open("/mail/recommandMailForm.laf?windowGb=POP&barcode=" + sBarcode + "&ejkGb=" + sEjkGb, "RecommMailPop", "width=420,height=283,left=100,top=100");
}
// ��õ���� ����� �˾� �ű� Ŭ���� ����
// 2011.12.14 �Ӽ���
function popRecommendMailKc (sBarcode, sEjkGb, Kc) {
	window.open("/mail/recommandMailForm.laf?windowGb=POP&barcode=" + sBarcode + "&ejkGb=" + sEjkGb + "&Kc=" + Kc, "RecommMailPop", "width=420,height=283,left=100,top=100");
}

//���� �ޱ�
function openCoupon(couponId, targetName) {
	if(typeof(targetName) != "undefined") {
		window.open("/coupon/couponAddById.laf?couponId=" + couponId, "CouponPop", "width=100,height=100,left=100,top=100");
	} else {
		window.open("/coupon/couponAddById.laf?couponId=" + couponId + "&target=" + targetName, "CouponPop", "width=100,height=100,left=100,top=100");
	}
}

// �˻� ����, DVD
function goSearchKind(ejkGb, paramName, paramValue) {

    var link_url = "";
    if(ejkGb == 'ENG' || ejkGb == 'BNT' || ejkGb == 'JAP' || ejkGb == 'JNT') {
        link_url = "location.href='/search/SearchEngbookMain.jsp?vPstrCategory="+ejkGb+"&vPoutSearch=1&"+paramName+"="+paramValue+"&vPsKeywordInfo="+paramValue+"'";
    } else if (ejkGb == 'MUC') {
        link_url = "location.href='/search/SearchMusicMain.jsp?vPstrCategory="+ejkGb+"&vPoutSearch=1&"+paramName+"="+paramValue+"&vPsKeywordInfo="+paramValue+"'";
    } else if (ejkGb == 'DVD') {
        link_url = "location.href='/search/SearchDvdMain.jsp?vPstrCategory="+ejkGb+"&vPoutSearch=1&"+paramName+"="+paramValue+"&vPsKeywordInfo="+paramValue+"'";
    } else {
        link_url = "location.href='/search/SearchCommonMain.jsp?vPstrCategory="+ejkGb+"&vPoutSearch=1&"+paramName+"="+paramValue+"&vPsKeywordInfo="+paramValue+"'";
    }
    eval(link_url);
}

//	�� �̸�����,�ٿ�ε�
function goArticleViewDown(pdfcd, code, type, vendorGb){
    var url = "";
    if(vendorGb == "02"){
    	url = "http://lnk.kstudy.com/others/downKyobo.asp?a_code="+pdfcd+"&code="+code+"&isDownLoad="+type+"&oID=";  //�ѱ� �м� ��ȸ
    }else{
        var tp = "1";     //�ٿ�ε�
        if(type == "3"){
        	tp = "0";        //�̸�����
        	url = "http://www.dbpia.co.kr/b2c/b2c_download.asp?a_code="+pdfcd+"&code="+code+"&isDownLoad="+tp+"&pv=1"; //�����̵��
        }else{
    		url = "http://www.dbpia.co.kr/b2c/b2c_download.asp?a_code="+pdfcd+"&code="+code+"&isDownLoad="+tp; //�����̵��
    	}
    }
	do_open_popup("_popup",url, 0, 0, 400, 300, false, false, false, false);//name, url, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable
}

function goQnaPopup(code){
    window.open("http://www.kyobobook.co.kr/cscenter/qnaForm.laf?code="+code, "qnapopup", "status=no, resizeable=no, scrollbars=no, width=545, height=590");
}

function goCommit1(){

	var form1Main = document.form1;
	var commitnumber	= form1Main.commit1.value;

	if( commitnumber != "0612010014"){
		alert("������ȣ�� Ȯ�����ּ���.");
	} else {
		location.href = "http://www.kyobobook.co.kr/index.laf?emailCheck=true&couponId=nJdrTZcW0I4qmbd0p7g!@QA~!" ;

	}

}

function goCommit2(){

	var form1Main = document.form1;
	var commitnumber	= form1Main.commit2.value;

	if( commitnumber != "0612010015"){
		alert("������ȣ�� Ȯ�����ּ���.");
	} else {
		location.href = "http://www.kyobobook.co.kr/index.laf?emailCheck=true&couponId=ldhSINzogamuN!@FSeS15MA~!" ;

	}

}

function contentClick(id,memid)
{
           if(memid == null || memid == '')  // �α����� �� �ߴٸ� �α��� �˾�â
           {
             openLogin();
             return;
           }else {
             contentsclick.location.href = "/practice/ContentDown.laf?id="+id;

           }
}

// digital Navigation ���� �κ� (2008.01.04  ������)
function openEbookLogin() {
	var retURL = document.location.href;
	openLoginSubmit('&mallGb=DIG&retURL='+escape(retURL));
}

// digital Navigation ���� �κ� (2008.01.04  ������)
function openGenomad() {
	//document.genomadForm.submit();
	document.location.href = "http://digital.kyobobook.co.kr/kyobobook/main.jsp?mallGb=DIG";
}

// lns : ��ǰ ����
function goPresent(eventGb, barcode, eventPid, ejkGb, eventUrl, targetName) {
		if(typeof(targetName) != 'undefined') {
			document.proCartOneForm.target = targetName;
		}
		if(eventGb == '1') {
	    if(ejkGb == 'ENG' || ejkGb == 'JAP' || ejkGb == 'BNT' || ejkGb == 'JNT') {
	    	document.proCartOneForm.action = domain+"/event/eventEngViewByPid.laf";
	    } else if (ejkGb == 'MUC') {
	        document.proCartOneForm.action = domain+"/event/eventMucViewByPid.laf";
	    } else if (ejkGb == 'DVD') {
	        document.proCartOneForm.action = domain+"/event/eventDvdViewByPid.laf";
	    } else {
	        document.proCartOneForm.action = domain+"/event/eventViewByPid.laf";
	    }
			document.proCartOneForm.eventId.value = "";
			document.proCartOneForm.eventPid.value = eventPid;
			document.proCartOneForm.barcode.value = barcode;
			document.proCartOneForm.ejkGb.value = ejkGb;
			document.proCartOneForm.submit();
		} else if (eventGb == '2') {
			document.proCartOneForm.action = eventUrl;
			document.proCartOneForm.submit();
		} else {
			goDetailProduct(ejkGb, '', barcode,true);
		}
}
// lns : ��ǰ ��
// lns : ��ö�� _ ��ǰ����ȭ������ �̵� ����
function goOrderStep0(formname) {
	chkIndex = formname.indexCnt;
	isCheck = false;
	isZero = false;
	if( typeof(formname.indexCnt[0]) == 'undefined') {
		if(chkIndex.checked) {
			if( getvaluebyindex(formname.qty,0) == '0' ){
				chkIndex.checked = false;
				isZero = true;
			} else {
				isCheck = true;
			}
		}
	} else {
		for( var i=0; i<chkIndex.length; i++) {
			if(chkIndex[i].type == 'checkbox') {
				if(chkIndex[i].checked) {
					if( getvaluebyindex(formname.qty,i) == '0' ){
						chkIndex[i].checked = false;
						isZero = true;
					} else {
						isCheck = true;
					}
				}
			}
		}
	}
	if(isZero) {
		alert("�ֹ��Ǽ��� 1�� �̻��̾�� �մϴ�.");
	} else if(!isCheck) {
		alert("�ֹ��Ͻ� ��ǰ�� �ϳ� �̻� �����ϼž� �մϴ�.");
	} else {
		formname.action = sslDomain+"/order/orderStep0.laf";
		formname.submit();
	}
}
// lns : ��ö�� _ ��ǰ����ȭ������ �̵� ��
// lns : ��ö�� _ ��ǰ�ֹ�ȭ������ �̵� ����
function goOrderStep1_present(formname) {
	chkIndex = formname.indexCnt;
	isCheck = false;
	isZero = false;
	formname.action = sslDomain+"/order/orderStep1.laf";
	formname.submit();
}
// lns : ��ö�� _ ��ǰ�ֹ�ȭ������ �̵� ��

// lns ������ 2008-08-08 �׷��� ���� �α���
//2011.05.17 ���� - ����
function openLoginJoinGroupware(retURL, memid, empgb, sabun) {
	window.open("/login/loginSSLPop.laf?target=bookmileage&closeYn=Y&retScript=opener.document.location.href='"+retURL+"'&cmemid=" + memid + "&empgb=" + empgb + "&sabun=" + sabun + "&retURL=" + retURL, "LoginPop", "width=737,height=420,left=100,top=100,status=yes");
}


/*
// ����󼼺���� �̵��� ����Ŭ�� �߰�
// 20090209 �ѽ¿�
function goBooklogReviewPage(memid,booklogId,orderClick) {

	if(typeof(orderClick) != "undefined") {
  	  findTop().location.href="http://booklog.kyobobook.co.kr/blog/blogCompatibility.do?memid=" + memid + "&booklogId=" + booklogId + "&orderClick="+orderClick;
  }else{
  	  findTop().location.href="http://booklog.kyobobook.co.kr/blog/blogCompatibility.do?memid=" + memid + "&booklogId=" + booklogId ;
  }

}
*/
// ���̸���Ʈ�� �̵��� ����Ŭ�� �߰�
// 20090206 �ѽ¿�
function goBooklogMyListPage(memid, mid,orderClick) {
	if (memid=='') {
		findTop().openLogin("/booklog/myBooklog.laf?memid=$memid$&mid="+mid+"&branch=mylistsub");
		return;
	}

	if(typeof(orderClick) != "undefined") {
  	findTop().location.href=domain+"/booklog/myBooklog.laf?memid="+memid+"&mid="+mid+"&branch=mylistsub&orderClick="+orderClick;
  }else{
  	findTop().location.href=domain+"/booklog/myBooklog.laf?memid="+memid+"&mid="+mid+"&branch=mylistsub";
  }
}

// ���̸���Ʈ�� �̵��� ����Ŭ�� �߰� �ű� Ŭ���� ���� �� ��â���� �������� ����
// 2011.12.14 �Ӽ���
function goBooklogMyListPageKc(memid, mid, orderClick, Kc) {
	if (memid=='') {
		findTop().openLogin("/booklog/myBooklog.laf?memid=$memid$&mid="+mid+"&branch=mylistsub"+"&Kc="+Kc);
		return;
	}

	if(typeof(orderClick) != "undefined") {
  	//findTop().location.href=domain+"/booklog/myBooklog.laf?memid="+memid+"&mid="+mid+"&branch=mylistsub&orderClick="+orderClick+"&Kc="+Kc;
  	window.open(domain+"/booklog/myBooklog.laf?memid="+memid+"&mid="+mid+"&branch=mylistsub&orderClick="+orderClick+"&Kc="+Kc, "myList", "");
  }else{
  	//findTop().location.href=domain+"/booklog/myBooklog.laf?memid="+memid+"&mid="+mid+"&branch=mylistsub&Kc="+Kc;
  	window.open(domain+"/booklog/myBooklog.laf?memid="+memid+"&mid="+mid+"&branch=mylistsub&Kc="+Kc, "myList", "");
  }
}

// �� ������ ȣ��� ����Ŭ�� �߰�
// 20090206 �ѽ¿�
function goDetailProductPage(ejkGb, linkClass, barcode, orderClick) {
	var sUrl = "";
	var linkUrl = "";

	var subBarcode = barcode.substring(0, 2);
	if (subBarcode == '14'){
		linkUrl = "http://pod.kyobobook.co.kr/newPODBookList/newPODBookDetailView.ink";
	}else if(subBarcode == '29'){
		linkUrl = domain+"/product/detailViewPackage.laf?mallGb=PKG";
	}else{
	  if (ejkGb == 'KOR') {
	    linkUrl = domain+"/product/detailViewKor.laf?mallGb=KOR";
	  } else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
	    linkUrl = domain+"/product/detailViewEng.laf?mallGb=ENG";
	  } else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
	    linkUrl = domain+"/product/detailViewEng.laf?mallGb=JAP";
	  } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
	    linkUrl = "http://music.kyobobook.co.kr/ht/record/detail/";
	  } else if (ejkGb == 'GFT') {
	    linkUrl = "http://gift.kyobobook.co.kr";
	  } else if (ejkGb == 'EBK') {
	    linkUrl = "http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?selectedLargeCategory=001";
	  } else if (ejkGb == 'AUD') {
	    linkUrl = "http://digital.kyobobook.co.kr/digital/audio/audioDetail.ink?selectedLargeCategory=002";
	  } else if (ejkGb == 'VOD') {
	    linkUrl = "http://digital.kyobobook.co.kr/digital/vod/vodDetail.ink?selectedLargeCategory=003";
	  } else if (ejkGb == 'KDS') {
	    linkUrl = "http://digital.kyobobook.co.kr/digital/kids/kidsDetail.ink?selectedLargeCategory=004";
	  } else if (ejkGb == 'DUM') {
	    linkUrl = "http://digital.kyobobook.co.kr/digital/article/articleDetail.ink?selectedLargeCategory=006";
	  } else if (ejkGb == 'GNE') {
	    linkUrl = "http://digital.kyobobook.co.kr/digital/rent/genre/genreDetail.ink?selectedLargeCategory=010";
	  } else if (ejkGb == 'DSE') {
	    linkUrl = "http://digital.kyobobook.co.kr/kyobobook/setDetail.laf?category=007";
	  } else if (ejkGb == 'DMA') {
	    linkUrl = "http://digital.kyobobook.co.kr/kyobobook/eMagazineDetail.laf?category=008";
	  } else if (ejkGb == 'USE') {
	    linkUrl = "http://used.kyobobook.co.kr/product/viewBookDetail.ink?cmdtBrcd=";
	  } 		
	}

	if (subBarcode == '14'){
		sUrl = linkUrl + '?barcode=' + barcode;
 	}else if(ejkGb == 'GFT') {
        sUrl = linkUrl + '/p/' + barcode;
    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
   	    self.location.href = linkUrl+barcode;
	    return;        
    } else if (ejkGb == 'USE' ) {
    	var clickstr = "";
        sUrl = linkUrl + barcode + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode + clickstr;	    
    }else if (linkUrl != '') {
    	var clickstr = "";

       sUrl = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode + clickstr;
    }

    if(typeof(orderClick) != "undefined") {
        sUrl = (sUrl.indexOf("?") == -1)?(sUrl+"?orderClick="+orderClick) : (sUrl+"&orderClick="+orderClick);
    }
    
   	findTop().location.href = sUrl;
    return;
}

// �� ������ ȣ��� �ű� Ŭ���� ����
// 2011.12.01 ������
function goDetailProductKc(ejkGb, linkClass, barcode, orderClick, Kc) {
	
	var sUrl = "";
	var linkUrl = "";

	var subBarcode = barcode.substring(0, 2);

	if(subBarcode == '29'){
		linkUrl = domain+"/product/detailViewPackage.laf?mallGb=PKG";
	}else if(subBarcode == '14'){
		linkUrl = "http://pod.kyobobook.co.kr/newPODBookList/newPODBookDetailView.ink";
	}else{
	    if (ejkGb == 'KOR') {
	        linkUrl = domain+"/product/detailViewKor.laf?mallGb=KOR";
	    } else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=ENG";
	    } else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=JAP";
	    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
	        linkUrl = "http://music.kyobobook.co.kr/ht/record/detail/";
	    } else if (ejkGb == 'GFT') {
	        linkUrl = "http://gift.kyobobook.co.kr/p/";
	    } else if (ejkGb == 'EBK') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?selectedLargeCategory=001";
	    } else if (ejkGb == 'AUD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/audio/audioDetail.ink?selectedLargeCategory=002";
	    } else if (ejkGb == 'VOD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/vod/vodDetail.ink?selectedLargeCategory=003";
	    } else if (ejkGb == 'KDS') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/kids/kidsDetail.ink?selectedLargeCategory=004";
	    } else if (ejkGb == 'DUM') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/article/articleDetail.ink?selectedLargeCategory=006";
		} else if (ejkGb == 'DSE') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/setDetail.laf?category=007";
		} else if (ejkGb == 'DMA') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/eMagazineDetail.laf?category=008";
		} 
	}
		
	if (subBarcode == '14'){
		sUrl = linkUrl + '?barcode=' + barcode;
 	}else if (ejkGb == 'GFT' || ejkGb == 'MUC' || ejkGb == 'DVD') {
		sUrl = linkUrl + barcode;	    	
		if(typeof(orderClick) != "undefined") {
			sUrl = sUrl + "?orderClick=" + orderClick;
		}
		
		if(typeof(Kc) != "undefined") {
			sUrl = sUrl + "&Kc=" + Kc;
		}
	    self.location.href = sUrl;
	    return;
	}else if (linkUrl != '') {
		var clickstr = "";
	   sUrl = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode + clickstr;
	}
		
   	if(typeof(orderClick) != "undefined") {
       sUrl = sUrl + "&orderClick=" + orderClick;
    }

   	if(typeof(Kc) != "undefined") {
       sUrl = sUrl + "&Kc=" + Kc;
    }

    self.location.href = sUrl;
    return;
}


//19����ǰ �������� �̵�
function goDetailProductNotAge(ejkGb, linkClass, barcode, notAge, loginYN, isRecent, target) {

	var sUrl = "";
	var linkUrl = "";
	
	var subBarcode = barcode.substring(0, 2);

	if(target == "undefined") target = "_self";
	
	var clickstr = "";
	if(window.event != null) {
		var curTag = event.srcElement;
		var i=0;

		while(curTag.parentElement && i<40) {
			if((curTag.tagName == "SPAN" || curTag.tagName == "span") && curTag.name == "orderclick") {
				clickstr = "&clickOrder=" + curTag.value;
				break;
			}
			curTag = curTag.parentElement;
			i++;
		}
	}

	if(ie) {
	
	}else{
			isRecent=true;
	}
	
	if(subBarcode == '29'){
		linkUrl = domain+"/product/detailViewPackage.laf?mallGb=PKG";
	}else if(subBarcode == '14'){
		linkUrl = "http://pod.kyobobook.co.kr/newPODBookList/newPODBookDetailView.ink";
	}else{
		if (ejkGb == 'KOR') {
			linkUrl = domain+"/product/detailViewKor.laf?mallGb=KOR";
		} else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
			linkUrl = domain+"/product/detailViewEng.laf?mallGb=ENG";
		} else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
			linkUrl = domain+"/product/detailViewEng.laf?mallGb=JAP";
	    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
	        linkUrl = "http://music.kyobobook.co.kr/ht/record/detail/";
	    } else if (ejkGb == 'GFT') {
	        linkUrl = "http://gift.kyobobook.co.kr";
	    } else if (ejkGb == 'EBK') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?selectedLargeCategory=001";
	    } else if (ejkGb == 'AUD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/audio/audioDetail.ink?selectedLargeCategory=002";
	    } else if (ejkGb == 'VOD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/vod/vodDetail.ink?selectedLargeCategory=003";
	    } else if (ejkGb == 'KDS') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/kids/kidsDetail.ink?selectedLargeCategory=004";
	    } else if (ejkGb == 'DUM') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/article/articleDetail.ink?selectedLargeCategory=006";
		} else if (ejkGb == 'DSE') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/setDetail.laf?category=007";
		} else if (ejkGb == 'DMA') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/eMagazineDetail.laf?category=008";
		} 
	}
	
	if (subBarcode == '14'){
		sUrl = linkUrl + '?barcode=' + barcode;
 	} else if(ejkGb == 'GFT') {
		sUrl = linkUrl + '/p/' + barcode;
    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
    	window.open(linkUrl+barcode, target);
    	//self.location.href = linkUrl+barcode;
	    return;		
	} else  if (linkUrl != '') {
		sUrl = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" + barcode + clickstr;

	}

	if(notAge == 19) {
		if(loginYN == "Y") {
			if(typeof(isRecent) == "undefined") {
				window.open(sUrl, target);
				//self.location.href = sUrl;
			} else if( isRecent == true ) {
				window.open(sUrl, target);
				//parent.location.href = sUrl;
			}

			return;
		} else {
			alert("�� ��ǰ�� �� 19�� �̸��� û�ҳ��� �̿��� �� �����ϴ�.\n\n�α��� �� �̿��ϼ���.");
			openLoginNotAgeKor(sUrl,'T');

			return;
		}

	} else {
		if(typeof(isRecent) == "undefined") {
			window.open(sUrl, target);
			//self.location.href = sUrl;
		} else if( isRecent == true ) {
			window.open(sUrl, target);
			//parent.location.href = sUrl;
		}

		return;

	}


}


//19����ǰ �α��� ������(2009.04.17 by ���ؿ�)
function openLoginNotAge(retURL) {
	if(typeof(retURL) == "undefined") {
		if(parent.parent.document == null || parent.parent.document == "undefined"){
			if(parent.document == null || parent.document == "undefined"){
				document.location = domain+"/login/loginNotAge.laf?retURL="+escape(location.href);
			}else{
				parent.document.location = domain+"/login/loginNotAge.laf?retURL="+escape(location.href);
			}
		}else{
			parent.parent.document.location = domain+"/login/loginNotAge.laf?retURL="+escape(location.href);
		}
	} else {
		if(parent.parent.document == null || parent.parent.document == "undefined"){
			if(parent.document == null || parent.document == "undefined"){
				document.location = domain+"/login/loginNotAge.laf?retURL=" + escape(retURL);
			}else{
				parent.document.location = domain+"/login/loginNotAge.laf?retURL=" + escape(retURL);
			}
		}else{
			parent.parent.document.location = domain+"/login/loginNotAge.laf?retURL=" + escape(retURL);
		}
	}
}


// û�ҳ����ع� ��ǰ ���ٽ� �α��� �˾� ������ - 2013.08.08 ������
function openLoginNotAgePop() {
	var isWinopen = window.open(domain+"/login/loginSSLPop.laf?popup=Y", "LoginPop", "width=750,height=450,left=100,top=100");
	if(isWinopen == null) {
		alert("���ܵ� �˾�â�� ����� �ֽʽÿ�.");
	}
}


function openLoginNotAgeKor(retURL,retURL1) {

	if(typeof(retURL) == "undefined")	{
		if(parent.document == null || parent.document == "undefined"){
					document.location = domain+"/login/loginNotAge.laf?retURL="+escape(location.href);
		}else{
					parent.document.location = domain+"/login/loginNotAge.laf?retURL="+escape(location.href);
		}
	} else {
		if(parent.document == null || parent.document == "undefined"){
			document.location = domain+"/login/loginNotAge.laf?retURL=" + escape(retURL);
		}else{
                	retURL=retURL+"&retURL1="+retURL1;
			parent.document.location = domain+"/login/loginNotAge.laf?retURL=" + escape(retURL);
		}
	}
}

//������ȸ�� �Ǹ����� (2013.01.28 by �ڽ���)
function openHomePage(retURL) {
	if(typeof(retURL) == "undefined") {
		if(parent.parent.document == null || parent.parent.document == "undefined"){
			if(parent.document == null || parent.document == "undefined"){
				document.location = domain+"/index.laf";
			}else{
				parent.document.location = domain+"/index.laf";
			}
		}else{
			parent.parent.document.location = domain+"/index.laf";
		}
	} else {
		if(parent.parent.document == null || parent.parent.document == "undefined"){
			if(parent.document == null || parent.document == "undefined"){
				document.location = domain+"/index.laf";
			}else{
				parent.document.location = domain+"/index.laf";
			}
		}else{
			parent.parent.document.location = domain+"/index.laf";
		}
	}
}


//û�ҳ� ��ȣ�� �������� ����ȸ�� �Ǹ� ������ (2013.07.23 by ���ȣ)
function goCheckCert(retUrl) {
	if(typeof(retUrl) == "undefined")	{
		if(parent.parent.document == null || parent.parent.document == "undefined"){
			if(parent.document == null || parent.document == "undefined"){
				document.location = domain+"/member/CheckCert.laf?retUrl="+escape(location.href);
			}else{
				parent.document.location = domain+"/member/CheckCert.laf?retUrl="+escape(location.href);
			}
		}else{
			parent.parent.document.location = domain+"/member/CheckCert.laf?retUrl="+escape(location.href);
		}
	}else{
		if(parent.parent.document == null || parent.parent.document == "undefined"){
			if(parent.document == null || parent.document == "undefined"){
				document.location = domain+"/member/CheckCert.laf?retUrl="+escape(retUrl);
			}else{
				parent.document.location = domain+"/member/CheckCert.laf?retUrl="+escape(retUrl);
			}
		}else{
			parent.parent.document.location = domain+"/member/CheckCert.laf?retUrl="+escape(retUrl);
		}
	}
}


// û�ҳ����ع� ��ǰ ���ٽ� �������� �˾� ������ - 2013.08.08 ������
function goCheckCertPop() {
	var isWinopen = window.open(domain+"/member/CheckCert.laf?popup=Y", "CertPop", "width=750,height=450,left=100,top=100");
	if(isWinopen == null) {
		alert("���ܵ� �˾�â�� ����� �ֽʽÿ�.");
	}
}

// û�ҳ����ع� ��ǰ ���ٽ� �ɸ��� �������� �˾� ������ - 2013.08.08 ������
function goCheckCertPopCconma() {
	var isWinopen = window.open(domain+"/cconma/CheckCert.laf?popup=Y", "CertPop", "width=750,height=450,left=100,top=100");
	if(isWinopen == null) {
		alert("���ܵ� �˾�â�� ����� �ֽʽÿ�.");
	}
}

//19����ǰ ��ٱ��� ���(2009.04.03 by ���ؿ�)
function openLoginProductDetail(retURL, prevURL) {

	if(typeof(retURL) == "undefined")	{
		var isWinopen = window.open(domain+"/login/loginNotAgeCart.laf?linkUrl=" + prevURL, "LoginPop", "width=420,height=283,left=100,top=100");
		if(isWinopen == null) {
			alert("���ܵ� �˾�â�� ����� �ֽʽÿ�.");
		}
	} else {
		var isWinopen = window.open(domain+"/login/loginNotAgeCart.laf?retURL=" + escape(retURL) + "&linkUrl=" + prevURL, "LoginPop", "width=420,height=283,left=100,top=100");
		if(isWinopen == null) {
			alert("���ܵ� �˾�â�� ����� �ֽʽÿ�.");
		}
	}

}

//�ٷ��� ��ǥ���ڵ� ���ý� �� �׸� check_2009.04.16  ������
function goPkgCheck(checkobj, objname, forms, nPbarcode) {
	var chk = checkobj.checked;
	var pBarcode = "";
	for( var i=0; i<forms.elements.length; i++) {
		if(forms.elements[i].name == 'pBarcode'){
			pBarcode = forms.elements[i].value;
		}

		if(forms.elements[i].name == objname) {
			if(forms.elements[i].type == 'checkbox') {
				if(pBarcode == nPbarcode){
					forms.elements[i].checked = chk;
				}
			}
		}
	}
}

//�󼼿��� �ٷ��� ��ǥ���ڵ� ���ý� ��ٱ��Ͽ��� �� �׸� �ڵ� check_2009.05.09  ������
function goPkgAddCartCheck() {
	var forms = document.korCartForm;
	var cnt = 0;
	var pBarcode;
	var PrePBarcode;
	var chk;

	for( var i=0; i<forms.indexCnt.length; i++) {
		pBarcode = forms.pBarcode[i].value;
		if(PrePBarcode != pBarcode) {
			PrePBarcode = pBarcode;
			chk = forms.indexCnt[i].checked;
		}
		if(pBarcode == PrePBarcode){
			forms.indexCnt[i].checked = chk;
		}
	}
}


/*==============================================================================
  2009.04.16  ������
  Function : javaScript Map
  Return   :
  examples :
           : get(key), getKey(value), put(key, value), size(), remove(key),
             clear(), keys(), values(), containsKey(key), containsValue(value),
             isEmpty(), putAll(map), toString(separator)
==============================================================================*/
function Map_del(Delimitor) {
  this.Delimitor = (Delimitor == null ? "||" : Delimitor);
  this._MapClass = new ActiveXObject("Scripting.Dictionary");

  this.get = function(key) { return this._MapClass.exists(key) ? this._MapClass.item(key) : null; }
  this.getKey = function (value) {
    var keys = this.keys();
    var values = this.values();
    for (var i in values) {
       if (value == values[i]) return keys[i];
     }
    return "";
  }
  this.put = function(key, value) {
      var oldValue = this._MapClass.item(key);
      this._MapClass.item(key) = value;
      return value;
  }
  this.size = function() { return this._MapClass.count; }
  this.remove = function(key) {
    var value = this._MapClass.item(key);
    this._MapClass.remove(key);
    return value;
  }
  this.clear = function() {
    this._MapClass.removeAll();
  }
  this.keys = function() {
    return this._MapClass.keys().toArray();
  }
  this.values = function() {
    return this._MapClass.items().toArray();
  }
  this.containsKey = function(key) {
    return this._MapClass.exists(key);
  }
  this.containsValue = function(value) {
    var values = this.values();
    for (var i in values) {
      if (value == values[i]) {
        return true;
      }
    }
    return false;
  }
  this.isEmpty = function() { return this.size() <= 0;}
  this.putAll = function(map) {
    if (!(map instanceof Map)) {
      throw new Error(0, "Map.putAll(Map) method?? Map type?? parameter?? ??????????.");
    }
    var keys = map.keys();
    for (var i in keys) {
      this.put(keys[i], map.get(keys[i]));
    }
    return this;
  }

  this.toString = function(separator) {
    var keys = this.keys();
    var result = "";
    separator = separator == null ? "&" : separator;
    for (var i in keys) {
      result += (keys[i] + this.Delimitor + this._MapClass.item(keys[i]));
      if (i < this.size() - 1) {
        result += separator;
      }
    }
    return result;
  }
}


//�Ǹ�����, �������� �˾�
function realNameCheck() {
	window.open("/member/RealConfirmContentPop.laf", "�Ǹ�����", "width=440,height=225,top=100, status=no");
}

function realNameCheckAlert() {
	alert("������ ���ͳ� �̿� ��ȭ ������ ���� ���ۼ� ������ �Ϻ� �����մϴ�.\n\n - �ؿ� ����ȸ�� : ���� �������� �߰� ���� �̿� ����");
}


// 20091112 ȫ���� TP Ű����
function goKiwi(barcode, linkClass, ejkGb) {

	var subBarcode = barcode.substring(0, 2);

	if(subBarcode == '29'){
		linkUrl = domain+"/product/detailKiwimomKor.laf?mallGb=PKG&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
	}else{
		if (ejkGb == 'KOR') {
			linkUrl = domain+"/product/detailKiwimomKor.laf?mallGb=KOR&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
		} else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
			linkUrl = domain+"/product/detailKiwimomEng.laf?mallGb=ENG&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
		} else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
			linkUrl = domain+"/product/detailKiwimomEng.laf?mallGb=JAP&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
		} else if (ejkGb == 'MUC') {
			linkUrl = domain+"/product/detailKiwimomMuc.laf?mallGb=MUC&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
		} else if (ejkGb == 'DVD') {
			linkUrl = domain+"/product/detailKiwimomDvd.laf?mallGb=DVD&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
		}
	}
	document.location.href = linkUrl;
}
// 20091112 ȫ���� TP teenQ
function goTeenq(barcode, linkClass, ejkGb) {

	var subBarcode = barcode.substring(0, 2);

	if(subBarcode == '29'){
		linkUrl = domain+"/product/detailTeenqKor.laf?mallGb=PKG&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
	}else{
		if (ejkGb == 'KOR') {
			linkUrl = domain+"/product/detailTeenqKor.laf?mallGb=KOR&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
		} else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
			linkUrl = domain+"/product/detailTeenqEng.laf?mallGb=ENG&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
		} else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
			linkUrl = domain+"/product/detailTeenqEng.laf?mallGb=JAP&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
		} else if (ejkGb == 'MUC') {
			linkUrl = domain+"/product/detailTeenqMuc.laf?mallGb=MUC&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
		} else if (ejkGb == 'DVD') {
			linkUrl = domain+"/product/detailTeenqDvd.laf?mallGb=DVD&barcode="+barcode+"&linkClass="+linkClass+"&ejkGb="+ejkGb;
		}
	}
	document.location.href = linkUrl;

}


//lns : �뷮���� �ӽð����� ���
function goAddEstimateTemp(formname, nowIndex){
	chkIndex = formname.indexCnt;
	if(nowIndex != -1) {
		if(typeof(chkIndex[nowIndex-1]) == "undefined") {
			if(!chkIndex.checked) {
				chkIndex.checked = true;
			}
		} else {
			if(!chkIndex[nowIndex-1].checked) {
				chkIndex[nowIndex-1].checked = true;
			}
		}
		formname.action = domain+"/bulk/estimateTempAdd.laf";
		formname.submit();
	}else{
			for( var i=0; i<chkIndex.length; i++) {
				if(chkIndex[i].type == 'checkbox') {
					if(chkIndex[i].checked) {
						formname.action = domain+"/bulk/estimateTempAdd.laf";
						formname.submit();
					}
				}
			}
		}

	}


function goAddEstimateTempList(formname,targetName) {

	var result = false;
	var frmTarget = formname.target;
	var frmAction = formname.action;
	try{
		chkIndex = formname.indexCnt;
		if (!isChecked(chkIndex)) {
			alert("��ǰ�� �ϳ��� �����ϼž� �մϴ�.");
			return;
		}
		formname.action = domain+"/bulk/estimateTempAdd.laf";
		formname.submit();
		result = true;
	}catch(e){
		alert(e.message);
	}finally{
		formname.target=frmTarget;
		formname.action=frmAction;
		return result;
	}
}

function goBooknewsContents(menu_id, sntn_id, orderclick)
{
	var link_url = "";

	// �޴��� : ���ô���
	if(menu_id=="03010200" || menu_id=="03010300" ) 	 link_url = "http://news.kyobobook.co.kr/today/newsTodayView.ink?orderclick="+orderclick;
	// �޴��� : ���� ��� å
	else if(menu_id=="03010100") link_url = "http://news.kyobobook.co.kr/today/eyeBookView.ink?orderclick="+orderclick;
	// �޴��� : ��ȹƯ��
	else if(menu_id=="03020200" || menu_id=="03020300" || menu_id=="03020400") link_url = "http://news.kyobobook.co.kr/theme/specialPlusView.ink?orderclick="+orderclick;
	// �޴��� : ���ͺ�
	else if(menu_id=="03030100" || menu_id=="03030200" || menu_id=="03060400") link_url = "http://news.kyobobook.co.kr/people/interviewView.ink?orderclick="+orderclick;
	// �޴��� : ���� - ����
	else if(menu_id=="03050600") link_url = "http://news.kyobobook.co.kr/comma/webToonView.ink?orderclick="+orderclick;
	// �޴��� : ���� - Į��
	else if(menu_id=="03050100") link_url = "http://news.kyobobook.co.kr/comma/openColumnView.ink?orderclick="+orderclick;
	// �޴��� : ���� - READ IT
	else if(menu_id=="03050900") link_url = "http://news.kyobobook.co.kr/comma/readITView.ink?orderclick="+orderclick;
	// �޴��� : ���� - ��ê
	else if(menu_id=="03051000") link_url = "http://news.kyobobook.co.kr/comma/bookChatView.ink?orderclick="+orderclick;
	// �޴��� : ��TV - ��ĳ��Ʈ
	else if(menu_id=="03060700") link_url = "http://news.kyobobook.co.kr/movie/welcomeShowView.ink?orderclick="+orderclick;
	// �޴��� : ��TV - ��Ʃ��
	else if(menu_id=="03060800") link_url = "http://news.kyobobook.co.kr/movie/bookTubeView.ink?orderclick="+orderclick;
	// �޴��� : ��TV - ������ġ
	else if(menu_id=="03060900") link_url = "http://news.kyobobook.co.kr/movie/sketchView.ink?orderclick="+orderclick;
	// �޴��� : �������� - å���� 
	else if(menu_id=="03060100") link_url = "http://news.kyobobook.co.kr/movie/bookBoxView.ink?orderclick="+orderclick;
	// �޴��� : �������� - ����Ʈ����
	else if(menu_id=="03060200") link_url = "http://news.kyobobook.co.kr/movie/bestSellerView.ink?orderclick="+orderclick;
	// �޴��� : �������� - ��Ʈ���Ϸ�
	else if(menu_id=="03060600") link_url = "http://news.kyobobook.co.kr/movie/bookTrailerView.ink?orderclick="+orderclick;
	// �޴��� : �������� - ���丮��
	else if(menu_id=="03050200") link_url = "http://news.kyobobook.co.kr/comma/booktorianView.ink?orderclick="+orderclick;
	// �޴��� : �������� - �Ҽ�
	else if(menu_id=="03050700") link_url = "http://news.kyobobook.co.kr/comma/novelView.ink?orderclick="+orderclick;

    link_url += "&sntn_id="+sntn_id;

    window.open(link_url, "BooknewsContents", "");
}

// �ϴ��� �α�� �̵��� �ű� Ŭ���� ����
// 2011.12.14 �Ӽ���
function goBooknewsContentsKc(menu_id, sntn_id, orderclick,Kc)
{
    var link_url = "";

	// �޴��� : ���ô���
	if(menu_id=="03010200" || menu_id=="03010300" ) 	 link_url = "http://news.kyobobook.co.kr/today/newsTodayView.ink?orderclick="+orderclick;
	// �޴��� : ���� ��� å
	else if(menu_id=="03010100") link_url = "http://news.kyobobook.co.kr/today/eyeBookView.ink?orderclick="+orderclick;
	// �޴��� : ��ȹƯ��
	else if(menu_id=="03020200" || menu_id=="03020300" || menu_id=="03020400") link_url = "http://news.kyobobook.co.kr/theme/specialPlusView.ink?orderclick="+orderclick;
	// �޴��� : ���ͺ�
	else if(menu_id=="03030100" || menu_id=="03030200" || menu_id=="03060400") link_url = "http://news.kyobobook.co.kr/people/interviewView.ink?orderclick="+orderclick;
	// �޴��� : ���� - ����
	else if(menu_id=="03050600") link_url = "http://news.kyobobook.co.kr/comma/webToonView.ink?orderclick="+orderclick;
	// �޴��� : ���� - Į��
	else if(menu_id=="03050100") link_url = "http://news.kyobobook.co.kr/comma/openColumnView.ink?orderclick="+orderclick;
	// �޴��� : ���� - READ IT
	else if(menu_id=="03050900") link_url = "http://news.kyobobook.co.kr/comma/readITView.ink?orderclick="+orderclick;
	// �޴��� : ���� - ��ê
	else if(menu_id=="03051000") link_url = "http://news.kyobobook.co.kr/comma/bookChatView.ink?orderclick="+orderclick;
	// �޴��� : ��TV - ��ĳ��Ʈ
	else if(menu_id=="03060700") link_url = "http://news.kyobobook.co.kr/movie/welcomeShowView.ink?orderclick="+orderclick;
	// �޴��� : ��TV - ��Ʃ��
	else if(menu_id=="03060800") link_url = "http://news.kyobobook.co.kr/movie/bookTubeView.ink?orderclick="+orderclick;
	// �޴��� : ��TV - ������ġ
	else if(menu_id=="03060900") link_url = "http://news.kyobobook.co.kr/movie/sketchView.ink?orderclick="+orderclick;
	// �޴��� : �������� - å���� 
	else if(menu_id=="03060100") link_url = "http://news.kyobobook.co.kr/movie/bookBoxView.ink?orderclick="+orderclick;
	// �޴��� : �������� - ����Ʈ����
	else if(menu_id=="03060200") link_url = "http://news.kyobobook.co.kr/movie/bestSellerView.ink?orderclick="+orderclick;
	// �޴��� : �������� - ��Ʈ���Ϸ�
	else if(menu_id=="03060600") link_url = "http://news.kyobobook.co.kr/movie/bookTrailerView.ink?orderclick="+orderclick;
	// �޴��� : �������� - ���丮��
	else if(menu_id=="03050200") link_url = "http://news.kyobobook.co.kr/comma/booktorianView.ink?orderclick="+orderclick;
	// �޴��� : �������� - �Ҽ�
	else if(menu_id=="03050700") link_url = "http://news.kyobobook.co.kr/comma/novelView.ink?orderclick="+orderclick;

    link_url += "&sntn_id="+sntn_id;
		link_url += "&Kc="+Kc;

    window.open(link_url, "BooknewsContents", "");
}




//19����ǰ �������� �̵�
function openDetailProductNotAge(ejkGb, linkClass, barcode, notAge, loginYN, isRecent) {

	var sUrl = "";
	var linkUrl = "";


	var clickstr = "";
	if(event != null) {
		var curTag = event.srcElement;
		var i=0;

		while(curTag.parentElement && i<40) {
			if((curTag.tagName == "SPAN" || curTag.tagName == "span") && curTag.name == "orderclick") {
				clickstr = "&clickOrder=" + curTag.value;
				break;
			}
			curTag = curTag.parentElement;
			i++;
		}
	}
	
	var subBarcode = barcode.substring(0, 2);

	if(subBarcode == '29'){
		linkUrl = domain+"/product/detailViewPackage.laf?mallGb=PKG";
	}else if(subBarcode == '14'){
		linkUrl = "http://pod.kyobobook.co.kr/newPODBookList/newPODBookDetailView.ink";
	}else{
		if (ejkGb == 'KOR') {
			linkUrl = domain+"/product/detailViewKor.laf?mallGb=KOR";
		} else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
			linkUrl = domain+"/product/detailViewEng.laf?mallGb=ENG";
		} else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
			linkUrl = domain+"/product/detailViewEng.laf?mallGb=JAP";
	    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
	        linkUrl = "http://music.kyobobook.co.kr/ht/record/detail/";
	    } else if (ejkGb == 'GFT') {
	        linkUrl = "http://gift.kyobobook.co.kr";
	    } else if (ejkGb == 'EBK') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?selectedLargeCategory=001";
	    } else if (ejkGb == 'AUD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/audio/audioDetail.ink?selectedLargeCategory=002";
	    } else if (ejkGb == 'VOD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/vod/vodDetail.ink?selectedLargeCategory=003";
	    } else if (ejkGb == 'KDS') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/kids/kidsDetail.ink?selectedLargeCategory=004";
	    } else if (ejkGb == 'DUM') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/article/articleDetail.ink?selectedLargeCategory=006";
		} else if (ejkGb == 'DSE') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/setDetail.laf?category=007";
		} else if (ejkGb == 'DMA') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/eMagazineDetail.laf?category=008";
		}
	}


	if(subBarcode == '14'){
		sUrl = linkUrl + "?barcode="+barcode;
    } else if(ejkGb == 'GFT') {
		sUrl = linkUrl + '/p/' + barcode;
    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
   	    self.location.href = linkUrl+barcode;
	    return;
	} else  if (linkUrl != '') {
		sUrl = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" + barcode + clickstr;
	}

	if(notAge == 19) {
		if(loginYN == "Y") {
			if(typeof(isRecent) == "undefined") {
				//self.location.href = sUrl;
				window.open(sUrl);
			} else if( isRecent == true ) {
				//parent.location.href = sUrl;
				window.open(sUrl);
			}

			return;
		} else {
			alert("��������(��19�� �̻�) ��ǰ�Դϴ�. �α��� �� �̿��ϼ���.");
			openLoginNotAge(sUrl);

			return;
		}

	} else {
		if(typeof(isRecent) == "undefined") {
			//self.location.href = sUrl;
			window.open(sUrl);
		} else if( isRecent == true ) {
			//parent.location.href = sUrl;
			window.open(sUrl);
		}
		return;
	}
}


function openDetailProductKc(ejkGb, linkClass, barcode, orderClick, Kc) {
    var linkUrl = "";

		var subBarcode = barcode.substring(0, 2);

		if(subBarcode == '29'){
			linkUrl = domain+"/product/detailViewPackage.laf?mallGb=PKG";
		}else if(subBarcode == '14'){
			linkUrl = "http://pod.kyobobook.co.kr/newPODBookList/newPODBookDetailView.ink";
		}else{
	    if (ejkGb == 'KOR') {
	        linkUrl = domain+"/product/detailViewKor.laf?mallGb=KOR";
	    } else if (ejkGb == 'ENG' || ejkGb == 'BNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=ENG";
	    } else if (ejkGb == 'JAP' || ejkGb == 'JNT') {
	        linkUrl = domain+"/product/detailViewEng.laf?mallGb=JAP";
	    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
	        linkUrl = "http://music.kyobobook.co.kr/ht/record/detail/";
	    } else if (ejkGb == 'GFT') {
	        linkUrl = "http://gift.kyobobook.co.kr";
	    } else if (ejkGb == 'EBK') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?selectedLargeCategory=001";
	    } else if (ejkGb == 'AUD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/audio/audioDetail.ink?selectedLargeCategory=002";
	    } else if (ejkGb == 'VOD') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/vod/vodDetail.ink?selectedLargeCategory=003";
	    } else if (ejkGb == 'KDS') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/kids/kidsDetail.ink?selectedLargeCategory=004";
	    } else if (ejkGb == 'DUM') {
	        linkUrl = "http://digital.kyobobook.co.kr/digital/article/articleDetail.ink?selectedLargeCategory=006";
		} else if (ejkGb == 'DSE') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/setDetail.laf?category=007";
		} else if (ejkGb == 'DMA') {
			linkUrl = "http://digital.kyobobook.co.kr/kyobobook/eMagazineDetail.laf?category=008";
		} 
	  }

	if(subBarcode == '14'){
		var sUrl = linkUrl + "?barcode="+barcode+ "&orderClick=" + orderClick;
		window.open(sUrl,'_blank','') ;
	}else if(ejkGb == 'GFT'){
		var sUrl = linkUrl + '/p/' + barcode + "&orderClick=" + orderClick + "&Kc=" + Kc;
		window.open(sUrl,'_blank','') ;
    } else if (ejkGb == 'MUC' || ejkGb == 'DVD') {
   	    self.location.href = linkUrl+barcode + "&orderClick=" + orderClick + "&Kc=" + Kc;;
	    return;
  	} else if (linkUrl != '') {
        //var sUrl = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode + "&orderClick=" + orderClick + "&Kc=" + Kc;
        var sUrl = linkUrl + "&ejkGb=" + ejkGb + "&linkClass=" + linkClass + "&barcode=" +barcode + "&orderClick=" + orderClick + "&Kc=" + Kc;
        window.open(sUrl,'_blank','') ;
    }
    return;
}

//��ٱ��� �ٷ��� ��ǥ���ڵ� ���ý� �� �׸� check_2013.04.22 ����
function goCartPkgCheck(checkobj, objname, forms, nPbarcode) {
	var chk = checkobj.checked;
	for( var i=0; i<forms.indexCnt.length; i++) {	
		if(forms.pBarcode[i].value == nPbarcode){
			forms.indexCnt[i].checked = chk;
		}
	}
}


//�θ�κ��� �޽��� ����
function receiveMsgFromParent( e ) {
	// e.data�� ���޹��� �޽���
	if(e.origin == "https://ordertest.kyobobook.co.kr" || e.origin == "http://ordertest.kyobobook.co.kr" || e.origin == "http://order.kyobobook.co.kr" || e.origin == "https://order.kyobobook.co.kr"){
		if(e.data == 'SUCCESS'){
			if(confirm('������ ��ǰ�� ��ٱ��Ͽ� �����ϴ�. \n��ٱ��Ϸ� �̵��Ͻðڽ��ϱ�?'))
			{ 
				top.location.replace(orderDomain + '/cart/cartListMain');
			}
		}else{
			alert(e.data);
		}
	}
}