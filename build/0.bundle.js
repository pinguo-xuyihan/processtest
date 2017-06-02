webpackJsonp([0],Array(90).concat([
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./caseStandard/caseStandard": 111,
	"./caseStandard/caseStandard.html": 134,
	"./caseStandard/caseStandard.js": 111,
	"./caseStandard/caseStandard.less": 123,
	"./casedetail/casedetail": 112,
	"./casedetail/casedetail.html": 135,
	"./casedetail/casedetail.js": 112,
	"./casedetail/casedetail.less": 124,
	"./index/index": 113,
	"./index/index.html": 136,
	"./index/index.js": 113,
	"./index/index.less": 125,
	"./login/login": 114,
	"./login/login.html": 137,
	"./login/login.js": 114,
	"./login/login.less": 126,
	"./mytask/mytask": 95,
	"./mytask/mytask.html": 138,
	"./mytask/mytask.js": 95,
	"./mytask/mytask.less": 127,
	"./processTestInfo/processTestInfo": 115,
	"./processTestInfo/processTestInfo.html": 139,
	"./processTestInfo/processTestInfo.js": 115,
	"./processTestInfo/processTestInfo.less": 128,
	"./report/report": 116,
	"./report/report.html": 140,
	"./report/report.js": 116,
	"./report/report.less": 129,
	"./startCasePage/caseItem": 117,
	"./startCasePage/caseItem.js": 117,
	"./startCasePage/casemanager": 96,
	"./startCasePage/casemanager.js": 96,
	"./startCasePage/startCasePage": 118,
	"./startCasePage/startCasePage.html": 142,
	"./startCasePage/startCasePage.js": 118,
	"./startCasePage/startCasePage.less": 130,
	"./submittask/submittask": 119,
	"./submittask/submittask.html": 143,
	"./submittask/submittask.js": 119,
	"./submittask/submittask.less": 131,
	"./useDoc/useDoc": 120,
	"./useDoc/useDoc.html": 144,
	"./useDoc/useDoc.js": 120,
	"./useDoc/useDoc.less": 132
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 90;


/***/ }),
/* 91 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 92 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var serverConf = __webpack_require__(94);

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

/***/ }),
/* 94 */
/***/ (function(module, exports) {


module.exports = {
	host : '',
	//host : 'http://sampling.camera360.com',
	download : '/api/task/download',
	commit   : '/api/task/commit',
	login    : '/index/login',
	logout   : '/index/logout',
	assgin   : '/api/task/assign',

}


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {


var template = __webpack_require__(151);
var Alert  = __webpack_require__(121);
var dataModel = __webpack_require__(93);
var serverConfig = __webpack_require__(94);

__webpack_require__(127);

module.exports = {

	taskId : '',

 	render: function () {

 		$('.page-content-wrapper').html(template);
 		this.bind();

 	},

 	bind: function () {

 		var me = this;
 		
 		$(".download-btn").on('click' ,function(){
 			
 			var imgCount = $('.img-count').val();
 			imgCount =  +imgCount;

 			//validate input value
 			if(me.validateInput(imgCount)){

 				var assginOpt = {
	 			 	data : {
	 			 	 	cnt   : imgCount,
	 			 	},
	 			 	method : 'POST',
	 			 	type  : 'assgin',

	 			 }

 			 	dataModel.getData(assginOpt).then(function(res){

 			 		if(res.status === 200){

 			 			window.open(serverConfig['host'] + serverConfig['download'] + '?taskId=' + res.data.taskId)
 			 			
 			 			if(res.data.isNew){

 			 				var opt = {
								type : 'warn',
								info : '本次认领任务为未完成任务' ,
								wrapper : 'dispacther-page-mytask'
							}

							Alert.show(opt);
 			 			}

 			 		}else{

 			 			var opt = {
							type : 'warn',
							info : res.message ,
							wrapper : 'dispacther-page-mytask'
						}

						Alert.show(opt);
 			 		}
 			 		
 			 	});


 			}

 		})
 	},

 	validateInput: function(inputVal) {

		if( isNaN(inputVal) ){

			this.showValidateInfo( "输入非法，清楚输入合法数字");	
			return false ; 

		}else if (!inputVal){

			this.showValidateInfo( "输入为空，清楚输入合法数字");
			return false ; 

		}else if(inputVal > 50 || inputVal < 1){
			var opt = {
				type : 'warn',
				info : '一次性下载要大于1张，小于50张' ,
				wrapper : 'dispacther-page-mytask'
			}

			Alert.show(opt);
			return false ; 
		}else{
			this.showValidateInfo( "");
			return true ; 
		}
 	},

 	showValidateInfo: function(info){

		var warnInfo  = $('.warn-info');
 		var inputWrapper = $('.input-wrapper');
 		var warnWrapper  = $('.warn-wrapper');

 		if(info){

	 		warnInfo.text('');
	 		inputWrapper.addClass('has-error');

	 		warnWrapper.css('display' ,'block');
			warnInfo.text(info);
 		}else{

 			warnWrapper.css('display' ,'none');
 			inputWrapper.removeClass('has-error');
 		}

 	}
};

/***/ }),
/* 96 */
/***/ (function(module, exports) {

function CaseManager (opts) {
	var me = this;
	this.opts = $.extend({
		wrapper: $('.case-list')
	}, opts);
	this.list = [];
	this.execIndex = 0;
	$('body').on('case-ready', function () {
		me.execIndex++;
		me.execNextCase();
	});
}

CaseManager.prototype.startQuene = function () {
	this.list[0].startCase('quene');
}

CaseManager.prototype.addItem = function (item) {
	this.list.push(item);
}

CaseManager.prototype.execNextCase = function () {
	this.list[this.execIndex].startCase();
}

CaseManager.prototype.render = function (item) {
	var me = this;
	this.list.forEach(function (item) {
		me.opts.wrapper.append(item.render());
	});
}

module.exports = CaseManager;

/***/ }),
/* 97 */
/***/ (function(module, exports) {


module.exports = {

    getCookie:function(c_name)
    {
		if (document.cookie.length>0)
		{ 
			c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1)
			{ 
				c_start=c_start + c_name.length+1 
				c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
			} 
		}
		return ""
    },

 	setCookie:function(opt,c_name,value,expiredays)
	{
		var exdate = new Date();
		var c_name = opt.c_name;
		var value  = opt.value;
		var expiredays = opt.expiredays;
		
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
	}
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, ".dispacther-page-caseStandard .page {\n  width: 85%;\n  margin: 0 auto ;\n  margin-top: 50px ;\n}\n.block {\n  font-weight: bold;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote {\n  margin: 0;\n  padding: 0;\n}\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, \"Hiragino Sans GB\", Arial, sans-serif;\n  font-size: 13px;\n  line-height: 18px;\n  color: #737373;\n  background-color: white;\n  margin: 10px 13px 10px 13px;\n}\ntable {\n  margin: 10px 0 15px 0;\n  border-collapse: collapse;\n}\ntd,\nth {\n  border: 1px solid #ddd;\n  padding: 3px 10px;\n}\nth {\n  padding: 5px 10px;\n}\na {\n  color: #0069d6;\n}\na:hover {\n  color: #0050a3;\n  text-decoration: none;\n}\na img {\n  border: none;\n}\np {\n  margin-bottom: 9px;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  color: #404040;\n  line-height: 36px;\n}\nh1 {\n  margin-bottom: 18px;\n  font-size: 30px;\n}\nh2 {\n  font-size: 24px;\n}\nh3 {\n  font-size: 18px;\n}\nh4 {\n  font-size: 16px;\n}\nh5 {\n  font-size: 14px;\n}\nh6 {\n  font-size: 13px;\n}\nhr {\n  margin: 0 0 19px;\n  border: 0;\n  border-bottom: 1px solid #ccc;\n}\nblockquote {\n  padding: 13px 13px 21px 15px;\n  margin-bottom: 18px;\n  font-family: georgia,serif;\n  font-style: italic;\n}\nblockquote:before {\n  content: \"\\201C\";\n  font-size: 40px;\n  margin-left: -10px;\n  font-family: georgia,serif;\n  color: #eee;\n}\nblockquote p {\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 18px;\n  margin-bottom: 0;\n  font-style: italic;\n}\ncode,\npre {\n  font-family: Monaco, Andale Mono, Courier New, monospace;\n}\ncode {\n  background-color: #fee9cc;\n  color: rgba(0, 0, 0, 0.75);\n  padding: 1px 3px;\n  font-size: 12px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n}\npre {\n  display: block;\n  padding: 14px;\n  margin: 0 0 18px;\n  line-height: 16px;\n  font-size: 11px;\n  border: 1px solid #d9d9d9;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\npre code {\n  background-color: #fff;\n  color: #737373;\n  font-size: 11px;\n  padding: 0;\n}\nsup {\n  font-size: 0.83em;\n  vertical-align: super;\n  line-height: 0;\n}\n* {\n  -webkit-print-color-adjust: exact;\n}\n@media screen and (min-width: 914px) {\n  body {\n    width: 854px;\n    margin: 10px auto;\n  }\n}\n@media print {\n  body,\n  code,\n  pre code,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    color: black;\n  }\n  table,\n  pre {\n    page-break-inside: avoid;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, "body {\n  background: #ffffff;\n}\n.dispacther-page-casedetail {\n  background: white;\n}\n.dispacther-page-casedetail .row {\n  width: 70%;\n  text-align: center;\n  margin: 0 auto;\n  margin-top: 50px;\n}\n.dispacther-page-casedetail .case-list {\n  list-style: none;\n  width: 80%;\n  margin: 0 auto ;\n  border: 1px solid #e7ecf1;\n}\n.dispacther-page-casedetail .case-list li {\n  margin-left: 35px;\n  padding-top: 4px;\n  padding-bottom: 5px;\n  overflow: hidden;\n  background: #eeeeee;\n}\n.dispacther-page-casedetail .case-list li .i-success {\n  color: #36c6d3;\n}\n.dispacther-page-casedetail .case-list li .i-fail {\n  color: #ed6b75;\n}\n.dispacther-page-casedetail .case-list li i {\n  margin-right: 15px;\n}\n.dispacther-page-casedetail .capture {\n  width: 800px;\n  display: block;\n  margin: auto;\n  margin-top: 20px;\n}\n", ""]);

// exports


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, "h1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote {\n  margin: 0;\n  padding: 0;\n}\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, \"Hiragino Sans GB\", Arial, sans-serif;\n  font-size: 13px;\n  color: #737373;\n  background-color: white;\n  margin: 10px 13px 10px 13px;\n}\ntable {\n  margin: 10px 0 15px 0;\n  border-collapse: collapse;\n}\ntd,\nth {\n  border: 1px solid #ddd;\n  padding: 3px 10px;\n}\nth {\n  padding: 5px 10px;\n}\na {\n  color: #0069d6;\n}\na:hover {\n  color: #0050a3;\n  text-decoration: none;\n}\na img {\n  border: none;\n}\np {\n  margin-bottom: 9px;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  color: #404040;\n  line-height: 36px;\n}\nh1 {\n  margin-bottom: 18px;\n  font-size: 30px;\n}\nh2 {\n  font-size: 24px;\n}\nh3 {\n  font-size: 18px;\n}\nh4 {\n  font-size: 16px;\n}\nh5 {\n  font-size: 14px;\n}\nh6 {\n  font-size: 13px;\n}\nhr {\n  margin: 0 0 19px;\n  border: 0;\n  border-bottom: 1px solid #ccc;\n}\nblockquote {\n  padding: 13px 13px 21px 15px;\n  margin-bottom: 18px;\n  font-family: georgia,serif;\n  font-style: italic;\n}\nblockquote:before {\n  content: \"\\201C\";\n  font-size: 40px;\n  margin-left: -10px;\n  font-family: georgia,serif;\n  color: #eee;\n}\nblockquote p {\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 18px;\n  margin-bottom: 0;\n  font-style: italic;\n}\ncode,\npre {\n  font-family: Monaco, Andale Mono, Courier New, monospace;\n}\ncode {\n  background-color: #fee9cc;\n  color: rgba(0, 0, 0, 0.75);\n  padding: 1px 3px;\n  font-size: 12px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n}\npre {\n  display: block;\n  padding: 14px;\n  margin: 0 0 18px;\n  line-height: 16px;\n  font-size: 11px;\n  border: 1px solid #d9d9d9;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\npre code {\n  background-color: #fff;\n  color: #737373;\n  font-size: 11px;\n  padding: 0;\n}\nsup {\n  font-size: 0.83em;\n  vertical-align: super;\n  line-height: 0;\n}\n* {\n  -webkit-print-color-adjust: exact;\n}\n/*@media screen and (min-width: 914px) {\n   body {\n      width: 854px;\n      margin:10px auto;\n   }\n}*/\n@media print {\n  body,\n  code,\n  pre code,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    color: black;\n  }\n  table,\n  pre {\n    page-break-inside: avoid;\n  }\n}\n.page-sidebar-wrapper {\n  height: 100%;\n  position: fixed;\n  left: 0;\n}\n", ""]);

// exports


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, ".dispacther-page-login {\n  height: 100%;\n  background: url(" + __webpack_require__(167) + ") no-repeat;\n  background-size: cover;\n  background-position: center top ;\n}\n.dispacther-page-login .login-wrapper {\n  position: absolute;\n  width: 25%;\n  left: 73%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background: rgba(255, 255, 255, 0.6);\n}\n.dispacther-page-login .btn-wrapper {\n  text-align: center ;\n}\n.dispacther-page-login .btn-wrapper .login-btn {\n  margin-bottom: 20px;\n  width: 100px;\n}\n.dispacther-page-login .login-warn-wrapper {\n  display: none;\n}\n.dispacther-page-login .login-warn-wrapper .warn-info {\n  color: #f36a5a;\n}\n.dispacther-page-login .login-warn-wrapper i {\n  margin-left: 0px;\n}\n", ""]);

// exports


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, ".dispacther-page-mytask {\n  height: 100%;\n}\n.dispacther-page-mytask .first-text {\n  padding: 11px 14px;\n}\n.dispacther-page-mytask .second-text {\n  margin-bottom: 21px;\n}\n.dispacther-page-mytask .content {\n  margin: 0 auto;\n}\n.dispacther-page-mytask .download-btn {\n  width: 100px;\n}\n.dispacther-page-mytask .input-wrapper {\n  width: 80%;\n  margin: 0 auto;\n}\n.dispacther-page-mytask .bar {\n  margin-top: 30px;\n}\n.dispacther-page-mytask .info-wrapper {\n  margin-top: 25px;\n  margin-left: 8%;\n}\n.dispacther-page-mytask .info-wrapper .warn-wrapper {\n  display: none;\n}\n.dispacther-page-mytask .info-wrapper .warn-wrapper .warn-info {\n  color: #f36a5a;\n}\n.dispacther-page-mytask .portlet-body {\n  padding: 0 50px;\n}\n.dispacther-page-mytask .introduce {\n  width: 100%;\n  position: absolute;\n  margin: 0 auto;\n  text-align: center;\n  top: 203px;\n  z-index: 9998;\n  color: #fff;\n}\n.dispacther-page-mytask .introduce .btn {\n  background-color: #e2d19d;\n  color: #fff;\n  height: 56px;\n  padding-left: 20px;\n  padding-right: 20px;\n  font-size: 20px;\n  display: inline-block;\n}\n.dispacther-page-mytask .introduce .btn .btn-text {\n  margin-top: 5px;\n  display: inline-block;\n}\n.dispacther-page-mytask .step-text {\n  color: #fff;\n  font-size: 24px;\n}\n.dispacther-page-mytask .desc {\n  color: #fff;\n  margin-top: 20px;\n}\n", ""]);

// exports


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, "body {\n  font-family: \"Helvetica Neue\", Helvetica, \"Hiragino Sans GB\", Arial, sans-serif;\n  font-size: 14px;\n  color: #737373;\n  background-color: white;\n  margin: 10px 13px 10px 13px;\n}\n.dispacther-page-processTestInfo .page {\n  width: 80% ;\n  margin: 0 auto ;\n  margin-top: 50px ;\n}\n.block {\n  font-weight: bold;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote {\n  margin: 0;\n  padding: 0;\n}\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, \"Hiragino Sans GB\", Arial, sans-serif;\n  font-size: 13px;\n  line-height: 18px;\n  color: #737373;\n  background-color: white;\n  margin: 10px 13px 10px 13px;\n}\ntable {\n  margin: 10px 0 15px 0;\n  border-collapse: collapse;\n}\ntd,\nth {\n  border: 1px solid #ddd;\n  padding: 3px 10px;\n}\nth {\n  padding: 5px 10px;\n}\na {\n  color: #0069d6;\n}\na:hover {\n  color: #0050a3;\n  text-decoration: none;\n}\na img {\n  border: none;\n}\np {\n  margin-bottom: 9px;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  color: #404040;\n  line-height: 36px;\n}\nh1 {\n  margin-bottom: 18px;\n  font-size: 30px;\n}\nh2 {\n  font-size: 24px;\n}\nh3 {\n  font-size: 18px;\n}\nh4 {\n  font-size: 16px;\n}\nh5 {\n  font-size: 14px;\n}\nh6 {\n  font-size: 13px;\n}\nhr {\n  margin: 0 0 19px;\n  border: 0;\n  border-bottom: 1px solid #ccc;\n}\nblockquote {\n  padding: 13px 13px 21px 15px;\n  margin-bottom: 18px;\n  font-family: georgia,serif;\n  font-style: italic;\n}\nblockquote:before {\n  content: \"\\201C\";\n  font-size: 40px;\n  margin-left: -10px;\n  font-family: georgia,serif;\n  color: #eee;\n}\nblockquote p {\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 18px;\n  margin-bottom: 0;\n  font-style: italic;\n}\ncode,\npre {\n  font-family: Monaco, Andale Mono, Courier New, monospace;\n}\ncode {\n  background-color: #fee9cc;\n  color: rgba(0, 0, 0, 0.75);\n  padding: 1px 3px;\n  font-size: 12px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n}\npre {\n  display: block;\n  padding: 14px;\n  margin: 0 0 18px;\n  line-height: 16px;\n  font-size: 11px;\n  border: 1px solid #d9d9d9;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\npre code {\n  background-color: #fff;\n  color: #737373;\n  font-size: 11px;\n  padding: 0;\n}\nsup {\n  font-size: 0.83em;\n  vertical-align: super;\n  line-height: 0;\n}\n* {\n  -webkit-print-color-adjust: exact;\n}\n@media screen and (min-width: 914px) {\n  body {\n    width: 854px;\n    margin: 10px auto;\n  }\n}\n@media print {\n  body,\n  code,\n  pre code,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    color: black;\n  }\n  table,\n  pre {\n    page-break-inside: avoid;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, ".dispacther-page-report .content-warpper {\n  margin-top: 20% ;\n  margin-left: 65% ;\n  width: 100% ;\n}\n.dispacther-page-report .content {\n  position: relative;\n  top: 35px;\n  width: 92%;\n  margin: 0 auto;\n}\n.dispacther-page-report .bar {\n  margin-top: 30px;\n}\n", ""]);

// exports


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, "body {\n  background-color: #fff;\n}\n@keyframes move {\n  0% {\n    transform: translateX(0);\n  }\n  25% {\n    transform: translateX(-50px);\n  }\n  50% {\n    transform: translateX(0);\n  }\n  75% {\n    transform: translateX(50px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n}\n.dispacther-page-startCasePage .cloud-bg {\n  animation: move 15s infinite linear;\n  -webkit-animation: move 15s infinite linear;\n}\n.dispacther-page-startCasePage .state {\n  margin-left: 15px;\n}\n.dispacther-page-startCasePage .dialog-cover {\n  display: block;\n  padding-right: 15px;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background: rgba(0, 0, 0, 0.7);\n  z-index: 10;\n}\n.dispacther-page-startCasePage .start-wrapper {\n  background: #d1e3e9 ;\n  width: 100% ;\n  height: 240px;\n}\n.dispacther-page-startCasePage .start-wrapper .opt-wrapper {\n  position: absolute;\n  top: 10px;\n  width: 80% ;\n  margin: 0 auto;\n  left: 10%;\n  display: flex;\n}\n.dispacther-page-startCasePage .start-wrapper .opt-wrapper .logo-caca {\n  width: 311px ;\n  height: 289px;\n  background: url(" + __webpack_require__(133) + ") 0 0 no-repeat;\n  background-size: 161px 192px;\n  margin-top: 14px;\n  animation: myjump 1s infinite;\n}\n.dispacther-page-startCasePage .start-wrapper .opt-wrapper .case-title {\n  color: #666;\n  font-family: 'Vrinda', 'Segoe UI', 'Microsoft Jhenghei', '\\5FAE\\8F6F\\96C5\\9ED1', tahoma, 'Hiragino Sans GB W3';\n  -webkit-font-smoothing: antialiased;\n  font-weight: normal;\n  font-size: 45px;\n  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);\n  margin-bottom: 30px;\n  -webkit-mask-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(255, 255, 255, 0.8)), color-stop(40%, rgba(255, 255, 255, 0.4)), color-stop(100%, #000000));\n  text-decoration: none;\n}\n.dispacther-page-startCasePage .start-wrapper .process-wrapper {\n  background: -webkit-linear-gradient(top, #dcebf1 0%, #fafcfd 30%);\n  height: 100% ;\n  width: 100%;\n  margin-top: -273px;\n  padding-top: 30px ;\n}\n.dispacther-page-startCasePage .start-wrapper .process-wrapper .case-list {\n  background: rgba(245, 243, 243, 0);\n  width: 80% ;\n  margin: 0 auto ;\n  list-style: none;\n  padding-top: 30px ;\n  border: 1px solid  #d4d1d1;\n  padding-left: 0px ;\n}\n.dispacther-page-startCasePage .start-wrapper .process-wrapper .case-list .case-item {\n  display: flex;\n  border: 1px solid  #d4d1d1;\n  width: 95%;\n  margin: 0 auto;\n  margin-bottom: 20px;\n  background: #d7e5ec;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  border-radius: 3px;\n}\n.dispacther-page-startCasePage .start-wrapper .process-wrapper .case-list .case-item .btn-group {\n  margin-left: 30px;\n}\n.dispacther-page-startCasePage .start-wrapper .process-wrapper .case-list .case-item .case-item-title {\n  margin-left: 20px ;\n  font-weight: bold;\n  width: 100px;\n  line-height: 34px;\n}\n.dispacther-page-startCasePage .start-wrapper .process-wrapper .case-list .case-item .my-process {\n  margin-left: 30px;\n  margin-top: 7px;\n}\n.dispacther-page-startCasePage .start-wrapper .process-wrapper .case-list .case-item .case-item-detail {\n  margin-left: 30px ;\n}\n.dispacther-page-startCasePage .start-wrapper .process-wrapper .case-list .case-item button.btn {\n  margin-left: 10px ;\n}\n.dispacther-page-startCasePage .start-wrapper .process-wrapper .back-caca {\n  width: 380px ;\n  height: 500px;\n  background: url(" + __webpack_require__(133) + ") 0 0 no-repeat;\n  background-size: 400px 500px;\n  margin-top: 54px;\n  transform: rotate(30deg);\n  position: absolute;\n  top: 450px;\n  right: 60px;\n  z-index: 2;\n}\n@keyframes myjump {\n  0% {\n    transform: rotate(0deg);\n  }\n  30% {\n    transform: translateY(30deg);\n  }\n  60% {\n    transform: translateY(0deg);\n  }\n  90% {\n    transform: translateY(-30deg);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n@-webkit-keyframes myjump {\n  /*Safari and Chrome*/\n  0% {\n    transform: rotate(0deg);\n  }\n  30% {\n    transform: translateY(30deg);\n  }\n  60% {\n    transform: translateY(0deg);\n  }\n  90% {\n    transform: translateY(-30deg);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, ".dispacther-page-submittask .content-warpper {\n  margin-top: 20% ;\n  margin-left: 65% ;\n  width: 100% ;\n}\n.dispacther-page-submittask .preview_box img {\n  width: 200px;\n}\n.dispacther-page-submittask .content {\n  position: relative;\n  top: 90px;\n  width: 70%;\n  margin: 0 auto;\n}\n.dispacther-page-submittask .content strong {\n  display: block ;\n  margin-bottom: 10px;\n}\n.dispacther-page-submittask .content .content-wanning {\n  display: none;\n  background-color: #f9e491;\n  border-color: #f9e491;\n  color: #c29d0b;\n  margin-bottom: 20px;\n  padding: 10px;\n}\n.dispacther-page-submittask img {\n  display: block ;\n  margin: 0 auto;\n  margin-top: 10px;\n}\n.dispacther-page-submittask .img-gourp {\n  width: 81%;\n  margin: 25px auto;\n}\n.dispacther-page-submittask .btn-group {\n  width: 81%;\n  margin: 25px auto;\n}\n.dispacther-page-submittask .btn-group button {\n  width: 100px;\n}\n.dispacther-page-submittask .btn-group .cancel {\n  margin-right: 15px;\n}\n.dispacther-page-submittask .bar {\n  margin-top: 30px;\n}\n", ""]);

// exports


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, ".dispacther-page-useDoc .page {\n  width: 80% ;\n  margin: 0 auto ;\n  margin-top: 50px ;\n}\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, \"Hiragino Sans GB\", Arial, sans-serif;\n  font-size: 14px;\n  color: #737373;\n  background-color: white;\n  margin: 10px 13px 10px 13px;\n}\n.block {\n  font-weight: bold;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote {\n  margin: 0;\n  padding: 0;\n}\ntable {\n  margin: 10px 0 15px 0;\n  border-collapse: collapse;\n}\ntd,\nth {\n  border: 1px solid #ddd;\n  padding: 3px 10px;\n}\nth {\n  padding: 5px 10px;\n}\na {\n  color: #0069d6;\n}\na:hover {\n  color: #0050a3;\n  text-decoration: none;\n}\na img {\n  border: none;\n}\np {\n  margin-bottom: 9px;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  color: #404040;\n  line-height: 36px;\n}\nh1 {\n  margin-bottom: 18px;\n  font-size: 30px;\n}\nh2 {\n  font-size: 24px;\n}\nh3 {\n  font-size: 18px;\n}\nh4 {\n  font-size: 16px;\n}\nh5 {\n  font-size: 14px;\n}\nh6 {\n  font-size: 13px;\n}\nhr {\n  margin: 0 0 19px;\n  border: 0;\n  border-bottom: 1px solid #ccc;\n}\nblockquote {\n  padding: 13px 13px 21px 15px;\n  margin-bottom: 18px;\n  font-family: georgia,serif;\n  font-style: italic;\n}\nblockquote:before {\n  content: \"\\201C\";\n  font-size: 40px;\n  margin-left: -10px;\n  font-family: georgia,serif;\n  color: #eee;\n}\nblockquote p {\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 18px;\n  margin-bottom: 0;\n  font-style: italic;\n}\ncode,\npre {\n  font-family: Monaco, Andale Mono, Courier New, monospace;\n}\ncode {\n  background-color: #fee9cc;\n  color: rgba(0, 0, 0, 0.75);\n  padding: 1px 3px;\n  font-size: 12px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n}\npre {\n  display: block;\n  padding: 14px;\n  margin: 0 0 18px;\n  line-height: 16px;\n  font-size: 11px;\n  border: 1px solid #d9d9d9;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\npre code {\n  background-color: #fff;\n  color: #737373;\n  font-size: 11px;\n  padding: 0;\n}\nsup {\n  font-size: 0.83em;\n  vertical-align: super;\n  line-height: 0;\n}\n* {\n  -webkit-print-color-adjust: exact;\n}\n@media screen and (min-width: 914px) {\n  body {\n    width: 854px;\n    margin: 10px auto;\n  }\n}\n@media print {\n  body,\n  code,\n  pre code,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    color: black;\n  }\n  table,\n  pre {\n    page-break-inside: avoid;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, ".dispacther-widget-alert .alert-wrapper {\n  width: 320px;\n  margin: 0 auto;\n  position: absolute;\n  top: -51px;\n  left: 50%;\n  margin-left: -57px;\n  z-index: 11111;\n  animation: myTop 5s ;\n  -webkit-animation: myTop 5s;\n}\n@keyframes myTop {\n  0% {\n    transform: translateY(0px);\n  }\n  20% {\n    transform: translateY(100px);\n  }\n  60% {\n    transform: translateY(100px);\n  }\n  80% {\n    transform: translateY(0px);\n  }\n  100% {\n    transform: translateY(-51px);\n  }\n}\n@-webkit-keyframes myTop {\n  /*Safari and Chrome*/\n  0% {\n    transform: translateY(0px);\n  }\n  20% {\n    transform: translateY(51px);\n  }\n  60% {\n    transform: translateY(51px);\n  }\n  80% {\n    transform: translateY(0px);\n  }\n  100% {\n    transform: translateY(-51px);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, ".dispacther-widget-dialog .my-dialog {\n  transition: transform 0.3s ease-out;\n}\n.dispacther-widget-dialog .dialog-body {\n  padding: 17px;\n  line-height: 26px;\n  max-height: 300px;\n  overflow-y: scroll;\n}\n", ""]);

// exports


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)();
// imports


// module
exports.push([module.i, ".dispacther-widget-header .header-title {\n  color: #fff;\n  font-size: 20px;\n  line-height: 20px;\n  margin-top: 22px;\n  display: inline-block;\n  -webkit-mask-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(255, 255, 255, 0.8)), color-stop(40%, rgba(255, 255, 255, 0.5)), color-stop(100%, #000000));\n}\n.dispacther-widget-header .nav-right-item {\n  color: #fff;\n  font-size: rgba(255, 255, 255, 0.65);\n}\n", ""]);

// exports


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var template = __webpack_require__(147);
 __webpack_require__(123);

module.exports = {
 	render: function () {
 		$('.root').html(template);
 		this.bind();
 	},
 	bind: function () {
 		//bind Dom Event
 	},
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var template = __webpack_require__(148);
__webpack_require__(124);

var host = "//112.124.5.195:8683";

//var host = "http://127.0.0.1:8081"

module.exports = {
 	render: function () {
 		$('.root').html(template);
 		this.bind();
 		this.getData();
 	},
 	bind: function () {
 		//bind Dom Event
 	},
 	getData: function () {
 		var param = location.hash.split('?');
 		param = param[1];
 		param = param.split('&');
 		var query = {};
 		param.forEach(function (item) {
 			item = item.split('=');
 			query[item[0]] = item[1];
 		});
 		$('.capture').attr('src',  host + '/static/' + query.id + '.png');
	    $.ajax({
	        url:  host + '/api/case-detail/' + query.id,
	        type: 'GET',
	        timeout : 5000,
	        dataType: 'json',
	        cache: false,
	        success: (ret, textStatus, request) => {
	        	var failtures = ret.filter(function (item) {
	        		return item.state === 'failture';
	        	});
	            var tpl = ret.map(function (item,index) {
	            	if(item.state === 'success'){
	            		// return '<li class="desc">'
	            		// 		+'<i class="fa fa-check tooltips i-success" data-container="body"></i>'
	            		// 		+item.caseName+' [成功]'+
	            		// 		+'<span>'+item.lastTime+ '<span></li>';
	            		return ' <tr>'
          						+	'<td> '+ (+index+1) +' </td>'
                   				+	'<td>'+ item.caseName+' </td>'
				                +    '<td> '+ item.lastTime+ ' </td>'
				                +    '<td>'
                        		+	'<span class="label label-sm label-success"> 成功 </span>'
			                    +	'</td>'
			                	+ '</tr>'
	            	}else{
	            		return ' <tr>'
          						+	'<td> '+ (+index+1) +' </td>'
                   				+	'<td>'+ item.caseName+' </td>'
				                +    '<td> '+ item.lastTime+ ' </td>'
				                +    '<td>'
                        		+	'<span class="label label-sm label-danger"> 失败 </span>'
			                    +	'</td>'
			                	+ '</tr>'
	            	}
	            	
	            });
	            $('.case-list tbody').html(tpl.join(''));
	            $('.counterup.case-total').html(ret.length);
	            $('.counterup.case-failture').html(failtures.length);
	            $('.counterup.case-success').html(ret.length - failtures.length);
	        },
	        error: (xhr) => {
	        	alert('服务不稳定，请稍后重试');
	        }
	    });
 	}
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint devel:true */

__webpack_require__(125);
var template = __webpack_require__(149);

//widget 
var header = __webpack_require__(122) ;
var cookie = __webpack_require__(97);

//page 
var mytask = __webpack_require__(95) ;

module.exports = {

    render: function () {

		$('.root').html(template);

    	header.render();
    	mytask.render();

    	window.onscroll = function () {
    		if (window.scrollY > 0) {
    			$('.page-header').css({
    				background: '#efefef'
    			});
    			$('.header-title').css({
    				color: '#565353'
    			});
    		} else {
    			$('.page-header').css({
    				background: 'transparent'
    			});
    			$('.header-title').css({
    				color: '#fff'
    			});
    		}
    	}
    	
    } 
}


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var template = __webpack_require__(150);
var dataModel = __webpack_require__(93);
var cookie = __webpack_require__(97)

__webpack_require__(126);

module.exports = {
 	render: function () {
 		
	 	var c_username = cookie.getCookie('username');
		if(c_username){
		 	location.hash = '#index'; 
		}

 		$('.root').html(template);
 		this.bind();

 	},
 	bind: function () {
 		//bind Dom Event
 		var me = this;

 		$('.login-btn').on('click' ,function(){
 			me.loginAction();
 		})

		$('body').on('keydown' ,function(event){

			if(event.keyCode == 13){
				me.loginAction();
			}

 		})
 	},

 	loginAction :function(){

 		var me = this;
 		var username = $('.username').val() || '';
		var passwd = $('.password').val() || '';
		var identifyCode =  $('.identify-code').val() || '';

		if(!username){
			this.showValidateInfo('用户名为空');
		 	return;
		}

		if(!passwd){
			this.showValidateInfo('密码为空');
		 	return ;
		}
		var opt = {
		 	data : {
		 	 	username : username,
		 	 	passwd   : passwd,
		 	},

		 	 method : 'POST',
		 	 type  : 'login'
		}

		dataModel.getData(opt).then(function(res){

		 	if(res.status === 11004){

		 		me.showValidateInfo('验证码错误');
		 		$('.identify-code-img').attr('src' , 'http://sampling-qa.camera360.com/index/captcha?v='+ new Date() ) ;
		 	
		 	}else if(res.status === 11000){
		 		
		 		me.showValidateInfo('用户名或密码错误');

		 	}else if(res.status === 11002 || res.status === 11003){

		 		me.showValidateInfo(res.message);
		 		
		 	}

		 	var c_opt = {
		 		c_name : 'username',
		 		value  : res.data.username,
		 		expiredays : 5 * 60 * 60 * 1000
		 	}
		 	cookie.setCookie(c_opt);

		 	location.hash = '#index'; 
		});
 	},

 	showValidateInfo : function(str){

 		$('.login-warn-wrapper').css('display' , 'block');
 		$('.warn-info').text(str);
 	}
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var template = __webpack_require__(152);
 __webpack_require__(128);

module.exports = {
 	render: function () {
 		$('.root').html(template);
 		this.bind();
 	},
 	bind: function () {
 		//bind Dom Event
 	},
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var template = __webpack_require__(153);
 __webpack_require__(129);

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

/***/ }),
/* 117 */
/***/ (function(module, exports) {

function CaseItem (opts) {
	this.opts = $.extend({
		id: ''
	}, opts || {});

	this.interval = null;
	this.template = [
		'<li class="case-item">',
		'	<div class="case-item-title">'+this.opts.id+'</div>',
		'	<div class="progress progress-striped active my-process" style="width:40%;margin-bottom:0px" >',
		'		<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="background-color:#a4de56">',
		'			<span class="sr-only">0%</span>',
		'		</div>',
		'	</div>',
		'   <div class="btn-group">',
		'		<button type="button" class="btn  yellow-crusta get-info" data-key="'+this.opts.id+'">case简介</button>',
		'		<button type="button" class="btn  green-meadow start-btn">启动</button>',
		'		<button type="button" class="btn purple-plum disabled detail-btn">执行详情</button>',
		'		<label class="btn btn-outline btn-circle btn-sm active state" ></label>',
		'   </div>',
		'</li>'
	];

	this.dom = $(this.template.join(''));
	this.bind();
}

CaseItem.prototype.render = function () {
	return this.dom;
}

CaseItem.prototype.bind = function () {
	var me = this;
	$('.start-btn', this.dom).on('click', function () {
		me.startCase();
	});
	$('.detail-btn', this.dom).on('click', function () {
		console.log('see detail');
	});
}

CaseItem.prototype.startCase = function (type) {


	var me = this;
	var host = "//112.124.5.195:8683";

    //var host = "http://127.0.0.1:8081"
	$.get(
		 host + '/api/start-case/' + me.opts.id,
		{},
		function (data) {
			$('.progress-bar', me.dom).width('30%');
	 		me.interval = setInterval(function (){
	 			$.get(
	 				 host + '/api/case-detail/' + me.opts.id + '?r=' + Math.random(),
	 				{},
	 				function (data) {
	 					$('.progress-bar', me.dom).width('100%');
	 					$('.detail-btn', me.dom).removeClass('disabled');
	 					$('.detail-btn', me.dom).on('click', function () {
	 						// location.hash = '#casedetail?id=' + me.opts.id;
	 						window.open('/#casedetail?id=' + me.opts.id);
	 					});
	 					clearInterval(me.interval);
	 					var failtures = data.filter(function (item) {
	 						return item.failure !== null;
	 					});

	 					alert(failtures.length);
	 					if (failtures.length) {
	 						$('.state', me.dom).text('执行失败');
	 						$('.state', me.dom).addClass('red');
	 					} else {
	 						$('.state', me.dom).text('执行成功');
	 						$('.state', me.dom).addClass('green');
	 					}

	 					if(type == 'quene'){
	 						$('body').trigger('case-ready');	 						
	 					}


	 				}
	 			);
	 		}, 10000);
		}
	);
}

module.exports = CaseItem;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {


var template = __webpack_require__(154);
var header = __webpack_require__(122);
var CaseItem = __webpack_require__(141);
var CaseManager = __webpack_require__(96);
var Dialog = __webpack_require__(145);

var host = "//112.124.5.195:8683";

//var host = "http://127.0.0.1:8081"

__webpack_require__(130);

module.exports = {
 	render: function () {
 		$('.root').html(template);

 		this.init();
 		this.bind();
 	},
 	init: function () {
 		this.caseManager = new CaseManager();
 		var caseManager = this.caseManager;
 		console.log('dd', caseManager);
 		var caseList = [
 			'bannerAddP1',
 			'bannerEditP1',
 			'bannerCopyP1',
 			'bannerAddP2',
 			'bannerAddP3',
 			'bannerAddP4',
 			'bannerAddP5',
 			'feedAddP1',
 			'feedEditP1',
 			'feedCopyP1',
 			'feedAddP2',
 			'feedAddP3',
 			'inAppAddP1',
 			'fpEntry1AddP1',
 			'fpEntry1AddP2',
 			'fpEntry5AddP1',
 			'fpEntry5EditP1',
 			'fpEntry5CopyP1',
 		];
 		caseList.forEach(function (item) {		
	 		caseManager.addItem(new CaseItem({
	 			id: item
	 		}));
 		});

 		caseManager.render();
 	},
 	bind: function () {
 		var caseManager = this.caseManager;

 		//bind Dom Event
 		$('.get-info').on('click',function(){
			
			var id = $(this).attr('data-key');
			$.get(
 				host + '/api/case-info/'+ id,

 				function (data) {
 					$(".dialog-cover").css('display' , 'block');
 					Dialog.render();
 					var tpl = ['<ol>'];
 					for(var i = 0 ; i < data.caseInfo.length ; i++){
 						tpl.push('<li>' + data.caseInfo[i] +'</li>');
 					}
 					tpl.push('</ol>');
 					$(".bootbox-body").html(tpl.join(''));					
 				}
 			);
		});


 		$('.start-case-btn').on('click', function () {
 			caseManager.startQuene();
 		});
 	},
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {


var template = __webpack_require__(155);
var Alert    = __webpack_require__(121); 
var Util     =  __webpack_require__(146); 
var dataModel = __webpack_require__(93);
var serverConfig = __webpack_require__(94);

__webpack_require__(131);

module.exports = {

	FileList : [],

 	render: function () {

 		$('.page-content-wrapper').html(template);
 		this.bind();
 	},
 	bind: function () {

 		var me = this ;
 		var dropZone = document.getElementById('drop_zone');
		dropZone.addEventListener('dragover', this.dragOver, false);
		dropZone.addEventListener('drop', this.fileSelect.bind(me), false);

		$('.cancel').on('click' , function(){
			
			me.FileList.length = 0;
			$('.content-wanning').css('display' , 'none');
			$('#list').html('');
			var opt = {
				wrapper : 'dispacther-page-submittask',
				info    : '已清除上传图片，请重新上传',
				type    : 'success'
			}
			Alert.show(opt);
		})

		$('.submit').on('click',function(){

			// if(me.validateCommitFile(me.FileList)){

				var url = serverConfig['host'] + serverConfig['commit'];
			         
				var formData = new FormData(); 
				for(var i = 0 ;i < me.FileList.length ; i++){
					formData.append('files[]',me.FileList[i] ); 
				}
				// xhr.send(fd); 
				$.ajax({
				    url: url,
				    type: 'POST',
				    data: formData,
				    processData: false,
				    contentType: false,

				    success :function (res){

				    		
				    	if(res.status === 200){
				    		var opt = {
								wrapper : 'dispacther-page-submittask',
								info    : '上传成功',
								type    : 'success'
							}
							Alert.show(opt);
				    	}else{
				    		var opt = {
								wrapper : 'dispacther-page-submittask',
								info    : res.message,
								type    : 'warn'
							}
							Alert.show(opt);
				    	}

				    },
				    error :function(res){
			    		var opt = {
							wrapper : 'dispacther-page-submittask',
							info    : '上传图片失败，请重新上传',
							type    : 'warn'
						}
						Alert.show(opt);
				    }
				});
			//}
					            

		})
 	},

 	fileSelect:function(evt) {

		evt.stopPropagation();
		evt.preventDefault();

		var files = evt.dataTransfer.files;
		var output = [];

		
		files = Array.prototype.slice.call(files) ; 
		
		if(this.validateUpFile(files)){

			for (var i = 0, f; f = files[i]; i++) {

			    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
			                f.size, ' bytes, last modified: ',
			                f.lastModifiedDate.toLocaleDateString(), '</li>');
		    }

		    output = output.join('') ;
			$('#list').append(output);
		}

	},

	validateUpFile:function(files){
		
		var me = this ;
		var validateTag = true;


		var filenames = files.map(function(item){
 
			return  item.name;
		});

		var fileSuffix = files.map(function(item){
 			var nameTmp  = item.name.split('_') ;
			return  (nameTmp && nameTmp.length > 0 && nameTmp[1]) ?  nameTmp[1].split('.')[0] : '';
		});

		var FileNames = this.FileList.map(function(item){

			return  item.name;
		});
		console.log(fileSuffix);

		for (var i = 0 ; i < fileSuffix.length ; i ++){

			console.log('dasd' + fileSuffix[i]);
			if((fileSuffix[i] && fileSuffix[i] !== 'res') 
				|| !fileSuffix[i]){
				var opt = {
					wrapper : 'dispacther-page-submittask',
					info    : '上传文件中文件名有误，请重新上传',
					type    : 'warn'
				}
				Alert.show(opt);

				return  false ; 
			}
		}


		filenames.forEach(function(item){

			var pos = $.inArray(item , FileNames);


			if(pos !== -1 && FileNames.length !== 0){
				var opt = {
					wrapper : 'dispacther-page-submittask',
					info    : '文件已上传请勿重新上传',
					type    : 'warn'
				}
				Alert.show(opt);
				validateTag  = false ; 

			}else{
				me.FileList = me.FileList.concat(files);
				me.FileList = Util.unique(me.FileList);
				validateTag  = true ;
			}

		});

		var len =  this.FileList.length ;

		if(len > 20 ){

			var opt = {
				wrapper : 'dispacther-page-submittask',
				info    : '一次性上传不要超过20条',
				type    : 'warn'
			}
			Alert.show(opt);
			validateTag = false ;
		}


		return validateTag ;

	},
	validateCommitFile :function(files){

		var validateTag = false;
		var filenames = files.map(function(item){

			return  item.name.split('_')[0];
		});


		for(var i = 0 ; i < files.length ; i++) {

			var filename = files[i].name.split('_')[0];
			var filetype = files[i].name.split('_')[1].split('.')[0];

			console.log(filenames);
			var postions  = filenames.filter(function(item){
				console.log(filename ,item);
				return  item == filename
			});


			console.log("postions:" + postions)
			if(postions.length < 2 ){


				var warnOutput = [];

				if(filetype == 'data'){

					warnOutput.push('<span class="warnning-content"> '+filename + '文件缺少res结果'+'</span>');
					validateTag = false ;
					
				}else if (filetype == 'res'){

					warnOutput.push('<span class="warnning-content"> '+filename + '文件缺少data结果'+'</span>');
					
					validateTag =  false ;
				}

				warnOutput = warnOutput.join('') ;
				$('.content-wanning').append(warnOutput);
				$('.content-wanning').css('display' , 'block');

			}else {
				$('.content-wanning').css('display' , 'none');
				validateTag =  true ;
			}
		}

		return validateTag;
	},

	dragOver: function(evt) {
	  evt.stopPropagation();
	  evt.preventDefault();
	  evt.dataTransfer.dropEffect = 'copy';
	}
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var template = __webpack_require__(156);
 __webpack_require__(132);

module.exports = {
 	render: function () {
 		$('.root').html(template);
 		this.bind();
 	},
 	bind: function () {
 		//bind Dom Event
 	},
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var template = __webpack_require__(157);
 __webpack_require__(160);

module.exports = {

	typeDic : {

		'warn'   : {
			className : 'alert-warning',
			infoTitle : 'Warnning!'
		},
		'error'  : {
			className : 'alert-danger',
			infoTitle : 'Error!'
		},
		'success':{
			className : 'alert-success',
			infoTitle : 'Success!'
		} 
	},

 	show: function (opt) {

 		var type = opt.type || '';
 		var info = opt.info || '';
 		var wrapper = opt.wrapper || '';

 		var className = this.typeDic[type].className;
 		var infoTitle = this.typeDic[type].infoTitle;

 		$('.' + wrapper).append(template);
 		$('.alert').addClass(className);
 		$('.alert strong').text(infoTitle);
 		$('.alert .info').text(info);

 		this.bind();
 	},
 	bind: function () {
 		//bind Dom Event
 	},
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var template = __webpack_require__(159);
var cookie   = __webpack_require__(97);
var dataModel = __webpack_require__(93);

 __webpack_require__(162);

module.exports = {

 	render: function () {
 		
 		var username = cookie.getCookie('username'); 

 		$('.page-header').html(template);
 		$('.username').text(username);
 		this.bind();

 	},
 	bind: function () {
 		//bind Dom Event
 		$('.logout').on('click', function(){

 			var opt = {
 			 	 method : 'GET',
 			 	 type  : 'logout'
 			 }

 			 dataModel.getData(opt).then(function(data){

 			 	if(data){

 			 		var c_opt = {
	 			 		c_name : 'username',
	 			 		value  : '',
	 			 		expiredays : 5 * 60 * 60 * 1000
	 			 	}
	 			 	cookie.setCookie(c_opt);
 			 		location.hash = '#login'; 
 			 	}

 			 });
 		})
 	},
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(98);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(98, function() {
			var newContent = __webpack_require__(98);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(99);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(99, function() {
			var newContent = __webpack_require__(99);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(100);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(100, function() {
			var newContent = __webpack_require__(100);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(101);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(101, function() {
			var newContent = __webpack_require__(101);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(102);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(102, function() {
			var newContent = __webpack_require__(102);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(103);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(103, function() {
			var newContent = __webpack_require__(103);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(104);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(104, function() {
			var newContent = __webpack_require__(104);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(105);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(105, function() {
			var newContent = __webpack_require__(105);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(106);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(106, function() {
			var newContent = __webpack_require__(106);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(107);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(107, function() {
			var newContent = __webpack_require__(107);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5bbfaf7cb36edd1a21bd911efb449a28.png";

/***/ }),
/* 134 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/yaweiyihan/Desktop/code/processtest/app/page/caseStandard/caseStandard.html Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <div class=\"styleguide dispacther-page-caseStandard\">\n| \t<div class=\"page group\">\n| \t\t<blockquote>");

/***/ }),
/* 135 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/yaweiyihan/Desktop/code/processtest/app/page/casedetail/casedetail.html Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <div class=\"styleguide dispacther-page-casedetail\">\n| \t<div class=\"row\" >\n| \t\t<div class=\"col-lg-4 col-md-3 col-sm-6 col-xs-12\">");

/***/ }),
/* 136 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/yaweiyihan/Desktop/code/processtest/app/page/index/index.html Unexpected token (2:0)\nYou may need an appropriate loader to handle this file type.\n| \n| <div class=\"page-wrapper\">\n|     <div class=\"page-header navbar navbar-fixed-top\" style=\"height: 61px;background:transparent\">\n|     </div>");

/***/ }),
/* 137 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/yaweiyihan/Desktop/code/processtest/app/page/login/login.html Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <div class=\"styleguide dispacther-page-login\">\n| \t<div class=\"portlet light bordered login-wrapper\">\n|         <div class=\"portlet-title\">");

/***/ }),
/* 138 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/yaweiyihan/Desktop/code/processtest/app/page/mytask/mytask.html Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <div class=\"styleguide dispacther-page-mytask\">\n|     \n|     <div class=\"content\">");

/***/ }),
/* 139 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/yaweiyihan/Desktop/code/processtest/app/page/processTestInfo/processTestInfo.html Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <div class=\"styleguide dispacther-page-processTestInfo\">\n| \t\t<div class=\"page group\">\n| \t\t<blockquote>");

/***/ }),
/* 140 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/yaweiyihan/Desktop/code/processtest/app/page/report/report.html Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <div class=\"styleguide dispacther-page-report page-content\">\n| \t<div class=\"page-bar bar\">\n|         <ul class=\"page-breadcrumb\">");

/***/ }),
/* 141 */
/***/ (function(module, exports) {

function CaseItem (opts) {
	this.opts = $.extend({
		id: ''
	}, opts || {});

	this.interval = null;
	this.template = [
		'<li class="case-item">',
		'	<div class="case-item-title">'+this.opts.id+'</div>',
		'	<div class="progress progress-striped active my-process" style="width:40%;margin-bottom:0px" >',
		'		<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="background-color:#a4de56">',
		'			<span class="sr-only">0%</span>',
		'		</div>',
		'	</div>',
		'   <div class="btn-group">',
		'		<button type="button" class="btn  yellow-crusta get-info" data-key="'+this.opts.id+'">case简介</button>',
		'		<button type="button" class="btn  green-meadow start-btn">启动</button>',
		'		<button type="button" class="btn purple-plum disabled detail-btn">执行详情</button>',
		'		<label class="btn btn-outline btn-circle btn-sm active state" ></label>',
		'   </div>',
		'</li>'
	];

	this.dom = $(this.template.join(''));
	this.bind();
}

CaseItem.prototype.render = function () {
	return this.dom;
}

CaseItem.prototype.bind = function () {
	var me = this;
	$('.start-btn', this.dom).on('click', function () {
		me.startCase();
	});
	$('.detail-btn', this.dom).on('click', function () {
		console.log('see detail');
	});
}

CaseItem.prototype.startCase = function (type) {


	var me = this;
	var host = "//112.124.5.195:8683";

    //var host = "http://127.0.0.1:8081"
	$.get(
		 host + '/api/start-case/' + me.opts.id,
		{},
		function (data) {
			$('.progress-bar', me.dom).width('30%');
	 		me.interval = setInterval(function (){
	 			$.get(
	 				 host + '/api/case-detail/' + me.opts.id + '?r=' + Math.random(),
	 				{},
	 				function (data) {
	 					$('.progress-bar', me.dom).width('100%');
	 					$('.detail-btn', me.dom).removeClass('disabled');
	 					$('.detail-btn', me.dom).on('click', function () {
	 						// location.hash = '#casedetail?id=' + me.opts.id;
	 						window.open('/#casedetail?id=' + me.opts.id);
	 					});
	 					clearInterval(me.interval);
	 					var failtures = data.filter(function (item) {
	 						return item.failure !== null;
	 					});

	 					alert(failtures.length);
	 					if (failtures.length) {
	 						$('.state', me.dom).text('执行失败');
	 						$('.state', me.dom).addClass('red');
	 					} else {
	 						$('.state', me.dom).text('执行成功');
	 						$('.state', me.dom).addClass('green');
	 					}

	 					if(type == 'quene'){
	 						$('body').trigger('case-ready');	 						
	 					}


	 				}
	 			);
	 		}, 10000);
		}
	);
}

module.exports = CaseItem;

/***/ }),
/* 142 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/yaweiyihan/Desktop/code/processtest/app/page/startCasePage/startCasePage.html Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <div class=\"styleguide dispacther-page-startCasePage\">\n| \t\n| \t<div class=\"dialog-cover \" style=\"display: none; padding-right: 15px;\">");

/***/ }),
/* 143 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/yaweiyihan/Desktop/code/processtest/app/page/submittask/submittask.html Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <div class=\"styleguide dispacther-page-submittask page-content \">\n| \t<div class=\"page-bar bar\">\n|         <ul class=\"page-breadcrumb\">");

/***/ }),
/* 144 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/yaweiyihan/Desktop/code/processtest/app/page/useDoc/useDoc.html Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <div class=\"styleguide dispacther-page-useDoc\">\n| \t<div class=\"page group\">\n| \t\t<h2 class=\"sectionedit1\" >流程化测试使用文档</h2>");

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var template = __webpack_require__(158);
 __webpack_require__(161);

module.exports = {
 	render: function () {
 		$('.dialog-cover').html(template);
 		this.bind();
 	},
 	bind: function () {

 		$('.btn-ok').on('click' , function(){
 			$('.dialog-cover').css('display' , 'none');
 		})
 	},
};

/***/ }),
/* 146 */
/***/ (function(module, exports) {



module.exports = {

 	unique:function(array){
	    var n = [];
	    for(var i = 0;i < array.length; i++){
	        if(n.indexOf(array[i]) == -1) n.push(array[i]);
	    }
	    console.log(n);
	    return n;
	}
};

/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports = "<div class=\"styleguide dispacther-page-caseStandard\">\n\t<div class=\"page group\">\n\t\t<blockquote>\n\t\t\t<h2 class=\"sectionedit1\" >流程测试case编写规范</h2>\n\t\t</blockquote>\n\t\t\n\t\t<div class=\"level2\">\n\t\t\t<p>\n\t\t\t目前流程测试基于phantomjs和casper来做；在书写case的时候需要按照一定的规范来书写；这样能方便case的维护和编写；\n\t\t\t</p>\n\t\t</div>\n            <h4 class=\"block\">数字列表项目需要遵循的测试框架规范</h4>\n            <p>(1) 如果需要添加cookie，在openURl之前使用addCookie添加 </p>\n\t\t\t<p>(2) 使用casper.test，在test开始时写清楚断言个数，方便管理</p>\n\n\t\t\t<div class=\"highlight highlight-source-js\">\n\t\t\t\t<pre>casper.test.begin('v8首页Banner新增P1-case，测试重点：banner全操作', 9, function suite(test){}); </pre>\n\t\t\t</div>\n   \n\t\t\t<p>(3) 对于异步渲染的dom，要采用wait机制，确定元素渲染完成之后再进行后续的断言；</p>\n\n\t\t\t<p>(4) 赋值给获取的元素赋值是流程测试中必须的步骤，针对各种元素有不同的赋值操作</p>\n\t\t\t<strong><h5>input赋值</h5></strong>\n\t\t\t<div class=\"highlight highlight-source-js\">\n\t\t\t\t<pre>this.sendKeys('input[data-key=\"priority\"]', '1', { reset: true}); </pre>\n\t\t\t</div>\n\n\t\t\t<strong><h5>select赋值</h5></strong>\n\t\t\t<div class=\"highlight highlight-source-js\">\n\t\t\t\t<pre> this.click('.tablee li.item-li:nth-of-type(3) .text-content a.multiselect');\n this.click('.tablee li.item-li:nth-of-type(3) .text-content .multiselect-container li:nth-of-type(2) label');</pre>\n\t\t\t</div>\n\n\t\t\t<ul>\n\t\t\t\t<li class=\"level1\"><div class=\"li\"> input 元素</div></li>\n\t\t\t</ul>\n\n\t\t\t<p>input使用sendKeys方法来进行赋值。</p>\n\t\t\t<ul>\n\t\t\t\t<li class=\"level1\"><div class=\"li\"> select 元素</div></li>\n\t\t\t</ul>\n\t\t\t<p>按照点击步骤，模拟点击select要选中的元素；</p>\n\t\t\t<p>(5) 需要结构化输出的数据结构利用utils中的dump输出</p>\n\t\t\t<p>(6) 判断元素是否存在；</p>\n\t\t\t<p>判断元素使用casper中的标准方法assertExists</p>\n   \n            <h4 class=\"block\">结合业务的编写规范</h4>\n\t\t\t<div class=\"level3\">\n\t\t\t\t<p>(1)新广告系统很多渲染是异步的，需要控制好操作顺序，异步的过程使用wait机制，然后在then中获取真实元素之后执行后面的步骤,如下：</p>\n\t\t\t\t<div class=\"highlight highlight-source-js\">\n\t\t\t\t\t<pre><span class=\"pl-smi\">casper</span>.<span class=\"pl-en\">then</span>(<span class=\"pl-k\">function</span> () {<span class=\"pl-c\">\n\t<span class=\"pl-c\">//</span>--------------上传背景图---------------</span>\n\t<span class=\"pl-smi\">casper</span>.<span class=\"pl-smi\">page</span>.<span class=\"pl-en\">uploadFile</span>(<span class=\"pl-s\"><span class=\"pl-pds\">'</span>#cover<span class=\"pl-pds\">'</span></span>, <span class=\"pl-s\"><span class=\"pl-pds\">'</span>./750_320.png<span class=\"pl-pds\">'</span></span>);  \n\t<span class=\"pl-c1\">this</span>.<span class=\"pl-en\">waitForSelector</span>(<span class=\"pl-s\"><span class=\"pl-pds\">'</span>div[data-key=\"bgImg\"] img<span class=\"pl-pds\">'</span></span>);\n\n\t});\n\t<span class=\"pl-smi\">casper</span>.<span class=\"pl-en\">then</span>(<span class=\"pl-k\">function</span> () {\n\t<span class=\"pl-smi\">test</span>.<span class=\"pl-en\">assertExists</span>(<span class=\"pl-s\"><span class=\"pl-pds\">'</span>div[data-key=\"bgImg\"] img<span class=\"pl-pds\">'</span></span>, <span class=\"pl-s\"><span class=\"pl-pds\">'</span>背景图片已上传<span class=\"pl-pds\">'</span></span>);\n});</pre></div>\n\t\t\t</div>\n   \n\n\n            <h4 class=\"block\">case覆盖率和复杂度</h4>\n\t\t\t<p>(1) 如果一个case的路径已经很长了， 就不要在横向再拓展，即路径很长时候，再选择多语言就没有必要；如现在新广告系统，如果路径在15以上,就算长</p>\n\t\t\t<p>(2) case和case之间一定要最大程度的覆盖测试点</p>\n\t\t\t<p>(3) case要根据业务上重点和难点，加重case中测试改点的重复率</p>\n  \n \n    </div>\n</div>";

/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports = "<div class=\"styleguide dispacther-page-casedetail\">\n\t<div class=\"row\" >\n\t\t<div class=\"col-lg-4 col-md-3 col-sm-6 col-xs-12\">\n        <a class=\"dashboard-stat dashboard-stat-v2 blue\" href=\"#\">\n            <div class=\"visual\">\n                <i class=\"fa fa-comments\"></i>\n            </div>\n            <div class=\"details\">\n                <div class=\"number\">\n                    <span class=\"counterup case-total\" data-value=\"1349\">-</span>\n                </div>\n                <div class=\"desc\">断言总数</div>\n            </div>\n        </a>\n    </div>\n\n\t<div class=\"col-lg-4 col-md-3 col-sm-6 col-xs-12\">\n        <a class=\"dashboard-stat dashboard-stat-v2 red\" href=\"#\">\n            <div class=\"visual\">\n                <i class=\"fa fa-bar-chart-o\"></i>\n            </div>\n            <div class=\"details\">\n           \t\t<div class=\"number\">\n                    <span class=\"counterup case-failture\" data-value=\"9\">-</span>\n                </div>\n                <div class=\"desc\"> 失败总数</div>\n            </div>\n        </a>\n    </div>\n\n    <div class=\"col-lg-4 col-md-3 col-sm-6 col-xs-12\">\n        <a class=\"dashboard-stat dashboard-stat-v2 green\" href=\"#\">\n            <div class=\"visual\">\n                <i class=\"fa fa-shopping-cart\"></i>\n            </div>\n            <div class=\"details\">\n                <div class=\"number\">\n                    <span class=\"counterup case-success\" data-value=\"1\">-</span>\n                </div>\n                <div class=\"desc\"> 成功总数 </div>\n            </div>\n        </a>\n    </div>\n\t</div>\n\n    <div class=\" case-list\">\n        <table class=\"table table-hover table-light\" style=\"margin-bottom:0px;\">\n            <thead>\n                <tr>\n                    <th> 断言编号</th>\n                    <th> 断言内容</th>\n                    <th> 执行耗时 </th>\n                    <th> 执行结果 </th>\n                    <th> 结果截图 </th>\n                </tr>\n            </thead>\n            <tbody>\n              \n            </tbody>\n        </table>\n    </div>\n\n    <img src=\"xxxHTMLLINKxxx0.325561861274763940.9824609933421016xxx\" alt=\"\" class=\"capture\">\n</div>";

/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"page-wrapper\">\n    <div class=\"page-header navbar navbar-fixed-top\" style=\"height: 61px;background:transparent\">\n    </div>\n    <!-- BEGIN HEADER INNER -->\n\n    <!-- END HEADER INNER -->\n\n   \t<div class=\"page-sidebar-wrapper\">\n    </div>\n\n   <div class=\"page-content-wrapper\">\n\n   </div>\n\n</div>";

/***/ }),
/* 150 */
/***/ (function(module, exports) {

module.exports = "<div class=\"styleguide dispacther-page-login\">\n\t<div class=\"portlet light bordered login-wrapper\">\n        <div class=\"portlet-title\">\n            <div class=\"caption font-red-sunglo\">\n                <i class=\"icon-settings font-red-sunglo\"></i>\n                <span class=\"caption-subject bold uppercase\"> 用户采集系统</span>\n            </div>\n        </div>\n        <div class=\"portlet-body form\">\n            <form role=\"form\">\n                <div class=\"form-body\">\n                    <div class=\"form-group form-md-line-input\">\n                        <input type=\"text\" class=\"form-control username\"  placeholder=\"enter your name\" autocomplete=\"on\">\n                        <label for=\"form_control_1\">用户名</label>\n                    </div>\n                    <div class=\"form-group form-md-line-input\" style=\"margin-bottom: 11px;\">\n                        <input class=\"form-control password\"  placeholder=\"enter your password\" type='password'>\n                        <label for=\"form_control_1\" >密码</label>\n                    </div>\n\n <!--               <div class=\"form-group form-md-line-input\">\n                        <input type=\"text\" class=\"col-md-4 form-control identify-code\"  placeholder=\"enter identifying code \" autocomplete=\"on\" style=\"width:60%\">\n                        <img class=\"identify-code-img\" src=\"http://sampling-qa.camera360.com/index/captcha?v=0.01785420077555444\" alt=\"\">\n                        <label for=\"form_control_1\">验证码</label>\n                    </div> -->\n                    <div class=\"info-wrapper\">\n                \n                        <div class=\"form-group has-warning login-warn-wrapper\">\n                            <div class=\"input-icon \" >\n                                <i class=\"fa fa-warning tooltips\" data-original-title=\"please provide an email\" data-container=\"body\" style=\"position:relative\"></i>\n                                <span class=\"warn-info\"></span>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n                <div class=\"btn-wrapper\">\n                    <button type=\"button\" class=\"btn blue login-btn\">登录</button>\n                </div>\n                    \n            </form>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 151 */
/***/ (function(module, exports) {

module.exports = "<div class=\"styleguide dispacther-page-mytask\">\n    \n    <div class=\"content\">\n        <img src=\"http://cdn.alloyteam.com/assets/img/banner_0-c9e792.jpg\" alt=\"\">\n        <div class=\"introduce\">\n            <p style=\"font-size:48px\">前端流程化测试</p>\n            <p style=\"font-size:24px;margin-top:50px\">为您提供更稳定的前端服务</p>\n            <div style=\"margin-top:50px;border-raduis:2px\">\n                <a class=\"btn\" href=\"#startCasePage\">\n                    <span class=\"btn-text\">Getting Started now！</span>\n                </a>\n            </div>\n        </div>\n            <div class=\"mt-element-step\">\n                <div class=\"row step-no-background\">\n                    <div class=\"col-md-4 mt-step-col tac\">\n        \n<!--                         <div class=\"mt-step-title uppercase font-grey-cascade second-text\" >使用文档</div>\n                        <div class=\"mt-step-content font-grey-cascade\">输入流程化测试地址开始</div> -->\n                    \n                        <a href=\"#useDoc\">\n                            <div class=\"portlet-body\">\n                                <div class=\"mt-element-step\">\n                                    <div class=\"row step-default\">\n                                        <div class=\" bg-grey mt-step-col active\">\n                                            <div class=\"step-text uppercase \">使用文档</div>\n                                            <div class=\"desc\">包含流程化测试的步骤，如何查错等</div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </a>\n                                                    \n                    </div>\n                    <div class=\"col-md-4 mt-step-col error tac\">\n    \n   <!--                      <div class=\"mt-step-title uppercase font-grey-cascade second-text\">case开发规范</div>\n                        <div class=\"mt-step-content font-grey-cascade\">编辑图片并上传</div> -->\n                        <a href=\"#caseStandard\">\n                            <div class=\"portlet-body\">\n                                <div class=\"mt-element-step\">\n                                    <div class=\"row step-default\">\n                                        <div class=\"bg-grey mt-step-col done\">\n                 \n                                            <div class=\"step-text uppercase \">case开发规范</div>\n                                            <div class=\"desc\">在后续维护case时候需要遵守哪些规范去开发</div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </a>\n                    </div>\n                    <div class=\"col-md-4 mt-step-col done tac\">\n\n                        <a href=\"#processTestInfo\">\n                            <div class=\"portlet-body\">\n                                <div class=\"mt-element-step\">\n                                    <div class=\"row step-default\">\n                                        <div class=\"bg-grey mt-step-col error\">\n                                            <div class=\"step-text uppercase\">关于流程测试</div>\n                                            <div class=\"desc\">流程测试基本概念，已经为什么要做流程化测试</div>\n                                        </div>\n                                            \n                                    </div>\n                                </div>\n                            </div>\n                        </a>\n\n                    </div>\n                </div>\n            </div>\n    \t\t\n<!--             <div class=\"form-group form-md-line-input input-wrapper \">\n                <div class=\"input-group\">\n                    <div class=\"input-group-control\">\n                        <input type=\"text\" class=\"form-control img-count\" placeholder=\"请输入要进行流程化测试的网址，如http://godman-qa.camera360.com/operating_cms/\"></input>\n                        <div class=\"form-control-focus\"> </div>\n                    </div>\n                    <span class=\"input-group-btn btn-right\">\n                        <button type=\"button\" class=\"btn green-haze download-btn \" data-toggle=\"dropdown\" aria-expanded=\"false\"> GO !\n\n                        </button>\n                    </span>\n                </div>\n            </div>\n -->\n            <div class=\"info-wrapper\">\n                \n                <div class=\"form-group has-warning warn-wrapper\">\n                    <div class=\"input-icon \" >\n                        <i class=\"fa fa-warning tooltips\" data-original-title=\"please provide an email\" data-container=\"body\" style=\"position:relative\"></i>\n                        <span class=\"warn-info\"></span>\n                    </div>\n                </div>\n\n            </div>\n    </div>\n</div>";

/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports = "<div class=\"styleguide dispacther-page-processTestInfo\">\n\t\t<div class=\"page group\">\n\t\t<blockquote>\n\t\t\t<h2 class=\"sectionedit1\" >关于流程测试</h2>\n\t\t</blockquote>\n\t\t\n\n            <h4 class=\"block\">流程测试是什么？</h4>\n            <p>是模拟用户操作来进行测试，流程测试过程中如果某个节点出现问题就会报错，方便开发人员及时发现流程上存在的问题。</p>\n\n            <h4 class=\"block\">为什么要做流程测试</h4>\n\t\t\t<div class=\"level3\">\n\t\t\t\t<p style=\"margin-top:20px\">1.为什么不做性能测试和界面回归测试</p>\n\t\t\t\t<p>因为是后台系统，在加上只有PC端，在wifi环境下操作，所以性能问题不是最大的瓶颈，界面上的回归测试，也是能够显而易见，且不是高优先级的问题，所以性能测试和界面回归测试在本例中暂时不考虑</p>\n\n\t\t\t\t<p style=\"margin-top:15px\">2.为什么不做单测</p>\n\t\t\t\t<p>首先新广告系统是在组件的基础上开发的，在TDD开发模式下，由开发人员编写单测是必要的，但是目前开发人员吃紧，每开发一个组件或者接口就要写单测，这样会增大开发人员开发量。并且新广告后台开发是基于组件，在组件级别做单测即可。</p>\n\n\t\t\t\t<p style=\"margin-top:15px\">3.为什么是流程测试</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li class=\"level1\"><div class=\"li\">主要是流程上影响的稳定问题</div></li>\n\t\t\t\t\t<p>广告系统的不稳定性目前主要体现在运营同学在配置广告时遇到的影响其配置流程的问题，目前大部分问题都处于收敛的状态，但是如果新开发功能，还无法保证对于之前的功能不造成影响。</p>\n\n\t\t\t\t\t<li class=\"level1\"><div class=\"li\">case 的编写和维护有利于帮助理解业务</div></li>\n\n\t\t\t\t\t<li class=\"level1\"><div class=\"li\">case 流程相似，编写case成本会越来越小</div></li>\n\t\t\t\t\t<p>不同于单测，每次写的单测可能是全新，而针对于新广告系统的流程测试，大部分流程都是一致，编写新的单侧，只需要修改之前的case即可；</p>\n\t\t\t\t</ul>\n\n        </div>\n \n    </div>\n</div>";

/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = "<div class=\"styleguide dispacther-page-report page-content\">\n\t<div class=\"page-bar bar\">\n        <ul class=\"page-breadcrumb\">\n            <li>\n                <a href=\"index.html\">首页</a>\n                <i class=\"fa fa-circle\"></i>\n            </li>\n            <li>\n                <span>我的报表</span>\n            </li>\n        </ul>\n    </div>\n    <div class=\"content \">\n\t\t<div class=\"col-md-12\">\n        <!-- BEGIN SAMPLE TABLE PORTLET-->\n\t        <div class=\"portlet\">\n\t            <div class=\"portlet-title\">\n\t                <div class=\"caption\">\n\t                    <i class=\"fa fa-bell-o\"></i>我的报表 </div>\n\t            </div>\n                <div class=\"row\">\n                \t <div id=\"dashboard-report-range\" class=\"pull-right tooltips btn btn-sm\" data-container=\"body\" data-placement=\"bottom\" data-original-title=\"Change dashboard date range\">\n                                    <i class=\"icon-calendar\"></i>&nbsp;\n                                    开始时间：<span class=\"thin uppercase hidden-xs\"><input type=\"date\" id=\"start_time\"/></span>\n                                    结束时间：<span class=\"thin uppercase hidden-xs\"><input type=\"date\" id=\"end_time\"/></span>&nbsp;\n                                    <button type=\"button\" class=\"btn btn-sm green\" id=\"search\">查询</button>\n                     </div>\n                </div>\n\t\t        <div class=\"row\">\n\t\t            <div class=\"portlet-body\">\n\t\t                <div class=\"table-scrollable\">\n\t\t                    <table class=\"table table-striped table-bordered table-advance table-hover\">\n\t\t                        <thead>\n\t\t                            <tr>\n\t\t                                <th>\n\t\t                                    <i class=\"fa fa-calendar\"></i> 时间 </th>\n\t\t                                <th class=\"hidden-xs\">\n\t\t                                    <i class=\"fa fa-line-chart\"></i> 完成任务数 </th>\n\t\t                              \n\t\t                                \n\t\t                            </tr>\n\t\t                        </thead>\n\t\t                        <tbody>\n\t\t                            \n\t\t                        </tbody>\n\t\t                    </table>\n\t\t                </div>\n\t\t            </div>\n\t\t          </div>\n\t\t          <div class=\"col-md-12 col-sm-12\">\n\t\t\t\t    <div class=\"dataTables_paginate paging_bootstrap_full_number\" id=\"sample_1_paginate\">\n\t\t\t\t        <ul class=\"pagination\" style=\"visibility: visible;float:right\">\n\t\t\t\t            <li class=\"prev first\"><a href=\"javascript:void(0);\" title=\"First\"><i class=\"fa fa-angle-double-left\"></i></a></li>\n\t\t\t\t            <li class=\"prev prevPage\"><a href=\"javascript:void(0);\" title=\"Prev\"><i class=\"fa fa-angle-left\"></i></a></li>\n\t\t\t\t            <li class=\"next nextPage\"><a href=\"javascript:void(0);\" title=\"Next\"><i class=\"fa fa-angle-right\"></i></a></li>\n\t\t\t\t            <li class=\"next last\"><a href=\"javascript:void(0);\" title=\"Last\"><i class=\"fa fa-angle-double-right\"></i></a></li>\n\t\t\t\t        </ul>\n\t\t\t\t    </div>\n\t\t\t\t</div>\n\t\t    </div>\n\t        <!-- END SAMPLE TABLE PORTLET-->\n\t    </div>\n    </div>\n</div>";

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = "<div class=\"styleguide dispacther-page-startCasePage\">\n\t\n\t<div class=\"dialog-cover \" style=\"display: none; padding-right: 15px;\">\n\t</div>\n\t\n\t<div class=\"start-wrapper\">\n\t\t<img src=\"https://cdn.tinypng.com/images/jpg/cloud-right-2x.png?45ae147\" alt=\"\" class=\"cloud-bg\">\n\t\t<div class=\"opt-wrapper\">\n\t\t\t<div class=\"logo-caca\">\n\t\t\t</div>\n\t\t    <div class=\"form-group form-md-line-input input-wrapper\" style=\"width: 600px;top: 19px;\">\n\t\t    \t<div class=\"case-title\">开启流程测试之旅！</div>\n\t            <div class=\"input-group\">\n\t\t\t<!-- \t<div class=\"input-group-control\">\n\t                    <input type=\"text\" class=\"form-control img-count case-url\" placeholder=\"请输入要进行流程化测试的网址，如http://godman-qa.camera360.com/operating_cms/\" />\n\t                    <div class=\"form-control-focus\"> </div>\n\t                </div> -->\n\t                <span class=\"input-group-btn btn-right\">\n\t                    <button type=\"button\" class=\"btn green-haze download-btn start-case-btn\" data-toggle=\"dropdown\" aria-expanded=\"false\" style=\"width: 156px;\"> Start !\n\t                    </button>\n\t                </span>\n\t            </div>\n\t        </div>\n\t\t</div>\n\t\t<div class=\"process-wrapper\">\n\t\t\t<ul class=\"case-list\">\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n\n</div>";

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"styleguide dispacther-page-submittask page-content \">\n\t<div class=\"page-bar bar\">\n        <ul class=\"page-breadcrumb\">\n            <li>\n                <a href=\"index.html\">首页</a>\n                <i class=\"fa fa-circle\"></i>\n            </li>\n            <li>\n                <span>提交任务</span>\n            </li>\n        </ul>\n    </div>\n   \t<div class=\"content\">\n        <div class=\"content-wanning\">\n            <strong>Warnning!</strong>\n            <span class='warnning-content'></span>\n        </div>\n\t\t<div id=\"drop_zone\" class=\"m-heading-1 border-green m-bordered\">\n            <h3>拖拽区域</h3>\n            <p> 支持把图片拖拽到改区域内进行上传，上上传图片类型包括gif,png,jpg</p>\n            <p> 处理后的文件的命名为*_res.jpg </p>\n             <div class=\"row step-no-background img-gourp\">\n             \t<div class=\"col-md-4 mt-step-col\">\n             \t\t<img src=\"" + __webpack_require__(166) + "\" alt=\"\" width=\"40%\">\n             \t</div>\n             \t<div class=\"col-md-4 mt-step-col\">\n             \t\t<img src=\"" + __webpack_require__(169) + "\" alt=\"\" width=\"40%\">\n             \t</div>\n             \t<div class=\"col-md-4 mt-step-col\">\n             \t\t<img src=\"" + __webpack_require__(165) + "\" alt=\"\" width=\"40%\">\n             \t</div>\n             </div>\n\n        </div>\n\t\t<ul id=\"list\"></ul>\n\t\t<div class=\"btn-group\">\n\t\t\t<button type=\"button\" class=\"btn btn-default cancel\">清除</button>\n\t\t\t<button type=\"button\" class=\"btn green-haze submit\">提交</button>\n\t\t</div>\n\n\t</div>\n</div>";

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"styleguide dispacther-page-useDoc\">\n\t<div class=\"page group\">\n\t\t<h2 class=\"sectionedit1\" >流程化测试使用文档</h2>\n\n\t\n\n        <h4 class=\"block\">1 . 点击Getting Started, 进入如下页面：</h4>\n        <img src=\"" + __webpack_require__(163) + "\" alt=\"\">\n\n        <h4 class=\"block\">2. 点击start </h4>\n\t\t<div class=\"level3\">\n\t\t\t<p style=\"margin-top:20px\">所有case会按照，先后顺序串行执行，这个地方，有些case之间有强前后顺序的要求，所以串行会比较简单，这可能会比较耗时，但是比较执行结果比较可靠；</p>\n\n\t\t\t<p style=\"margin-top:15px\">2.为什么不做单测</p>\n\t\t\t<p>首先新广告系统是在组件的基础上开发的，在TDD开发模式下，由开发人员编写单测是必要的，但是目前开发人员吃紧，每开发一个组件或者接口就要写单测，这样会增大开发人员开发量。并且新广告后台开发是基于组件，在组件级别做单测即可。</p>\n\t\t\t<p>在进行首次进行时可以直接全量case执行</p>\n\n\n    \t</div>\n\n    \t<h4 class=\"block\">3. 每个case的子功能介绍</h4>\n    \t<div class=\"level3\">\n    \t\t<strong>case简介</strong>\n    \t\t<p>\n    \t\t\t点击case简介会弹出这个case的具体测试流程点，和执行顺序，只有当其中所有的点都执行成功，该case才算成功；\n    \t\t</p>\n    \t\t<strong>启动</strong>\n    \t\t<p>\n    \t\t\t单个启动该case，在全部case执行之后，或者更为关心某个case的结果，可以单独执行该case，其中单独执行某些case需要强依赖之前的case执行，具有这种关系的case如下：\n    \t\t</p>\n    \t\t<p>bannerEditP1,BannerCopyP1 ,执行之前必须重新执行一遍BannerAddP1；bannerEditP1和BannerCopyP1没有执行顺序，可以并行；</p>\n    \t\t<p>同样的，所有编辑和拷贝的case需要在新增case重新执行完之后执行；</p>\n\n    \t\t<strong>执行详情</strong>\n    \t\t<p>\n    \t\t\t点击执行详情可以看到该条case执行的结果，执行详情页截图如下：\n    \t\t</p>\n    \t\t<img src=\"" + __webpack_require__(164) + "\" alt=\"\">\n    \n\n    \t\t<p style=\"margin:25px;\">如上，该页面会展示，该case执行的断言数，全部断言执行成功才是成功，执行结果的截图会在该页展示，该case执行失败，可以看出是其中必选项的客户端版本没有选择，所以导致最后一步提交失败；执行详情也是希望帮助大家可以更快的锁定问题；</p>\n    \t</div>\n\n\n</div>";

/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = "<div class=\"styleguide dispacther-widget-alert\">\n\n\t<div class=\"alert alert-wrapper\">\n        <strong></strong> \n        <span class=\"info\"></span>\n    </div>\n\n</div>";

/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports = "<div class=\"styleguide dispacther-widget-dialog\">\n\t\n\t<div class=\"modal-dialog my-dialog\" style=\"margin-top: 121px;\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<button type=\"button\" class=\"bootbox-close-button close\" data-dismiss=\"modal\" aria-hidden=\"true\" style=\"margin-top: -10px;\">×</button>\n\t\t\t\t<div class=\"bootbox-body dialog-body\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button  type=\"button\" class=\"btn btn-primary btn-ok\">OK</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>";

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"styleguide dispacther-widget-header\">\n        <!-- BEGIN LOGO -->\n        <div class=\"page-logo\" style=\"width:500px;height:61px;\">\n            <a href=\"index.html\">\n                 <img\n                 style=\"margin-top: 16px;\" src=\"" + __webpack_require__(168) + "\" width=\"70%\">\n             </a>\n             <span class=\"header-title\">前端流程化测试平台</span>\n\n        </div>\n        <a href=\"javascript:;\" class=\"menu-toggler responsive-toggler\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n            <span></span>\n        </a>\n\n   \n</div>";

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(108);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(108, function() {
			var newContent = __webpack_require__(108);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(109);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(109, function() {
			var newContent = __webpack_require__(109);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(110);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(92)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(110, function() {
			var newContent = __webpack_require__(110);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9f4a04b2811f22460b70da1365a02c30.png";

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "42b05d4024bdacfba14b5fcc83b1db08.png";

/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 166 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aaf228348f35bc2d6c44d6a12bbf80b4.jpg";

/***/ }),
/* 168 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 169 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })
]));
//# sourceMappingURL=bundle.map.js