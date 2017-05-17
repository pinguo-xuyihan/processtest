function CaseManager (opts) {
	this.opts = $.extend({
		wrapper: $('.case-list')
	}, opts);
	this.list = [];
}

CaseManager.prototype.addItem = function (item) {
	this.list.push(item);
}

CaseManager.prototype.render = function (item) {
	var me = this;
	this.list.forEach(function (item) {
		me.opts.wrapper.append(item.render());
	});
}

module.exports = CaseManager;