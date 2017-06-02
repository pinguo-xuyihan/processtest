
var template = require('html-loader!./startCasePage.html');
var header = require('Widget/header/header');
var CaseItem = require('./caseitem');
var CaseManager = require('./casemanager');
var Dialog = require('Widget/dialog/dialog');

var host = "//112.124.5.195:8683";

//var host = "http://127.0.0.1:8081"

require('./startCasePage.less');

module.exports = {
 	render: function () {
 		$('.root').html(template);

 		this.init();
 		this.bind();
 	},
 	init: function () {
 		this.caseManager = new CaseManager();
 		var caseManager = this.caseManager;
 		console.log('dd', caseManager);
 		var caseList = [
 			'bannerAddP1',
 			'bannerEditP1',
 			'bannerCopyP1',
 			'bannerAddP2',
 			'bannerAddP3',
 			'bannerAddP4',
 			'bannerAddP5',
 			'feedAddP1',
 			'feedEditP1',
 			'feedCopyP1',
 			'feedAddP2',
 			'feedAddP3',
 			'inAppAddP1',
 			'fpEntry1AddP1',
 			'fpEntry1AddP2',
 			'fpEntry5AddP1',
 			'fpEntry5EditP1',
 			'fpEntry5CopyP1',
 		];
 		caseList.forEach(function (item) {		
	 		caseManager.addItem(new CaseItem({
	 			id: item
	 		}));
 		});

 		caseManager.render();
 	},
 	bind: function () {
 		var caseManager = this.caseManager;

 		//bind Dom Event
 		$('.get-info').on('click',function(){
			
			var id = $(this).attr('data-key');
			$.get(
 				host + '/api/case-info/'+ id,

 				function (data) {
 					$(".dialog-cover").css('display' , 'block');
 					Dialog.render();
 					var tpl = ['<ol>'];
 					for(var i = 0 ; i < data.caseInfo.length ; i++){
 						tpl.push('<li>' + data.caseInfo[i] +'</li>');
 					}
 					tpl.push('</ol>');
 					$(".bootbox-body").html(tpl.join(''));					
 				}
 			);
		});


 		$('.start-case-btn').on('click', function () {
 			caseManager.startQuene();
 		});
 	},
};