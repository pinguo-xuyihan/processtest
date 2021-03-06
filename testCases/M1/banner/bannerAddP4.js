/**
*    P4测试路径内容：选择平台(IOS) -> 填写标题 -> 选择投放语言(全部语言) -> 语言面
*    板出现 -> 选择配置类型(运营投放) -> 选择客户端版本(区间版本投放)-> 发布
*    时间(即时投放) -> 优先级-> 点击效果(自定义链接) -> 上传背景图 -> 发布测
*    试；
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

  casper.start('http://godman-qa.camera360.com/operating_cms/operation/build/index.html', function() {
      // Wait for the page to be loaded
      this.waitForSelector('.menu-item');
  
  });


  casper.then(function() {
      
      test.assertExists('.menu-item', '左侧菜单加载完成');
  	
  }).then(function(){

      //---------设置标题名(casperTestP3)-----------
      this.sendKeys('input[data-key="title"]', 'casperTestP4', { reset: true});

      //等待语言数据加载完成
      this.waitForSelector('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label');
      

  }).then(function(){

      test.assertExists('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label','语言选择已渲染完成');
      
      //-------------选择语言(英文)------------------
      //1.点击语言select,展开select options
      this.click('.tablee li.item-li:nth-of-type(3) .text-content a.multiselect');
      //2.选择语言为中文和英文
      this.click('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(1) label');

       //-------------选择配置类型(MobVistal广告)------------
      this.click('.tablee li.item-li:nth-of-type(4) .text-content a.multiselect');
      this.click('.tablee li.item-li:nth-of-type(4) .text-content .multiselect-container li:nth-of-type(3) label');
      
      this.sendKeys('input[data-key="MobVistaID"]', '12345', { reset: true });
      this.sendKeys('input[data-key="AdMobID"]', '12345', { reset: true });
      this.sendKeys('input[data-key="FacebookID"]', '12345', { reset: true });

      //-------------选择发布时间(即时投放)-------------
      //1.选择上架时间
      var date = dateFormat(new Date() , 'isoDate' );
      var time = dateFormat(new Date() , 'isoTime' );
      var startTime = date + " " + time ;

      casper.evaluate(function () {
        document.querySelector('input[data-key="startTime"]').removeAttribute('readonly');
      });      
      this.sendKeys('input[data-key="startTime"]', startTime, { reset: true });

      //2.选择过期时间

      var tmp = +new Date() + 1000; 
      var date = dateFormat(tmp, 'isoDate' );
      var time = dateFormat(tmp, 'isoTime' );

      var endTime = date + " " + time ;

      casper.evaluate(function () {
        document.querySelector('input[data-key="endTime"]').removeAttribute('readonly');
      });      
      this.sendKeys('input[data-key="endTime"]', endTime, { reset: true });
      this.capture('datetimepicker.png');
      
      this.capture('datetimepicker.png');
      this.waitForSelector('.tab-main'); 

});

  casper.then(function(){

      test.assertExists('.tab-main', '语言面板已出现' );

      //---------------设置优先级(1)--------------
      this.sendKeys('input[data-key="priority"]', '1', { reset: true});

  });

  casper.then(function () {

      this.click(".tab-title span:nth-of-type(2) a");
      this.sendKeys('input[data-key="priority"]', '2', { reset: true});

  });
  casper.then(function () {

      this.click(".tab-title span:nth-of-type(3) a");
      this.sendKeys('input[data-key="priority"]', '3', { reset: true});
  });
  casper.then(function () {

      this.click(".tab-title span:nth-of-type(4) a");
      this.sendKeys('input[data-key="priority"]', '4', { reset: true});
  });
  casper.then(function () {

      this.click(".tab-title span:nth-of-type(5) a");
      this.sendKeys('input[data-key="priority"]', '5', { reset: true});
  });
  casper.then(function () {

      this.click(".tab-title span:nth-of-type(6) a");
      this.sendKeys('input[data-key="priority"]', '6', { reset: true});
  });
    casper.then(function () {

      this.click(".tab-title span:nth-of-type(7) a");
      this.sendKeys('input[data-key="priority"]', '7', { reset: true});
  });
  casper.then(function () {

      this.click(".tab-title span:nth-of-type(8) a");
      this.sendKeys('input[data-key="priority"]', '8', { reset: true});
  });

  casper.then(function () {

      this.click(".tab-title span:nth-of-type(9) a");
      this.sendKeys('input[data-key="priority"]', '9', { reset: true});
  });
  casper.then(function () {

      this.click(".tab-title span:nth-of-type(10) a");
      this.sendKeys('input[data-key="priority"]', '10', { reset: true});
  });

  casper.then(function () {

      this.click(".tab-title span:nth-of-type(11) a");
      this.sendKeys('input[data-key="priority"]', '11', { reset: true});
  });
  casper.then(function () {

      this.click(".tab-title span:nth-of-type(12) a");
      this.sendKeys('input[data-key="priority"]', '12', { reset: true});
  });
  casper.then(function () {

      this.click(".tab-title span:nth-of-type(13) a");
      this.sendKeys('input[data-key="priority"]', '13', { reset: true});

  });

  casper.then(function(){

      //点击测试发布按钮
      this.click('a[data-key="v8banner"]');
      //等待弹框出现
      this.waitForSelector('#alertDialog.in');     
  });

  casper.then(function(){
      var dialogInfo = this.getElementInfo('#alertDialog.in .modal-title').text;

      this.capture(config.captureRoot + 'bannerAddP4.png');
      test.assertNotEquals(dialogInfo, 'Error', '提交成功');
  })


  casper.run(function() {
    test.done();
      test.renderResults(true, 0, 'bannerAddP4.xml');
  });
});

