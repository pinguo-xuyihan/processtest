
var template = require('html-loader!./startCasePage.html');
var header = require('Widget/header/header');
var CaseItem = require('./caseitem');
var CaseManager = require('./casemanager');
var Dialog = require('Widget/dialog/dialog');

require('./startCasePage.less');

module.exports = {
 	render: function () {
 		$('.root').html(template);

 		this.init();
 		this.bind();
 	},
 	init: function () {
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
 			'feedAddP2',
 			'feedAddP3',
 			'feedCopyP1',
 			'inAppAddP1',
 			'fpEntry1AddP1',
 			'fpEntry1AddP2',
 			'fpEntry5AddP1',
 			'fpEntry5EditP1',
 			'fpEntry5CopyP1',
 		];
 		var caseManager = new CaseManager();
 		caseList.forEach(function (item) {		
	 		caseManager.addItem(new CaseItem({
	 			id: item
	 		}));
 		});

 		caseManager.render();
 	},
 	bind: function () {

 		//bind Dom Event
 		$('.get-info').on('click',function(){
			
			var id = $(this).attr('data-key');
			$.get(
 				'http://127.0.0.1:8081/api/case-info/'+ id,

 				function (data) {
 					$(".dialog-cover").css('display' , 'block');
 					Dialog.render();
 					var str = '';
 					for(var i = 0 ; i < data.caseInfo.length ; i++){
 						str += data.caseInfo[i] + '->'
 					}
 					$(".bootbox-body").text(str);					
 				}
 			);
		})

		return;

 		$('.start-case-btn').on('click', function () {
 			var url = $('.case-url').val();
 			if (!url) {
 				alert('请输入网址');
 				return;
 			}
 			$('.case1-progressbar').width('10%');
 			$.post(
 				'http://127.0.0.1:8081/api/start-case',
 				{
 					url: url
 				},
 				function (data) {
 					$('.case1-progressbar').width('30%');
			 		interval = setInterval(function () {
			 			$.get(
			 				'http://127.0.0.1:8081/api/case-detail',
			 				{},
			 				function (data) {
			 					$('.case1-progressbar').width('100%');
			 					$('.case1-detail-btn').removeClass('disabled');
			 					$('.case1-detail-btn').on('click', function () {
			 						location.hash = '#casedetail';
			 					});
			 					clearInterval(interval);
			 					console.log(data);
			 					var failtures = data.filter(function (item) {
			 						return item.failure !== null;
			 					});
			 					if (failtures.length) {
			 						$('.case1-item').append($('<label class="btn red btn-outline btn-circle btn-sm active">执行失败</label>'));
			 					} else {
			 						$('.case1-item').append($('<label class="btn green btn-outline btn-circle btn-sm active">执行成功</label>'));
			 					}
			 				}
			 			);
			 		}, 2000);
 				}
 			);
 		});



 	},
};