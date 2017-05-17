

// require("expose-loader?$!jquery");

var $ = require("jquery");


var route = require("./common/js/route");

route.init();
route.navigation();

setTimeout(function(){
	$('.logo').css('display' , 'none');
	$('.cover-time').css('display' , 'none');

	//$('.index-cover').css('background' , '');
	$('.index-cover').css('display' , 'none');

},4000) 
