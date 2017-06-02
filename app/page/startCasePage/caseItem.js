function CaseItem (opts) {
	this.opts = $.extend({
		id: ''
	}, opts || {});

	this.interval = null;
	this.template = [
		'<li class="case-item">',
		'	<div class="case-item-title">'+this.opts.id+'</div>',
		'	<div class="progress progress-striped active my-process" style="width:40%;margin-bottom:0px" >',
		'		<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="background-color:#a4de56">',
		'			<span class="sr-only">0%</span>',
		'		</div>',
		'	</div>',
		'   <div class="btn-group">',
		'		<button type="button" class="btn  yellow-crusta get-info" data-key="'+this.opts.id+'">case简介</button>',
		'		<button type="button" class="btn  green-meadow start-btn">启动</button>',
		'		<button type="button" class="btn purple-plum disabled detail-btn">执行详情</button>',
		'		<label class="btn btn-outline btn-circle btn-sm active state" ></label>',
		'   </div>',
		'</li>'
	];

	this.dom = $(this.template.join(''));
	this.bind();
}

CaseItem.prototype.render = function () {
	return this.dom;
}

CaseItem.prototype.bind = function () {
	var me = this;
	$('.start-btn', this.dom).on('click', function () {
		me.startCase();
	});
	$('.detail-btn', this.dom).on('click', function () {
		console.log('see detail');
	});
}

CaseItem.prototype.startCase = function (type) {


	var me = this;
	var host = "https://112.124.5.195:8683";

    //var host = "http://127.0.0.1:8081"
	$.get(
		 host + '/api/start-case/' + me.opts.id,
		{},
		function (data) {
			$('.progress-bar', me.dom).width('30%');
	 		me.interval = setInterval(function (){
	 			$.get(
	 				 host + '/api/case-detail/' + me.opts.id + '?r=' + Math.random(),
	 				{},
	 				function (data) {
	 					$('.progress-bar', me.dom).width('100%');
	 					$('.detail-btn', me.dom).removeClass('disabled');
	 					$('.detail-btn', me.dom).on('click', function () {
	 						// location.hash = '#casedetail?id=' + me.opts.id;
	 						window.open('/#casedetail?id=' + me.opts.id);
	 					});
	 					clearInterval(me.interval);
	 					var failtures = data.filter(function (item) {
	 						return item.failure !== null;
	 					});

	 					alert(failtures.length);
	 					if (failtures.length) {
	 						$('.state', me.dom).text('执行失败');
	 						$('.state', me.dom).addClass('red');
	 					} else {
	 						$('.state', me.dom).text('执行成功');
	 						$('.state', me.dom).addClass('green');
	 					}

	 					if(type == 'quene'){
	 						$('body').trigger('case-ready');	 						
	 					}


	 				}
	 			);
	 		}, 10000);
		}
	);
}

module.exports = CaseItem;