var template = require('html-loader!./login.html');
var dataModel = require('Widget/dataModel/dataModel');
var cookie = require('Widget/cookie/cookie')

require('./login.less');

module.exports = {
 	render: function () {
 		
	 	var c_username = cookie.getCookie('username');
		if(c_username){
		 	location.hash = '#index'; 
		}

 		$('.root').html(template);
 		this.bind();

 	},
 	bind: function () {
 		//bind Dom Event
 		var me = this;

 		$('.login-btn').on('click' ,function(){
 			me.loginAction();
 		})

		$('body').on('keydown' ,function(event){

			if(event.keyCode == 13){
				me.loginAction();
			}

 		})
 	},

 	loginAction :function(){

 		var me = this;
 		var username = $('.username').val() || '';
		var passwd = $('.password').val() || '';
		var identifyCode =  $('.identify-code').val() || '';

		if(!username){
			this.showValidateInfo('用户名为空');
		 	return;
		}

		if(!passwd){
			this.showValidateInfo('密码为空');
		 	return ;
		}
		var opt = {
		 	data : {
		 	 	username : username,
		 	 	passwd   : passwd,
		 	},

		 	 method : 'POST',
		 	 type  : 'login'
		}

		dataModel.getData(opt).then(function(res){

		 	if(res.status === 11004){

		 		me.showValidateInfo('验证码错误');
		 		$('.identify-code-img').attr('src' , 'http://sampling-qa.camera360.com/index/captcha?v='+ new Date() ) ;
		 	
		 	}else if(res.status === 11000){
		 		
		 		me.showValidateInfo('用户名或密码错误');

		 	}else if(res.status === 11002 || res.status === 11003){

		 		me.showValidateInfo(res.message);
		 		
		 	}

		 	var c_opt = {
		 		c_name : 'username',
		 		value  : res.data.username,
		 		expiredays : 5 * 60 * 60 * 1000
		 	}
		 	cookie.setCookie(c_opt);

		 	location.hash = '#index'; 
		});
 	},

 	showValidateInfo : function(str){

 		$('.login-warn-wrapper').css('display' , 'block');
 		$('.warn-info').text(str);
 	}
};