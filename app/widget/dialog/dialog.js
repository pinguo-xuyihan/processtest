var template = require('html-loader!./dialog.html');
 require('./dialog.less');

module.exports = {
 	render: function () {
 		$('.dialog-cover').html(template);
 		this.bind();
 	},
 	bind: function () {

 		$('.btn-ok').on('click' , function(){
 			$('.dialog-cover').css('display' , 'none');
 		})
 	},
};