var template = require('html-loader!./casedetail.html');
require('./casedetail.less');

var host = "//112.124.5.195:8683";

//var host = "http://127.0.0.1:8081"

module.exports = {
 	render: function () {
 		$('.root').html(template);
 		this.bind();
 		this.getData();
 	},
 	bind: function () {
 		//bind Dom Event
 	},
 	getData: function () {
 		var param = location.hash.split('?');
 		param = param[1];
 		param = param.split('&');
 		var query = {};
 		param.forEach(function (item) {
 			item = item.split('=');
 			query[item[0]] = item[1];
 		});
 		$('.capture').attr('src',  host + '/static/' + query.id + '.png');
	    $.ajax({
	        url:  host + '/api/case-detail/' + query.id,
	        type: 'GET',
	        timeout : 5000,
	        dataType: 'json',
	        cache: false,
	        success: (ret, textStatus, request) => {
	        	var failtures = ret.filter(function (item) {
	        		return item.state === 'failture';
	        	});
	            var tpl = ret.map(function (item,index) {
	            	if(item.state === 'success'){
	            		// return '<li class="desc">'
	            		// 		+'<i class="fa fa-check tooltips i-success" data-container="body"></i>'
	            		// 		+item.caseName+' [成功]'+
	            		// 		+'<span>'+item.lastTime+ '<span></li>';
	            		return ' <tr>'
          						+	'<td> '+ (+index+1) +' </td>'
                   				+	'<td>'+ item.caseName+' </td>'
				                +    '<td> '+ item.lastTime+ ' </td>'
				                +    '<td>'
                        		+	'<span class="label label-sm label-success"> 成功 </span>'
			                    +	'</td>'
			                	+ '</tr>'
	            	}else{
	            		return ' <tr>'
          						+	'<td> '+ (+index+1) +' </td>'
                   				+	'<td>'+ item.caseName+' </td>'
				                +    '<td> '+ item.lastTime+ ' </td>'
				                +    '<td>'
                        		+	'<span class="label label-sm label-danger"> 失败 </span>'
			                    +	'</td>'
			                	+ '</tr>'
	            	}
	            	
	            });
	            $('.case-list tbody').html(tpl.join(''));
	            $('.counterup.case-total').html(ret.length);
	            $('.counterup.case-failture').html(failtures.length);
	            $('.counterup.case-success').html(ret.length - failtures.length);
	        },
	        error: (xhr) => {
	        	alert('服务不稳定，请稍后重试');
	        }
	    });
 	}
};