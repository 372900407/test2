/**
 * Created by OO on 2015/8/20.
 */

require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'jquery.min',
		'layer': 'layer'
	}
});

require(['jquery', 'layer'], function($, layer) {
	$(function() {
		$(".auto-status").on("click", function() {
			var openid = $("#openid").val();
			var status = $(this).attr("data-id");
			var data = {};
			var _this = $(this);
			var str = '你即将开启自动投标？';
			data.openid = openid;
			data.status = status;
			
			if($(this).hasClass("auto-current")) {
				str = '你即将关闭自动投标';
			} else {
				str = '你即将开启自动投标';
			}

			layer.confirm(str, function(index) {
				//				_this.parents(".list-deal").parent("li").remove();
				//				zeroIf();
				if(_this.hasClass("auto-current")) {
								_this.removeClass("auto-current");
								_this.attr("data-id", "0");
							} else {
								_this.addClass("auto-current");
								_this.attr("data-id", "1");
							}
							layer.close(index);
				$.ajax({
					type: 'POST',
					url: 'urls',
					data: data,
					dataType: 'json',
					success: function($res) {
						if($res.status == "success") {
							if(_this.hasClass("auto-current")) {
								_this.removeClass("auto-current");
								_this.attr("data-id", "0");
							} else {
								_this.addClass("auto-current");
								_this.attr("data-id", "1");
							}
							layer.close(index);
						} else {
							layer.alert($res.info);
						}
					},
					error: function() {}
				});
			});

		})
		$(".fixed-close1").on("click", function() {
				$(this).parents(".user-content2").hide();
				$(".user-content").show();
			})
			//修改
		$("select[name=monthstar]").on("change", function() {
			selectedChange($(this));
		})
		$(".edit-set").on("click", function() {
			$("#user-money").val($("#user-money2").text());
			var monthstarStr = $("#monthstar").text();
			var userWay = $(".user-way").text();
			$("select[name=monthstar]").find("option").each(function(a) {
				if($(this).text() == monthstarStr) {
					$(this).attr("selected", "selected");
					selectedChange($("select[name=monthstar]"));
					selectedMonthend($("select[name=monthend]"));
				}
			})
			$(".user-content").hide();
			$(".user-content2").show();
		})

		function selectedChange(obj) {
			var str = "";
			var monthLength = obj.find("option").length - obj.prop('selectedIndex');
			var current = parseInt(obj.val());
			if(monthLength == 6) {
				str = '<option value="12">不限</option>';
			} else {
				if(obj.prop('selectedIndex') == "1") {
					str = '<option value="1">1月</option>';
					current = 3;
					monthLength--;
				}
				for(var i = 0; i < monthLength; i++) {
					str += '<option value="' + (current + i * 3) + '" >' + (current + i * 3) + '月</option>';
				}
			}
			$("select[name=monthend]").html(str);
		}

		function selectedMonthend(obj) {
			var monthendStr = $("#monthend").text();
			obj.find("option").each(function(a) {
				console.log($(this).text());
				if($(this).text() == monthendStr) {
					$(this).attr("selected", "selected");
				}
			})
		}
		//修改
		$("input[name=type]").on("click", function(e) {
			//                	 console.log($(".radio-group").find("input[name=type]:checked").length);
			if($(".radio-group").find("input[name=type]:checked").length == 0) {
				e.preventDefault();
			}
		})
		$(".auto-save").on("click", function() {
			var userMoney = $("#user-money").val();
			var type;
			var monthstar = $("select[name=monthstar]").val();
			var monthend = $("select[name=monthend]").val();
			var data = {}
			if($(".radio-group").find("input[name=type]:checked").length == 2) {
				type = 0;
			} else {
				type = $(".radio-group").find("input[name=type]:checked").val();
			}
			data.money = userMoney;
			data.type = type;
			data.monthstar = monthstar;
			data.monthend = monthend;
			if(userMoney == "") {
				layer.alert("请输入账户保留资金");
				return false;
			}
			//			if(type == 0) {
			//				var way1 = $("#way1").val();
			//				var way2 = $("#way2").val();
			//				$(".user-way").html(way1 + "&nbsp;&nbsp;&nbsp;&nbsp;" + way2);
			//			} else {
			//				$(".user-way").html(type);
			//			}
			//			$("#monthstar").text(monthstar + "月");
			//			$("#monthend").text(monthend + "月");
			//			$("#user-money2").text(userMoney);
			//			
			//			$(this).parents(".user-content2").hide();
			//			$(".user-content").show();
			var _this = $(this);
			$.ajax({
				type: 'POST',
				url: 'urls',
				data: data,
				dataType: 'json',
				success: function($res) {
					if(type == 0) {
						var way1 = $("#way1").val();
						var way2 = $("#way2").val();
						$(".user-way").html(way1 + "&nbsp;&nbsp;&nbsp;&nbsp;" + way2);
					} else {
						$(".user-way").html(type);
					}
					$("#monthstar").text(monthstar + "月");
					$("#monthend").text(monthend + "月");
					$("#user-money2").text(userMoney);
					//success
					_this.parents(".user-content2").hide();
					$(".user-content").show();
				},
				error: function() {}
			});

		})

	});
});