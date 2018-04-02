/**
 * Created by OO on 2015/8/20.
 */

require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'jquery.min',
		'layer': 'layer',
//		'pjax': 'vendor/jquery.pjax-1.8.2.min'
	}
});

require(['jquery', 'layer'], function($, layer) {
	$(function() {
//		$(".pagination2-down a").on("click", function() {
//			$.pjax({
//				selector: 'a',
//				container: '.coupon-content2', //内容替换的容器
//				show: 'fade', //展现的动画，支持默认和fade, 可以自定义动画方式，这里为自定义的function即可。
//				cache: false, //是否使用缓存
//				storage: true, //是否使用本地存储
//				titleSuffix: '', //标题后缀
//				filter: function() {},
//				callback: function() {}
//			})
//		})
		
		
		$("#rule-href1").on("click", function() {
			layer.open({
				type: 1,
				title: "投资券使用规则",
				skin: 'layui-layer-rim', //加上边框
				area: ['760px', '400px'], //宽高
				content: '1、投资券只适用于投资国富通散标项目。<br/><br/>' +
					'2、单笔投资只能使用1张投资券，且投资券总额不能高于（或等于）投资金额。<br/><br/>' +
					'3、请在投资券的使用期限内使用投资券。<br/><br/>' +
					'4、投资券投资回款到账后可提现。<br/><br/>' +
					'5、单笔投资只能使用一张卡券（投资券、红包、加息券三种卡券只能使用一张）。<br/><br/>' +
					'6、目前华兴银行的标的暂不支持使用卡券。<br/><br/>' +
					'7、国富通在法律允许范围内，保留对投资券使用规则的最终解释权。'
			});
		})
		$("#rule-href2").on("click", function() {
			layer.open({
				type: 1,
				title: "红包使用规则",
				skin: 'layui-layer-rim', //加上边框
				area: ['760px', '400px'], //宽高
				content: '1、使用红包需投资大于规定使用条件的投资金额使用。<br/><br/>' +
					'2、用户投资时自行选择可使用的红包，投资后红包金额将返现至可用余额。<br/><br/>' +
					'3、请在红包的使用期限内使用红包。<br/><br/>' +
					'4、红包可用于投资尊享计划系列产品和其他散标产品。<br/><br/>' +
					'5、单笔投资红包不可叠加使用，一次只能使用1个红包。<br/><br/>' +
					'6、单笔投资只能使用一张卡券（投资券、红包、加息券三种卡券只能使用一张）。<br/><br/>' +
					'7、目前华兴银行的标的暂不支持使用卡券。<br/><br/>' +
					'8、国富通在法律允许范围内，保留对红包使用规则的最终解释权。'
			});
		})
		$("#rule-href3").on("click", function() {
			layer.open({
				type: 1,
				title: "加息券使用规则",
				skin: 'layui-layer-rim', //加上边框
				area: ['760px', '400px'], //宽高
				content: '1、单笔投资使用加息券后，系统自动计入相应单笔投资年化收益。<br/><br/>' +
					'2、请在加息券的使用期限内使用加息券。<br/><br/>' +
					'3、加息券不可叠加使用，投资时一次最多使用1张加息券。<br/><br/>' +
					'4、加息券可用于投资尊享计划系列产品和其他散标产品。<br/><br/>' +
					'5、单笔投资只能使用一张卡券（投资券、红包、加息券三种卡券只能使用一张）。<br/><br/>' +
					'6、目前华兴银行的标的暂不支持使用卡券。<br/><br/>' +
					'7、国富通在法律范围内，保留对加息券使用规则的最终解释权。<br/><br/>'
			});
		})
	});
});