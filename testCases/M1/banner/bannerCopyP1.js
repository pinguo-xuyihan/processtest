/**
*   -----------------8.0首页配置/banner配置(批量复制)----------------------
*    
*    测试路径为: 详情页数据是否加载(IOS) -> 标题是否和新增时一致 -> 优先级是否一致 
*    -> 跳转链接是否一致 -> 标签是否一致 
*
*    author : xuyihan@camera360.com
*    createTime: 2017.4.19
*
**/
//done

var webPage = require('webpage');
var page    = webPage.create();
var config = require('../../config');
var list ;
var url  ; 

casper.options.waitTimeout  = 100000;
casper.options.stepTimeout  = 100000;
casper.options.viewportSize = { width: 1280, height: 800};

//godman need login info ,add cookie first
phantom.addCookie({
    'name'  : 'email',
    'value' : 'xuyihan%40camera360.com',
    'domain': 'camera360.com',
    'path'  : '/'
});

phantom.addCookie({
    'name'   : 'c360_oa_user_info',
    'value'  : 'MmlNRGFrcWxMVXRmeStiaVlFRG4wUDN1aXBWc2tlSXRkQVdLdEU1TjlCRHkxWjJQVmNpRCtWSG1HWlhSalErN3J0dnFLMFFmZUxNTk1GRUlKWUMrOWt3SVRtSWFQOUxlYXVwblRSMUora3pSZHdyZCt3SzlTTXJSQXBTMWN5VG9TSk5GQ0dacGhwTWJpYmNHdG56b0dNdVRrSDJmTjVIeHQxUUhvVkFjb3pBPQ%3D%3D',
    'domain' : 'camera360.com',
    'path'   : '/'
});

casper.test.begin('列表8.0广告', 6 , function suite(test) {

    casper.start('http://godman-xuyihan.camera360.com/operating_cms/#page_historicalRecordsSearchV8?name=historicalRecordsSearchV8&value=8.0广告列表&type=3&appName=camera360&editType=cope&systemName=dispatcherSystem', function() {
        
        list = this.evaluate(function() {
            try {
                return JSON.parse(__utils__.sendAJAX(
                    'http://godman-xuyihan.camera360.com/god/transmit',
                    'POST',
                    {
                        transUrl: 'http://dispatchertest-dev.camera360.com/cms/adv/v8List',
                        appName: 'camera360',
                        pageSize: 15,
                        pageNum: 1  
                    },

                    false,

                    { contentType: "application/x-www-form-urlencoded" }

                    )).data.advList;
            } catch (e) {}
        });
     
    });
    casper.then(function() {

        if (!list) {
            this.die('unable to get list');
        }
        if(list[0].title == 'fpBannerAddP1'){
            url = "http://godman-xuyihan.camera360.com/operating_cms/operation/build/index.html#/page_fpV8FpBannerV8?name=fpBannerV8&value=首页Banner&type=3&appName=camera360&editType=copy&systemName=dispatcherSystem&&_k=s6k1o4&groupId=" + list[0].group_id;
        
            casper.thenOpen(url, function() {
        
                this.waitForSelector('.menu-item');
            });

            casper.then(function() {
              
                test.assertExists('.menu-item', '左侧菜单加载完成');
                this.waitForSelector('div[data-key="bgImg"] img');
            
            })

            casper.then(function() {


                test.assertExists('div[data-key="bgImg"] img',"详情数据已经加载");
                //this.capture('332.png');
                
                var title = this.evaluate(function() {
                    return document.querySelector('[data-key="title"]').value
                })
                
                var priority = this.evaluate(function() {
                    return document.querySelector('[data-key="priority"]').value
                })

                var h5link = this.evaluate(function() {
                    return document.querySelector('[data-key="h5link"]').value
                })

                var labels = this.evaluate(function() {
                    return document.querySelector('[data-key="labels"]').value
                })

                test.assertEquals(title, 'fpBannerAddP1', 'title一致');
                test.assertEquals(priority, '1', '优先级一致');
                test.assertEquals(h5link, 'www.baidu.com', '跳转链接一致');
                test.assertEquals(labels, '摄影', '标签一致');

                this.capture(config.captureRoot + 'bannerCopyP1.png');

            })
        }
        
    });
    

  casper.run(function() {
    test.done();
      test.renderResults(true, 0, 'bannerCopyP1.xml');
  });
});




