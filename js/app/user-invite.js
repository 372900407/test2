/**
 * Created by OO on 2015/8/20.
 */

require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'jquery.min',
		'layer': 'layer',
		//2017/9/4
		'qrcode': 'vendor/jquery.qrcode.min'
		//2017/9/4
	},
	shim: {
		 'qrcode': {
            deps: ['jquery']
        }
	}
});

require(['jquery', 'layer','qrcode'], function($, layer,qrcode) {
	$(function() {
		//2017/9/4
		var urlVal = $("#urlVal").val();
		$("#qrcode").qrcode({ 
            render: 'table', // 渲染方式有table方式（IE兼容）和canvas方式
            width: 95, //宽度 
            height:95, //高度 
            text: (urlVal), //内容 
            typeNumber:-1,//计算模式
            correctLevel:2,//二维码纠错级别
            background:"#ffffff",//背景颜色
            foreground:"#000000"  //二维码颜色
        });
        //2017/9/4
		$("#copyHref").on("click", function() {
			var url2 = $("#way-href")[0];
			url2.select();
			document.execCommand("Copy");
			layer.msg("复制成功");
		})
		$("#recommended-copy").on("click", function() {
			var url1 = $("#recommended-code")[0];
			url1.select();
			document.execCommand("Copy");
			layer.msg("复制成功");
		})
		var recommendedCode = $("#recommended-code").val();
		var content = "国富通（www.gftbank.cn）注册即送288元新手红包，投资收益稳定、红包壕礼送不停、还有精彩活动等你来参与！";
		var href = "https://www.gftbank.cn/reg.html?tjuid="+recommendedCode;
		$("#weibo").on("click", function() {
			var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + content + '&url=' + href + '&content=utf-8&sourceUrl=' +href + '&pic=' + "https://www.gftbank.cn/asset/images/logo.png";
			window.open(sharesinastring, 'openwindow', '');
		})
		$("#qqBtn").on("click", function() {
			var shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+content+'&url=' + href + '&pics=' + "https://www.gftbank.cn/asset/images/logo.png";
			window.open(shareqqzonestring, 'openwindow', '');
		})
		$("#doubian").on("click",function(){
			var shareqqzonestring = "http://shuo.douban.com/!service/share?";
		    shareqqzonestring += 'href=' + href;    //分享的链接
		    shareqqzonestring += '&name=' + content;    //分享的标题
		    shareqqzonestring += '&image=https://www.gftbank.cn/asset/images/logo.png';  
			window.open(shareqqzonestring, 'openwindow', '');
		})
		$("#people").on("click",function(){
		})
	});
});