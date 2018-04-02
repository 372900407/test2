/**
 * Created by OO on 2015/7/24.
 */

(function() {
	var str = '<header id="header">'+
			'<div class="header-top">'+
				'<div class="layout clear-fix" >'+
					'<p class="hot-line" style = "display:table;margin:0 auto;float:none;">为了保护您的账户安全，建议您升级到最新版本浏览器，或者使用Chrome等其他浏览器</p>'+
				'</div>'+
			'</div>'+
		'</header>'
	if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0") {
		$("body").html(str);
	} else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0") {
		$("body").html(str);
	} else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
		$("body").html(str);
	} else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0") {
	} 
	$('.icon-sns.qq').hover(function() {
		$(this).find(".social-content").show();
	}, function() {
		$(this).find(".social-content").hide();
	});
	$('.icon-sns.weixin').hover(function() {
		$(this).find(".social-content").show();
	}, function() {
		$(this).find(".social-content").hide();
	});
	$("#name-list").mouseover(function() {
		$(this).next(".name-list").slideDown();
	});
	$("#list").mouseleave(function() {
		$(this).find(".name-list").hide();
	});
	$(".zhiding").on("click", function() {
		$("body,html").animate({
			scrollTop: 0
		}, 300);
	})
	$(window).scroll(function() {
		if($(document).scrollTop() == 0) {
			$(".zhiding").hide();
		} else {
			$(".zhiding").show();
		}
	})
	if(document.documentElement.clientHeight > document.body.clientHeight) {
		$('#footer').addClass('attachB')
	}

	$('#tool_top').on('click', function() {
			$('html, body').animate({
				scrollTop: '0px'
			}, 600)
		})
		//判断是否绑定手机，实名，绑定银行卡
	var isPerson = $("#isPerson").val();
	if(isPerson == "true") {
		var isPhone = $("#isPhone").val();
		var isAuthen = $("#isAuthen").val();
		var isBank = $("#isBank").val();
		if(isPhone == "true") {
			$(".nav-status1").css("background-position-y", "top");
		} else {
			$(".nav-status1").css("background-position-y", "bottom");
		}
		if(isAuthen == "true") {
			$(".nav-status2").css("background-position-y", "top");
		} else {
			$(".nav-status2").css("background-position-y", "bottom");
		}
		if(isBank == "true") {
			$(".nav-status3").css("background-position-y", "top");
		} else {
			$(".nav-status3").css("background-position-y", "bottom");
		}
		$(".nav-lists>li").on("click", function() {
			$(".nav-lists>li").removeClass("current");
			$(this).addClass("current");
		})
	}

}());