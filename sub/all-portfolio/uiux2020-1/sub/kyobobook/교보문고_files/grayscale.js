// IE 10 only CSS properties
var ie10Styles = ['msTouchAction','msWrapFlow'];
var ie11Styles = ['msTextCombineHorizontal'];
var EdgeStyles = ['webkitFilter'];

// Test all IE only CSS properties
var d = document;
var b = d.body;
var s = b.style;
var browser = null;
var property;

// Tests IE10 properties
for (var i = 0; i <ie10Styles.length; i++) {
	property = ie10Styles[i];
	if (s[property] != undefined) {
		browser = 'ie10';
	}
}

// Tests IE11 properties
for (var i = 0; i <ie11Styles.length; i++) {
	property = ie11Styles[i];
	if (s[property] != undefined) {
		browser = 'ie11';
	}
}

// Tests Edge properties
for (var i = 0; i <EdgeStyles.length; i++) {
	property = EdgeStyles[i];
	if (s[property] != undefined) {
		browser = 'Edge';
	}
}

//Grayscale images only on browsers IE10+ since they removed support for CSS grayscale filter
if(browser != 'Edge' && browser == 'ie10' || browser == 'ie11' ){

	var svgStyle = '';
	svgStyle += '<style type="text/css">\n';
	svgStyle += '.grayscale .graywrap {display:inline-block;position:relative;padding:0;width:100%;height:100%;}\n';
	svgStyle += '.grayscale .graywrap svg {position:absolute;z-index:1;}\n';
	svgStyle += '.grayscale .graywrap > img {position:relative;z-index:2;opacity:0;width:100%;height:100%;}\n';
	svgStyle += '.grayscale:hover .graywrap > img,\n';
	svgStyle += 'li.on .grayscale .graywrap > img {opacity:1;}\n';
	svgStyle += '</style>\n';
	document.write(svgStyle);

	var svgFilter = '';
	svgFilter += '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position: absolute;overflow:hidden;" version="1.1">\n';
	svgFilter += '    <defs>\n';
	svgFilter += '        <filter id="grayscale"><feColorMatrix type="saturate" values="0" /></filter>\n';
	svgFilter += '    </defs>\n';
	svgFilter += '</svg>\n';
	document.write(svgFilter);

	(function($){
		$(document).ready(function(){
			$('.grayscale img').each(function(){
				if($(this).parent().is(':not(.graywrap)')){
					var svgImage = '';
					svgImage += '<svg xmlns="http://www.w3.org/2000/svg" role="img" width="100%" height="100%" version="1.1">\n';
					svgImage += '    <image filter="url(&quot;#grayscale&quot;)" preserveAspectRatio="none meet" x="0" y="0" width="100%" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+this.src+'" />\n';
					svgImage += '</svg>\n';
					$(this).wrap('<span class="graywrap">');
					$(this).before(svgImage);
				}
			});
		});
	})(jQuery);

 };