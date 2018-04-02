/**
 * Created by OO on 2015/8/20.
 */

require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'jquery.min',
		'echarts': 'vendor/echarts/echarts-all-3',
		'ecStat': 'vendor/echarts-stat/ecStat.min',
		'dataTool': 'vendor/echarts/extension/dataTool.min',
		'layer': 'layer'
	}
});

require(['jquery', 'echarts', 'ecStat', 'dataTool', 'layer'], function($, echarts, ecStat, dataTool, layer) {
	$(function() {
		var dom = document.getElementById("container");
		var myChart = echarts.init(dom);
		var echart1 = $("#echart1").val();
		var echart2 = $("#echart2").val();
		var echart3 = $("#echart3").val();
		var echart4 = $("#echart4").val();
		$("#data1").text(echart1);
		$("#data2").text(echart2);
		$("#data3").text(echart3);
		$("#data4").text(echart4);
		var app = {};
		option = null;
		app.title = '环形图';

		option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				x: 'left'
			},
			series: [{
				name: '访问来源',
				type: 'pie',
				radius: ['50%', '70%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '30',
							fontWeight: 'bold'
						}
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
					value: echart1,
					name: '可用余额'
				}, {
					value: echart2,
					name: '尊享计划'
				}, {
					value: echart3,
					name: '项目直投'
				}, {
					value: echart4,
					name: '冻结金额'
				}]
			}]
		};
		if(option && typeof option === "object") {
			myChart.setOption(option, true);
		}
		$(".href-btn,.href-history,.href-auto").on("click", function() {
			var title = $(this).text();
			var banktype = $("#banktype").val();
			var pwdtype = $("#pwdtype").val();
			var huaxin = $("#huaxin").val();
			var type = $("#type").val();
			$(".fixed-frame").find(".fixed-title").html(title + '<a class="fixed-close" href="javascript:void(0)"></a>');
			if(huaxin == null) {

			} else {
				if(huaxin == "2") {
					$(".fixed-frame4").show();
					return false;
				}
			}
			if(banktype == "2") {
				$(".fixed-frame3").show();
				return false;
			}
			if(pwdtype == null) {

			} else {
				if(pwdtype == "2") {
					$(".fixed-frame5").show();
					return false;
				}
			}
			if($(this).hasClass("recharge")) {
				$(".fixed-frame1").show();
				return false;
			}
			if($(this).hasClass("withdrawal")) {
				$(".fixed-frame2").show();
				return false;
			}
			if($(this).hasClass("theHuaxin")) {
				window.location.href = "https://www.ghbibank.com.cn/eAccountF/";
				return false;
			}
			if($(this).hasClass("href-history")) {
				window.location.href = "user-history.html?type=" + type;
				return false;
			}
			if($(this).hasClass("href-auto")) {
				window.location.href = "user-auto.html";
				return false;
			}
		})
		$(document).on("click", ".fixed-close", function() {
			$(this).parents(".fixed-frame").hide();
		})
		$(".the-way").on("click", function() {
				$(this).parent("td").children(".the-way").removeClass("way-current");
				$(this).addClass("way-current");
				var rechargeWay = $(this).attr("data-way");
				$(this).parent("td").attr("data-way", rechargeWay);
			})
			//		$("#recharge-btn").on("click", function() {
			//			var rechargeTable = $(this).parents("table");
			//			var rechargeNum = $("#recharge-num").val();
			//			var rechargeWay = rechargeTable.find(".way-radio").attr("data-way");
			//			var rechargeCount = parseInt(rechargeTable.find(".fixed-count").text());
			//			var data = {};
			//			if(rechargeNum == "") {
			//				layer.alert("请填写充值金额");
			//				return false;
			//			}
			//			data.rechargeNum = rechargeNum;
			//			data.rechargeWay = rechargeWay;
			//			data.rechargeCount = rechargeCount;
			//			$.ajax({
			//				type: 'POST',
			//				url: 'urls',
			//				data: data,
			//				dataType: 'json',
			//				success: function($res) {
			//					if($res.status == "success") {
			//						location.reload();
			//					}
			//				},
			//				error: function() {}
			//			});
			//		})
		$("#withdrawal-btn").on("click", function() {
				var withdrawalTable = $(this).parents("table");
				var withdrawalNum = $("#wd_amount").val();
//				var withdrawalWay = withdrawalTable.find(".way-radio").attr("data-way");
				var withdrawalCount = parseInt(withdrawalTable.find(".fixed-count").text());
				var data = {};
				if(withdrawalNum == "") {
					layer.alert("请填写充值金额");
					return false;
				}
				if(withdrawalNum > withdrawalCount) {
					layer.alert("提现金额超过当前余额");
					return false;
				}
				data.withdrawalNum = withdrawalNum;
//				data.withdrawalWay = withdrawalWay;
				data.withdrawalCount = withdrawalCount;
				$.ajax({
					type: 'POST',
					url: 'urls',
					data: data,
					dataType: 'json',
					success: function($res) {
						if($res.status == "success") {
							location.reload();
						}
					},
					error: function() {}
				});
			})
			
		$("#btn_ljcz").bind("click", function() {
			layer.alert('请您在新打开的网上银行页面上完成付款。<br/>付款完成前请不要关闭此窗口。<br/>完成付款后请根据您的情况点击下面的按钮：<br/>', {
				skin: 'layui-layer-molv' //样式类名
			}, function() {
				window.location.href = "/gftv3/myaccount.html";
			});
			return false;
		});
		//宝付
		$('#baopay').click(function() {
			var czje = $('#recharge-num').val();

			if(czje > 0) {
				$.ajax({
					url: '/baopay/pay/' + czje,
					type: 'get',
					dataType: 'html',
					success: function(d) {

						$('#ljzf').html(d);

					}
				});
				$("#alternatecolor").css("display", "none");
				$("#ljzf").css("display", "inline");
			} else {

				layer.alert('请先设置要充值的金额', {
					skin: 'layui-layer-molv' //样式类名
				}, function(index) {
					layer.close(index);
				});

			}

		});
		//国付宝支付被点击
		$('#ipay').click(function() {
			var czje = $('#recharge-num').val();
			if(czje > 0) {
				$.ajax({
					url: '/gfbpay/pay/' + czje,
					type: 'post',
					dataType: 'json',
					success: function(d) {
						if(d.status) {
							$('#ljzf').html(d.info);
						} else {
							layer.open({
								content: d.info,
								btn: ['确定'],
								yes: function() {
									window.location = "/login.html";
								}
							});
						}
					}
				});
				$("#alternatecolor").css("display", "none");
				$("#ljzf").css("display", "inline");
			} else {

				layer.alert('请先设置要充值的金额', {
					skin: 'layui-layer-molv' //样式类名
				}, function(index) {
					layer.close(index);
				});

			}

		});
	});
});