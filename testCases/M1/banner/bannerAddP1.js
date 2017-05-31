/**
*   -----------------------8.0首页配置/banner配置----------------------
*    
*    测试路径为: 选择平台(IOS) -> 填写标题 -> 选择投放语言(中文) -> 语言面板出 
*    现 -> 选择配置类型(运营投放) -> 选择客户端版本(区间版本投放) -> 发布时间   
*    (即时投放) -> 优先级 -> 点击效果(链接跳转) -> 上传背景图 -> 标签 -> 流
*    量配置 -> 支持设备 -> 添加特定渠道 -> 添加精准化区域投放 -> 添加精准 
*    化区域投放 -> 添加精准化排除区域 –> 发布测试

*    case注意点
*    1. 优先级由于不能重复，所以把开始时间和结束时间取得很短，这样能避免优先级冲突而无法提交
*
*    author : xuyihan@camera360.com
*    createTime: 2017.4.19
*
**/


//bug 1.精准化区域投放无法添加
//2.精准化排除区域无法添加

var webPage = require('webpage');
var page = webPage.create();
var dateFormat = require('dateformat');
var config = require('../../config');

casper.options.waitTimeout = 20000;
casper.options.stepTimeout = 20000;
casper.options.viewportSize = { width: 1280, height: 800};

//设置登录cookie
phantom.addCookie({
    'name'  : 'email',
    'value' : 'xuyihan%40camera360.com',
    'domain': 'camera360.com',
    'path'  : '/'
});
phantom.addCookie({
    'name'   : 'c360_oa_user_info',
    'value'  : config.auth,
    'domain' : 'camera360.com',
    'path'   : '/'
});

casper.test.begin('v8首页Banner新增P1-case，测试重点：banner全操作', 10, function suite(test) {

  casper.start('http://godman-xuyihan.camera360.com/operating_cms/operation/build/index.html', function() {
      
      //-----------检测左侧菜单是否加载完成-------------
      this.waitForSelector('.menu-item');

  });


  casper.then(function() {
      
      test.assertExists('.menu-item', '左侧菜单加载完成');
  	
  }).then(function(){

      //-------------设置标题名(casperTestP1)------------
      this.sendKeys('input[data-key="title"]', 'fpBannerAddP1', { reset: true});

      var title = this.evaluate(function() {
          return document.querySelector('[data-key="title"]').value
      })
      test.assertEquals(title, 'fpBannerAddP1', '标题已填写');


      //等待语言select框中中文label是否存在，存在则语言数据已经请求，并渲染完毕
      this.waitForSelector('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label');
      

  }).then(function(){

      test.assertExists('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label','多语言数据已加载完成');

      //-------------选择语言------------------
      //1.点击语言select,展开select options
      this.click('.tablee li.item-li:nth-of-type(3) .text-content a.multiselect');
      //2.选择语言(中文)
      this.click('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label');

      //-----------------选择上架时间-------------------
      casper.evaluate(function () {
        document.querySelector('input[data-key="startTime"]').removeAttribute('readonly');
      });      

      var date = dateFormat(new Date() , 'isoDate' );
      var time = dateFormat(new Date() , 'isoTime' );
      var startTime = date + " " + time ;
      this.sendKeys('input[data-key="startTime"]', startTime, { reset: true });

      var startTimeVal = this.evaluate(function() {
          return document.querySelector('[data-key="startTime"]').value
      })
      if(!startTimeVal){
          this.die("上架时间未设置");
      }
      test.assertEquals(startTimeVal, startTime, '上架时间已设置');

      //------------------选择过期时间-------------------

      casper.evaluate(function () {
        document.querySelector('input[data-key="endTime"]').removeAttribute('readonly');
      });
      var tmp = +new Date() + 1000; 
      var date = dateFormat(tmp, 'isoDate' );
      var time = dateFormat(tmp, 'isoTime' );

      var endTime = date + " " + time ;
      this.sendKeys('input[data-key="endTime"]', endTime, { reset: true });
      var endTimeVal = this.evaluate(function() {
          return document.querySelector('[data-key="endTime"]').value
      })
      if(!endTimeVal){
          this.die("下架时间未设置");
      }
      test.assertEquals(endTimeVal, endTime, '下架时间已设置');

      //截取设置时间
      this.capture('./capture/bannerAddP1/datetimepicker.png');
      
      this.waitForSelector('.tab-main'); 
 
});

  casper.then(function(){

      test.assertExists('.tab-main', '语言面板已出现');
      
      //--------------设置优先级---------------
      this.sendKeys('input[data-key="priority"]', '1', { reset: true});

      var priority = this.evaluate(function() {
          return document.querySelector('input[data-key="priority"]').value
      })
      if(!priority){
          this.die("优先级未设置");
      }
      test.assertEquals(priority, '1', '优先级已设置');


      //---------------设置跳转链接--------------
      this.sendKeys('input[data-key="h5link"]', 'www.baidu.com', { reset: true});
      var h5link = this.evaluate(function() {
          return document.querySelector('[data-key="h5link"]').value
      })
      if(!h5link){
          this.die("跳转链接未设置");
      }
      test.assertEquals(h5link, 'www.baidu.com', '跳转链接已设置');


      //--------------上传背景图---------------
      casper.page.uploadFile('#cover', './750_320.png');
      
      this.waitForSelector('div[data-key="bgImg"] img');


  });
  casper.then(function () {

      test.assertExists('div[data-key="bgImg"] img', '背景图片已上传');

      //--------------设置标签----------------
      casper.evaluate(function () {
        document.querySelector('input[data-key="labels"]').removeAttribute('readonly');
      });
      //1.给标签框一个空值，使标签弹框弹出
      this.sendKeys('input[data-key="labels"]', ' ', { reset: true });
      this.wait(1000);
  });

  casper.then(function(){

      //2.选择标签弹框点击摄影标签
      this.click('#tagDialog .modal-body .tag-panel:nth-of-type(1) .tag-text');
      //3.点击选择标签弹框保存按钮
      this.click('#tagDialog .modal-footer .btn');     

      //---------------选择流量百分比-------------
      this.click(".tab-panel li.item-li:nth-of-type(4) .text-content a.multiselect")
      this.click('.tab-panel li.item-li:nth-of-type(4) .text-content .multiselect-container li:nth-of-type(99) label');

      //-----------------添加特定渠道--------------
      //1.点击特定渠道按钮
      this.click(".tab-panel li.item-li:nth-of-type(6) .text-content > div:nth-of-type(1) button");
      //2.等待1秒，等待特定渠道弹框加载完成
      this.wait(1000);

  });
  casper.then(function () {

      //3.特定渠道弹框选择渠道
      this.click("#channelDialog .modal-body .multiselect");
      this.click("#channelDialog .modal-body .multiselect-container>li:nth-of-type(2) label");
    
      //4.点击保存
      this.click('#channelDialog .modal-footer .btn');     
      this.wait(1000);

  });

  casper.then(function () {

      this.click(".tab-panel li.item-li:nth-of-type(6) .text-content > div:nth-of-type(2) button");
      this.wait(1000);

  }).then(function(){

      //3.特定渠道弹框选择渠道
      this.sendKeys('input[data-key="activeArea"]', '北京北京', { reset: true });

  });

  casper.then(function(){

      //---------点击测试发布按钮------------
      this.click('a[data-key="v8banner"]');
      this.waitForSelector('#alertDialog.in'); 
      this.wait(1000);  
        
  });

  casper.then(function(){

      var dialogInfo = this.getElementInfo('#alertDialog.in .modal-title').text;
      this.capture(config.captureRoot + 'bannerAddP1.png');
      test.assertNotEquals(dialogInfo, 'Error', '提交成功');
  });

  casper.run(function() {
      test.done();
      test.renderResults(true, 0, 'bannerAddP1.xml');
  });
});

