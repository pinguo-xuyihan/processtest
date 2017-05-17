var template = require('html-loader!./alert.html');
 require('./alert.less');

module.exports = {

	typeDic : {

		'warn'   : {
			className : 'alert-warning',
			infoTitle : 'Warnning!'
		},
		'error'  : {
			className : 'alert-danger',
			infoTitle : 'Error!'
		},
		'success':{
			className : 'alert-success',
			infoTitle : 'Success!'
		} 
	},

 	show: function (opt) {

 		var type = opt.type || '';
 		var info = opt.info || '';
 		var wrapper = opt.wrapper || '';

 		var className = this.typeDic[type].className;
 		var infoTitle = this.typeDic[type].infoTitle;

 		$('.' + wrapper).append(template);
 		$('.alert').addClass(className);
 		$('.alert strong').text(infoTitle);
 		$('.alert .info').text(info);

 		this.bind();
 	},
 	bind: function () {
 		//bind Dom Event
 	},
};