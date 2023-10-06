/*var pageLoaded = false;
var getPageLoaded = function() {
	return pageLoaded;
};*/
var UX={};
Object.extend=function(a, b){
  for (var property in b) a[property] = b[property];
  return a;
};

UX.$D = function(id) { if(typeof(id)!="object") return document.getElementById(id); else return id; };

UX.show=function(id) { try{ UX.$D(id).style.display = 'block';}catch(e){}};
UX.hide=function(id) { try{ UX.$D(id).style.display = 'none';}catch(e){}};

UX.addEvent=function(object, type, listener) {
	if(object.addEventListener) { if(type=='mousewheel')type='DOMMouseScroll'; object.addEventListener(type, listener, false);}
	else { object.attachEvent("on"+type, listener); }
};
UX.delEvent=function(object, type, listener){
	if (object.removeEventListener) { if(type=='mousewheel')type='DOMMouseScroll'; object.removeEventListener(type, listener, false);}
	else object.detachEvent('on'+type, listener);
};

UX.getScroll=function () {
	if(document.all && typeof document.body.scrollTop != "undefined")
	{
		var cont=document.compatMode!="CSS1Compat"?document.body:document.documentElement;
		return { left:cont.scrollLeft, top:cont.scrollTop, width:cont.clientWidth, height:cont.clientHeight};
	}
	else
		return { left:window.pageXOffset, top:window.pageYOffset, width:window.innerWidth, height:window.innerHeight};
};

UX.setOpacity=function(el,value){
	el.style.filter="alpha(opacity="+value+")";
	el.style.opacity=(value/100);
	el.style.MozOpacity=(value/100);
	el.style.KhtmlOpacity=(value/100);
};

/*UX.resizeImage=function(img,w,h){
	var t = new Image();
	t.src=img.src;
	if(t.width==0 || t.height==0) return;
	if(t.width>w || t.height >h)
	{
		img.width=w;img.height=h;
		if((t.width/w) > (t.height/h) )	img.height=Math.round(t.height * (w / t.width));
		else img.width = Math.round(t.width *  (h / t.height));
	}
	else
	{
		img.width=t.width;
		img.height=t.height;
	}
	if(img.width==0 || img.height==0) setTimeout(function(){ UX.resizeImage(img,w,h);},500);
};*/

var UXModalLHeight = '';
var UXModalLWidth = '';

UX.Modal=function(options,url,linkClass,barcode){ //options = {type:'',status:''}
    var linkUrl = "";
    if (url == 'KOR') {
        linkUrl = '/product/viewLargeImgKor.laf?mallGb=KOR';
    } else if (url == 'ENG' || url == 'BNT') {
        linkUrl = '/product/viewLargeImgEng.laf?mallGb=ENG';
    } else if (url == 'JAP' || url == 'JNT') {
        linkUrl = '/product/viewLargeImgEng.laf?mallGb=JAP';
    } else if (url == 'MUC') {
        linkUrl = '/product/viewLargeImgMuc.laf?mallGb=MUC';
    } else if (url == 'DVD') {
        linkUrl = '/product/viewLargeImgDvd.laf?mallGb=DVD';
    }
    if (linkUrl != '') {
        var url = linkUrl + "&ejkGb=" + url + "&linkClass=" + linkClass + "&barcode=" +barcode;
		if(url == 'DVD') {
            options = {type:'iframe',status:'width=754 height=782 frameborder=0 scrolling=auto style=\'padding:0;\'',loading:'true' };
        } else {
            options = {type:'iframe',status:'width=754 height=760 frameborder=0 scrolling=no style=\'padding:0;\'',loading:'true' };
        }
    }
	
	//if(!pageLoaded) { return false; }
	this.options={
		type:'image',
		alt:'',
		loading:false,
		opacity:30,
		width:0,height:0
	};
	Object.extend(this.options, options);
	var options=this.options;
	if(!UX.$D('UXModalB')) UX.Modal.print();
	UX.setOpacity(UX.$D('UXModalB'), options.opacity);
	UX.setOpacity(UX.$D('UXModalBIframe'), 0);

	UX.Modal.setB();
	if(options.loading) UX.Modal.center(UX.$D('UXModalL'));

	if(options.type=='image')
	{
		options.alt = '';
		UX.$D('UXModalF').innerHTML = '<img id="UXModalImage" src="'+url+'" alt="'+options.alt+'" />';
		if(options.loading) UX.$D('UXModalImage').style.display='none';
		/*var _cursor = 'http://www.kyobobook.co.kr/newimages/zoomout2.cur'; //ico image
		UX.setCursor(UX.$D('UXModalImage'), 'url(' + _cursor + '), pointer');*/
		UX.addEvent(UX.$D('UXModalImage'), 'load', UX.Modal.onload);
	}
	else if(options.type=='iframe')
	{
		UX.$D('UXModalF').innerHTML = '<iframe name="UXModalIframe" id="UXModalIframe" src="'+url+'" '+options.status+'></iframe>';
		if(options.loading)
		{
			UX.$D('UXModalF').style.display='none';
			UX.addEvent(UX.$D('UXModalIframe'), 'load', UX.Modal.onload);
		}
		UX.Modal.center(UX.$D('UXModalF'));
	}
	UX.Modal.self=this;
	UX.addEvent(UX.$D('UXModalB'), 'click', UX.Modal.reset);
	//if(options.type=='image') UX.addEvent(UX.$D('UXModalImage'), 'click', UX.Modal.reset);
	UX.addEvent(window,'resize', UX.Modal.onresize);
	UX.addEvent(window,'scroll', UX.Modal.onscroll);
};
UX.Modal.self={};
UX.Modal.onload=function(){
	var pos=UX.getScroll();
	UX.Modal.center(UX.$D('UXModalF'));
	UX.Modal.center(UX.$D('UXModalL'));
	UX.$D('UXModalL').style.display='none';
	if(UX.Modal.self.options.type=='image')
	{
		/*UX.$D('UXModalImage').style.display='block';
		if(UX.$D('UXModalImage').width > pos.width) {
			UX.resizeImage(UX.$D('UXModalImage'),pos.width,pos.height);
		}*/
	}
	else
	{
		UX.$D('UXModalF').style.display='block';
	}
	UX.Modal.center(UX.$D('UXModalF'));
	
};
UX.Modal.print=function(){
	// deemed layer size setting
	if (window.innerHeight && window.scrollMaxY) {
		this.UXModalB_height = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		this.UXModalB_height = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		this.UXModalB_height = document.body.offsetHeight;
	}
	var d=document.createElement('div');
	var s='';
	s+='<iframe style="z-index:99997;width:100%;height:'+this.UXModalB_height+';position:absolute;left:0;top:0;" name="UXModalBIframe" id="UXModalBIframe"></iframe><div id="UXModalB" style="z-index:99998;width:100%;height:'+this.UXModalB_height+'px;position:absolute;display:none;background-color:#000;"></div>';
	s+='<div id="UXModalF" style="z-index:99999;position:absolute;display:none;background-color:#fff;"></div>';
	s+='<div id="UXModalL" style="z-index:99999;display:none;width:100%;position:absolute;left:0;top:0;text-align:center;"><img src="http://image.kyobobook.co.kr/newimages/apps/b2c/search/2010/layered_popup/loader/loader.gif" width="48" height="48" alt="loading" /></div>';
	d.id = "UXModalWrap";
	d.innerHTML=s;
	document.getElementsByTagName('body')[0].appendChild(d);
};
UX.Modal.setB=function(){
	var w=UX.$D('UXModalB');
	w.style.top='0px';
	w.style.left='0px';
	w.style.display='block';
	UX.$D('UXModalBIframe').style.display='block';
};
UX.Modal.center=function(el){
	el.style.display='block';
	var pos=UX.getScroll();
	el.style.left=pos.width/2-el.offsetWidth/2+pos.left+'px';
	el.style.top=pos.height/2-el.offsetHeight/2+pos.top+'px';
	if(UX.$D('UXModalF').offsetTop < 0)el.style.top = 10+'px';
};
UX.Modal.reset=function(){
	UX.Modal.self=null;
	UX.$D('UXModalF').innerHTML='';
	UX.$D('UXModalB').style.display='none';
	UX.$D('UXModalBIframe').style.display='none';
	UX.$D('UXModalF').style.display='none';
	UX.$D('UXModalL').style.display='none';
	UX.delEvent(window,'resize',UX.Modal.onresize);
	UX.delEvent(window,'scroll',UX.Modal.onscroll);
};
UX.Modal.onresize=function(){
	//var pos=UX.getScroll();
	//if(UX.Modal.self.options.type=='image') UX.resizeImage(UX.$D('UXModalImage'),pos.width,pos.height);
	UX.Modal.center(UX.$D('UXModalF'));
	//UX.Modal.setB(); //image
};
UX.Modal.onscroll=function(){
	//UX.Modal.onresize();
};

//UX.addEvent(window, "error", function() { pageLoaded=true; });
//UX.addEvent(window, "load", function() { pageLoaded=true; });

// netizen point

function setNetizenPoint(point,id){
	if(UX.$D(id).value!=point) {
		UX.$D(id).value = point;
		UX.$D(id+"_starWidth").style.width=(point * 20) + "%";
		if(point!=""){
			UX.$D(id+"_starPoint").innerHTML = point + '.0';
		}else{
			UX.$D(id+"_starPoint").innerHTML = '0.0';
		}
	}
}





