
var template = require('html-loader!./mytask.html');
var Alert  = require('Widget/alert/alert');
var dataModel = require('Widget/dataModel/dataModel');
var serverConfig = require('../../config/serverConfig');

require('./mytask.less');

module.exports = {

	taskId : '',

 	render: function () {

 		$('.page-content-wrapper').html(template);
 		this.bind();

 	},

 	bind: function () {

 		var me = this;
 		
 		$(".download-btn").on('click' ,function(){
 			
 			var imgCount = $('.img-count').val();
 			imgCount =  +imgCount;

 			//validate input value
 			if(me.validateInput(imgCount)){

 				var assginOpt = {
	 			 	data : {
	 			 	 	cnt   : imgCount,
	 			 	},
	 			 	method : 'POST',
	 			 	type  : 'assgin',

	 			 }

 			 	dataModel.getData(assginOpt).then(function(res){

 			 		if(res.status === 200){

 			 			window.open(serverConfig['host'] + serverConfig['download'] + '?taskId=' + res.data.taskId)
 			 			
 			 			if(res.data.isNew){

 			 				var opt = {
								type : 'warn',
								info : '本次认领任务为未完成任务' ,
								wrapper : 'dispacther-page-mytask'
							}

							Alert.show(opt);
 			 			}

 			 		}else{

 			 			var opt = {
							type : 'warn',
							info : res.message ,
							wrapper : 'dispacther-page-mytask'
						}

						Alert.show(opt);
 			 		}
 			 		
 			 	});


 			}

 		})
 	},

 	validateInput: function(inputVal) {

		if( isNaN(inputVal) ){

			this.showValidateInfo( "输入非法，清楚输入合法数字");	
			return false ; 

		}else if (!inputVal){

			this.showValidateInfo( "输入为空，清楚输入合法数字");
			return false ; 

		}else if(inputVal > 50 || inputVal < 1){
			var opt = {
				type : 'warn',
				info : '一次性下载要大于1张，小于50张' ,
				wrapper : 'dispacther-page-mytask'
			}

			Alert.show(opt);
			return false ; 
		}else{
			this.showValidateInfo( "");
			return true ; 
		}
 	},

 	showValidateInfo: function(info){

		var warnInfo  = $('.warn-info');
 		var inputWrapper = $('.input-wrapper');
 		var warnWrapper  = $('.warn-wrapper');

 		if(info){

	 		warnInfo.text('');
	 		inputWrapper.addClass('has-error');

	 		warnWrapper.css('display' ,'block');
			warnInfo.text(info);
 		}else{

 			warnWrapper.css('display' ,'none');
 			inputWrapper.removeClass('has-error');
 		}

 	}
};