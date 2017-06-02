/**
*    P6的测试路径为: 选择平台(IOS)->填写标题->选择投放语言(中文)->语言面板出现->
*    选择配置类型(运营投放)->选择模板类型(模板0)->选择投放策略(运营01轮
*    播)->选择客户端版本(区间版本投放)-> 发布时间(即时投放)->发布账号主题->
*    选择投放标示->@对象填写->优先级->数据类型(单图)->上传图片->图片跳转链
*    接 (打开app)->填写曝光数->添加精准化区域投放->添加精准化排除区域->发
*    布测试

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
casper.test.begin('v8banner process test', 7, function suite(test) {

  casper.start('http://godman-qa.camera360.com/operating_cms/operation/build/index.html', function() {
      // Wait for the page to be loaded
      this.waitForSelector('.menu-item');
 
  });

  casper.then(function() {
      
      test.assertExists('.menu-item', '左侧菜单加载完成');
  	
  }).then(function(){

      //切换到feed配置
      this.click(".fpV8ol li:nth-of-type(2) a");
      this.wait(5000);

      
      this.waitForSelector("#publisher");

      
  }).then(function(){
      test.assertExists('#publisher','已进入首页配置feed配置');

      //-------------设置标题名------------·---
      this.sendKeys('input[data-key="title"]', 'feedAddP1', { reset: true});
      this.waitForSelector('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label');
  
  }).then(function(){

      test.assertExists('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label','语言选择已渲染完成');
      
      //-------------选择语言------------------
      //1.点击语言select,展开select options
      this.click('.tablee li.item-li:nth-of-type(3) .text-content a.multiselect');
      //2.选择语言为中文
      this.click('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label');

      //-------------选择投放策略--------------
       this.click('.tablee li.item-li:nth-of-type(6) .text-content a.multiselect');
       this.click('.tablee li.item-li:nth-of-type(6) .text-content .multiselect-container li:nth-of-type(1) label');

      //-------------选择上架时间--------------
      var date = dateFormat(new Date() , 'isoDate' );
      var time = dateFormat(new Date() , 'isoTime' );
      var startTime = date + " " + time ;

      casper.evaluate(function () {
        document.querySelector('input[data-key="startTime"]').removeAttribute('readonly');
      });      
      this.sendKeys('input[data-key="startTime"]', startTime , { reset: true });


      //-------------选择过期时间--------------
      var tmp = +new Date() + 24 * 60 * 60; 
      var date = dateFormat(tmp, 'isoDate' );
      var time = dateFormat(tmp, 'isoTime' );

      var endTime = date + " " + time ;

      casper.evaluate(function () {
          document.querySelector('input[data-key="endTime"]').removeAttribute('readonly');
      });   

      this.sendKeys('input[data-key="endTime"]', endTime , { reset: true });
      this.capture('datetimepicker.png');

      this.sendKeys('#publisher',"@CAMERA360");

      casper.page.uploadFile('#face', './100_100.png');

      this.waitForSelector('div[data-key="headFaceImg"] img');

});

  casper.then(function(){

      test.assertExists('div[data-key="headFaceImg"] img', '发布账号头像已上传');
      
      this.sendKeys('#at',"@Vuser");
      
      this.waitForSelector('.tab-main');
  
  });

  casper.then(function(){

      test.assertExists('.tab-main', '语言面板已出现');
      
      //--------------设置优先级---------------
      this.sendKeys('input[data-key="priority"]', '1', { reset: true});
      this.sendKeys('input[data-key="h5link"]', 'www.baidu.com', { reset: true});
      

      this.sendKeys("textarea[data-key='titleContent']",'拍照挑战',{reset : true})
      
      //-------------选择数据类型(单图)------------
      this.click('.tab-panel li.item-li:nth-of-type(3) a.multiselect');
      this.click('.tab-panel li.item-li:nth-of-type(3) .multiselect-container li:nth-of-type(1) label');

      //-----------------上传图片---------------
      casper.page.uploadFile('#photo', './100_100.png');
      
      this.waitForSelector('div[data-key="contImg"] img');
  })

  casper.then(function () {

      test.assertExists('div[data-key="contImg"] img', '单图已上传');
      
      //--------------点击效果(打开app)----------
      this.click("ul[data-key='effectView'] li:nth-of-type(3) a");
      this.sendKeys('input[data-key="pkgName"]', 'camera360_8.1', { reset: true});
      this.sendKeys('input[data-key="linkName"]', 'www.baidu.com', { reset: true});
      
      //---------填写按钮内容(see more)-----------
      this.sendKeys('input[data-key="btnContent"]', 'see more', { reset: true});
  
      this.sendKeys('input[data-key="exposureCnt"]' , '2' ,{ reset: true})
  });

  casper.then(function(){

      //----------点击测试发布按钮-----------
      this.click('a[data-key="v8banner"]');
      //等待弹框出现
      this.waitForSelector('#alertDialog.in');     

  });

  casper.then(function(){
      var dialogInfo = this.getElementInfo('#alertDialog.in .modal-title').text;
      this.capture(config.captureRoot + 'feedAddP1.png');
      test.assertNotEquals(dialogInfo, 'Error', '提交成功');
      
  })

  casper.run(function() {
    test.done();
      test.renderResults(true, 0, 'feedAddP1.xml');
  });
});

