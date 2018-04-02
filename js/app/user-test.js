/**
 * Created by OO on 2015/8/20.
 */

require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'jquery.min',
		'layer': 'layer',
	},
	shim: {
		'layer': {
			deps: ['jquery']
		}
	}
});

require(['jquery', 'layer'], function($, layer) {
	$(function() {
		//		$("input[name=answer1]")[0].checked = false;
		var isLogin = $("#isLogin").val();
		if(isLogin=="true"){
			
		}else{
			window.location.href = "https://www.gftbank.cn/login.html";
		}
		var type2 = parseInt($("#type2").val());
		var result1 = '根据您填写的《投资人风险承受等级评测问卷》，您属于保守型投资人。您有比较有限的风险承受能力，对投资收益比较敏感，期望通过短期、持续、渐进的投资获得高于定期存款的回报。所以较低等级风险的产品如保本保息的固定收益类，比较适合您，适当回避风险的同时保证收益，跑赢通胀。<br/>根据您的测评结果，推荐您投资1-3个月的尊享计划以及国富系列产品';
		var result2 = '根据您填写的《投资人风险承受等级评测问卷》，您属于稳健型投资人。您有一定的风险承受能力，对投资收益比较敏感，期望通过长期且持续的投资获得高于平均水平的回报，通常更注重收益和风险较为均衡的产品。所以中等风险收益的投资品种比较适合您，回避风险的同时有一定的收益保证。<br/>根据您的测评结果，推荐您投资6-9个月的尊享计划以及国富系列产品';
		var result3 = '根据您填写的《投资人风险承受等级评测问卷》，您属于进取型投资人。您有较高的风险承受能力，是富有冒险精神的积极型选手。在投资收益波动的情况下，仍然保持积极进取的投资理念。短期内投资收益的下跌被您视为加注投资的利好机会。您适合从事灵活、风险与报酬都比较高的投资，不过要注意不要因一时的高报酬获利而将全部资金投入高风险操作，务必做好风险管理与资金调配工作。<br/>根据您的测评结果，推荐您投资12个月及以上的尊享计划产品';
		if(type2 == 0) {
			$(".user-content").hide();
			$.each($("input[type=radio]"), function() {
				$(this)[0].checked = false;
			});
			$(".user-content1").show();
		} else {
			$(".user-content").hide();
			$(".user-content2").show();
		}
		if(type2 == 1) {
			$(".user-pre").html(result1);
			$(".user-img1").show();
		}
		if(type2 == 2) {
			$(".user-pre").html(result2);
			$(".user-img2").show();
		}
		if(type2 == 3) {
			$(".user-pre").html(result3);
			$(".user-img3").show();
		}
		$(".answer").on("click", function() {
			$(this).children("input[type=radio]")[0].checked = true;
		})
		$("#submit").on("click", function() {
			var answer1 = parseInt($("input[name=answer1]:checked").val());
			var answer2 = parseInt($("input[name=answer2]:checked").val());
			var answer3 = parseInt($("input[name=answer3]:checked").val());
			var answer4 = parseInt($("input[name=answer4]:checked").val());
			var answer5 = parseInt($("input[name=answer5]:checked").val());
			var answer6 = parseInt($("input[name=answer6]:checked").val());
			var answer7 = parseInt($("input[name=answer7]:checked").val());
			var answer8 = parseInt($("input[name=answer8]:checked").val());
			
			if(isNaN(answer1) || isNaN(answer2) || isNaN(answer3) || isNaN(answer4) || isNaN(answer5) || isNaN(answer6) || isNaN(answer7) || isNaN(answer8)) {
				layer.alert("答完所有题目后再提交");
				return false;
			}
			data = {};
			data.score = answer1 + answer2 + answer3 + answer4 + answer5 + answer6 + answer7 + answer8;
			$(".user-img").hide();
			if(data.score <= 16 && data.score >= 8) {
				$(".user-pre").html(result1);
				$(".user-content").hide();
				$(".user-content2").show();
				$(".user-img1").show();
			} else if(data.score <= 28 && data.score >= 17) {
				$(".user-pre").html(result2);
				$(".user-content").hide();
				$(".user-content2").show();
				$(".user-img2").show();
			} else if(data.score <= 40 && data.score >= 29) {
				$(".user-pre").html(result3);
				$(".user-content").hide();
				$(".user-content2").show();
				$(".user-img3").show();
			} else {
				layer.alert($res.info);
			}
			$.ajax({
				type: 'POST',
				url: '/customer/risk_ajax',
				data: data,
				dataType: 'json',
				success: function($res) {
					if($res.type == "0") {
						layer.alert("您已经测评过了");
					} else if($res.type == "1") {
						$(".user-pre").html(result1);
						$(".user-content").hide();
						$(".user-content2").show();
						$(".user-img1").show();
					} else if($res.type == "2") {
						$(".user-pre").html(result2);
						$(".user-content").hide();
						$(".user-content2").show();
						$(".user-img2").show();
					} else if($res.type == "3") {
						$(".user-pre").html(result3);
						$(".user-content").hide();
						$(".user-content2").show();
						$(".user-img3").show();
					} else {
						layer.alert($res.info);
					}
				},
				error: function() {}
			});
		})
		$("#reset").on("click", function() {
			$(".user-content").hide();
			$.each($("input[type=radio]"), function() {
				$(this)[0].checked = false;
			});
			$(".user-content1").show();
		})
	});
});