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

require(['jquery', 'layer', 'bootstrap', 'daterangepicker', 'moment'], function($, layer,daterangepicker, moment) {
	var getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	$(function() {
		//2016.11.14
		zeroIf();
		var startime = $("#startime").val();
		var endtime = $("#endtime").val();
		var stat = parseInt(getUrlParam("stat"));
		switch(stat) {
			case 0:
				$(".status-list>li").eq(1).addClass("current");
				break;
			case 1:
				$(".status-list>li").eq(2).addClass("current");
				break;
			case 3:
				$(".status-list>li").eq(0).addClass("current");
				break;
			default:
				$(".status-list>li").eq(0).addClass("current");
				break;
		}
		var dateArray1 = startime.split('-');
		var year = parseInt(dateArray1[0])-5;
		var month = dateArray1[1];
		var day = dateArray1[2];
		var minValue = year+"-"+month+"-"+day;
		var dateArray2 = endtime.split('-');
		 year = parseInt(dateArray2[0])+5;
		 month = dateArray2[1];
		 day = dateArray2[2];
		var maxValue = year+"-"+month+"-"+day;
		$('#reservation').daterangepicker({
			showDropdowns: true,
			minDate:minValue,
			maxDate:maxValue
		}, function(start, end, label) {
			//                  console.log(start.toISOString(), end.toISOString(), label);
			startime = start.format('YYYY-MM-DD HH:mm:ss');
			endtime = end.format('YYYY-MM-DD HH:mm:ss');
		});

		$(".spread-deal").on("click", function() {
			var state = $(this).parents("li").attr("data-state");
			var msgid = $(this).parents("li").attr("data-id");
			if($(this).parents("li").find(".list-content").hasClass("content-current")) {
				$(this).parents("li").find(".list-content").removeClass("content-current");
				$(this).html('展示<div class="spread-icon"></div>');
			} else {
				if(state == "0") {
					var data = {};
					var _this = $(this);
					data.state = state;
					data.id = msgid;
					$.ajax({
						type: 'POST',
						url: 'urls',
						data: data,
						dataType: 'json',
						success: function($res) {
							if($res.status == "success") {
								_this.parents("li").find(".list-content").addClass("content-current");
								_this.html('收起<div class="spread-icon"></div>');
								_this.parents("li").attr("data-state", "1");
							}
						},
						error: function() {}
					});
				} else {
					$(this).parents("li").find(".list-content").addClass("content-current");
					$(this).html('收起<div class="spread-icon"></div>');
				}
			}

		})
		$(".del-li").on("click", function() {
			var _this = $(this);
			var pageon = $("#pageon").text();
			var stat = $(".status-list>.current>a").attr("data-stat");
			var data = {};
			var delId = $(this).parents(".list-deal").parent("li").attr("data-id");
			data.del = delId;
			layer.confirm('您确认要删除此条站内信吗？', function(index) {
				//				_this.parents(".list-deal").parent("li").remove();
				//				zeroIf();
				$.ajax({
					type: 'POST',
					url: 'urls',
					data: data,
					dataType: 'json',
					success: function($res) {
						if($res.status == "success") {
							window.location.href = "user-message.html?pageon=" + pageon + "&stat=" + stat + "&start=" + startime + "&end=" + endtime;
							layer.close(index);
						} else {
							layer.alert($res.info);
						}
					},
					error: function() {}
				});
			});
		})
		$(".status-list>li>a,#search-btn").on("click", function() {
			var pageon = $("#pageon").text();
			if($(this).hasClass("search-btn")) {
				var stat = $(".status-list>.current>a").attr("data-stat");
			} else {
				var stat = $(this).attr("data-stat");
			}
			window.location.href = "user-message.html?pageon=" + pageon + "&stat=" + stat + "&start=" + startime + "&end=" + endtime;
		})

		function zeroIf() {
			if($(".message-list>li").length <= 0) {
				$(".coupon-content1").show();
			}
		}

	});
});