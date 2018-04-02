/**
 * Created by OO on 2015/8/20.
 */

require.config({
	baseUrl: '/asset/js/',
	paths: {
		'jquery': 'jquery.min',
		'layer': 'layer'
	}
});

require(['jquery', 'layer'], function($, layer) {
	$(function() {
		//返回
		$("#history-back").on("click", function() {
				window.history.back();
		})
		$(".notarize>a").on("click",function(){
			$(".mod,.buy-info").hide();
		})
			//进度条
		var $progressBarWrap = $('.progress-bar-wrap');
		var progressBarWrapData = $progressBarWrap.attr("data-val");
		if($progressBarWrap.length && (progressBarWrapData == "true")) {
			for(var i = 0, len = $progressBarWrap.length; i < len; i++) {
				$progressBarWrap.eq(i).find('.progress').css('left', -(1 - $progressBarWrap.eq(i).find(".progress-state").text().replace(/%/, '') / 100) * $progressBarWrap.eq(i).find('.progress-bar').width());
				$(".progress-state").css('left', $progressBarWrap.eq(i).find('.progress-bar').width() - (1 - $progressBarWrap.eq(i).find(".progress-state").text().replace(/%/, '') / 100) * $progressBarWrap.eq(i).find('.progress-bar').width() - 13);
			}
		} else if($progressBarWrap.length && (progressBarWrapData != "true")) {
			for(var i = 0, len = $progressBarWrap.length; i < len; i++) {
				$progressBarWrap.eq(i).find('.progress').css('left', -(1 - $progressBarWrap.eq(i).next().html().replace(/%/, '') / 100) * $progressBarWrap.eq(i).find('.progress-bar').width());
			}
		}
		//输入验证
		var keyong = parseInt(clear($('.keyong').text())),
			still  = parseInt(clear($('.still').text())),
			shenyu = clear($('.keyong').text()),
			keyong1  = clear($('.still').text()),
			maxNum = (keyong > still) ?still  : keyong,
			investNum = $('.invest-num').val();
		var reg = new RegExp(/\D/);
		var mixNum = 100;
		if($('#invest-data').val() == null) {
			var investNum1 = $('#count').val();
		} else {
			var investNum1 = $('#invest-data').val();
		}
		preInvest(investNum1);
		$('#invest-data').on('blur', function() {
			var amount = $(this).val(),
				amountNum = parseInt(amount);
			if(reg.test(amount)) {
				layer.msg('投资金额仅限整数!');
				$(this).val(100);
			} else {
				if(amountNum < mixNum ) {
					layer.alert('所投金额不得低于100元!',{icon:5});
					$(this).val(mixNum);
				} else if(amountNum > maxNum) {
					layer.alert('所投金额不得高于账户余额或者项目剩余可投余额!',{icon:5});
					$(this).val(mixNum);
				}
			}
			investNum = $(this).val();
			if(!investNum) {
				investNum = 0;
			}
			
			$('.invest-num').val(investNum);
			preInvest(investNum);
		});
		$('#count').on('blur', function() {
			var amount = $(this).val(),
				amountNum = parseInt(amount);
			if(reg.test(amount)) {
				layer.msg('投资金额仅限整数!');
				$(this).val(100);
			} else {
				if(amountNum < mixNum ) {
					layer.alert('所投金额不得低于100元!',{icon:5});
					$(this).val(mixNum);
				} else if(amountNum > maxNum) {
					layer.alert('所投金额不得高于账户余额或者项目剩余可投余额!',{icon:5});
					$(this).val(mixNum);
				}else if(amountNum > 500000){
					layer.alert('所投金额超过投资上限!',{icon:5});
					$(this).val(500000);
				}else{
					if(isNaN(amountNum)){
						$(this).val(100);
					}else{
						$(".invest-data").val(parseInt(amountNum/100)*100);
					}
					
				}
			}
			investNum = $(this).val();
			if(!investNum) {
				investNum = 0;
			}
			
			$('.invest-num').val(investNum);
			preInvest(investNum);
		});
		//展开卡券列表ajax处理
		$('.btns_click').on('click', function() {
			investchange("click");
		});
		$(".fixed-close").on("click", function() {
				$(this).parents(".fixed-frame").hide();
			})
			//国富链提交投资信息ajax处理

		//键盘输入改变卡券ajax处理
		$('#invest-data').on('keyup', function() {
			var amount = $('#invest-data').val(),
				amountNum = parseInt(amount);
			if(reg.test(amount)) {
				layer.msg('投资金额仅限整数!');
				$(this).val(100);
			}
			$('.invest-num').val(amount);
			if(!$(this).parents(".col2-layout").children("div").hasClass("unlogin-unMax")) {
				//				investchange("keyup");
			}
			preInvest(investNum);
		});

		function preInvest(investNum) {
			var ratePercent = parseFloat($("#rate-percent").text()) / 100;
			var monthData = parseFloat($("#month-data").text());
			var preInvest = investNum * ratePercent / 12 * monthData;
			if(investNum >= 100 && investNum <= maxNum) {
				$("#pre-invest").text(preInvest.toFixed(2));
			}
		}

		function returnString(obj) {
			if(obj.find(".redbags-title").text()=="红包"){
				var theHtml = '<i data-type="' + obj.data("type") + '" data-id="' + obj.data("id") + '" class="interest">' +
				obj.find(".redbags-money").text() + '元</i>&nbsp;&nbsp;&nbsp;' +
				'<i>' + obj.find(".redbags-title").text() + '</i>' + '</div>';
			}else{
				var theHtml = '<i data-type="' + obj.data("type") + '" data-id="' + obj.data("id") + '" class="interest">' +
				obj.find(".redbags-money").text() + '</i>&nbsp;&nbsp;&nbsp;' +
				'<i>' + obj.find(".redbags-title").text() + '</i>' +'</div>';
			}
			return theHtml;
		}

		function clear(str) {
			str = str.replace(/,/g, ""); //取消字符串中出现的所有逗号  
			return str;
		}

		function investchange(dealType) {

			var path = $('.btns_click').data("path");
			var urls = "/invest/" + path;
			var datas = {};
			var isAuthen = $("#isAuthen").val();
			var isBank = $("#isBank").val();
			if(isAuthen == "false") {
				layer.alert("请实名认证后再投标", {
					icon: 5
				}, function() {
					window.location.href = "/user-setting.html";
				});
				return false;
			}
			if(isBank == "false") {
				layer.alert("请绑定银行卡后再投标", {
					icon: 5
				}, function() {
					window.location.href = "/user-setting.html";
				});
				return false;
			}
			if($('#invest-data').val() == null) {
				var investNum = $('#count').val();
			} else {
				var investNum = $('#invest-data').val();
			}

			$point = $('.btns_click');
			datas.investNum = investNum;
			if(path == 'getrewards') {
				//散标
				var bidtype = $('.btns_click').data("bidtype");
				var month = $('.btns_click').data("month");
				if(month == 0) {
					return false;
				}
				datas.bidtype = bidtype;
				datas.month = month;
			}
			if(investNum <= 0) {
				if(dealType == "click") {
					layer.alert("请先输入投资金额");
				}
				return false;
			}
			if($("#isLogin").val() === "false") {
				$(".login-frame").show();
				return false;
			}
			if(investNum >= 100 && investNum <= maxNum) {
//				//redbags1是红包的类，redbags2是加息券的类，redbags3是投资券的类,redbagsed1是过期红包的类，redbagsed2是过期加息券的类，redbagsed3是过期投资券的类
//				//红包
//				var $res1 = '<li class = "redbags redbags1 " data-id="59656" data-type="packet">' +
//					'<div class = "redbags-title">红包</div>' +
//					'<div class = "redbags-money"> <span>100</span></div>' +
//					'<div class = "redbags-ed">11天过期</div>' +
//					'<div class = "redbags-date">使用期限<br/><span>2017-07-10 10:00:12</span></div>' +
//					'<div class = "redbags-if">立即使用</div>' +
//					'</li>' +
//					'<li class = "redbags redbagsed1" data-id="59656" data-type="packet">' +
//					'<div class = "redbags-title">红包</div>' +
//					'<div class = "redbags-money"> <span>100</span></div>' +
//					'<div class = "redbags-ed">11天过期</div>' +
//					'<div class = "redbags-date">使用期限<br/><span>2017-07-01~2017-07-05</span></div>' +
//					'<div class = "redbags-if">已过期</div>' +
//					'</li>';
//				//加息券
//				var $res2 = '<li class = "redbags redbags2 " data-id="59656" data-type="packet">' +
//					'<div class = "redbags-title">加息券</div>' +
//					'<div class = "redbags-money"> <span>1.00%</span></div>' +
//					'<div class = "redbags-ed">11天过期</div>' +
//					'<div class = "redbags-date">使用期限<br/><span>2017-07-10 10:00:12</span></div>' +
//					'<div class = "redbags-if">立即使用</div>' +
//					'</li>' +
//					'<li class = "redbags redbagsed2" data-id="59656" data-type="packet">' +
//					'<div class = "redbags-title">加息券</div>' +
//					'<div class = "redbags-money"><span>1.00%</span></div>' +
//					'<div class = "redbags-ed">11天过期</div>' +
//					'<div class = "redbags-date">使用期限<br/><span>2017-07-01~2017-07-05</span></div>' +
//					'<div class = "redbags-if">已过期</div>' +
//					'</li>';
//				//投资券
//				var $res3 = '<li class = "redbags redbags3 " data-id="59656" data-type="packet">' +
//					'<div class = "redbags-title">投资券</div>' +
//					'<div class = "redbags-money"><span>¥100</span></div>' +
//					'<div class = "redbags-ed">11天过期</div>' +
//					'<div class = "redbags-date">使用期限<br/><span>2017-07-10 10:00:12</span></div>' +
//					'<div class = "redbags-if">立即使用</div>' +
//					'</li>' +
//					'<li class = "redbags redbagsed3" data-id="59656" data-type="packet">' +
//					'<div class = "redbags-title">投资券</div>' +
//					'<div class = "redbags-money">  <span>¥100</span></div>' +
//					'<div class = "redbags-ed">11天过期</div>' +
//					'<div class = "redbags-date">使用期限<br/><span>2017-07-01~2017-07-05</span></div>' +
//					'<div class = "redbags-if">已过期</div>' +
//					'</li>';
//				var $res = $res1 + $res2 + $res3;
//				if(($res == '' || $res == null) && dealType == "click") {
//					layer.alert("该产品您暂无可使用卡券");
//				} else {
//					$this = $('.selectfixed-fixed');
//					$('.selectfixed-fixed').html($res);
//					if(dealType == "click") {
//						$('.selectfixed-frame').show();
//						$this.find('.redbags').on('click', function() {
//							var thisHTML = returnString($(this));
//							$('.selectfixed-frame').hide();
//							$('.show_selected').html("已选择:" + thisHTML + "<a class='clear'></a>");
//							$('.clear').unbind().click(function() {
//								$(this).parent('.show_selected').html('');
//							})
//						});
//					} else {
//						var thisHTML = returnString($('.selectfixed-fixed').find('.redbags').eq(0));
//						if($('.selectfixed-fixed').find('.redbags').length == 0) {
//							$('.show_selected').html("");
//						} else {
//							$('.show_selected').html("已选择:" + thisHTML + "<a class='clear'></a>");
//						}
//						$('.clear').unbind().click(function() {
//							$(this).parent('.show_selected').html('');
//						})
//					}
//				}
				$.ajax({
					type: 'POST',
					url: urls,
					data: datas,
					dataType: 'json',
					success: function($res) {
						if(($res == '' || $res == null) && dealType == "click") {
							layer.alert("该产品您暂无可使用卡券");
						} else {
							$this = $('.selectfixed-fixed');
							$('.selectfixed-fixed').html($res);
							if(dealType == "click") {
								$('.selectfixed-frame').show();
								$this.find('.redbags').on('click', function() {
									var thisHTML = returnString($(this));
									$('.selectfixed-frame').hide();
									$('.show_selected').html("已选择:" + thisHTML + "<a class='clear'></a>");
									$('.clear').unbind().click(function() {
										$(this).parent('.show_selected').html('');
									})
								});
							} else {
								var thisHTML = returnString($('.selectfixed-fixed').find('.redbags').eq(0));
								if($('.selectfixed-fixed').find('.redbags').length == 0) {
									$('.show_selected').html("");
								} else {
									$('.show_selected').html("已选择:" + thisHTML + "<a class='clear'></a>");
								}
								$('.clear').unbind().click(function() {
									$(this).parent('.show_selected').html('');
								})
							}
						}
					},
					error: function() {}
				});
			} else {
				return false;
			}

		}
		//全投
		$(".simple-all").on("click", function() {
			var selfmoney = clear($(".still").text());
			var caninvest = clear($(".keyong").text());
			var investMoney = 0;
			if(parseInt(caninvest) > parseInt(selfmoney)) {
				investMoney = selfmoney;
			} else {
				investMoney = caninvest;
			}
			$(".invest-data").val(parseInt(investMoney))
			preInvest(investMoney);
		});
		//tab功能
		$(".section3-list>li>a").on("click", function() {
				$(".section3-list>li>a").removeClass("section3-current");
				$(this).addClass("section3-current");
				$(".section3-content").hide();
				$(".section3-content").eq($(this).parents("li").index()).show();
			})
			//尊享计划份数
		$('.add-btn').click(function() {
			var count = parseInt($("#count").val());
			console.log(count);
			$('.minus-btn').removeClass("minus-end");
			if(count < 500 || $("#count").val() == "") {
				$("#count").val(500);
			} else {
				var result = parseInt($("#count").val()) + 500;
				if(result >= keyong) {
					$("#count").val(keyong);
				} else {
					$("#count").val(parseInt($("#count").val()) + 500);
				}
			}
			//			investchange("keyup");
			preInvest($("#count").val());
		})
		$('.minus-btn').click(function() {
			var count = parseInt($("#count").val());
			if(count < 500) {
				$("#count").val(100);
				$('.minus-btn').addClass("minus-end");
			} else {
				var result = parseInt($("#count").val()) - 500;
				if(result <= 100) {
					$("#count").val(100);
					$('.minus-btn').addClass("minus-end");
				} else {
					$("#count").val(parseInt($("#count").val()) - 500);
				}
			}
			//			investchange("keyup");
			preInvest($("#count").val());
		})
		$('#count').keyup(function() {
			//			investchange("keyup");
			preInvest($(this).val());
		}).on("change", function() {
			if(parseInt($(this).val()) > 100) {
				$('.minus-btn').removeClass("minus-end");
			} else {
				$('.minus-btn').addClass("minus-end");
			}
		});
		$(".login-input").on("focus", function() {
			$(".login-input").parents(".login-input-frame").removeClass("frame-current");
			$(this).parents(".login-input-frame").addClass("frame-current");
		})

		function layerTip(txt, id, dir) {
			layer.tips(txt, id, {
				tips: [dir || 2, '#FF9900'],
				time: 4000
			})
		}
		$("#loginBtn").on("click", function() {
			$(".login-frame").show();
		})

		$('.lookxieyi').click(function() {
			$url = $(this).attr('data');
			layer.open({
				type: 2,
				shadeClose: true,
				title: false,
				closeBtn: [0, false],
				shade: [0.8, '#000'],
				border: [0],
				offset: ['20px', ''],
				area: ['900px', ($(window).height() - 50) + 'px'],
				content: ['/public/zunxiang.htm']
			});
		});
		$('#signIn_btn').on('click', function(e) {
				e.preventDefault();
				if($('#signIn_id').val() == "") {
					layerTip('请输入用户名/手机号码', '#signIn_id');
					return false;
				}
				if($('#signIn_psw').val() == "") {
					layerTip('请输入用户密码', '#signIn_psw');
					return false;
				}
				if($('#signIn_id').val()) {
					$.ajax({
						url: '/v5d/account/loginAjax',
						type: 'post',
						dataType: 'json',
						data: {
							word: $('#signIn_id').val(),
							password: $('#signIn_psw').val(),
							formRandId: $('#formrandid').val(),
							id: $("#jkid").val(),
							type: $("#type").val()
							
						},
						//2018/8/16头
						beforeSend:function(){
							var index = layer.load(1, {
							  shade: [0.1,'#fff'] //0.1透明度的白色背景
							});
						},
						//2018/8/16尾
						success: function(res) {
							//2018/8/16头
							layer.closeAll('loading');
							//2018/8/16尾
							if(res.status == 'success' && res.code == 0) {
								location.href = res.url
							} else if(res.status == 'bad') {
								if(res.code == 500) {
									layerTip('用户名或手机号不存在', '#signIn_id');
									$('#psw').css('backgroundColor', '#FF6966');
								} else if(res.code == 501) {
									layerTip('密码错误', '#signIn_psw');
									$('#psw').css('backgroundColor', '#FF6966');
								} else if(res.code == 502) {
									layer.alert('请输入完整的登录信息');
								}
							}
						}
					})
				}
			})
				//尊享计划总提交
		$('#planinvest').click(function() {
			var val = $('#count').val();
			var planid = $('#planid').val();
			var rewardsid = $('.show_selected .interest').data('id');
			var rewardstype = $('.show_selected .interest').data('type');
			var isAuthen = $("#isAuthen").val();
			var isBank = $("#isBank").val();
			var isLogin = $("#isLogin").val();
			var formrandid = $('#formrandid').val();
			var amountNum = parseInt(val);
			if(isLogin == "false") {
				$(".login-frame").show();
				return false;
			}
			if(isAuthen == "false") {
				layer.alert("请实名认证后再投标", {
					icon: 5
				}, function() {
					window.location.href = "/user-setting.html";
				});
				return false;
			}
			if(isBank == "false") {
				layer.alert("请绑定银行卡后再投标", {
					icon: 5
				}, function() {
					window.location.href = "/user-setting.html";
				});
				return false;
			}
			if(val.length <= 0) {
				layer.alert("请输入投资金额");
				return false;
			}
			if(amountNum > maxNum) {
				
				if(maxNum<100){
					layer.alert('您的账户余额不足!',{icon:5});
					
				}else{
					layer.alert('所投金额不得高于账户余额或者项目剩余可投余额!',{icon:5});
					$("#count").val(maxNum);
				}
				return false;
			}
		
		
			if(val.length>0){
				$(".cha").click(function(){
					$(".deal_password").css("display","none").prev().css("display","none");
				});
				$(".deal_password").css("display","block").prev().css("display","block");
				var money=parseInt(val).toFixed(2);
				$(".apply").text(money);
				$(".reality").text(money);
				var text=$("#rate-percent").text();
				$(".earnings").text(text+"%");
				$(".affirm a").click(function(){					
					var deal_pwd=$("#deal_pin").val(),
					ase = $(this).attr('data-ase');
					thiss = $(this);
						data={};
					data.pwd=deal_pwd;
					data.money=val;
					data.planid=planid;
					data.formrandid=formrandid;
					data.rewardsid=rewardsid;
					data.rewardstype=rewardstype;
					if(deal_pwd != "" &&  ase== 1){
						$.ajax({
							type:"POST",
							url:"/invest/planinvest",
							data:data,
							dataType: 'json',
							//2018/8/16头
							beforeSend:function(){
								var index = layer.load(1, {
								  shade: [0.1,'#fff'] //0.1透明度的白色背景
								});
								flg = false;
							},
							//2018/8/16尾
							success:function(res){
							   //2018/8/16头
							   layer.closeAll('loading');
								//2018/8/16尾
							   if(res.result == 'win'){//交易密码正确
									thiss.data("ase", 2);
									$(".deal_password").css("display","none").prev().css("display","none");
									layer.alert(res.info, {
										icon: 6
									}, function(index) {										
										window.location.reload();
									});
								} else if(res.status==2){//交易密码错误弹窗提示
									layer.alert(res.msg,{icon:5});
									layer.close();
								}else{
									layer.alert(res.info, {
										icon: 2
									}, function() {
										window.location.reload();
									});
									return false;
								}
							}
						})
					}else{
						layer.alert("交易密码不能为空！")
					}
				});
			}

		});
		//国富链总提交
		var flg=true;
		$('#invest-operate').click(function() {
			var id   = $('#jkid').val();
			var uid  = $('#uid').val();
			var jkuid  = $('#jkuid').val();
			var tbje = $('#invest-data').val();
			var formrandid  = $('#formrandid').val();
			var rewardstype = $('.show_selected .interest').data('type')
			var rewardsid   = $('.show_selected .interest').data('id')
			var isAuthen    = $("#isAuthen").val();
			var isBank      = $("#isBank").val();
			var isE         = $("#isE").val();
			var is_card     = $("#is_card").val();
			var isLogin     = $("#isLogin").val();
			var jkdeposit   = $("#jkdeposit").val();
			var amountNum   = parseInt(tbje);
			if(isLogin == "false") {
				$(".login-frame").show();
				return false;
			}
			if(isAuthen == "false") {
				layer.alert("请实名认证后再投标", {
					icon: 5
				}, function() {
					window.location.href = "/user-setting.html";
				});
				return false;
			}
			//2017/8/22头
			if(jkdeposit==1){
				if(isE=="false"){
					layer.open({
					  content: "亲爱的富友：为了您的资金安全，投资华兴银行通道标的请开通华兴银行存管账户，建议您使用IE9版本以上的IE浏览器或FireFox火狐浏览器。"
					  ,btn: ['立即开通']
					  ,yes: function(index, layero){
						  $("#account").submit();
					  }
					});
					return false;
				}
				//2017/8/22尾
				if(is_card != '2') {
					layer.open({
						content: "亲爱的富友：为了您的资金使用便捷，请绑定银行卡，建议您使用IE9版本以上的IE浏览器、360浏览器或FireFox火狐浏览器。",
						btn: ['立即绑卡'],
						yes: function(index, layero) {
							$("#hxbank").submit();		
						}
					});
					//2017/9/13
					return false;
				}
			}else{
				//2017/8/22尾
				if(isBank == "false") {
					layer.alert("请绑定银行卡后再投标", {
						icon: 5
					}, function() {
						window.location.href = "/user-setting.html";
					});
					return false;
				}
			}
			
			if(tbje.length <= 0) {
				layer.msg("请输入投资金额");
				return false;
			}			
			if(amountNum < mixNum) {
				layer.alert('所投金额不得低于100元!',{icon:5});
				$("#invest-data").val(mixNum);
				return false;
			} else if(amountNum > maxNum) {
				if(maxNum<100){
					layer.alert('您的账户余额不足!',{icon:5});
					
				}else{
					layer.alert('所投金额不得高于账户余额或者项目剩余可投余额!',{icon:5});
					$("#invest-data").val(maxNum);
				}
				return false;
			}
			//2017/9/13头
			var money=parseInt(tbje).toFixed(2);
			var text=$("#rate-percent").text();
			var name=$(".section1-title").text();
			$(".cha,.close").click(function(){
				$(".deal_password").css("display","none");
				$(".buy-info").css("display","none");
				$(".mod").css("display","none");
			});
			if(jkdeposit==1){
				$(".hx-id").text(name);
				$(".hx-money").text(money);
				$(".yield").text(text+"%");
				$(".buy-info").css("display","block").siblings(".mod").css("display","block");
				$(".notarize a").click(function(){
					if(uid == jkuid) {
						layer.msg("您是该项目的借款人不能投资哦");
						return false;
					}
					if(flg) {
						$("#tbje").val(tbje);
						 $("#sumb").submit();
					}else{
						layer.alert("请勿重复提交")
					}
				})
			}else{
				$(".apply").text(money);
				$(".reality").text(money);
				$(".earnings").text(text+"%");
				$(".deal_password").css("display","block").siblings(".mod").css("display","block");
				$(".affirm a").click(function(){
					var deal_pwd = $("#deal_pin").val()
					data={};
					data.pwd         = deal_pwd;
					data.id          = id;
					data.uid         = uid;
					data.tbje        = tbje;
					data.formrandid  = formrandid;
					data.rewardsid   = rewardsid;
					data.rewardstype = rewardstype;
					if(deal_pwd == "" ){
						layer.alert("交易密码不能为空！");
						return false;
					}
					if(flg){
						$.ajax({
							type:"POST",
							url:'/operate/investAjax',
							data:data,
							dataType: 'json',
							//2018/8/16头
							beforeSend:function(){
							  var index = layer.load(1, {
							  shade: [0.1,'#fff'] //0.1透明度的白色背景
							});
								flg = false;
							},
							//2018/8/16尾
							success:function(res){
							//2018/8/16头
							layer.closeAll('loading');
							//2018/8/16尾
								if(res.status==1){//交易成功
									$(".deal_password").css("display","none").prev().css("display","none");
									layer.alert(res.msg, {
										//skin: 'layui-layer-molv' //样式类名
										icon: 6
									}, function() {
										window.location.reload();
									});
								} else if(res.status==2){//交易失败
									layer.alert(res.msg,{icon:5});
									layer.close();
								}else{
									layer.alert(res.msg, {
										//skin: 'layui-layer-molv' //样式类名
										icon: 2
									}, function() {
										window.location.reload();
									});
									return false;
								}
							}
						})
					}else{
						layer.alert("请勿重复提交")
					}
				});
			}
			//2017/9/13尾
		});
	});
});