/**
 * Created by OO on 2015/8/20.
 */

require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'jquery.min',
		'layer': 'layer',
		'bootstrap': 'app/bootstrap',
		'daterangepicker': 'vendor/daterangepicker',
		'moment': 'vendor/moment'
	},
	shim: {
		'bootstrap': {
			deps: ['jquery']
		},
		'daterangepicker': {
			deps: ['jquery']
		},
		'moment': {
			deps: ['jquery']
		},
		'daterangepicker': {
			deps: ['moment']
		}
	}
});

require(['jquery', 'layer', 'bootstrap', 'daterangepicker', 'moment'], function($, layer, daterangepicker, moment) {
	$(function() {
		zeroIf();
		var startime = $("#startime").val();
		var endtime = $("#endtime").val();
		$('#reservation').daterangepicker({
			opens: 'left', // 日期选择框的弹出位置
			showDropdowns: true

		}, function(start, end, label) { // 格式化日期显示框
			startime = start.format('YYYY-MM-DD HH:mm:ss');
			endtime = end.format('YYYY-MM-DD HH:mm:ss');
		})
		$("#history-submit").on("click",function(){
			window.location.href = "user-history.html?start="+startime+"&end="+endtime;
		})
		function zeroIf() {
			if($(".message-list>li").length <= 0) {
				$(".coupon-content1").show();
			}
		}
	});
});