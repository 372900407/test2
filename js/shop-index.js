/**
 * Created by OO on 2015/7/9.
 */

require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'vendor/jquery-1.11.3.min',
		'superSlide': 'app/superSlide',
	},
	shim: {
		'superSlide': {
			deps: ['jquery']
		},
	}
});

require(['jquery', 'superSlide'], function($, slide) {
	$(function() {
		$("#banner").slide({
			mainCell: ".bd ul",
			effect: "leftLoop",
			interTime: 5000,
			autoPlay: true,
			trigger: "click",
			delayTime: 500,
			vis: "auto"
		});
	});
});
require(['jquery'], function($) {
	require(['common']);
	$(function() {
		$.support.transition = (function() {
			var thisBody = document.body || document.documentElement,
				thisStyle = thisBody.style,
				support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.OTransition !== undefined;
			return support;
		})();
		$(window).scroll(function() {
				if($.support.transition) {
					scroll();
				}
			})
			//导航滚动处理
		$(".zhiding").click(function() {
			$("body,html").animate({
				scrollTop: '0px'
			}, 300);
		});
	});

	function scroll() {
		var scrollTop = jQuery(window).scrollTop();
		var bsHeight = jQuery(window).height();
		var html = ""
		if(scrollTop == 0) {
			$(".zhiding").css("display", "none");
		} else {
			$(".zhiding").css("display", "block");
		}
	}
});