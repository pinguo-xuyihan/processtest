//-----------------应用内弹窗----------------------------

/**
*    P9的测试路径为: 选择平台(IOS)->填写标题->选择投放语言(中文)->语言面板
*    出现->选择配置类型(运营投放)->选择客户端版本(区间版本投放)-> 发布
*    时间(即时投放)->有效内显示次数填写->选择弹窗位置->优先级->点击效
*    果(链接跳转)->填写标题文案->填写内容文案->填写按
*    钮文案->发布测试
*
**/

var webPage = require('webpage');
var page = webPage.create();
var dateFormat = require('dateformat');
var config = require('../../config');

casper.options.waitTimeout = 20000;
casper.options.stepTimeout = 20000;
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

// use casper testing 
casper.test.begin('v8banner process test', 4, function suite(test) {

  casper.start('http://godman-xuyihan.camera360.com/operating_cms/operation/build/index.html', function() {
      // Wait for the page to be loaded
      this.waitForSelector('.menu-item');
 
  });

  casper.then(function() {
      
      test.assertExists('.menu-item', '左侧菜单加载完成');
  	
  }).then(function(){

      //切换到feed配置
      this.click(".menu li:nth-of-type(4) a");
      this.wait(5000);


      
  }).then(function(){


      //-------------设置标题名------------·---
      this.sendKeys('input[data-key="title"]', 'casperTestP9', { reset: true});
      this.waitForSelector('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label');
  
  }).then(function(){

      test.assertExists('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label','语言选择已渲染完成');
      
      //-------------选择语言------------------
      //1.点击语言select,展开select options
      this.click('.tablee li.item-li:nth-of-type(3) .text-content a.multiselect');
      //2.选择语言为中文
      this.click('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label');

      //-------------选择上架时间--------------
      var date = dateFormat(new Date() , 'isoDate' );
      var time = dateFormat(new Date() , 'isoTime' );
      var startTime = date + " " + time ;

      casper.evaluate(function () {
        document.querySelector('input[data-key="startTime"]').removeAttribute('readonly');
      });      
      this.sendKeys('input[data-key="startTime"]', startTime , { reset: true });


      //-------------选择过期时间--------------
      var tmp = +new Date() + 1000; 
      var date = dateFormat(tmp, 'isoDate' );
      var time = dateFormat(tmp, 'isoTime' );

      var endTime = date + " " + time ;

      casper.evaluate(function () {
          document.querySelector('input[data-key="endTime"]').removeAttribute('readonly');
      });   

      this.sendKeys('input[data-key="endTime"]', endTime , { reset: true });
      
      //----------填写有效内显示次数--------------
      this.sendKeys('input[data-key="displayCount"]', '3' , { reset: true });
      

      this.waitForSelector('.tab-main'); 
 
});

  casper.then(function(){

      test.assertExists('.tab-main', '语言面板已出现');
      
      //--------------设置优先级---------------
      this.sendKeys('input[data-key="priority"]', '1', { reset: true});
      this.sendKeys('input[data-key="h5link"]', 'www.baidu.com', { reset: true});
      
      this.sendKeys('input[data-key="popTitle"]', 'www.baidu.com', { reset: true});
      this.sendKeys('input[data-key="popContent"]', 'www.baidu.com', { reset: true});
      this.sendKeys('input[data-key="popBtnText"]', 'www.baidu.com', { reset: true});
      
  
  });

  casper.then(function(){


      //----------点击测试发布按钮-----------
      this.click('a[data-key="v8banner"]');
      //等待弹框出现
      this.waitForSelector('#alertDialog.in');     

  });

  casper.then(function(){

      var dialogInfo = this.getElementInfo('#alertDialog.in .modal-title').text;
      this.capture(config.captureRoot + 'inAppAddP1.png');
      test.assertNotEquals(dialogInfo, 'Error', '提交成功');
      
  })

  casper.run(function() {
    test.done();
      test.renderResults(true, 0, 'inAppAddP1.xml');
  });
});

