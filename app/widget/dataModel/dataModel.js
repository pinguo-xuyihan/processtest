var serverConf = require('../../config/serverConfig.js');

module.exports = {

 	getData:function(opt) {

    	var method = opt.method;
        var data   = opt.data;
        var type   = opt.type;
        var contentType =  opt.contentType; 
        

        var url = serverConf['host'] + serverConf[type];

        return new Promise(function(resolve, reject){

            var xhr = $.ajax({
            	
                url: url,
                method  :  method,
                data    :  data ,
                timeout :  5000,
                dataType: 'jsonp',
                contentType : contentType || 'application/x-www-form-urlencoded',
                cache: false,

                success: function (ret) {
                        
                    resolve(ret);
                    
                },
                error: function () {
    
                    reject();
                }
            });
        });
   }
};