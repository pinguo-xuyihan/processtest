var template = require('html-loader!./report.html');
 require('./report.less');

module.exports = {
 	render: function () {
 		$('.page-content-wrapper').html(template);
 		this.bind();
 	},
 	bind: function () {
 		//bind Dom Event
 		
 		//分页
 		// var maxPage=1;
        var link;
        if(window.location.host == "sampling.camera360.com")
        {
            link="http://sampling.camera360.com/backend/report/list?callback=?";
        }else{
            link="https://sampling-qa.camera360.com/backend/report/list?callback=?"
        }
 		var list = "<li class='active'><a href='javascript:;' value='1'>1</a></li>";
 		function getData(){
 			$.getJSON(link, function (response) {
                var date = response.data.items[0].date.toString();
                var year = date.substr(0,4);
                var month = date.substr(4,2);
                var day = date.substr(6,2);
                date = year +"-"+month+"-"+day;
                var html="<tr><td class='highlight'><div class='info'></div><a href='javascript:;'>" + date+ "</a></td><td class='hidden-xs'>" +response.data.items[0].number+ "</td></tr>";
                $("tbody").html(html);
            })
 		}
        getData();
        $(".prevPage").after(list);
 		$("#search").click(function(){
 			var starTime=$("#start_time").val();
 			var starTime = starTime.replace(/-/g,"");
 			var endTime=$("#end_time").val();
 			var endTime = endTime.replace(/-/g,""); 
            var html = "";
            $.getJSON(link,"sdate="+starTime+"&edate="+endTime, function (response) {
                // var maxPage=response.maxPage;
                
                response.data.items.map(function(item,index){
                    var date = item.date.toString();
                    var year = date.substr(0,4);
                    var month = date.substr(4,2);
                    var day = date.substr(6,2);
                     date = year +"-"+month+"-"+day;
                     html = html+"<tr><td class='highlight'><div class='info'></div><a href='javascript:;'>" + date+ "</a></td><td class='hidden-xs'>" +item.number+ "</td></tr>";
                     $("tbody").html(html);
                })
                
            })
               
 		})
 	},
};