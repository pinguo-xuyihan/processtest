var template = require('html-loader!./useDoc.html');
 require('./useDoc.less');

module.exports = {
 	render: function () {
 		$('.root').html(template);
 		this.bind();
 	},
 	bind: function () {
 		//bind Dom Event
 	},
};