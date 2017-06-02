
//------------------全语言检查-------------------

/**
*    P1的测试路径为: 选择平台(IOS) -> 填写标题 -> 选择投放语言(中文) -> 语言面板出 
*    现 -> 选择配置类型(运营投放) -> 选择客户端版本(区间版本投放) -> 发布时间   
*    (即时投放) -> 优先级 -> 点击效果(链接跳转) -> 上传背景图 -> 标签 -> 流
*    量配置 -> 支持设备 -> 添加特定渠道 -> 添加精准化区域投放 -> 添加精准 
*    化区域投放 -> 添加精准化排除区域 –> 发布测试
**/


var webPage = require('webpage');
var page    = webPage.create();
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

casper.test.begin('列表8.0广告', 9 , function suite(test) {

    casper.start('http://godman-qa.camera360.com/operating_cms/#page_historicalRecordsSearchV8?name=historicalRecordsSearchV8&value=8.0广告列表&type=20&appName=camera360&systemName=dispatcherSystem', function() {
        
        list = this.evaluate(function() {
            try {
                return JSON.parse(__utils__.sendAJAX(
                    'http://godman-qa.camera360.com/god/transmit',
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
        if(list[0].title == 'casperTestP5'){
            url = "http://godman-qa.camera360.com/operating_cms/operation/build/index.html#/page_fpV8FpBannerV8?name=fpBannerV8&value=首页Banner&type=3&appName=camera360&editType=edit&systemName=dispatcherSystem&&_k=s6k1o4&groupId=" + list[0].group_id;
        
            casper.thenOpen(url, function() {
        
                this.waitForSelector('.menu-item');
            });

            casper.then(function() {
              
                test.assertExists('.menu-item', '左侧菜单加载完成');
                this.waitForSelector('div[data-key="bgImg"] img');
            
            })

            casper.then(function() {

                test.assertExists('div[data-key="bgImg"] img',"详情数据已经加载");
                
                var title = this.evaluate(function() {
                    return document.querySelector('[data-key="title"]').value
                })
                
                var MobVistaID = this.evaluate(function() {
                    return document.querySelector('[data-key="MobVistaID"]').value
                })

                var AdMobID = this.evaluate(function() {
                    return document.querySelector('[data-key="AdMobID"]').value
                })

                var FacebookID = this.evaluate(function() {
                    return document.querySelector('[data-key="FacebookID"]').value
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

                test.assertEquals(title, 'casperTestP5', 'title一致');
                test.assertEquals(MobVistaID, '12345'  , 'MobVistaID一致');
                test.assertEquals(AdMobID, '12345'     , 'AdMobID一致');
                test.assertEquals(FacebookID, '12345'  , 'FacebookID一致');

                test.assertEquals(priority, '1', '优先级一致');
                test.assertEquals(h5link, 'www.baidu.com', '跳转链接一致');
                test.assertEquals(labels, '摄影', '标签一致');

            })
        }
        
    });
    

    casper.run(function() {
         test.done();
    });
});




