/**
 * Created by OO on 2015/8/13.
 */

require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'jquery.min',
		'verifier': 'app/module_verifier',
		'register': 'app/register',
		'layer': 'layer'
	},
	urlArgs: 'ver=21321',
	shim: {
		'layer': {
			deps: ['jquery']
		}
	},
});
require(['jquery', 'verifier', 'layer'], function($, Verifier, layer) {
	//	require(['common']);
	(function() {
		layer.config({
			path: 'js/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
		});

		function layerTip(txt, id, dir) {
			layer.tips(txt, id, {
				tips: [dir || 2, '#FF9900'],
				time: 4000
			})
		}

		var verifier = new Verifier(),
			status = {
				mobile: false,
				psw: false,
				//captchaSms: false,
				/*chk: function () {
				    return document.getElementById('agreement').checked
				},*/
				sum: function() {
					return this.psw && this.mobile //&& this.captchaSms && this.chk()
				}
			},
			getable = true;

		verifier.config({
			mobilephone: 'mobile',
			captcha_sms: 'smsscode'
		});

		verifier.init({
				type: 'mobile',
				id: '#tel',
				url: '/alone/valiMobile', //Ajax判断后台手机号码是否重复
				hint: function() {
					layerTip('请输入手机号码', '#tel')
				},
				empty: function() {
					$('#tel').css('backgroundColor', '');
					status.mobile = false
				},
				success: function(data) {
					if(data.status === 'pass') {
						$('#tel').css('backgroundColor', '#B6FCB6');
						status.mobile = true
					} else {
						layerTip('手机号码已被使用', '#tel');
						//						$('#tel').css('backgroundColor', '#FF6966');
						status.mobile = false
					}
				},
				error: function() {
					layerTip('请填写正确的手机号码', '#tel');
					//					$('#tel').css('backgroundColor', '#FF6966');
					status.mobile = false
				}
			}, {
				type: 'password',
				id: '#psw',
				hint: function() {
					layerTip('请输入6-20个包含字母或数字', '#psw');
					$('#psw_confirm').val('').css('backgroundColor', '');
					status.psw = false
				},
				empty: function() {
					$('#psw').css('backgroundColor', '');
					status.psw = false
				},
				success: function() {
					$('#psw').css('backgroundColor', '#B6FCB6');
					status.psw = false
				},
				error: function() {
					layerTip('请输入正确格式密码', '#psw');
					//					$('#psw').css('backgroundColor', '#FF6966');
					status.psw = false
				}
			}, {
				type: 'password_confirm',
				id: '#psw_confirm',
				hint: function() {
					layerTip('请输入6-20个包含字母或数字', '#psw_confirm')
				},
				empty: function() {
					$('#psw_confirm').css('backgroundColor', '');
					status.psw = false
				},
				success: function() {
					$('#psw_confirm').css('backgroundColor', '#B6FCB6');
					status.psw = true
				},
				error: function() {
					layerTip('密码不一致', '#psw_confirm');
					//					$('#psw_confirm').css('backgroundColor', '#FF6966');
					status.psw = false
				}
			}, 
			/* {
			            type: 'username,mobile',
			            id: '#signIn_id',
			            success: function () {
			                $('#signIn_id').css('backgroundColor', '');
			            },
			            empty: function () {
			                $('#signIn_id').css('backgroundColor', '');
			            },
			            error: function () {
			                layerTip('用户名或手机号码 格式错误', '#signIn_id');
			                $('#signIn_id').css('backgroundColor', '#FF6966');
			            }
			        }, */
			{
				type: 'password',
				id: '#signIn_psw',
				empty: function() {
					$('#signIn_psw').css('backgroundColor', '');
				},
				success: function() {
					$('#signIn_psw').css('backgroundColor', '');
				},
				error: function() {
					layerTip('密码格式错误', '#signIn_psw');
					$('#signIn_psw').css('backgroundColor', '#FF6966');
				}
			});
		$("#tel_cpt").on("blur", function() {
			$.ajax({　　
				type: 'post',
				url: '/alone/valiSMSS', //鼠标移开验证码文本框判断验证码是否正确
				data: {
					mobile: $('#tel').val(),
				},
				success: function(d) {
					if(d.status == 'pass') {
						$('#tel_cpt').css('backgroundColor', '#B6FCB6');
						status.captchaSms = true;
					} else {
						//						alert(d.code);
						layerTip(d.info, '#tel_cpt', 4);
						//						$('#tel_cpt').css('backgroundColor', '#FF6966');
						status.captchaSms = false;
					}
				},
				empty: function() {
					$('#tel_cpt').css('backgroundColor', '');
				},
				error: function() {
					layerTip('验证码错误', '#tel_cpt', 4);
					//					$('#tel_cpt').css('backgroundColor', '#FF6966');
					status.captchaSms = false
				}
			});
		})
		$('#agreement').on('change', function() {
			$('#chk-btn').toggleClass('checked')
		});
		var InterValObj; //timer变量，控制时间
		var count = 60; //间隔函数，1秒执行
		var curCount; //当前剩余秒数
		var boolhref = 1;

		function SetRemainTime() {
			if(curCount == 0) {
				window.clearInterval(InterValObj); //停止计时器
				boolhref = 1;
				$("#get-cpt-btn").html("重新发送验证码");
				$("#get-cpt-btn").removeClass("get-cpt-btned");
			} else {
				curCount--;
				$("#get-cpt-btn").html("在" + curCount + "秒后重发");
				$("#get-cpt-btn").addClass("get-cpt-btned");
			}
		};
		$('#get-cpt-btn').on('click', function() {
			if(boolhref) {
				$tel = $("#tel").val();
				if($tel == '') {
					layer.alert("手机号不能为空");
					return false;
				}
				if(!$tel.match(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/)) {
					layer.alert("请填写正确的手机号码");
					return false;
				}
				$.ajax({　　
					type: "POST", //用POST方式传输
					　　dataType: "json", //数据格式:JSON
					　　url: '/alone/sendSMSS', //目标地址
					　　data: "&mobile=" + $tel + "&typecode=6470",
					　　success: function(data) {
						if(data.status === 'success') {
							curCount = count;　　 //设置button效果，开始计时
							boolhref = 0;
							$("#get-cpt-btn").html("在" + curCount + "秒后重发");
							$("#get-cpt-btn").addClass("get-cpt-btned");
							InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
						} else if(data.code == '401') {
							layerTip(data.info, '#tel_cpt', 4);
//							layer.alert(data.info);
						}
					}
				});
			} else {
				layer.alert('请耐心等待,不能频繁发短信');
			}
		});
		$(".login-input").on("focus", function() {
			$(".login-input").parents(".login-input-frame").removeClass("frame-current");
			$(this).parents(".login-input-frame").addClass("frame-current");
		})

		$('#signUp_btn').on('click', function() {
			var tel1 = $("#tel").val();
			var psw1 = $("#psw").val();
			var $picyzm = $("#code_input").val();
			var telCpt1 = $("#tel_cpt").val();
			var formrandid = $("#formrandid").val();
			var telReg = !!tel1.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
			var pswtel = !!psw1.match(/^[a-z,A-Z][\w]{5,19}$/i); //用户名   正则   =>  6-20个以字母开头、可带数字、下划线
			var suggest = $("#suggest").val();
			var res = verifyCode.validate($picyzm);
			if(tel1 == "") {
				layer.alert("手机号码不能为空");
				return false;
			}
			if(psw1 == "") {
				layer.alert("密码不能为空");
				return false;
			} else if(pswtel == false) {
				layer.alert("密码请输入6-20个包含字母和数字，首字母必须是字母");
				return false;
			}
			if(telReg == false) {
				layer.alert("请您输入正确的手机号码");
				return false;
			}

			if(res) {} else {
				layer.alert("验证码错误");
				return false;
			}
			if(telCpt1 == "") {
				layer.alert("请您输入验证码");
				return false;
			}
			if(!$(".register-check").find(".register-check").hasClass("register-checked")){
				layer.msg("请先阅读并同意《国富通会员注册服务协议》");
				return false;
			}
			$.ajax({
				type: "POST",
				url: "/operate/registerDo",
				dataType: "json",
				data: {
					"mobile": tel1,
					"password": psw1,
					"smcode": telCpt1,
					"referee": suggest1,
					"formrandid": formrandid,
					"picyzm": $picyzm
				},
				//2018/8/23头
				beforeSend:function(){
					var index = layer.load(1, {
					  shade: [0.1,'#fff'] //0.1透明度的白色背景
					});
				},
				//2018/8/23尾
				success: function(res) {
					//2018/8/23头
					layer.closeAll('loading');
					//2018/8/23尾
					if(res.status == 'success') {
						window.location = "/user-index.html";
					}
					else if(res.info == 'smcode 长度不符合'){
						layer.alert('短信验证码长度不符合');
					}
					else {
						layer.alert(res.info);
					}
				}
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
					url: '/operate/loginAjax',
					type: 'post',
					dataType: 'json',
					data: {
						word: $('#signIn_id').val(),
						password: $('#signIn_psw').val(),
						formrandid: $('#formrandid').val(),
						keeptime: $(".keeptime").val()
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
							/*if (res.isbaofu.realauth == '') {
								location.href = '/user-index.html';		//实名认证
							} else if (res.isbaofu.isbaofu == '0'){		//绑定用户名
								location.href = '';
							}*/
							//location.href = '/user-index.html';
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
				content: ['res/content.htm']
			});
		});
		$(".register-tr1").on("click", function() {
			if($(this).find(".register-check").hasClass("register-checked")) {
				$(this).find(".register-check").removeClass("register-checked");
			} else {
				$(this).find(".register-check").addClass("register-checked");
			}
		})
	}());
});