var template = require('html-loader!./menu.html');
 require('./menu.less');

var mytask = require("Page/mytask/mytask") ;

var report = require("Page/report/report")

var submitTask = require("Page/submittask/submittask");

module.exports = {
 	render: function () {
 		$('.page-sidebar-wrapper').html(template);
 		this.bind();
 	},
 	bind: function () {
 		//bind Dom Event
 		$(".mytask").on('click',function(){
 			mytask.render();
 		})
 		$(".submit-task").on('click' ,function(){
 			submitTask.render();
 		})
 		$(".my-report").on('click' ,function(){
 			report.render();
 		})
 	},
};