/**
*   -----------------------8.0首页配置/banner配置----------------------
*    
*    测试路径为: 选择平台(Android) -> 填写标题 -> 选择投放语言(英文) -> 语言 
*    面板出现 -> 选择配置类型(品牌广告) -> 选择客户端版本(定向版本投放) -> 发  
*    布时间(每日轮播) -> 选择排除语言 -> 优先级 -> 点击效果(产品内跳转) -> 上
*    传背景图 -> 展示URL -> 点击URL –> 发布测试

*    case注意点
*    1. 优先级由于不能重复，所以把开始时间和结束时间取得很短，这样能避免优先级冲突而无法提交
*
*    author : xuyihan@camera360.com
*    createTime: 2017.4.19
*
**/

//bug : 客户端版本(定向版本投放)每次在上传图片之后就被清空，导致无法提交


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
casper.test.begin('v8banner process test', 5, function suite(test) {

  casper.start('http://godman-xuyihan.camera360.com/operating_cms/operation/build/index.html', function() {
      // Wait for the page to be loaded
      this.waitForSelector('.menu-item');
  
  });


  casper.then(function() {
      
      test.assertExists('.menu-item', '左侧菜单加载完成');
  	
  }).then(function(){

      //-------------选择平台(安卓)---------------
      this.click('.tablee li.item-li:nth-of-type(1) .btn-group .bottunDiv li:nth-of-type(2)');
      //---------设置标题名(casperTestP2)-----------
      this.sendKeys('input[data-key="title"]', 'casperTestP2', { reset: true});

      //等待语言数据加载完成
      this.waitForSelector('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label');
      

  }).then(function(){

      test.assertExists('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label','语言选择已渲染完成');
      
      //-------------选择语言(英文)------------------
      //1.点击语言select,展开select options
      this.click('.tablee li.item-li:nth-of-type(3) .text-content a.multiselect');
      //2.选择语言为英文
      this.click('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(4) label');

   
      this.waitForSelector('.tab-main'); 

});

  casper.then(function(){

      test.assertExists('.tab-main', '语言面板已出现');

      //-------------选择配置类型(品牌广告)------------

      this.click('.tablee li.item-li:nth-of-type(4) .text-content a.multiselect');
      this.click('.tablee li.item-li:nth-of-type(4) .text-content .multiselect-container li:nth-of-type(2) label');
      
      //------------客户端版本(定向版本投放)------------
      this.click('.tablee li.item-li:nth-of-type(5) .btn-group .bottunDiv li:nth-of-type(2)');
      // 选择版本为7.9.0
      this.click('.tablee li.item-li:nth-of-type(5) .active  a.multiselect');
      this.click('.tablee li.item-li:nth-of-type(5) .active .multiselect-container li:nth-of-type(2) label');      

      //-------------选择发布时间(每日轮播)-------------
      this.click('.tablee li.item-li:nth-of-type(6) .btn-group .bottunDiv li:nth-of-type(2)');

      //1.选择开始日期

      var activeTime = dateFormat(new Date() , 'isoDate' );

      casper.evaluate(function () {
          document.querySelector('input[data-key="activeTime"]').removeAttribute('readonly');
      });      
      this.sendKeys('input[data-key="activeTime"]', activeTime, { reset: true });

      //2.选择结束日期
      var tmpTime = +new Date() + 24 * 60 * 60 * 1000;
      var expireTime = dateFormat(tmpTime , 'isoDate' );

      casper.evaluate(function () {
          document.querySelector('input[data-key="expireTime"]').removeAttribute('readonly');
      });      
      this.sendKeys('input[data-key="expireTime"]', expireTime, { reset: true });
      
      //3.选择轮播开始时间
      casper.evaluate(function () {
          document.querySelector('input[data-key="startPicker"]').removeAttribute('readonly');
      });      
      this.sendKeys('input[data-key="startPicker"]', '01:05', { reset: true });

      //4.选择轮播结束时间
      casper.evaluate(function () {
          document.querySelector('input[data-key="endPicker"]').removeAttribute('readonly');
      });      
      this.sendKeys('input[data-key="endPicker"]', '03:25', { reset: true });
      
      //---------------设置优先级(1)--------------
      this.sendKeys('input[data-key="priority"]', '1', { reset: true});
      this.sendKeys('input[data-key="h5link"]', 'www.baidu.com', { reset: true});

      casper.page.uploadFile('#cover', './750_320.png');
      casper.wait(5000);

      this.sendKeys('input[data-key="showURL"]', 'www.baidu.com', { reset: true});
      this.sendKeys('input[data-key="clickURL"]', 'www.baidu.com', { reset: true});
      
      this.waitForSelector('div[data-key="bgImg"] img');


  });
  casper.then(function () {

      test.assertExists('div[data-key="bgImg"] img', '背景图片已上传');

      casper.evaluate(function () {
          document.querySelector('input[data-key="labels"]').removeAttribute('readonly');
      });
      this.sendKeys('input[data-key="labels"]', ' ', { reset: true });

      this.wait(1000);
  });
  casper.then(function(){

      // select tag
      this.click('#tagDialog .modal-body .tag-panel:nth-of-type(1) .tag-text');
      this.click('#tagDialog .modal-footer .btn');     

      //------------选择流量百分比-----------
      this.click(".tab-panel li.item-li:nth-of-type(4) .text-content a.multiselect")
      this.click('.tab-panel li.item-li:nth-of-type(4) .text-content .multiselect-container li:nth-of-type(99) label');
    
  });
  casper.then(function () {

      this.click("#channelDialog .modal-body .multiselect");
      this.click("#channelDialog .modal-body .multiselect-container>li:nth-of-type(2) label");
      this.click('#channelDialog .modal-footer .btn');     
      this.wait(1000);

  });


  casper.then(function(){

      //点击测试发布按钮
      this.click('a[data-key="v8banner"]');
      //等待弹框出现
      this.waitForSelector('#alertDialog.in');

  });

  casper.then(function(){
      var dialogInfo = this.getElementInfo('#alertDialog.in .modal-title').text;
      this.capture(config.captureRoot + 'bannerAddP2.png');
      test.assertNotEquals(dialogInfo, 'Error', '提交成功');
  })

  casper.run(function() {
    test.done();
      test.renderResults(true, 0, 'bannerAddP2.xml');
  });
});

