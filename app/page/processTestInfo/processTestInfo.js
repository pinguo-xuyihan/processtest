var template = require('html-loader!./processTestInfo.html');
 require('./processTestInfo.less');

module.exports = {
 	render: function () {
 		$('.root').html(template);
 		this.bind();
 	},
 	bind: function () {
 		//bind Dom Event
 	},
};