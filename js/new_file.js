/**
 * Created by OO on 2015/7/9.
 */

require.config({
	baseUrl: '/asset/baina/js/',
	paths: {
		'jquery': 'vendor/jquery-1.11.3.min',
		'velocity': 'vendor/velocity.min',
		'banner': 'app/module_banner',
		'superSlide': 'app/superSlide',
		'layer': 'app/layer',
		'pickerData': 'app/city-picker.data',
		'picker': 'app/city-picker',
		'main': 'app/main'
	},
	shim: {
		'velocity': {
			deps: ['jquery']
		},
		'superSlide': {
			deps: ['jquery']
		},
		'picker': {
			deps: ['pickerData']
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
	});
});
require(['jquery', 'pickerData', 'picker'], function($, pickerData, picker) {
	$(function() {
//		console.log(CityPicker);
	});
});
require(['jquery', 'velocity', 'banner', 'layer'], function($, Velocity, Banner, layer) {
	require(['common']);
	$(function() {
		//section3单选框效果
		$("#shopName2,#shopName").val(getCookie("shopName2"));
		$("#shopNumber").val(getCookie("shopNumber"));
		$("#shopMoney").val(getCookie("shopMoney"));
		$("#shopLink").val(getCookie("shopLink"));
		$("#investMoney").val(getCookie("investMoney"));
		$(".goodsMan").val(getCookie("goodsMan"));
		$(".goodsAddress").val(getCookie("goodsAddress"));
		$(".title").text(getCookie("goodsAddress"));
		$(".goodsDetailAddress").val(getCookie("goodsDetailAddress"));
		$(".goodsPhone").val(getCookie("goodsPhone"));
		if(getCookie("daiFu")==""){
			$("#daiFu").get(0).checked = true;
		}else{
			$("#daiFu").get(0).checked = getCookie("daiFu");
		}
		investData("keyup");
		if($("#investMoney").val()==0){
			$("#shopInvestResult,#shopInvestResult2").text(0);
		}
		var userListLength = $("#whiteAddress").length;
		if(userListLength < 1) {
			$("#shopSubmit3").text("保存");
			$("#whiteAlert").hide();
		}
		$(".section3-list").children("li").on("click", function() {
				$(".section3-list").children("li").removeClass("section3-li-current");
				$(this).addClass("section3-li-current");
				$(this).parent(".section3-list").attr("data-month", $(this).data("month"));
				$(this).parent(".section3-list").attr("data-invest", $(this).data("invest"));
				investData("keyup");
			})
			//商品数量组件效果
		$(".add-btn").on("click", function() {
			var count = parseInt($("#count").val()) + 1;
			if(count >= 999999) {
				count = 999999;
			}
			$("#count").val(count);
			$(".number-all>span").text(count * 100);
		});
		$(".minus-btn").on("click", function() {
			var count = parseInt($("#count").val()) - 1;
			if(count <= 1) {
				count = 1;
			}
			$("#count").val(count);
			$(".number-all>span").text(count * 100);
		});
		$("#count").on("blur", function() {
			if($("#count").val() == "") {
				$("#count").val(1);
			}
			if($("#count").val() <= 1) {
				$("#count").val(1);
			}
			if($("#count").val() >= 999999) {
				$("#count").val(999999);
			}
		});
		//商品名输入效果
		$("#shopName").on("keyup", function() {
			$("#shopName2").val($("#shopName").val());
			$("#shopNameResult").text($("#shopName2").val());
			$("#shopNameResult2").text($("#shopName2").val());
		})
		$("#shopName2").on("keyup", function() {
				$("#shopName").val($("#shopName2").val());
				$("#shopNameResult").text($("#shopName2").val());
				$("#shopNameResult2").text($("#shopName2").val());
			})
			//投资金额最低限制
		$("#investMoney").on("blur", function() {
			investData("blur");
		})
		$("#shopMoney").on("blur", function() {
			investData("blur");
		})
		$("#shopMoney").on("keyup", function() {
			investData("keyup");
		})
		$("#investMoney").on("keyup", function() {
				investData("keyup");
			})
			//添加收货地址處理
		if($("#whiteAddress").length) {
			$(".white-save").attr("data-status", "edit");
		}

		$(".white-alert").on("click", function() {
			$(".white-fixed1").show();
		})
		$(document).on("click", ".fixed-close", function() {
			fixedClose($(this));
		})
		$(document).on("click", ".white-save", function() {
				var _this = $(this);
				var goodsMan = $(this).siblings(".fixed-goods").find(".goodsMan").val();
				var goodsAddress = $(this).siblings(".fixed-goods").find(".goodsAddress").val();
				var goodsPhone = $(this).siblings(".fixed-goods").find(".goodsPhone").val();
				var goodsDetailAddress = $(this).siblings(".fixed-goods").find(".goodsDetailAddress").val();
				var status = $(this).data("status");
				var data = {};
				var userListLength = $("#whiteAddress").length;
				var bool = verify(goodsMan, goodsDetailAddress, goodsAddress, goodsPhone);
				data.receiver = goodsMan;
				data.address = goodsDetailAddress;
				data.city = goodsAddress;
				data.mobile = goodsPhone;
				var resData = render(goodsMan, goodsDetailAddress, goodsAddress, goodsPhone);
				//li的html渲染模板
				if(bool) {
					if(userListLength < 1) {
						$("#address-table").remove();
						$(".address-list").append(resData);
						$(".white-save").attr("data-status", "edit");
						$("#whiteAlert").show();
						$("#shopSubmit3").text("下一步");
					} else {
						$(".address-li").replaceWith(resData);
					}
					fixedClose(_this);
				}
				if(bool) {
					$.ajax({
						type: 'post',
						url: '/freebuy/addAddress',
						dataType: 'json',
						data: data,
						success: function(d) {
                            if(d.status == 'false') {
                                layer.alert(d.info);
                            } else if(d.status == 'true') {
                                if(status == "add") {
                                    if(userListLength < 1) {
                                        $(".address-list").append(resData);
                                    }
                                } else {
                                    $(".address-li").replaceWith(resData);
                                }
                                fixedClose(_this);
                            }
						}
					});
				}
			})
			//滚动处理
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
		$(".scroll-nav>li>a").on("click", function() {
				var index = $(this).parent("li").index();
				if(index == 0) {
					$("body,html").animate({
						scrollTop: $(".section2").offset().top
					}, 300);
				}
				if(index == 1) {
					$("body,html").animate({
						scrollTop: $(".section3").offset().top
					}, 300);
				}
				if(index == 2) {
					$("body,html").animate({
						scrollTop: $(".section4").offset().top
					}, 300);
				}
				if(index == 3) {
					$("body,html").animate({
						scrollTop: $(".section5").offset().top
					}, 300);
				}
			})
			//置顶处理
		$(".zhiding").click(function() {
			$("body,html").animate({
				scrollTop: '0px'
			}, 300);
		});
		//更多地址
		var dataBool = true;
		$(".address-more").on("click",function(){
			var userListLength = $(".address-ul").children(".address-li1").length;
			if(dataBool){
				$(".address-ul").css("height",86*userListLength+"px");
				$(this).text("收起更多地址");
				dataBool = false;
			}else{
				$(".address-ul").css("height","0px");
				$(this).text("查看更多地址");
				dataBool = true;
			}
		})
		$(".address-ul").children(".address-li1").on("click",function(){
			$(".address-ul").children(".address-li1").removeClass("address-li1-current");
			$(this).addClass("address-li1-current");
			$("#whiteAddress").text($(this).children(".section4-address").text());
			$("#whitePhonere").text($(this).children(".section4-phone").text());
		})
		//section1
		$("#search").on("click", function() {
				if($("#shopName").val() == "") {
					layer.alert("请输入您喜爱的商品");
					return false;
				}
				$("body,html").animate({
					scrollTop: $(".section2").offset().top
				}, 300);
			})
			//section2
		$("#shopSubmit1").on("click", function() {
				var shopName2 = $("#shopName2").val();
				var shopNumber = $("#shopNumber").val();
				var shopMoney = $("#shopMoney").val();
				var shopLink = $("#shopLink").val();
				if(shopName2 == "") {
					layer.alert("请输入您商品名称");
					return false;
				}
				if(shopNumber == "") {
					layer.alert("请输入您商品型号");
					return false;
				}
				if(shopMoney == "") {
					layer.alert("请输入您商品总价");
					return false;
				}
				if(shopLink == "") {
					layer.alert("请输入您商品链接");
					return false;
				}
				$("body,html").animate({
					scrollTop:  $(".section3").offset().top
				}, 300);

			})
			//section3
		$("#shopSubmit2").on("click", function() {
				var shopMonth = $(".section3-list").data("val");
				var investMoney = $("#investMoney").val();
				var scroll2bool = section2Scroll();
				if(scroll2bool) {
					if(investMoney == "") {
						layer.alert("请输入您的投资金额");
						return false;
					}
					$("body,html").animate({
						scrollTop: $(".section4").offset().top
					}, 300);
				}
			})

			//section4
		$("#shopSubmit3").on("click", function() {
				var userListLength = $("#whiteAddress").length;
				var scroll3bool = section3Scroll();
				var scroll2bool = section2Scroll();
				if(scroll2bool && scroll3bool) {
					if(userListLength < 1) {
						var goodsMan = $(".goodsMan").val();
						var goodsAddress = $(".goodsAddress").val();
						var goodsPhone = $(".goodsPhone").val();
						var goodsDetailAddress = $(".goodsDetailAddress").val();
						var data = {};
						var bool = verify(goodsMan, goodsDetailAddress, goodsAddress, goodsPhone);
						data.receiver = goodsMan;
						data.address = goodsDetailAddress;
						data.city = goodsAddress;
						data.mobile = goodsPhone;
						var resData = render(goodsMan, goodsDetailAddress, goodsAddress, goodsPhone);
						//li的html渲染模板
						if(bool) {
							$.ajax({
								type: 'post',
								url: '/freebuy/addAddress',
								dataType: 'json',
								data: data,
								success: function(d) {
									if(d.status == 'false') { //手机号码不存在
                                        layer.alert(d.info);
									} else if(d.status == 'true') { //手机号码存在
										$("#address-table").remove();
										$(".address-list").append(resData);
										$(".white-save").attr("data-status", "edit");
										$("#whiteAlert").show();
										$("#shopSubmit3").text("下一步");
									}
								}
							});
						}
					} else {
						$("body,html").animate({
							scrollTop: $(".section4").offset().top
						}, 300);
					}

				}
			})
			//section5
		$("#shopSubmit4").on("click", function() {
			var scroll4bool = section4Scroll();
			var scroll3bool = section3Scroll();
			var scroll2bool = section2Scroll();
			var data = returnData();
			//			console.log(data);

			if(scroll2bool && scroll3bool && scroll4bool) {
				//				console.log(data)
				$.ajax({
					type: 'post',
					url: '/freebuy/buy',
					dataType: 'json',
					data: data,
					success: function(d) {
						if(d.status == 'true') { //手机号码不存在
                            clearAllCookie();
                            layer.alert('购买成功');
                            window.location.href ="/user-baina.html";
						} else if(d.status == 'false') { //手机号码存在
							if (d.code == '300')
                            {
                                layer.alert('尚未登录');
                                window.location.href ="/login.html?from=baina.html";
                            }
                            else if(d.code =='600')
                            {
                                layer.alert('参数传递错误');
                            }
                            else if(d.code =='801')
                            {
                                layer.alert('余额不足');
                                window.location.href ="/user-recharge.html?from=baina.html";
                            }
						}
					}
				});
			}
		})
	});

    function clearCookie(name) {
        setCookie(name, "", -1);
    }

    function clearAllCookie(){
        clearCookie("shopName2");
        clearCookie("shopNumber");
        clearCookie("shopMoney");
        clearCookie("shopLink");
        clearCookie("shopMonth");
        clearCookie("investMoney");
        clearCookie("goodsMan");
        clearCookie("goodsAddress");
        clearCookie("goodsDetailAddress");
        clearCookie("goodsPhone");
        clearCookie("daiFu");
        clearCookie("shopInvestResult");
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

	function investData(eventType) {
		var shopMoney = $("#shopMoney").val();
		var investMoney = parseInt($("#investMoney").val()) * parseFloat($(".section3-li-current").data("invest")) / 100;
//		if($("#investMoney").val() == "") {
//			$("#investMoney").val(0);
//		}
		if($("#shopMoney").val() == "") {
			$("#shopMoney").val(0)
			shopMoney = 0;
		}
		if(eventType == "blur") {
			if(investMoney < parseFloat(shopMoney)) {
				$("#investMoney").val(parseInt(shopMoney * 100 / $(".section3-li-current").data("invest")));
				investMoney = (shopMoney * 100 )/ parseFloat($(".section3-li-current").data("invest"));
			}
		}
		$("#investMoney").attr("placeholder","目前最低投资金额为："+parseInt(shopMoney * 100 / $(".section3-li-current").data("invest")));
		var resultval = investMoney - parseInt(shopMoney);
		var resultval2 = parseInt($("#investMoney").val());
		if(isNaN(resultval2)){
			resultval2 = 0;
		}
		if(isNaN(resultval)){
			resultval = 0;
		}
		$("#shopZuidi").text(parseInt(shopMoney * 100 / $(".section3-li-current").data("invest")));
		$("#shopInvestResult").text(resultval);
		$("#shopInvestAll").text(resultval2);
		$("#shopInvestResult2").text(resultval);
		$("#shopInvestAll2").text(resultval2);
	}


	function returnData() {
		var data = {};
		var shopName2 = $("#shopName2").val();
		var shopNumber = $("#shopNumber").val();
		var shopcount = $("#count").val();
		var shopMoney = $("#shopMoney").val();
		var shopLink = $("#shopLink").val();
		var shopMonth = $(".section3-list").data("val");
		var investMoney = $("#investMoney").val();
		var goodsMan = $(".goodsMan").val();
		var goodsAddress = $(".goodsAddress").val();
		var goodsDetailAddress = $(".goodsDetailAddress").val();
		var goodsPhone = $(".goodsPhone").val();
		var daiFu = $("#daiFu").get(0).checked;
		var shopInvestResult = $("#shopInvestResult").text();
		data.goodname = shopName2;
		data.goodmodel = shopNumber;
		data.goodnum = shopcount;
		data.total = shopMoney;
		data.goodurl = shopLink;
		data.month = shopMonth;
		data.money = investMoney;
		data.goodsMan = goodsMan;
		data.goodsAddress = goodsAddress;
		data.goodsDetailAddress = goodsDetailAddress;
		data.goodsPhone = goodsPhone;
		data.helpbuy = daiFu;
		data.interest = shopInvestResult;
		setCookie("shopName2", shopName2);
		setCookie("shopNumber", shopNumber);
		setCookie("shopMoney", shopMoney);
		setCookie("shopLink", shopLink);
		setCookie("shopMonth", shopMonth);
		setCookie("investMoney", investMoney);
		setCookie("goodsMan", goodsMan);
		setCookie("goodsAddress", goodsAddress);
		setCookie("goodsDetailAddress", goodsDetailAddress);
		setCookie("goodsPhone", goodsPhone);
		setCookie("daiFu", daiFu);
		setCookie("shopInvestResult", shopInvestResult);
		return data;
	}

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

	function section4Scroll() {
		var userListLength = $("#whiteAddress").length;
		if(userListLength < 1) {
			scrollAlert("请输入您的收货地址", "2500px");
			return false;
		}
		return true;
	}

	function section3Scroll() {
		var investMoney = $("#investMoney").val();
		if(investMoney == "") {
			scrollAlert("请输入您的投资金额", "1800px");
			return false;
		}
		return true;
	}

	function section2Scroll() {
		var shopName2 = $("#shopName2").val();
		var shopNumber = $("#shopNumber").val();
		var shopMoney = $("#shopMoney").val();
		var shopLink = $("#shopLink").val();
		if(shopName2 == "") {
			scrollAlert("请输入您商品名称", "1100px");
			return false;
		}
		if(shopNumber == "") {
			scrollAlert("请输入您商品型号", "1100px");
			return false;
		}
		if(shopMoney == "") {
			scrollAlert("请输入您商品总价", "1100px");
			return false;
		}
		if(shopLink == "") {
			scrollAlert("请输入您商品链接", "1100px");
			return false;
		}
		return true;
	}

	function render(goodsMan, goodsDetailAddress, goodsAddress, goodsPhone) {
		var resData = '<div class = "address-li address-li2"><div class="section4-address" id = "whiteAddress">' +
			goodsAddress + goodsDetailAddress + '（' + goodsMan + ' 收）' +
			'</div>' +
			'<div class="section4-phone" id = "whitePhonere">' + goodsPhone + '</div></div>';
		return resData;
	}

	function fixedClose(obj) {
		if(obj.parents(".fixed-content").hasClass("fixed-content2")) {
			obj.parents(".fixed-content2").hide();
		} else {
			obj.parents(".white-fixed1").hide();
		}
	}

	function scrollAlert(content, scrollpx) {
		layer.open({
			content: content,
			shadeClose: true,
			yes: function(index) {
				$("body,html").animate({
					scrollTop: scrollpx
				}, 300);
				layer.close(index);
			},
			no: function() {}
		});
	}

	function verify(goodsMan, goodsDetailAddress, goodsAddress, goodsPhone) {
		var bool = true;
		if(!goodsDetailAddress.match(/^[\s\S]{5,120}$/)) {
			layer.alert("地址长度为5-120个字符");
			bool = false;
		}
		if(!goodsPhone.match(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/)) {
			layer.alert("手机号码格式错误");
			bool = false;
		}
		if(goodsPhone == "") {
			layer.alert("请填写手机号码");
			bool = false;
		}
		if(goodsDetailAddress == "") {
			layer.alert("请填写详细收货地址");
			bool = false;
		}
		if(goodsAddress == "") {
			layer.alert("请填写收货地址");
			bool = false;
		}
		if(goodsMan == "") {
			layer.alert("请填写收货人");
			bool = false;
		}
		return bool;
	}
});