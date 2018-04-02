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

require(['jquery','layer'], function($,layer) {
	$(function() {
		$(".interest-href").on("click",function(){
			var ifdata = $(this).parents(".user-article").attr("data-val");
			if(ifdata=="plan"){
				layer.open({
					type: 2,
					shadeClose: true,
					title: false,
					closeBtn: [0, false],
					shade: [0.8, '#000'],
					border: [0],
					offset: ['20px', ''],
					area: ['900px', ($(window).height() - 50) + 'px'],
					content: ['res/zunxiang.htm']
				});
			}else if(ifdata=="direct"){
				layer.open({
					type: 2,
					shadeClose: true,
					title: false,
					closeBtn: [0, false],
					shade: [0.8, '#000'],
					border: [0],
					offset: ['20px', ''],
					area: ['900px', ($(window).height() - 50) + 'px'],
					content: ['res/guofulian.htm']
				});
			}else{
				layer.open({
					type: 2,
					shadeClose: true,
					title: false,
					closeBtn: [0, false],
					shade: [0.8, '#000'],
					border: [0],
					offset: ['20px', ''],
					area: ['900px', ($(window).height() - 50) + 'px'],
					content: ['res/zunxiang.htm']
				});
			}
			
		})
	});
});