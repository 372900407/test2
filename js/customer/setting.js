/**
 * 个人账户设置js
 * author：mosishu
 */
$(document).ready(function() {
	//------------------------------------首次修改用户名开始------------------------------------
	var verifyCode = new GVerify("v_container");
	$('#modify_accName').blur(function() { //用户名验证
		var username = $('#modify_accName').val();
		if(username.length > 0) {
			if(username.match(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,19}$/)) {
				//ajax判断用户名是否被占用
				$.ajax({
					type: 'post',
					url: '/alone/valiUsername',
					dataType: 'json',
					data: {
						username: username
					},
					success: function(d) {
						if(d.status == 'pass') {
							$('#accName_info').attr('class', 'right');
							$('#accName_info').html('');
							$('#modify_accName').attr('val', '1');
						} else if(d.status == 'nopass') {
							$('#accName_info').attr('class', 'error');
							$('#accName_info').html('*该用户名已存在');
							$('#modify_accName').attr('val', '0');
						}
					}
				});
			} else {
				$('#accName_info').html('*用户名长度为6-20个并以字母开头');
				$('#accName_info').attr('class', 'error');
				$('#modify_accName').attr('val', '0');
			}
		} else {
			$('#accName_info').html('*请输入账户名');
			$('#accName_info').attr('class', 'error');
			$('#modify_accName').attr('val', '0');
		}
	});

	$('#modify-username').click(function() { //修改用户名操作
		var username = $('#modify_accName').val();
		var username_val = $('#modify_accName').attr('val');
		var formrandid = $('#formrandid').val();
		if(username.length > 0) {
			if(username_val == 1) {
				//ajax修改用户名操作
				if(confirm('确定使用该用户名吗？只能修改一次哦！')) {
					$.ajax({
						type: 'post',
						url: '/operate/modifyUserAjax',
						dataType: 'json',
						data: {
							username: username,
							formrandid: formrandid
						},
						success: function(d) {
							if(d.status == 'sucess') {
								layer.open({
									content: d.info,
									btn: ['确定'],
									yes: function(index) {
										window.location.href = "../user-setting.html";
									}
								});
								//								layer.alert(d.info);
								//								location.href = '../user-setting.html';
							} else if(d.status == 'bad') {
								layer.open({
									content: d.info,
									btn: ['确定'],
									yes: function(index) {
										window.location.href = "../user-setting.html";
									}
								});
								//								layer.alert(d.info);
								//								location.href = '../user-setting.html';
							}
						}
					});
				} else {
					return false;
				}
			} else {
				$('#accName_info').html('*请填写可用的账户名');
				$('#accName_info').attr('class', 'error');
				$('#modify_accName').attr('val', '0');
			}
		} else {
			$('#accName_info').html('*请输入账户名');
			$('#accName_info').attr('class', 'error');
			$('#modify_accName').attr('val', '0');
		}
	});
	//------------------------------------首次修改用户名结束------------------------------------

	//------------------------------------实名验证开始------------------------------------
	$('#modify_ctfName').blur(function() { //验证姓名
		var ctfName = $('#modify_ctfName').val();
		if(ctfName.length > 0) {
			$('#ctfName_info').attr('class', 'right'); //√
			$('#ctfName_info').html('');
			$('#modify_ctfName').attr('val', '1');
		} else {
			$('#ctfName_info').attr('class', 'error');
			$('#ctfName_info').html('*请输入证件姓名');
			$('#modify_ctfName').attr('val', '0');
		}
	});

	$('#modify_ctfNum').blur(function() { //身份证号码验证
		var ctfNum = $('#modify_ctfNum').val();
		if(ctfNum.length > 0) {
			if(ctfNum.match(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/) || ctfNum.match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/)) {
				//ajax验证身份证号码
				$.ajax({
					type: 'post',
					url: '/alone/valiIdcard',
					dataType: 'json',
					data: {
						idcard: ctfNum
					},
					success: function(d) {
						if(d.status == 'pass') {
							$('#ctfNum_info').attr('class', 'right');
							$('#ctfNum_info').html('');
							$('#modify_ctfNum').attr('val', '1');
						} else if(d.status == 'nopass') {
							if(d.info == '301') {
								$('#ctfNum_info').attr('class', 'error');
								$('#ctfNum_info').html('*该身份证号码格式不正确');
								$('#modify_ctfNum').attr('val', '0');
							} else if(d.info == '300') {
								$('#ctfNum_info').attr('class', 'error');
								$('#ctfNum_info').html('*该身份证号码已存在');
								$('#modify_ctfNum').attr('val', '0');
							}
						}
					}
				});
			} else {
				$('#ctfNum_info').attr('class', 'error');
				$('#ctfNum_info').html('*请输入有效身份证号');
				$('#modify_ctfNum').attr('val', '0');
			}
		} else {
			$('#ctfNum_info').attr('class', 'error');
			$('#ctfNum_info').html('*请输入身份证号码');
			$('#modify_ctfNum').attr('val', '0');
		}
	});

	$('#btn_bankctfName').click(function() { //实名认证操作
		var ctfName = $('#modify_ctfName').val();
		var ctfNum = $('#modify_ctfNum').val();
		var ctfName_val = $('#modify_ctfName').attr('val');
		var ctfNum_val = $('#modify_ctfNum').attr('val');
		var formrandid = $('#formrandid').val();
		var $picyzm = $("#code_input2").val();
		var res = verifyCode.validate($picyzm);
		if(ctfName.length > 0 && ctfNum.length > 0 && $picyzm.length > 0) {
			if(ctfName_val == 1 && ctfNum_val == 1) {
				//ajax实名验证操作
				if(res) {} else {
					layer.alert("验证码错误");
					return false;
				}
				$.ajax({
					type: 'post',
					url: '/operate/authAjax',
					dataType: 'json',
					data: {
						idcard: ctfNum,
						realname: ctfName,
						formrandid: formrandid
					},
					success: function(d) {
						if(d.status == 'sucess') {
							layer.open({
								content: d.info,
								btn: ['确定'],
								yes: function(index) {
									window.location.href = "../user-setting.html";
								}
							});
						} else if(d.status == 'bad') {
							layer.alert(d.info);
						}
					},
					error: function() {
						layer.alert('操作失败');
					}
				});
			} else {
				layer.alert('请填写正确的信息');
				return false;
			}
		} else {
			layer.alert('请填写必要信息');
			return false;
		}
	});
	//------------------------------------实名验证结束------------------------------------

	//------------------------------------修改手机号码验证开始------------------------------------
	$('#modify_telNum').blur(function() { //验证手机号码
		var telNum = $('#modify_telNum').val();
		if(telNum.length > 0) {
			if(telNum.match(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/)) {
				//ajax验证手机号码
				$.ajax({
					type: 'post',
					url: '/alone/valiMobile',
					dataType: 'json',
					data: {
						mobile: telNum
					},
					success: function(d) {
						if(d.status == 'pass') {
							$('#tel_info').attr('class', 'right');
							$('#tel_info').html('');
							$('#modify_telNum').attr('val', '1');
						} else if(d.status == 'nopass') {
							$('#tel_info').attr('class', 'error');
							$('#tel_info').html('*该手机号码已被使用');
							$('#modify_telNum').attr('val', '0');
						}
					}
				});
			} else {
				$('#tel_info').attr('class', 'error');
				$('#tel_info').html('*手机号码格式不正确');
				$('#modify_telNum').attr('val', '0');
			}
		} else {
			$('#tel_info').attr('class', 'error');
			$('#tel_info').html('*请输入新手机号码');
			$('#modify_telNum').attr('val', '0');
		}
	});

	$('#mphoneyzm').click(function() { //发送手机验证码
		var boolhref = parseInt($(this).attr("data-href"));
		if(!boolhref) {
			return false;
		}
		var phoneDemo = $('#phone-demo').val();
		var telNum = $('#modify_telNum').val();
		var telNum_val = $('#modify_telNum').attr('val');
		var typecode = $('#mphoneyzm').attr('typecode');
		var _this = $(this);
		_this.attr("data-time", 60);
		if(telNum.length > 0) {
			if(telNum_val == 1) {
				$('#cpt_info').html('');
				$('#modify_ctfNum').attr('val', '1');
				//$('#cpt_info').attr('class','right');
				//ajax发送手机验证码
				$.ajax({
					url: '/alone/sendSMSS',
					type: 'post',
					data: {
						mobile: phoneDemo,
						typecode: typecode
					},
					dataType: 'json',
					success: function(d) {
						if(d.status == 'success') {
							layer.alert('验证码已发送，请注意查收');
						} else {
							layer.alert('验证码发送失败');
						}
					}
				});

				//layer.alert(obj);
				time(_this);
				_this.attr("data-href", 0);
			} else {
				$('#cpt_info').html('*请填写正确的手机号码');
				$('#modify_ctfNum').attr('val', '0');
				$('#cpt_info').attr('class', 'error');
			}
		} else {
			$('#cpt_info').html('*请输入手机号码');
			$('#modify_ctfNum').attr('val', '0');
			$('#cpt_info').attr('class', 'error');
		}
	});
	//2017/9/4 292行到443行
	$("#mphoneyzm1").on("click", function() {
			var boolhref = parseInt($(this).attr("data-href"));
			if(!boolhref) {
				return false;
			}
			var telNum = $('.modify-telNum1').attr("data-val");
			var typecode = $('#mphoneyzm1').attr('typecode');
			var _this = $(this);
			_this.attr("data-time", 60);
			$('#cpt_info1').html('');
			//$('#cpt_info').attr('class','right');
			//ajax发送手机验证码
			$.ajax({
				url: '/alone/sendSMSS',
				type: 'post',
				data: {
					mobile: telNum,
					typecode: typecode
				},
				//2017/9/14
				beforeSend:function(){
					var index = layer.load(1, {
					  shade: [0.1,'#fff'] //0.1透明度的白色背景
					});
				},
				//2017/9/14
				dataType: 'json',
				success: function(d) {
					if(d.status == 'success') {
						//2017/9/14
						layer.closeAll('loading');
						$("#result").text(d.id);
						//2017/9/14
						layer.alert('验证码已发送，请注意查收');
					} else {
						layer.alert('验证码发送失败');
					}
				}
			});

			//layer.alert(obj);
			time(_this);
			_this.attr("data-href", 0);
		})
		
	$('#modify_newTelCpt,#modify_newTelCpt1').blur(function() { //手机验证码验证
		
		if($(this).attr("id")=="modify_newTelCpt1"){
			var telCpt = $('#modify_newTelCpt1').val();
			var mobile = $('.modify-telNum1').attr("data-val");
			var cpt_info = $("#cpt_info1");
			var modify_newTelCpt = $('#modify_newTelCpt1');
		}else{
			var telCpt = $('#modify_newTelCpt').val();
			var mobile = $('#modify_telNum').val();
			var cpt_info = $("#cpt_info");
			var modify_newTelCpt = $('#modify_newTelCpt');
		}
		if(telCpt.length > 0) {
			//ajax判断该验证码是否正确
			$.ajax({
				type: 'post',
				url: '/alone/valiSMSS',
				dataType: 'json',
				data: {
					smsscode: telCpt,
					mobile: mobile
				},
				success: function(d) {
					if(d.status == 'pass') {
						cpt_info.html('');
						modify_newTelCpt.attr('val', '1');
						cpt_info.attr('class', 'right');
					} else if(d.status == 'nopass') {
						cpt_info.html('*验证码错误');
						modify_newTelCpt.attr('val', '0');
						cpt_info.attr('class', 'error');
						return false;
					}
				}
			});
		} else {
			cpt_info.html('*请输入手机验证码');
			modify_newTelCpt.attr('val', '0');
			cpt_info.attr('class', 'error');
			return false;
		}
	});
	$('#btn_bankMobile').click(function() { //修改手机号码操作
		var telNum = $('#modify_telNum').val();
		var telNum_val = $('#modify_telNum').attr('val');
		var telCpt = $('#modify_newTelCpt').val();
		var telCpt_val = $('#modify_newTelCpt').attr('val');
		var formrandid = $('#formrandid').val();
		if(telNum.length > 0 && telCpt > 0) {
			if(telNum_val == 1 && telCpt_val == 1) {
				//ajax修改手机操作
				$.ajax({
					type: 'post',
					url: '/operate/mobileAjax',
					dataType: 'json',
					data: {
						mobile: telNum,
						smcode: telCpt,
						formrandid: formrandid
					},
					success: function(d) {
						if(d.status == 'sucess') {
							layer.alert(d.info);
							location.href = '../user-setting.html';
						} else if(d.status == 'bad') {
							layer.alert(d.info);
							location.href = '../user-setting.html';
						}
					}
				});
			} else {
				layer.alert('请填写正确的信息');
				return false;
			}
		} else {
			layer.alert('请填写必要信息');
			return false;
		}
	});
	$("#btn_bankMobile1").on("click",function(){
		var telNum = $('.modify-telNum1').attr("data-val");
		var telCpt = $('#modify_newTelCpt1').val();
		var telCpt_val = $('#modify_newTelCpt1').attr('val');
		var formrandid = $('#formrandid').val();
		if(telNum.length > 0 && telCpt > 0) {
			if(telCpt_val == 1) {
				//ajax修改手机操作
				$.ajax({
					type: 'post',
					url: '/operate/mobileAjax',
					dataType: 'json',
					data: {
						mobile: telNum,
						smcode: telCpt,
						formrandid: formrandid
					},
					success: function(d) {
						if(d.status == 'sucess') {
							layer.alert(d.info);
							location.href = '../user-loanpage.html';
						} else if(d.status == 'bad') {
							layer.alert(d.info);
							location.href = '../user-loanpage.html';
						}
					}
				});
			} else {
				layer.alert('请填写正确的信息');
				return false;
			}
		} else {
			layer.alert('请填写必要信息');
			return false;
		}
	})
	//2017/9/4
	//------------------------------------修改手机号码验证结束------------------------------------

	//------------------------------------修改登录密码验证开始------------------------------------
	$('#modify_oldPsw').blur(function() { //旧密码
		var password = $('#modify_oldPsw').val();
		if(password.length > 0) {
			//ajax验证旧密码是否正确
			$.ajax({
				type: 'post',
				url: '/alone/valiPwd',
				dataType: 'json',
				data: {
					password: password
				},
				success: function(d) {
					if(d.status == 'pass') {
						$('#oldPsw_info').attr('class', 'right');
						$('#oldPsw_info').html('');
						$('#modify_oldPsw').attr('val', '1');
					} else if(d.status == 'nopass') {
						$('#oldPsw_info').attr('class', 'error');
						$('#oldPsw_info').html('*旧密码错误');
						$('#modify_oldPsw').attr('val', '0');
					}
				}
			});
		} else {
			$('#oldPsw_info').html('*请输入旧密码');
			$('#oldPsw_info').attr('class', 'error'); //错误信息红色显示
			$('#modify_oldPsw').attr('val', '0');
		}
	});

	$('#modify_newPsw').blur(function() { //新密码
		var newpwd = $('#modify_newPsw').val();
		if(newpwd.length > 0) {
			if(newpwd.match(/^[A-Za-z0-9]{6,19}$/)) { //密码格式
				$('#newPsw_info').attr('class', 'right');
				$('#newPsw_info').html('');
				$('#modify_newPsw').attr('val', '1');
			} else {
				$('#newPsw_info').html('*需要输入6-19个包含字母或数字！');
				$('#newPsw_info').attr('class', 'error'); //错误信息红色显示
				$('#modify_newPsw').attr('val', '0');
			}
		} else {
			$('#newPsw_info').html('*请输入新密码');
			$('#newPsw_info').attr('class', 'error'); //错误信息红色显示
			$('#modify_newPsw').attr('val', '0');
		}
	});

	$('#modify_confirmPsw').blur(function() { //确认新密码
		var newpwd = $('#modify_newPsw').val();
		var confirmPwd = $('#modify_confirmPsw').val();
		if(confirmPwd.length > 0) {
			if(newpwd == confirmPwd) {
				$('#confirmPsw_info').html('');
				$('#confirmPsw_info').attr('class', 'right');
				$('#modify_confirmPsw').attr('val', '1');
			} else {
				$('#confirmPsw_info').html('*两次输入的新密码不相同');
				$('#confirmPsw_info').attr('class', 'error'); //错误信息红色显示
				$('#modify_confirmPsw').attr('val', '0');
			}
		} else {
			$('#confirmPsw_info').html('*请再次输入新密码');
			$('#confirmPsw_info').attr('class', 'error'); //错误信息红色显示
			$('#modify_confirmPsw').attr('val', '0');
		}
	});

	$('#submit-modify-pwd').click(function() { //提交修改登录密码操作
		var password = $('#modify_oldPsw').val();
		var newpwd = $('#modify_newPsw').val();
		var confirmPwd = $('#modify_confirmPsw').val();
		var password_val = $('#modify_oldPsw').attr('val');
		var newpwd_val = $('#modify_newPsw').attr('val');
		var confirmPwd_val = $('#modify_confirmPsw').attr('val');
		var formrandid = $('#formrandid').val();
		if(password.length > 0 && newpwd.length > 0 && confirmPwd.length > 0) {
			if(password_val == 1 && newpwd_val == 1 && confirmPwd_val == 1) {
				//ajax提交修改登录密码
				$.ajax({
					type: 'post',
					url: '/operate/passwordAjax',
					dataType: 'json',
					data: {
						newpwd: newpwd,
						password: password,
						formrandid: formrandid
					},
					success: function(d) {
						if(d.status == 'sucess') {
							layer.alert(d.info);
							window.location.reload();
						} else if(d.status == 'bad') {
							layer.alert(d.info);
							window.location.reload();
						}
					}
				});
			} else {
				layer.alert('请填写正确的信息');
				return false;
			}
		} else {
			layer.alert('请填写必要信息');
			return false;
		}
	});
	//------------------------------------修改登录密码验证结束------------------------------------

	//------------------------------------设置交易密码验证开始------------------------------------
	$('#modify_tradePsw').blur(function() { //交易密码
		var tradePwd = $('#modify_tradePsw').val();
		if(tradePwd.length > 0) {
			if(tradePwd.match(/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,19}$/)) {
				$('#tradePsw_info').html('');
				$('#tradePsw_info').attr('class', 'right');
				$('#modify_tradePsw').attr('val', '1');
			} else {
				$('#tradePsw_info').html('*需要输入6-19个包含字母或数字！');
				$('#tradePsw_info').attr('class', 'error');
				$('#modify_tradePsw').attr('val', '0');
			}
		} else {
			$('#tradePsw_info').html('*请输入交易密码');
			$('#tradePsw_info').attr('class', 'error');
			$('#modify_tradePsw').attr('val', '0');
		}
	});

	$('#modify_confirmTradePsw').blur(function() { //确认交易密码
		var tradePwd = $('#modify_tradePsw').val();
		var confirmTradePwd = $('#modify_confirmTradePsw').val();
		if(confirmTradePwd.length > 0) {
			if(tradePwd == confirmTradePwd) {
				$('#confirmTradePsw_info').html('');
				$('#confirmTradePsw_info').attr('class', 'right');
				$('#modify_confirmTradePsw').attr('val', '1');
			} else {
				$('#confirmTradePsw_info').html('*两次输入的交易密码不相同');
				$('#confirmTradePsw_info').attr('class', 'error');
				$('#modify_confirmTradePsw').attr('val', '0');
			}
		} else {
			$('#confirmTradePsw_info').html('*请输入确认交易密码');
			$('#confirmTradePsw_info').attr('class', 'error');
			$('#modify_confirmTradePsw').attr('val', '0');
		}
	});

	$('#submit-setpaypwd').click(function() { //点击提交设置操作
		var tradePwd = $('#modify_tradePsw').val();
		var confirmTradePwd = $('#modify_confirmTradePsw').val();
		var tradePwd_val = $('#modify_tradePsw').attr('val');
		var confirmTradePwd_val = $('#modify_confirmTradePsw').attr('val');
		var formrandid = $('#formrandid').val();
		if(tradePwd.length > 0 && confirmTradePwd.length > 0) {
			if(tradePwd_val == 1 && confirmTradePwd_val == 1) {
				//ajax设置交易密码
				$.ajax({
					type: 'post',
					url: '/operate/paypasswordAjax',
					dataType: 'json',
					data: {
						paypwd: tradePwd,
						formrandid: formrandid
					},
					success: function(d) {
						if(d.status == 'sucess') {
							layer.alert(d.info);
							location.href = '../user-setting.html';
						} else if(d.status == 'bad') {
							layer.alert(d.info);
							location.href = '../user-setting.html';
						}
					}
				});
			} else {
				layer.alert('请填写正确的信息');
				return false;
			}
		} else {
			layer.alert('请填写必要信息');
			return false;
		}
	});
	//------------------------------------设置交易密码验证结束------------------------------------

	//------------------------------------修改交易密码验证开始------------------------------------
	$('#modify_protoPsw').blur(function() { //旧交易密码
		var protoPsw = $('#modify_protoPsw').val();
		if(protoPsw.length > 0) {
			//ajax验证旧交易密码是否正确
			$.ajax({
				type: 'post',
				url: '/alone/valiPayPwd',
				dataType: 'json',
				data: {
					paypwd: protoPsw
				},
				success: function(d) {
					if(d.status == 'pass') {
						$('#protoPsw_info').attr('class', 'right');
						$('#protoPsw_info').html('');
						$('#modify_protoPsw').attr('val', '1');
					} else if(d.status == 'nopass') {
						$('#protoPsw_info').attr('class', 'error');
						$('#protoPsw_info').html('*旧交易密码错误');
						$('#modify_protoPsw').attr('val', '0');
					}
				}
			});
		} else {
			$('#modify_protoPsw').attr('val', '0');
			$('#protoPsw_info').html('*请输入原始交易密码');
			$('#protoPsw_info').attr('class', 'error');
		}
	});

	$('#sendcode-paypwd').click(function() { //发送手机验证码
		var boolhref = parseInt($(this).attr("data-href"));
		if(!boolhref) {
			return false;
		}
		var protoPsw = $('#modify_protoPsw').val();
		var protoPsw_val = $('#modify_protoPsw').attr('val');
		var telNum = $('#sendcode-paypwd').attr('mobile');
		var typecode = $('#sendcode-paypwd').attr('typecode');
		var _this = $("#sendcode-paypwd");
		_this.attr("data-time", 60);
		//		time(_this);
		//		_this.attr("data-href",0)
		if(protoPsw.length > 0) {
			if(protoPsw_val == 1) {
				//ajax发送短信验证码
				$.ajax({
					url: '/alone/sendSMSS',
					type: 'post',
					data: {
						mobile: telNum,
						typecode: typecode
					},
					dataType: 'json',
					success: function(d) {
						if(d.status == 'success') {
							layer.alert('验证码已发送，请注意查收');
						} else {
							layer.alert('验证码发送失败');
						}
					}
				});
				$('#modify_protoPsw').attr('val', '1');
				$('#protoPsw_info').html('');
				$('#protoPsw_info').attr('class', 'right');

				//layer.alert(obj);
				time(_this);
				_this.attr("data-href", 0)
			} else {
				$('#modify_protoPsw').attr('val', '0');
				$('#protoPsw_info').html('*旧交易密码错误');
				$('#protoPsw_info').attr('class', 'error');
			}
		} else {
			$('#modify_protoPsw').attr('val', '0');
			$('#protoPsw_info').html('*请输入原始交易密码');
			$('#protoPsw_info').attr('class', 'error');
		}
	});

	$('#modify_psw_telCpt').blur(function() { //手机验证码
		console.log(2)
		var psw_telCpt = $('#modify_psw_telCpt').val();
		var mobile = $('#sendcode-paypwd').attr('mobile');
		if(psw_telCpt.length > 0) {
			//ajax验证验证码是否正确
			$.ajax({
				type: 'post',
				url: '/alone/valiSMSS',
				dataType: 'json',
				data: {
					smsscode: psw_telCpt,
					mobile: mobile
				},
				success: function(d) {
					if(d.status == 'pass') {
						$('#psw_telCpt_info').html('');
						$('#modify_psw_telCpt').attr('val', '1');
						$('#psw_telCpt_info').attr('class', 'right');
					} else if(d.status == 'nopass') {
						$('#psw_telCpt_info').html('*验证码错误');
						$('#modify_psw_telCpt').attr('val', '0');
						$('#psw_telCpt_info').attr('class', 'error');
						return false;
					}
				}
			});
		} else {
			$('#modify_psw_telCpt').attr('val', '0');
			$('#psw_telCpt_info').html('*请输入手机验证码');
			$('#psw_telCpt_info').attr('class', 'error');
		}
	});

	$('#modify_newTradePsw').blur(function() { //新交易密码验证
		var newTradePsw = $('#modify_newTradePsw').val();
		if(newTradePsw.length > 0) {
			if(newTradePsw.match(/^[A-Za-z0-9]{6,19}$/)) {
				$('#modify_newTradePsw').attr('val', '1');
				$('#newTradePsw_info').html('');
				$('#newTradePsw_info').attr('class', 'right');
			} else {
				$('#modify_newTradePsw').attr('val', '0');
				$('#newTradePsw_info').html('*需要输入6-19个包含字母或数字！');
				$('#newTradePsw_info').attr('class', 'error');
			}
		} else {
			$('#modify_newTradePsw').attr('val', '0');
			$('#newTradePsw_info').html('*请输入新交易密码');
			$('#newTradePsw_info').attr('class', 'error');
		}
	});

	$('#modify_confirm_newTradePsw').blur(function() { //确认交易密码验证
		var confirm_newTradePsw = $('#modify_confirm_newTradePsw').val();
		var newTradePsw = $('#modify_newTradePsw').val();
		if(confirm_newTradePsw.length > 0) {
			if(newTradePsw == confirm_newTradePsw) {
				$('#modify_confirm_newTradePsw').attr('val', '1');
				$('#confirm_newTradePsw_info').html('');
				$('#confirm_newTradePsw_info').attr('class', 'right');
			} else {
				$('#modify_confirm_newTradePsw').attr('val', '0');
				$('#confirm_newTradePsw_info').html('*两次输入的交易密码不相同');
				$('#confirm_newTradePsw_info').attr('class', 'error');
			}
		} else {
			$('#modify_confirm_newTradePsw').attr('val', '0');
			$('#confirm_newTradePsw_info').html('*请输入确认交易密码');
			$('#confirm_newTradePsw_info').attr('class', 'error');
		}
	});

	$('#submit-modify-paypwd').click(function() { //修改操作
		var protoPsw = $('#modify_protoPsw').val();
		var protoPsw_val = $('#modify_protoPsw').attr('val');
		var psw_telCpt = $('#modify_psw_telCpt').val();
		var psw_telCpt_val = $('#modify_psw_telCpt').attr('val');
		var newTradePsw = $('#modify_newTradePsw').val();
		var newTradePsw_val = $('#modify_newTradePsw').attr('val');
		var confirm_newTradePsw = $('#modify_confirm_newTradePsw').val();
		var confirm_newTradePsw_val = $('#modify_confirm_newTradePsw').attr('val');
		var mobile = $('#sendcode-paypwd').attr('mobile');
		var formrandid = $('#formrandid').val();
		if(protoPsw.length > 0 && psw_telCpt.length > 0 && newTradePsw.length > 0 && confirm_newTradePsw.length > 0) {
			if(protoPsw_val == 1 && psw_telCpt_val == 1 && newTradePsw_val == 1 && confirm_newTradePsw_val == 1) {
				//ajax修改交易密码
				$.ajax({
					type: 'post',
					url: '/operate/modifyPaypwdAjax',
					dataType: 'json',
					data: {
						paypwd: newTradePsw,
						oldpwd: protoPsw,
						smcode: psw_telCpt,
						formrandid: formrandid,
						mobile: mobile
					},
					success: function(d) {
						if(d.status == 'sucess') {
							layer.alert(d.info);
							location.href = '../user-setting.html';
						} else if(d.status == 'bad') {
							layer.alert(d.info);
							location.href = '../user-setting.html';
							return false;
						}
					}
				});
			} else {
				layer.alert('请填写正确的信息');
				return false;
			}
		} else {
			layer.alert('请填写必要信息');
			return false;
		}
	});
	//------------------------------------修改交易密码验证结束------------------------------------

	//------------------------------------找回交易密码验证开始------------------------------------
	$('#sendcode-find').click(function() { //发送手机验证码
		var mobile = $('#sendcode-find').attr('mobile');
		var typecode = $('#sendcode-find').attr('typecode');
		//ajax发送短信验证码
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
					layer.alert('验证码已发送，请注意查收');
				} else {
					layer.alert('验证码发送失败');
				}
			}
		});
	});

	$('#modify_fb_telCpt').blur(function() { //手机验证码验证
		var fb_telCpt = $('#modify_fb_telCpt').val();
		var mobile = $('#sendcode-find').attr('mobile');
		console.log(3)
		if(fb_telCpt.length > 0) {
			//ajax判断手机验证码是否正确
			$.ajax({
				type: 'post',
				url: '/alone/valiSMSS',
				dataType: 'json',
				data: {
					smsscode: fb_telCpt,
					mobile: mobile
				},
				success: function(d) {
					if(d.status == 'pass') {
						$('#fb_telCpt_info').html('');
						$('#modify_fb_telCpt').attr('val', '1');
						$('#fb_telCpt_info').attr('class', 'right');
					} else if(d.status == 'nopass') {
						$('#fb_telCpt_info').html('*验证码错误');
						$('#modify_fb_telCpt').attr('val', '0');
						$('#fb_telCpt_info').attr('class', 'error');
						return false;
					}
				}
			});
		} else {
			$('#fb_telCpt_info').html('*请输入手机验证码');
			$('#fb_telCpt_info').attr('class', 'error');
			$('#modify_fb_telCpt').attr('val', '0');
		}
	});

	$('#modify_idNum').blur(function() { //身份证号码验证
		var idNum = $('#modify_idNum').val();
		if(idNum.length > 0) {
			if(idNum.match(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/) || idNum.match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/)) {
				//ajax验证身份证号码
				$.ajax({
					type: 'post',
					url: '/alone/valiUserIdcard',
					dataType: 'json',
					data: {
						idcard: idNum
					},
					success: function(d) {
						if(d.status == 'pass') {
							$('#idNum_info').html('');
							$('#idNum_info').attr('class', 'right');
							$('#modify_idNum').attr('val', '1');
						} else if(d.status == 'nopass') {
							$('#idNum_info').html(d.info);
							$('#idNum_info').attr('class', 'error');
							$('#modify_idNum').attr('val', '0');
						}
					}
				});
			} else {
				$('#idNum_info').html('*请输入有效身份证号码');
				$('#idNum_info').attr('class', 'error');
				$('#modify_idNum').attr('val', '0');
			}
		} else {
			$('#idNum_info').html('*请输入身份证号码');
			$('#idNum_info').attr('class', 'error');
			$('#modify_idNum').attr('val', '0');
		}
	});

	$('#reset-paypwd').click(function() { //确认提交，重设交易密码
		var fb_telCpt = $('#modify_fb_telCpt').val();
		var fb_telCpt_val = $('#modify_fb_telCpt').attr('val');
		var idNum = $('#modify_idNum').val();
		var idNum_val = $('#modify_idNum').attr('val');
		if(fb_telCpt.length > 0 && idNum.length > 0) {
			if(fb_telCpt_val == 1 && idNum_val == 1) {
				//跳出重设密码界面
				$('#set-tradePwd').css('display', 'block');
				$('#modify-tradePwd').css('display', 'none');
				$('#modify_fb_form').css('display', 'none');
			} else {
				layer.alert('请填写正确的信息');
				return false;
			}
		} else {
			layer.alert('请填写必要信息');
			return false;
		}
	});
	//------------------------------------找回交易密码验证结束------------------------------------

	//------------------------------------绑定银行卡验证开始------------------------------------
	$('#modify_bank').change(function() { //银行验证
		var bank = $('#modify_bank').val();
		if(bank.length > 0) {
			$('#bank_info').attr('class', 'right'); //√
			$('#bank_info').html('');
			$('#modify_bank').attr('val', '1');
		} else {
			$('#bank_info').html('*请选择银行');
			$('#modify_bank').attr('val', '0');
			$('#bank_info').attr('class', 'error'); //错误信息红色显示
			return false;
		}
	});

	$('#modify_province').change(function() { //省份验证
		var provinceid = $('#modify_province').val();
		if(provinceid.length > 0) {
			//ajax省市联动
			$.ajax({
				type: 'post',
				url: '/alone/cityAjax',
				dataType: 'text',
				data: "provinceid=" + provinceid,
				success: function(d) {
					$('#modify_city').html(d);
					$('#modify_province').attr('val', '1');
					$('#modify_city').attr('val', '1');
					$('#local_info').html('');
					$('#local_info').attr('class', 'right'); //√
				}
			});
		} else {
			$('#modify_city').html('');
			$('#modify_province').attr('val', '0');
			$('#local_info').html('*请选择省市');
			$('#local_info').attr('class', 'error');
			return false;
		}
	});

	$('#modify_city').change(function() { //城市验证
		var city = $('#modify_city').val();
		var province_val = $('#modify_province').attr('val');
		if(city.length > 0 && province_val == 1) {

			$('#local_info').html('');
			$('#modify_city').attr('val', '1');
			$('#local_info').attr('class', 'right'); //√
		} else {
			$('#local_info').html('*请选择省市');
			$('#modify_city').attr('val', '0');
			$('#local_info').attr('class', 'error'); //错误信息红色显示
		}
	});

	$('#modify_netShop').blur(function() { //开户行网点验证
		var netShop = $('#modify_netShop').val();
		if(netShop.length > 0) {
			$('#netShop_info').attr('class', 'right'); //√
			$('#netShop_info').html('');
			$('#modify_netShop').attr('val', '1');
		} else {
			$('#netShop_info').html('*请输入开户行网点');
			$('#modify_netShop').attr('val', '0');
			$('#netShop_info').attr('class', 'error'); //错误信息红色显示
			return false;
		}
	});

	$('#modify_cardNum').blur(function() { //银行卡卡号验证
		var cardNum = $('#modify_cardNum').val();
		if(cardNum.length > 0) {
			if(cardNum.length >= 16 && cardNum.length <= 19) { //验证长度
				//ajax判断该卡号是否被占用
				$.ajax({
					type: 'post',
					url: '/alone/valiBankcard/',
					dataType: 'json',
					data: {
						bankcard: cardNum
					},
					success: function(d) {
						if(d.status == 'pass') {
							$('#bankCard_info').attr('class', 'right'); //√
							$('#bankCard_info').html('');
							$('#modify_cardNum').attr('val', '1');
						} else if(d.status == 'nopass') {
							$('#bankCard_info').html(d.info);
							$('#modify_cardNum').attr('val', '0');
							$('#bankCard_info').attr('class', 'error');
							return false;
						}
					}
				});
			} else {
				$('#bankCard_info').html('*银行卡号格式错误');
				$('#modify_cardNum').attr('val', '0');
				$('#bankCard_info').attr('class', 'error');
				return false;
			}
		} else {
			$('#bankCard_info').html('*请输入银行卡号');
			$('#modify_cardNum').attr('val', '0');
			$('#bankCard_info').attr('class', 'error');
			return false;
		}
	});

	$('#modify_confirm').blur(function() { //确认卡号验证
		var confirm = $('#modify_confirm').val();
		var cardNum = $('#modify_cardNum').val();
		if(confirm.length > 0) {
			if(confirm != cardNum) {
				$('#bandCard_confirm_info').html('*两次输入的卡号不相同');
				$('#modify_confirm').attr('val', '0');
				$('#bandCard_confirm_info').attr('class', 'error');
				return false;
			} else {
				$('#bandCard_confirm_info').html('');
				$('#modify_confirm').attr('val', '1');
				$('#bandCard_confirm_info').attr('class', 'right');
			}
		} else {
			$('#bandCard_confirm_info').html('*请确认您的卡号');
			$('#modify_confirm').attr('val', '0');
			$('#bandCard_confirm_info').attr('class', 'error');
			return false;
		}
	});

	$('#sendcode').click(function() { //发送手机验证码
		var boolhref = parseInt($(this).attr("data-href"));
		if(!boolhref) {
			return false;
		}
		var bank = $('#modify_bank').val();
		var netShop = $('#modify_netShop').val();
		var cardNum = $('#modify_cardNum').val();
		var provinceid = $('#modify_province').val();
		var city = $('#modify_city').val();
		var bank_val = $('#modify_bank').attr('val');
		var netShop_val = $('#modify_netShop').attr('val');
		var cardNum_val = $('#modify_cardNum').attr('val');
		var province_val = $('#modify_province').attr('val');
		var city_val = $('#modify_city').attr('val');
		var mobile = $('#sendcode').attr('mobile'); //默认绑定的手机号码
		var smcode = $('#sendcode').attr('typecode'); //短信模板id
		var _this = $(this);
		_this.attr("data-time", 60);
		//		_this.attr("data-href",0);
		//		time(_this);
		if(bank.length > 0 && netShop.length > 0 && cardNum.length > 0 && provinceid.length > 0 && city.length > 0) {
			if(bank_val == 1 && netShop_val == 1 && cardNum_val == 1 && province_val == 1 && city_val == 1) {
				$.ajax({
					url: '/alone/sendSMSS',
					type: 'post',
					data: {
						mobile: mobile,
						typecode: smcode
					},
					dataType: 'json',
					success: function(d) {
						if(d.status == 'success') {
							layer.alert('验证码已发送，请注意查收');
						} else {
							layer.alert('验证码发送失败');
						}
					}
				});
				_this.attr("data-href", 0);
				time(_this);
			} else {
				layer.alert('请填写正确的信息');
				return false;
			}
		} else {
			layer.alert('请填写必要信息');
			return false;
		}
	});

	function modify() {
		console.log(4)
		var telCpt = $('#modify_telCpt').val(); //验证码
		var mobile = $('#sendcode').attr('mobile'); //默认绑定的手机号码
		if(telCpt.length > 0) {
			//ajax判断该验证码是否正确
			$.ajax({
				type: 'post',
				url: '/alone/valiSMSS',
				dataType: 'json',
				data: {
					smsscode: telCpt,
					mobile: mobile
				},
				success: function(d) {
					if(d.status == 'pass') {
						$('#telCpt_info').html('');
						$('#modify_telCpt').data('status', '1');
						$('#telCpt_info').attr('class', 'right');
					} else if(d.status == 'nopass') {
						$('#telCpt_info').html('*验证码错误');
						$('#modify_telCpt').data('status', '0');
						$('#telCpt_info').attr('class', 'error');
						return false;
					}
				}
			});
		} else {
			$('#telCpt_info').html('*请输入手机验证码');
			$('#modify_telCpt').data('status', '0');
			$('#telCpt_info').attr('class', 'error');
			return false;
		}
	}
	//$('#modify_telCpt').blur(function(){//手机验证码验证
	//
	//});
	$(document).on('click', "#btn_bankCard", function() { //绑定银行卡操作
		var bank = $('#modify_bank').val();
		var netShop = $('#modify_netShop').val();
		var cardNum = $('#modify_cardNum').val();
		var province = $('#modify_province').val();
		var city = $('#modify_city').val();
		var bank_val = $('#modify_bank').attr('val');
		var netShop_val = $('#modify_netShop').attr('val');
		var cardNum_val = $('#modify_cardNum').attr('val');
		var province_val = $('#modify_province').attr('val');
		var city_val = $('#modify_city').attr('val');
		var formrandid = $('#formrandid').val(); //用于防止重复提交的id
		if(bank.length > 0 && netShop.length > 0 && cardNum.length > 0 && province.length > 0 && city.length > 0) {
			if(bank_val == 1 && netShop_val == 1 && cardNum_val == 1 && province_val == 1 && city_val == 1) {
				modify();
				var telCpt_val = $('#modify_telCpt').val();
				if(!telCpt_val) {
					layer.alert('请输入正确的验证码');
					return false;
				}
				//ajax绑定银行卡操作
				$.ajax({
					type: 'post',
					url: '/operate/bankCardAjax',
					dataType: 'json',
					data: {
						cardnum: cardNum,
						bankname: bank,
						province: province,
						city: city,
						netShop: netShop,
						formrandid: formrandid
					},
					success: function(d) {
						if(d.status == 'success') {
							layer.open({
								content: d.info,
								btn: ['确定'],
								yes: function(index) {
									window.location.href = "../user-setting.html";
								}
							});
						} else if(d.status == 'bad') {
							layer.alert(d.info)
						}
					}
				});
			} else {
				layer.alert('请填写正确的信息');
				return false;
			}
		} else {
			layer.alert('请填写必要信息');
			return false;
		}
	});
	//------------------------------------绑定银行卡验证结束------------------------------------

	//------------------------------------发送短信间隔1分钟------------------------------------
	function time(o) {
		var boolhref = parseInt(o.attr("data-href"));
		//		o.attr("data-time",60);
		var wait = parseInt(o.attr("data-time"));
		if(wait == 0) {
			o.text("重新发送");
			o.value = "重新发送";
			o.attr("data-href", 1);
		} else {
			wait--;
			o.text("发送中(" + wait + ")");
			o.attr("data-time", wait);
			setTimeout(function() {
				time(o);
			}, 1000);
		}
	}
	//------------------------------------发送短信间隔1分钟------------------------------------

	/*************************************设置与修改交易密码切换开始***************************************/
	$('#click-set-paypwd').click(function() { //设置交易密码
		$('#set-tradePwd').css('display', 'block');
		$('#modify-tradePwd').css('display', 'none');
		$(this).parents("dl").children("dd").find(".modify-title").text("设置交易密码");
	});

	$('#click-modify-paypwd').click(function() { //修改交易密码
		$('#set-tradePwd').css('display', 'none');
		$('#modify-tradePwd').css('display', 'block');
		$(this).parents("dl").children("dd").find(".modify-title").text("修改交易密码");
	});
	/*************************************设置与修改交易密码切换结束***************************************/
	$(".safe-tab>li>a").on("click", function() {
		$(".safe-tab>li>a").removeClass("safe-current");
		$(this).addClass("safe-current");
		var tabIndex = $(this).parent("li").index();
		console.log(tabIndex);
		$(".safe-box").hide();
		$(".safe-box").eq(tabIndex).show();
	})
	$("#myAccount-vip").on("click", function() {
		$(".safe-box").hide();
		$(".safe-box").eq(1).show();
		$(".safe-tab>li>a").removeClass("safe-current");
		$(".safe-tab>li").eq(1).children("a").addClass("safe-current");
	})
	$("#myAccount-level").on("click", function() {
		$(".safe-box").hide();
		$(".safe-box").eq(0).show();
		$(".safe-tab>li>a").removeClass("safe-current");
		$(".safe-tab>li").eq(0).children("a").addClass("safe-current");
	})
	$("#section2-btn1").on("click", function() {
		var banktype = $("#banktype").val();
		var isAuthen = $("#isAuthen").val();
		var userMoney = parseInt($("#user-money").val());
		var data = {};
		data.userMoney = userMoney;
		if(banktype == 2) {
			layer.alert("为了保障您的收益，请先进行实名认证和绑定银行卡");
			return false;
		}
		if(isAuthen == "false") {
			layer.alert("为了保障您的收益，请先进行实名认证和绑定银行卡");
			return false;
		}
		if(userMoney < 120) {
			layer.open({
				content: '您的可用余额不足，立即前往充值',
				yes: function(index, layero) {
					//按钮【按钮一】的回调
					window.location.href = "/user-index.html";
				}
			});
		}
		layer.open({
			content: '您即将开通国富通VIP会员服务<br/>金额：120RMB',
			btn: ['立即购买'],
			yes: function(index, layero) {
				//按钮【按钮一】的回调
				$.ajax({　　
					type: "POST", //用POST方式传输
					　　dataType: "json", //数据格式:JSON
					　　url: '', //目标地址
					　　data: data,
					　　success: function(data) {
						if(data.status === 'success') {} else if(data.code == '401') {
							layer.alert(data.info);
						}
					}
				});
			}
		});
	})
});