if (!window.Kis){
    window.Kis={};
}

Kis.Flash
=new function() {
  var me=this;
  var flv=null;
  var d=document;
  var w=window;
  function E(id){ return d.getElementById(id); }
/*  
  function flVer() {
    if(flv===null) { 
      flv=0;
      var i,f=null,p=w.navigator.plugins;
      if ( p&&p.length ){ 
        f=(p["Shockwave Flash"]||p["Shockwave Flash 2.0"]);
        if( f&&(i=f.description) ){
          flv=parseInt(i.substring(i.indexOf('.')-2));
        }
      } else if(w.ActiveXObject) {
        for(i=15;i>2&&!f;--i) {
          eval("try{f=new ActiveXObject('ShockwaveFlash.ShockwaveFlash.'+i);}catch(e){}");
          if(f){ 
            flv=i;
          }
        }
      }
    }
    return flv;
  }
*/  
  this.Version
  =function() {
    return flVer();
  };
   
  this.Build
  =function(f,v,wf,hf,id){
    var m=5;
    if(v){
      var p=v.lastIndexOf(' ');
      if(p>0){ 
        p=parseInt(v.substring(p));
      } else {
        p=parseInt(v);
      }
      m=(isNaN(p)?m:p);}
  
//      if(m<=flVer()){
      if(true){
	var isIE = (navigator.userAgent.indexOf("MSIE") >= 0?true:false);
/*        var el='<object type="application/x-shockwave-flash" width="'+
                              wf+'" height="'+hf+'" data="'+f+'"><param name="movie" value="'+
                              f+'"/><param name="quality" value="high"/><param name="wmode" value="transparent"/></object>';
*/        var el='<object type="application/x-shockwave-flash" width="'+
                              wf+'" height="'+hf+(isIE?('" src="'+f):('" data="'+f))+'"><param name="movie" value="'+
                              f+'"/><param name="allowScriptAccess" value="always"/><param name="quality" value="high"/><param name="wmode" value="transparent"/></object>';
        var dv=(id?d.getElementById(id):null);
        var dv=(id?d.getElementById(id):null);
      if( dv ){
      	dv.outerHTML=el;
      }else{ 
        d.write(el);
      }
    }
  };

  return this;
};
