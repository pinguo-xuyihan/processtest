var template = require('html-loader!./caseStandard.html');
 require('./caseStandard.less');

module.exports = {
 	render: function () {
 		$('.root').html(template);
 		this.bind();
 	},
 	bind: function () {
 		//bind Dom Event
 	},
};