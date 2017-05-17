var template = require('html-loader!./header.html');
var cookie   = require('Widget/cookie/cookie');
var dataModel = require('Widget/dataModel/dataModel');

 require('./header.less');

module.exports = {

 	render: function () {
 		
 		var username = cookie.getCookie('username'); 

 		$('.page-header').html(template);
 		$('.username').text(username);
 		this.bind();

 	},
 	bind: function () {
 		//bind Dom Event
 		$('.logout').on('click', function(){

 			var opt = {
 			 	 method : 'GET',
 			 	 type  : 'logout'
 			 }

 			 dataModel.getData(opt).then(function(data){

 			 	if(data){

 			 		var c_opt = {
	 			 		c_name : 'username',
	 			 		value  : '',
	 			 		expiredays : 5 * 60 * 60 * 1000
	 			 	}
	 			 	cookie.setCookie(c_opt);
 			 		location.hash = '#login'; 
 			 	}

 			 });
 		})
 	},
};