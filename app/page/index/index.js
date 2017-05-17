/* jshint devel:true */

require('./index.less');
var template = require('html-loader!./index.html');

//widget 
var header = require('Widget/header/header') ;
var cookie = require('Widget/cookie/cookie');

//page 
var mytask = require('Page/mytask/mytask') ;

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
