function CaseManager (opts) {
	var me = this;
	this.opts = $.extend({
		wrapper: $('.case-list')
	}, opts);
	this.list = [];
	this.execIndex = 0;
	$('body').on('case-ready', function () {
		me.execIndex++;
		me.execNextCase();
	});
}

CaseManager.prototype.startQuene = function () {
	this.list[0].startCase('quene');
}

CaseManager.prototype.addItem = function (item) {
	this.list.push(item);
}

CaseManager.prototype.execNextCase = function () {
	this.list[this.execIndex].startCase();
}

CaseManager.prototype.render = function (item) {
	var me = this;
	this.list.forEach(function (item) {
		me.opts.wrapper.append(item.render());
	});
}

module.exports = CaseManager;