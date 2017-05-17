
var template = require('html-loader!./submittask.html');
var Alert    = require('Widget/alert/alert'); 
var Util     =  require('Widget/util/util'); 
var dataModel = require('Widget/dataModel/dataModel');
var serverConfig = require('../../config/serverConfig');

require('./submittask.less');

module.exports = {

	FileList : [],

 	render: function () {

 		$('.page-content-wrapper').html(template);
 		this.bind();
 	},
 	bind: function () {

 		var me = this ;
 		var dropZone = document.getElementById('drop_zone');
		dropZone.addEventListener('dragover', this.dragOver, false);
		dropZone.addEventListener('drop', this.fileSelect.bind(me), false);

		$('.cancel').on('click' , function(){
			
			me.FileList.length = 0;
			$('.content-wanning').css('display' , 'none');
			$('#list').html('');
			var opt = {
				wrapper : 'dispacther-page-submittask',
				info    : '已清除上传图片，请重新上传',
				type    : 'success'
			}
			Alert.show(opt);
		})

		$('.submit').on('click',function(){

			// if(me.validateCommitFile(me.FileList)){

				var url = serverConfig['host'] + serverConfig['commit'];
			         
				var formData = new FormData(); 
				for(var i = 0 ;i < me.FileList.length ; i++){
					formData.append('files[]',me.FileList[i] ); 
				}
				// xhr.send(fd); 
				$.ajax({
				    url: url,
				    type: 'POST',
				    data: formData,
				    processData: false,
				    contentType: false,

				    success :function (res){

				    		
				    	if(res.status === 200){
				    		var opt = {
								wrapper : 'dispacther-page-submittask',
								info    : '上传成功',
								type    : 'success'
							}
							Alert.show(opt);
				    	}else{
				    		var opt = {
								wrapper : 'dispacther-page-submittask',
								info    : res.message,
								type    : 'warn'
							}
							Alert.show(opt);
				    	}

				    },
				    error :function(res){
			    		var opt = {
							wrapper : 'dispacther-page-submittask',
							info    : '上传图片失败，请重新上传',
							type    : 'warn'
						}
						Alert.show(opt);
				    }
				});
			//}
					            

		})
 	},

 	fileSelect:function(evt) {

		evt.stopPropagation();
		evt.preventDefault();

		var files = evt.dataTransfer.files;
		var output = [];

		
		files = Array.prototype.slice.call(files) ; 
		
		if(this.validateUpFile(files)){

			for (var i = 0, f; f = files[i]; i++) {

			    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
			                f.size, ' bytes, last modified: ',
			                f.lastModifiedDate.toLocaleDateString(), '</li>');
		    }

		    output = output.join('') ;
			$('#list').append(output);
		}

	},

	validateUpFile:function(files){
		
		var me = this ;
		var validateTag = true;


		var filenames = files.map(function(item){
 
			return  item.name;
		});

		var fileSuffix = files.map(function(item){
 			var nameTmp  = item.name.split('_') ;
			return  (nameTmp && nameTmp.length > 0 && nameTmp[1]) ?  nameTmp[1].split('.')[0] : '';
		});

		var FileNames = this.FileList.map(function(item){

			return  item.name;
		});
		console.log(fileSuffix);

		for (var i = 0 ; i < fileSuffix.length ; i ++){

			console.log('dasd' + fileSuffix[i]);
			if((fileSuffix[i] && fileSuffix[i] !== 'res') 
				|| !fileSuffix[i]){
				var opt = {
					wrapper : 'dispacther-page-submittask',
					info    : '上传文件中文件名有误，请重新上传',
					type    : 'warn'
				}
				Alert.show(opt);

				return  false ; 
			}
		}


		filenames.forEach(function(item){

			var pos = $.inArray(item , FileNames);


			if(pos !== -1 && FileNames.length !== 0){
				var opt = {
					wrapper : 'dispacther-page-submittask',
					info    : '文件已上传请勿重新上传',
					type    : 'warn'
				}
				Alert.show(opt);
				validateTag  = false ; 

			}else{
				me.FileList = me.FileList.concat(files);
				me.FileList = Util.unique(me.FileList);
				validateTag  = true ;
			}

		});

		var len =  this.FileList.length ;

		if(len > 20 ){

			var opt = {
				wrapper : 'dispacther-page-submittask',
				info    : '一次性上传不要超过20条',
				type    : 'warn'
			}
			Alert.show(opt);
			validateTag = false ;
		}


		return validateTag ;

	},
	validateCommitFile :function(files){

		var validateTag = false;
		var filenames = files.map(function(item){

			return  item.name.split('_')[0];
		});


		for(var i = 0 ; i < files.length ; i++) {

			var filename = files[i].name.split('_')[0];
			var filetype = files[i].name.split('_')[1].split('.')[0];

			console.log(filenames);
			var postions  = filenames.filter(function(item){
				console.log(filename ,item);
				return  item == filename
			});


			console.log("postions:" + postions)
			if(postions.length < 2 ){


				var warnOutput = [];

				if(filetype == 'data'){

					warnOutput.push('<span class="warnning-content"> '+filename + '文件缺少res结果'+'</span>');
					validateTag = false ;
					
				}else if (filetype == 'res'){

					warnOutput.push('<span class="warnning-content"> '+filename + '文件缺少data结果'+'</span>');
					
					validateTag =  false ;
				}

				warnOutput = warnOutput.join('') ;
				$('.content-wanning').append(warnOutput);
				$('.content-wanning').css('display' , 'block');

			}else {
				$('.content-wanning').css('display' , 'none');
				validateTag =  true ;
			}
		}

		return validateTag;
	},

	dragOver: function(evt) {
	  evt.stopPropagation();
	  evt.preventDefault();
	  evt.dataTransfer.dropEffect = 'copy';
	}
};