
//------------------全语言检查-------------------

/**
*    P1的测试路径为: 选择平台(IOS) -> 填写标题 -> 选择投放语言(中文) -> 语言面板出 
*    现 -> 选择配置类型(运营投放) -> 选择客户端版本(区间版本投放) -> 发布时间   
*    (即时投放) -> 优先级 -> 点击效果(链接跳转) -> 上传背景图 -> 标签 -> 流
*    量配置 -> 支持设备 -> 添加特定渠道 -> 添加精准化区域投放 -> 添加精准 
*    化区域投放 -> 添加精准化排除区域 –> 发布测试
**/

//bug : 开发账号主体没有判断

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

casper.test.begin('列表8.0广告', 7 , function suite(test) {

    casper.start('http://godman-xuyihan.camera360.com/operating_cms/#page_historicalRecordsSearchV8?name=historicalRecordsSearchV8&value=8.0广告列表&type=20&appName=camera360&systemName=dispatcherSystem', function() {
        
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
        if(list[0].title == 'casperTestP6'){

            url = "http://godman-xuyihan.camera360.com/operating_cms/operation/build/index.html#/page_fpV8FpFeedV8?name=fpFeedV8&value=feed配置&type=3&appName=camera360&editType=edit&systemName=dispatcherSystem&&_k=7s0yer&groupId=" + list[0].group_id;
            

            this.echo(url);
            casper.thenOpen(url, function() {
        
                this.waitForSelector('.menu-item');
            });

            casper.then(function() {
              
                test.assertExists('.menu-item', '左侧菜单加载完成');
                this.capture('xuxu.png');
                this.waitForSelector('div[data-key="contImg"] img');
            
            })

            casper.then(function() {

                test.assertExists('div[data-key="contImg"] img',"详情数据已经加载");
                
                var title = this.evaluate(function() {
                    return document.querySelector('[data-key="title"]').value
                })
                
                // var publisher = this.evaluate(function() {
                //     return document.querySelector('#publisher span').value
                // })

                var pkgName = this.evaluate(function() {
                    return document.querySelector('[data-key="pkgName"]').value
                })

                var linkName = this.evaluate(function() {
                    return document.querySelector('[data-key="linkName"]').value
                })

                var priority = this.evaluate(function() {
                    return document.querySelector('[data-key="priority"]').value
                })

                var btnContent = this.evaluate(function() {
                    return document.querySelector('[data-key="btnContent"]').value
                })

                var exposureCnt = this.evaluate(function() {
                    return document.querySelector('[data-key="exposureCnt"]').value
                })

                 

                test.assertEquals(title, 'casperTestP6', 'title一致');

                //test.assertEquals(publisher, '@CAMERA360@Camera360 '  , '发布账号主体');

                test.assertEquals(priority, '1', '优先级一致');

                test.assertEquals(pkgName, 'camera360_8.1' , '【图片跳转链接】包名一致');
                test.assertEquals(linkName,'www.baidu.com' , '【图片跳转链接】链接一致');

                test.assertEquals(exposureCnt ,'2' , '曝光数一致');
                this.capture(config.captureRoot + 'feedEditP1.png');
            })
        }
        
    });
    

  casper.run(function() {
    test.done();
      test.renderResults(true, 0, 'feedEditP1.xml');
  });
});




