/**
 * Created by OO on 2015/8/20.
 */

require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'jquery.min',
		'layer': 'layer',
		'gVerify': 'app/gVerify'
	}
});

require(['jquery', 'layer', 'gVerify'], function($, layer, gVerify) {
	$(function() {
		//手机号码验证
		$('#user_tel').blur(function() {
			var mobile = $('#user_tel').val();
			if(mobile.length > 0) {
				if(mobile.match(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/)) {
					//ajax验证手机号码是否存在
					$('#user_tel').attr('val', '1');
					$.ajax({
						type: 'post',
						url: '/alone/valiMobile',
						dataType: 'json',
						data: {
							mobile: mobile
						},
						success: function(d) {
							if(d.status == 'pass') { //手机号码不存在
								$('#user_tel').attr('val', '4');
							} else if(d.status == 'nopass') { //手机号码存在
								$('#user_tel').attr('val', '1');
							}
						}
					});
				} else {
					$('#user_tel').attr('val', '3');
				}
			} else {
				$('#user_tel').attr('val', '2');
			}
		});
		var InterValObj; //timer变量，控制时间
		var count = 60; //间隔函数，1秒执行
		var curCount; //当前剩余秒数
		var boolhref = 1;

		function SetRemainTime() {
			if(curCount == 0) {
				window.clearInterval(InterValObj); //停止计时器
				boolhref = 1;
				$("#btn-smcode").html("重新发送验证码");
			} else {
				curCount--;
				$("#btn-smcode").html("在" + curCount + "秒后重发");
			}
		};
		$('#btn-smcode').click(function() {
			var mobile = $('#user_tel').val();
			var mobile_val = $('#user_tel').attr('val');
			var typecode = $('#btn-smcode').attr('typecode');
			if(!boolhref) {
				return false;
			}
			if(mobile.length > 0) {
				if(mobile_val == 1) {
					//ajax发送手机验证码
					$.ajax({
						url: '/alone/sendSMSS',
						type: 'post',
						data: {
							mobile: mobile,
							typecode: typecode
						},
						dataType: 'json',
						success: function(d) {
							if(d.status == 'success') {
								curCount = count;
								boolhref = 0;
								$("#btn-smcode").html("在" + curCount + "秒后重发");
								InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
							} else {
								layer.alert('验证码发送失败');
							}
						}
					});
				} else {
					layer.alert('请输入正确的手机号码');
				}
			} else {
				layer.alert("手机验证码不能为空");
			}
		});
		$('#smcode').on("input propertychange", function() {
			var smcode = $('#smcode').val();
			var mobile = $('#user_tel').val();
			if(smcode.length > 0) {
				if(smcode.length==6){
					$.ajax({
						type: 'post',
						url: '/alone/valiSMSS',
						dataType: 'json',
						async:false,
						data: {
							smsscode: smcode,
							mobile: mobile
						},
						success: function(d) {
							console.log(d.status);
							if(d.status == 'pass') {
								$('#smcode').attr('val', '1');
							} else if(d.status == 'nopass') {
								$('#smcode').attr('val', '3');
								return false;
							}
						}
					});
				}else{
					$('#smcode').attr('val', '3');
				}
			} else {
				$('#smcode').attr('val', '2');
			}
		});
		$("#btn_next").on("click", function() {
				var $picyzm = $("#code_input").val();
				var res = verifyCode.validate($picyzm);
				var mobile = $("#user_tel").val();
				var mobile_val = $('#user_tel').attr('val');
				var smcode = $("#smcode").val();
				var smcode_val = $('#smcode').attr('val');
				if(mobile == "") {
					layer.alert("手机号码不能为空");
					return false;
				}
				if(mobile_val == 3) {
					layer.alert("手机格式错误");
					return false;
				}
				if(mobile_val == 4) {
					layer.alert("手机号码不存在");
					return false;
				}
				if(smcode == "") {
					layer.alert("短信验证码不能为空");
					return false;
				}
				if(smcode_val == 3) {
					layer.alert("短信验证码错误");
					return false;
				}
				if(res) {} else {
					layer.alert("验证码错误");
					return false;
				}
				//下一步
				$(".process-content>li").eq(1).addClass("process-current");
				$(".forgetpwd-form").hide();
				$(this).parents(".forgetpwd-form").next(".forgetpwd-form").css("display", "table");
				//验证码图形处理
//				$("#v_container").remove();
//				var verifyCode2 = new GVerify("v_container2");

		})
		$('#newpwd').blur(function() {
			var newpwd = $('#newpwd').val();
			if(newpwd.length > 0) {
				if(newpwd.match(/^[a-zA-Z][A-Za-z0-9_]{5,19}$/)) { //密码格式，需要6-19个包含字母或数字
					$('#newpwd').attr('val', '1');
				} else {
					//					$('#pwd_info').html('*密码长度6~19位');
					$('#newpwd').attr('val', '3');
				}
			} else {
				//				$('#pwd_info').html('*请输入新密码');
				$('#newpwd').attr('val', '2');
			}
		});
		$('#conpwd').blur(function() {
			var conpwd = $('#conpwd').val();
			var newpwd = $('#newpwd').val();
			if(conpwd.length > 0) {
				if(conpwd == newpwd) {
					$('#conpwd').attr('val', '1');
				} else {
					//					$('#conpwd_info').html('*两次密码不一致');
					$('#conpwd').attr('val', '3');
				}
			} else {
				//				$('#conpwd_info').html('*请输入确定密码');
				$('#conpwd').attr('val', '2');
			}
		});
		$("#btn_reset").on("click", function() {
			var $picyzm = $("#code_input2").val();
			var res = verifyCode.validate($picyzm);
			var conpwd = $('#conpwd').val();
			var newpwd = $('#newpwd').val();
			var mobile = $('#user_tel').val();
			var mobile_val = $('#user_tel').attr('val');
			var conpwd_val = $('#conpwd').attr('val');
			var newpwd_val = $('#newpwd').attr('val');
			var formrandid = $('#formrandid').val();
			if(newpwd == "") {
				layer.alert("请输入新密码");
				return false;
			}
			if(newpwd_val == 3) {
				layer.alert("请输入6-19个包含字母或数字的密码");
				return false;
			}
			if(conpwd == "") {
				layer.alert("请输入确定密码");
				return false;
			}
			if(conpwd_val == 3) {
				layer.alert("两次密码不一致");
				return false;
			}
			if(res) {} else {
				layer.alert("验证码错误");
				return false;
			}
			if(conpwd.length > 0 && newpwd.length > 0 && mobile.length > 0) {
				if(conpwd_val == 1 && newpwd_val == 1 && mobile_val == 1) {
					//					$(".process-content>li").eq(2).addClass("process-current");
					//					$(".forgetpwd-form").hide();
					//					$(this).parents(".forgetpwd-form").next(".forgetpwd-form").css("display", "table");
					//					setTimeout(function() {
					//						window.location.href = "index.html";
					//					}, 5000)
					$.ajax({
						type: 'post',
						url: '/operate/resetPwdAjax',
						dataType: 'json',
						data: {
							newpwd: newpwd,
							mobile: mobile,
							formrandid: formrandid
						},
						success: function(d) {
							if(d.status == 'sucess') {
								$(".process-content>li").eq(2).addClass("process-current");
								$(".forgetpwd-form").hide();
								$(this).parents(".forgetpwd-form").next(".forgetpwd-form").css("display", "table");
								setTimeout(function() {
									window.location.href = "index.html";
								}, 5000)
							} else if(d.status == 'bad') {
								layer.open({
									content: d.info,
									btn: ['确定'],
									yes: function(index) {
										location.href = '/forgetpwd.html';
									}
								});
							}
						}
					});
				}
			}

		})

	});
});