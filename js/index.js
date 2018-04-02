/**
 * Created by OO on 2015/7/9.
 */

require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'jquery.min',
		'velocity': 'vendor/velocity.min',
		'banner': 'app/module_banner',
		'superSlide': 'app/superSlide',
		'circliful': 'jquery.circliful.min',
		'layer': 'layer'
	},
	shim: {
		'circliful': {
			deps: ['jquery']
		},
		'velocity': {
			deps: ['jquery']
		},
		'superSlide': {
			deps: ['jquery']
		}
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
		$(".picScroll-left").slide({
			titCell: ".hd ul",
			mainCell: ".bd ul",
			autoPage: true,
			effect: "left",
			autoPlay: false,
			vis: 3,
			trigger: "click"
		});
	});
});
require(['jquery','layer'], function($,layer) {
	$(function() {
		$(".media-left").on("click",function(){
			layer.open({
				type: 1,
				skin: 'layui-layer-rim', //加上边框
				area: ['760px', '400px'], //宽高
				content: $(".media-artcle").html()
			});
		})
		if(getCookie('type') != null) {
			var imgType = getCookie('type');
			var imgSrc = getCookie('imgSrc');
			if(imgType == 1) {
				//中间弹窗
				layerSetCookie(imgType, imgSrc);
				layerOne(imgSrc);
			} else if(imgType == 2) {
				//头部弹窗
				layerSetCookie(imgType, imgSrc);
				layerTwo(imgSrc);
			} else if(imgType == 3) {
				//底部弹窗
				layerSetCookie(imgType, imgSrc);
				layerThree(imgSrc);
			}
		} else {
			$.ajax({
				type: 'post',
				url: 'img/url',
				dataType: 'json',
				data: '',
				before: function(d) {
					$("#loading1").show();
				},
				success: function(d) {
					console.log(d.type);
					if(d.type == "1") {
						//中间弹窗
						layerSetCookie(d.type, d.imgSrc);
						layerOne(d.imgSrc);

					} else if(d.type == "2") {
						//头部弹窗
						layerSetCookie(d.type, d.imgSrc);
						layerTwo(d.imgSrc);
					} else if(d.type == "3") {
						//底部弹窗
						layerSetCookie(d.type, d.imgSrc);
						layerThree(d.imgSrc);
					}
					if(d.type == null) {
						layerSetCookie(null, null);
					}
				}
			});
		}

		$(document).on("click", ".fixed-close", function() {
			$(this).parents(".fix-frame").hide();
		})
		$(document).on("click", ".fixed-close1", function() {
			$(this).parents(".bottom-banner").hide();
		})
		$(document).on("click", ".top-close", function() {
			$(this).parents(".top-banner").hide();
		})
		$(window).resize(function() {
			var fixFrame = parseInt($(".fix-frame").outerHeight());
			var fixContent = parseInt($(".fix-content").outerHeight());
			var marginTop = (fixFrame - fixContent) / 2;
			$(".fix-content").css("margin-top", marginTop);
		});
		function layerOne(imgSrc) {
			$("#topImg2").attr("src", imgSrc);
			$(".fix-frame").show();
			var img = new Image();
			img.src = imgSrc;
			var w = img.width;
			$(".fix-content").css("width", w);
			var fixFrame = parseInt($(".fix-frame").outerHeight());
			var fixContent = parseInt($(".fix-content").outerHeight());
			var marginTop = (fixFrame - fixContent) / 2;
			$(".fix-content").css("margin-top", marginTop);
			setTimeout(function() {
				$(".fix-frame").hide();
			}, 5000);
		}

		function layerTwo(imgSrc) {
			var str = '<div class = "top-banner">' +
				'<a href = "javascript:void(0)" class = "top-close"></a>' +
				'<img src="' + imgSrc + '"/>' +
				'</div>';
			$("#header").prepend(str);
			setTimeout(function() {
				$(".top-banner").hide();
			}, 5000);
		}

		function layerThree(imgSrc) {
			$("#topImg3").attr("src", imgSrc);
			$(".bottom-banner").show();
			setTimeout(function() {
				$(".bottom-banner").hide();
			}, 5000);
		}

		function layerSetCookie(type, imgSrc) {
			setCookie("type", type);
			setCookie("imgSrc", imgSrc);
		}

		function setCookie(name, value) {
			var Days = 30;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

		}

		function getCookie(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if(arr = document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		}
	});
});
require(['jquery', 'velocity', 'banner', 'circliful'], function($, Velocity, Banner, circliful) {
	require(['common']);
	$('.canvas1').circliful();
	// news 新闻滚动
	(function() {
		$(".caidan4").click(function() {
			$("body,html").animate({
				scrollTop: '0px'
			}, 300);
		});
		var timer = setInterval(up, 5000),
			$scrollEle = $('#scroll_ele');

		$scrollEle.css('marginTop', 0).find('li:last').insertBefore($scrollEle.find('li:first'));

		$('#up_btn').on('click', function() {
			clearInterval(timer);
			up();
			setTimeout(function() {
				timer = setInterval(up, 5000);
			}, 0);
		});
		$('#down_btn').on('click', function() {
			clearInterval(timer);
			down();
			setTimeout(function() {
				timer = setInterval(up, 5000);
			}, 0);
		});

		$('.fixed-img-next').on('click', function() {
			//$('div #fixed-times :last-child').css('display','block');
			$currentRow = Number($("#deposit_row").val());
			$depositTotal = Math.ceil(Number($("#deposit_total").val() / 3) + Number($("#deposit_total").val() % 3 / 10)) - 1;
			if($currentRow >= $depositTotal) {
				return false;
			}
			for(i = 1; i <= 3; i++) {
				curRow = Number($currentRow * 3) + Number(i);
				$("#fixed-time-" + curRow).addClass("fixed-hidden");
			}
			for(j = 1; j <= 3; j++) {
				nextRow = Number($currentRow + 1) * 3 + Number(j);
				$("#fixed-time-" + nextRow).removeClass("fixed-hidden");
			}
			$("#deposit_row").val($currentRow + 1);
		});

		$('.fixed-img-pre').on('click', function() {
			$currentRow = Number($("#deposit_row").val());
			if($currentRow == 0) {
				return false;
			}
			for(i = 1; i <= 3; i++) {
				curRow = Number($currentRow * 3) + Number(i);
				$("#fixed-time-" + curRow).addClass("fixed-hidden");
			}
			for(j = 1; j <= 3; j++) {
				preRow = Number($currentRow - 1) * 3 + Number(j);
				$("#fixed-time-" + preRow).removeClass("fixed-hidden");
			}
			$("#deposit_row").val($currentRow - 1);
		});

		//点击活期认购
		$('.subscribe').on('click', function() {
			var rgje = $('#subscribeAmt').val();
			location.href = "/demand.html?rgje=" + rgje;
		});

		function up() {
			clearInterval(timer);
			$scrollEle.velocity({
				marginTop: -100
			}, {
				duration: 400,
				complete: function() {
					$(this).css('marginTop', 0).find('li:first').appendTo(this);
					timer = setInterval(up, 5000);
				}
			})
		}

		function down() {
			$scrollEle.velocity({
				marginTop: 0
			}, {
				duration: 400,
				complete: function() {
					$(this).css('marginTop', 0).find('li:last').insertBefore($(this).find('li:first'))
				}
			})
		}

	}());

});