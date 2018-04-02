<!DOCTYPE html>
<html>

	<head lang="zh-cmn-Hans">

		<meta charset="UTF-8">

		<title>[国富通]账户设置</title>

		<meta name="keywords" content="国富通,国富通P2P,网上投资,投资理财,网络借贷, 融资借贷 ,网上理财,安全理财">

		<meta name="description" content="国富通—安全，专业的网络借款、理财平台。提供便捷、安全、低门槛的个人理财和抵押、信用贷款服务。国富通以稳健的风控和专业的团队，为投资者提供年化收益高达18-24%的网上理财服务。对接投资信息与融资需求，致力于建设中国唯一高效互联网金融工具。">

		<meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1">
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/commonV3.css">
		<link rel="stylesheet" type="text/css" href="css/accountV3.css" />
		<link rel="stylesheet" href="css/skin/layer.css">

		<link href="head/cropper.min.css" rel="stylesheet">
		<link href="head/sitelogo.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
		<link rel="stylesheet" href="css/account_set.css">
	</head>

	<div class="modal fade" id="avatar-modal" aria-hidden="true" aria-labelledby="avatar-modal-label" role="dialog" tabindex="-1">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<!--<form class="avatar-form" action="upload-logo.php" enctype="multipart/form-data" method="post">-->
				<form class="avatar-form">
					<div class="modal-header">
						<button class="close" data-dismiss="modal" type="button">&times;</button>
						<h4 class="modal-title" id="avatar-modal-label">上传图片</h4>
					</div>
					<div class="modal-body">
						<div class="avatar-body">
							<div class="avatar-upload">
								<input class="avatar-src" name="avatar_src" type="hidden">
								<input class="avatar-data" name="avatar_data" type="hidden" value = "data">
								<label for="avatarInput" style="line-height: 35px;">图片上传</label>
								<button class="btn btn-danger" type="button" style="height: 35px;" onClick="$('input[id=avatarInput]').click();">请选择图片</button>
								<span id="avatar-name"></span>
								<input class="avatar-input hide" id="avatarInput" name="avatar_file" type="file"></div>
							<div class="row">
								<div class="col-md-9">
									<div class="avatar-wrapper"></div>
								</div>
								<div class="col-md-3">
									<div class="avatar-preview preview-lg" id="imageHead"></div>
									<!--<div class="avatar-preview preview-md"></div>
                        <div class="avatar-preview preview-sm"></div>-->
								</div>
							</div>
							<div class="row avatar-btns">
								<div class="col-md-4">
									<div class="btn-group">
										<button class="btn btn-danger fa fa-undo" data-method="rotate" data-option="-90" type="button" title="Rotate -90 degrees"> 向左旋转</button>
									</div>
									<div class="btn-group">
										<button class="btn  btn-danger fa fa-repeat" data-method="rotate" data-option="90" type="button" title="Rotate 90 degrees"> 向右旋转</button>
									</div>
								</div>
								<div class="col-md-5" style="text-align: right;">
									<button class="btn btn-danger fa fa-arrows" data-method="setDragMode" data-option="move" type="button" title="移动">
							            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="$().cropper(&quot;setDragMode&quot;, &quot;move&quot;)">
							            </span>
                                </button>
									<button type="button" class="btn btn-danger fa fa-search-plus" data-method="zoom" data-option="0.1" title="放大图片">
							            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="$().cropper(&quot;zoom&quot;, 0.1)">
							              <!--<span class="fa fa-search-plus"></span>-->
							            </span>
                                </button>
									<button type="button" class="btn btn-danger fa fa-search-minus" data-method="zoom" data-option="-0.1" title="缩小图片">
							            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="$().cropper(&quot;zoom&quot;, -0.1)">
							              <!--<span class="fa fa-search-minus"></span>-->
							            </span>
                                </button>
									<button type="button" class="btn btn-danger fa fa-refresh" data-method="reset" title="重置图片">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="$().cropper(&quot;reset&quot;)" aria-describedby="tooltip866214"></span>
                                </button>
								</div>
								<div class="col-md-3">
									
									<input class="btn btn-danger btn-block  "  type="button" value = "保存修改"/> 
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="loading" aria-label="Loading" role="img" tabindex="-1"></div>

	<body>
		<header id="header">

			<div class="header-top">

				<div class="layout clear-fix">

					<p class="hot-line">客服热线：4000-360-995（工作日9:00-18:00）</p>

					<ul class="followus">

						<li>

							<a href="javascript:void(0)" class="icon-sns qq">
								<div class="social-content" style="display: none;">
									<p class="social-title">国富通官方QQ群</p>
									<p>官方一群：339103562</p>
									<p>官方二群：229094780</p>
								</div>
							</a>

						</li>
						<li>

							<a href="javascript:void(0)" class="icon-sns weixin">

								<div class="social-content" style="display: none;">

									<p class="social-title">扫描关注微信公众号</p>

									<p><img src="images/wechat2.png"></p>

								</div>

							</a>

						</li>
						<li>

							<a href="http://weibo.com/gftp2p" target="_blank" class="icon-sns weibo"></a>

						</li>

					</ul>
					<ul class="header-top-r">

						<li class="lists" id="list">
							<a href="javascript:void(0)" style="margin-right: 15px;">尊敬的【150****8297】欢迎您 !</a>
							<a class="lists-l" href="javascript:void(0)">安全退出</a>
							<!--<a class="lists-l" id="name-list" href="http://www.gftbank.cn/login.html">登录 </a>-->
						</li>
						<!--<li class="lists">
                    <a class="lists-l" href="/reg.html">注册</a>
                </li>-->
						<li class="lists list3">
							<a href="javascript:void(0)">手机APP
								<div class="app-banner">
									<div class="banner-img">
										<img src="images/wechatApp.png" />
									</div>
									<div class="banner-detail">
										app客户端下载
									</div>
								</div>
							</a>
						</li>
						<li class="lists ">
							<a href="/aboutus.html">帮助中心</a>
						</li>
						<li class="lists list-last">
							<a href="/guide.html">新手指引</a>
						</li>
					</ul>

				</div>

			</div>
			<div class="layout header-logoWrap">

				<div class="header-navWrap">

					<nav class="header-nav">
						<ul>

							<li class="lists ">
								<a class="lists-l lists-dot" href="index.html">首页</a>
							</li>

							<li class="lists ">
								<a class="lists-l lists-dot" href="/invest.html">我要投资</a>
							</li>

							<li class="lists  ">
								<a class="lists-l lists-dot" href="safety.html">安全措施</a>
							</li>

							<li class="lists ">
								<a class="lists-l lists-dot" href="/safety.html">信息披露</a>
							</li>

							<li class="lists current ">
								<a class="lists-l" href="http://www.gftbank.cn/login.html">我的账户</a>
							</li>

						</ul>

					</nav>

				</div>

				<h1>

            <a href="/"><img src="images/logo.png" title="国富通" alt="国富通logo"></a>

        </h1>
			</div>
		</header>
		<div class="user-section">
			<!--banktype有绑卡实名为1，没有为2-->
			<input type="hidden" name="banktype" id="banktype" value="1" />
			<!--是否实名-->
			<input type="hidden" name="isAuthen" id="isAuthen" value="true" />
			<!--余额-->
			<input type="hidden" name="user-money" id="user-money" value="120" />
			<input type="hidden" name="formrandid" value="519511" id="formrandid">
			<div class="layout">
				<div class="user-nav">
					<div class="nav-list1">
						<div class="nav-icon">
							<img src="images/newCopyRight/user/74x74.png" />
						</div>
						<div class="nav-person">
							<div class="person-name">您好！131****0485</div>
							<!--images/newCopyRight/user/vip1.png是普通会员路径；images/newCopyRight/user/vip2.png是特权会员-->
							<div class="person-vip">会员等级：VIP
								<div class="vip-icon"><img src="images/newCopyRight/user/vip1.png" /></div>
							</div>
						</div>
					</div>
					<!--跳转到账户设置页面-->
					<ul class="nav-list2">
						<li>
							<a href="javascript:void(0)" class="nav-status1"></a>
						</li>
						<li>
							<a href="javascript:void(0)" class="nav-status2"></a>
						</li>
						<li class="li-last">
							<a href="javascript:void(0)" class="nav-status3"></a>
						</li>
					</ul>
					<div class="nav-line"></div>
					<ul class="nav-lists">
						<li class="list-col ">
							<a class="col-link col-acc" href="javascript:void(0)">账户总览</a>
						</li>
						<li class="list-col current">
							<a class="col-link col-mng" href="javascript:void(0)">账户设置</a>
						</li>
						<li class="list-col ">
							<a class="col-link col-ive" href="javascript:void(0)">我的投资</a>
						</li>
						<li class="list-col ">
							<a class="col-link col-ivi" href="javascript:void(0)">我的卡券</a>
						</li>
						<li class="list-col ">
							<a class="col-link col-quan" href="javascript:void(0)">邀请好友</a>
						</li>
						<li class="list-col ">
							<a class="col-link col-msg" href="javascript:void(0)">消息中心</a>
						</li>
						<li class="list-col ">
							<a class="col-link col-loan" href="javascript:void(0)">我的借款</a>
						</li>
					</ul>
				</div>
				<div class="account_content">
					<div class="account_tit">
						账户设置
					</div>
					<div class="change_head">
						<div class="head_img left user_pic">
							<img src="images/set/head.png" alt="">
							<div></div>
							<a href="javascript:;" class="" data-toggle="modal" data-target="#avatar-modal">更换头像</a>
						</div>
						<ul class="set_list left">
							<dl class="mag-accName">
								<dt class="accName-title"><span class = "modify-user"><label>账户名：</label>RUixqmuOdC7Jc</span>
				                               <span class="modify-btn modify-btn1">修改</span>
				                                </dt>
								<dd class="modify-area" style="display: none; opacity: 0; top: -20px; height: 0px;">
									<div class="modify-layout">
										<p class="col-r modify-inst">我们自动为您分配的用户名为：<span>RUixqmuOdC7Jc</span><br/><span class="modify-care">您可以现在修改您的用户名（只能更改一次）</span></p>
										<div class="modify-form">
											<table>
												<colgroup>
													<col style="width: 158px;">
													<col style="width: 158px;">
													<col>
													<col>
												</colgroup>
												<tbody>
													<tr class="modify-tr">
														<td><label for="modify_accName">输入帐户名：</label></td>
														<td colspan="2"><input id="modify_accName" class="modify-accName" type="text"></td>
														<td>
															<span class = "accName_info" id="accName_info">&nbsp;</span>
														</td>
													</tr>
													<tr class="modify-tr">
														<td></td>
														<td><input class="btn submit-btn accName-submit" type="submit" value="提交确认" id="modify-username"></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="modify-desBox">
											<div class="des-title">温馨提示：</div>
											<p class="modify-des">1、昵称可以是2-12位的中文或字母、数字、下划线的组合。</p>
											<p class="modify-des">2、昵称初始是与用户名相同的，您可以给自己修改一个更加个性化的昵称。</p>
											<p class="modify-des">3、账户也可以使用您注册的手机号登录</p>
											<p class="modify-des">4、如果有特殊情况请联系我们的客服</p>
											<p class="modify-des">5、请您牢记您更改过得用户名，因为这是您登录我们国富通的凭证</p>
										</div>
									</div>
									<span class="close-btn"></span>
								</dd>
							</dl>
							<li><span class="six">会员等级：</span><span>普通会员</span></li>
							<li>
								<a href="javascript:;" id = "myAccount-vip">购买VIP（如果是VIP则显示倒计时间/天）</a>
							</li>
							<li class="last"><span class="six">安全级别：</span><span>低</span></li>
							<li class="last">
								<a href="javascript:;" id = "myAccount-level">提升</a>
							</li>
						</ul>
					</div>
					<div class="safe-set ">
						<ul class="safe-tab account_tit">
							<li>
								<a class="safe-current" href="javascript:void(0)">安全设置</a>
							</li>
							<li>
								<a href="javascript:void(0)">VIP</a>
							</li>
						</ul>
						<ul class="safe-box safe-box1" style="display: block;">
							<!--登录密码只有修改状态-->
							<li class="modify-list">
								<dl>
									<dt>
										<span class="modify-mark modify-mark1"></span>
										<span class="modify-name">登录密码</span>
					                    <span class="modify-status">已设置</span>
					                    <span class="modify-btn">修改</span>
				                     </dt>
									<dd class="modify-area">
										<div class="modify-title">修改登陆密码</div>
										<div class="modify-layout">
											<div class="modify-form">
												<table>
													<colgroup>
														<col style="width: 160px;">
														<col style="width: 158px;">
														<col>
														<col>
													</colgroup>
													<tr class="modify-tr">
														<td><label for="modify_oldPsw">输入旧密码：</label></td>
														<td colspan="2"><input id="modify_oldPsw" class="modify-oldPsw" type="password"></td>
														<td>　<span id="oldPsw_info"></span></td>
													</tr>
													<tr class="modify-tr">
														<td><label for="modify_newPsw">输入新密码：</label></td>
														<td colspan="2"><input id="modify_newPsw" class="modify-newPsw" type="password"></td>
														<td>　<span id="newPsw_info"></span></td>
													</tr>
													<tr class="modify-tr">
														<td><label for="modify_confirmPsw">再次输入新密码：</label></td>
														<td colspan="2"><input id="modify_confirmPsw" class="modify-confirmPsw" type="password"></td>
														<td>　<span id="confirmPsw_info"></span></td>
													</tr>
													<tr class="modify-tr">
														<td></td>
														<td><input class="btn submit-btn" type="submit" value="修改登录密码" id="submit-modify-pwd"></td>
													</tr>
												</table>
											</div>
											<div class="modify-desBox">
												<p class="modify-des">1. 请牢记您设置的新密码，登录密码可通过密码找回功能找回</p>
												<p class="modify-des">2. 过程遇到问题，请联系客服，4000-360-995</p>
											</div>
										</div>
										<span class="close-btn"></span>
									</dd>
								</dl>
							</li>
							<!-- 未认证则加 class false，有已认证和为认证两种状态-->
							<li class="modify-list false">
							<!--php<li class="modify-list ">-->
								<dl>
									<dt>
				                        <span class="modify-mark modify-mark2"></span>
				                        <span class="modify-name">实名认证</span>
                                        <span class="modify-status">未认证</span>
                                        <!--php<span class="modify-status">已认证</span>-->
                                        <span class="modify-btn">立即认证</span>
                                        <!--php<span class="modify-btn"></span>-->
                        			</dt>
									<dd class="modify-area">
										<div class="modify-title">实名验证</div>
										<div class="modify-layout">
											<table class="modify-form">
												<colgroup>
													<col style="width: 158px;">
													<col style="width: 158px;">
													<col>
													<col>
												</colgroup>
												<tbody>
													<tr class="modify-tr">
														<td><label for="modify_ctfName">真实姓名：</label></td>
														<td colspan="2"><input id="modify_ctfName" class="modify-certificate" type="text"></td>
														<td> <span class="ctf-info" id="ctfName_info">与银行开户名一致</span></td>
													</tr>
													<tr class="modify-tr">
														<td><label for="modify_ctfNum">身份证件：</label></td>
														<td colspan="2"><input id="modify_ctfNum" class="modify-certificate" type="text"></td>
														<td> <span class="ctf-info" id="ctfNum_info">证件号码，需与身份证号码一致。</span></td>
													</tr>
													<tr class="modify-tr">
														<td><label for="code_input2">验证码：</label></td>
														<td colspan="2"><input class="modify-certificate" id="code_input2" type="text" maxlength="4" placeholder="请输入验证码" name="picCode"></td>
														<td>
															<a id="v_container"  href="javascript:void(0)"></a>
														</td>
													</tr>
													<tr class="modify-tr">
														<td></td>
														<td><input class="btn submit-btn" type="submit" value="确认验证" id="btn_bankctfName"></td>
													</tr>
												</tbody>
											</table>
											<div class="modify-desBox">
												<p class="modify-des">1. 首次认证免费，再次收费5元/次。务必真实有效，如冒充顶替，将根据《国富通会员注册服务协议》处理。</p>
												<p class="modify-des">2. 姓名必须为实名认证的姓名</p>
											</div>
										</div>
										<span class="close-btn"></span>
									</dd>
								</dl>
							</li>
							<li class="modify-list false">
								<!--php<li class="modify-list ">-->
								<dl>
									<dt>
				                        <span class="modify-mark modify-mark3"></span>
				                        <span class="modify-name">银行卡绑定</span>
                                        <span class="modify-status">未绑定</span>
                                        <!--php<span class="modify-status">已绑定成功</span>-->
                                        <span class="modify-btn">立即绑定</span>
                                        <!--php<span class="modify-status"></span>-->
                                    </dt>
									<dd class="modify-area">
										<div class="modify-title">绑定银行卡</div>
										<div class="modify-layout">
											<table class="modify-form">
												<colgroup>
													<col style="width: 158px;">
													<col style="width: 158px;">
													<col>
												</colgroup>
												<tr class="modify-tr">
													<td>
														<label for="modify_bank">选择银行：</label>
													</td>
													<td colspan="2">
														<select id="modify_bank" class="modify-bank" name="bank">
															<option select="true" value="">--请选择银行--</option>
														</select>
													</td>
													<td>　<span id="bank_info"></span></td>
												</tr>
												<tr class="modify-tr">
													<td>
														<label for="modify_province">开户行所在地：</label>
													</td>
													<td>
														<select id="modify_province" class="modify-province" name="province">
															<option select="true" value="">请选择省份</option>
														</select>
													</td>
													<td>
														<select id="modify_city" class="modify-city" name="city">
															<option select="true" value="">请选择城市</option>

														</select>
													</td>
													<td>　<span id="local_info"></span></td>
												</tr>
												<tr class="modify-tr">
													<td><label for="modify_netShop">开户行网点：</label></td>
													<td colspan="2"><input id="modify_netShop" class="modify-netShop" type="text"></td>
													<td>　<span id="netShop_info"></span></td>
												</tr>
												<tr class="modify-tr">
													<td><label for="modify_cardNum">银行卡号：</label></td>
													<td colspan="2"><input id="modify_cardNum" class="modify-cardNum" type="text"></td>
													<td>　<span id="bankCard_info"></span></td>
												</tr>
												<tr class="modify-tr">
													<td><label for="modify_confirm">确认银行卡号：</label></td>
													<td colspan="2"><input id="modify_confirm" class="modify-confirm" type="text"></td>
													<td>　<span id="bandCard_confirm_info" class="error"></span></td>
												</tr>
												<tr class="modify-tr">
													<td><label for="modify_telCpt">手机验证码：</label></td>
													<td><input id="modify_telCpt" class="modify-telCpt" type="text" data-status="0"></td>
													<td>
														<a class=" col-b sendcode" href="javascript:void(0)" id="sendcode" data-href = "1" typecode="6473" mobile="">获取验证码</a>
													</td>
													<td>　<span id="telCpt_info"></span></td>
												</tr>
												<tr class="modify-tr">
													<td></td>
													<td><input class="btn submit-btn" type="submit" value="确认绑定" id="btn_bankCard"></td>
													<td></td>
												</tr>
											</table>
											<!-- </form> -->
											<div class="modify-desBox">
												<p class="modify-des">1. 上述银行卡号的开户人姓名必须为实名认证的姓名。</p>
												<p class="modify-des">2. 个人银行账号必须填写正确,否则您的提现资金将存在风险。</p>
												<p class="modify-des">3. 每张银行卡只能绑定单个账户，请勿重复绑定。</p>
											</div>
										</div>
										<span class="close-btn"></span>
									</dd>
								</dl>
							</li>
							<li class="modify-list false">
								<!--php<li class="modify-list">-->
								<dl>
									<dt>
										<span class="modify-mark modify-mark4"></span>
										<span class="modify-name">交易密码</span>
                                        <span class="modify-status">未设置</span>
                                        <!-- php<span class="modify-status">已设置</span>-->
                                        <span class="modify-btn" id="click-set-paypwd">立即设置</span>
                                        <!--测试用<span class="modify-btn" id="click-modify-paypwd">修改</span>-->
                                         <!--php<span class="modify-btn" id="click-modify-paypwd">修改</span>-->
                                    </dt>
									<dd class="modify-area">

										<div class="modify-title">设置交易密码</div>
										<div class="modify-layout" id="set-tradePwd">
											<div class="modify-tip"><span>温馨提示：</span>请牢记您设置的交易密码，交易密码将用于投资，提现等重要操作</div>
											<div class="modify-form">
												<table>
													<colgroup>
														<col style="width: 158px;">
													<col style="width: 158px;">
														<col>
														<col>
													</colgroup>
													<tbody>
														<tr class="modify-tr">
															<td><label for="modify_tradePsw">输入密码：</label></td>
															<td colspan="2"><input id="modify_tradePsw" class="modify-tradePsw" type="password"></td>
															<td>　<span id="tradePsw_info"></span></td>
														</tr>
														<tr class="modify-tr">
															<td><label for="modify_confirmTradePsw">确认密码：</label></td>
															<td colspan="2"><input id="modify_confirmTradePsw" class="modify-confirmTradePsw" type="password"></td>
															<td>　<span id="confirmTradePsw_info"></span></td>
														</tr>
														<tr class="modify-tr">
															<td></td>
															<td><input class="btn submit-btn" type="submit" value="设置交易密码" id="submit-setpaypwd"></td>
														</tr>
													</tbody>
												</table>
											</div>
											<div class="modify-desBox">
												<p class="modify-des">1.   请牢记您设置的交易密码，交易密码将用于投资，提现等重要操作.</p>
												<p class="modify-des">2.   建议密码采用字母数字和特殊字符混合，并且不短于8位，不大于20位</p>
											</div>
										</div>
										<div class="modify-layout" id="modify-tradePwd">
											<div class="modify-tip"><span>温馨提示：</span>请牢记您设置的交易密码，交易密码将用于投资，提现等重要操作</div>
											<div class="modify-form" id="modify_psw_form">
												<table>
													<colgroup>
														<col style="width: 160px;">
														<col style="width: 158px;">
														<col>
														<col>
													</colgroup>
													<tbody>
														<tr class="modify-tr">
															<td><label for="modify_protoPsw">原始交易密码：</label></td>
															<td colspan="2"><input id="modify_protoPsw" class="modify-protoPsw" type="password"></td>
															<td>　<span id="protoPsw_info"></span></td>
														</tr>
														<tr class="modify-tr">
															<td><label for="modify_psw_telCpt">手机验证码：</label></td>
															<td><input id="modify_psw_telCpt" class="modify-psw-telCpt" type="text"></td>
															<td>
																<a class="btn col-b sendcode1" id="sendcode-paypwd" data-href = "1" typecode="6472" mobile="13751158067">短信获取</a>
															</td>
															<td>　<span id="psw_telCpt_info"></span></td>
														</tr>
														<tr class="modify-tr">
															<td><label for="modify_newTradePsw">新交易密码：</label></td>
															<td colspan="2"><input id="modify_newTradePsw" class="modify-newTradePsw" type="password"></td>
															<td>　<span id="newTradePsw_info"></span></td>
														</tr>
														<tr class="modify-tr">
															<td><label for="modify_confirm_newTradePsw">确认交易密码：</label></td>
															<td colspan="2"><input id="modify_confirm_newTradePsw" class="modify-confirm-newTradePsw" type="password"></td>
															<td>　<span id="confirm_newTradePsw_info"></span></td>
														</tr>
														<tr class="modify-tr">
															<td></td>
															<td><input class="btn submit-btn" type="submit" value="修改密码" id="submit-modify-paypwd"></td>
															<td>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div class="modify-desBox">
												<p class="modify-des">1.   请牢记您设置的交易密码，交易密码将用于投资，提现等重要操作.</p>
												<p class="modify-des">2.   建议密码采用字母数字和特殊字符混合，并且不短于8位，不大于20位</p>
											</div>
										</div>
										<span class="close-btn"></span>
									</dd>
								</dl>
							</li>
							<!--手机只有修改状态-->
							<li class="modify-list" true="">
								<dl>
									<dt>
				                        <span class="modify-mark modify-mark5"></span>
				                        <span class="modify-name">手机认证</span>
				                        <span class="modify-status">137*****067</span>
				                        <span class="modify-btn">修改</span>
			                        </dt>
									<dd class="modify-area">
										<div class="modify-title">修改手机号码</div>
										<div class="modify-layout">
											<div class="modify-tip"><span>温馨提示：</span>修改手机号码成功后，请您使用新手机号码登录</div>
											<!-- <form class="modify-form"> -->
											<table class="modify-form">
												<colgroup>
													<col style="width: 180px;">
													<col style="width: 158px;">
													<col>
													<col>
												</colgroup>
												<tbody>
													<tr class="modify-tr">
														<td><label for="modify_telNum">输入新手机号码：</label></td>
														<td colspan="2"><input id="modify_telNum" class="modify-telNum" type="text"></td>
														<td>　<span id="tel_info"></span></td>
													</tr>
													<tr class="modify-tr">
														<td><label for="modify_newTelCpt">输入验证码：</label></td>
														<td><input id="modify_newTelCpt" class="modify-telCpt" type="text"></td>
														<td>
															<a class="col-b sendcode1" href="javasxcript:void(0)" id="mphoneyzm" data-href = "1" typecode="6471">短信获取</a>
														</td>
														<td>　<span id="cpt_info"></span></td>
													</tr>
													<tr class="modify-tr">
														<td></td>
														<td><input class="btn submit-btn" type="submit" value="确认验证" id="btn_bankMobile"></td>
													</tr>
												</tbody>
											</table>
											<!-- </form> -->
											<div class="modify-desBox">
											</div>
										</div>
										<span class="close-btn"></span>
									</dd>
								</dl>
							</li>

						</ul>
						<div class="safe-box">
							<div class="safe-section1">
								<div class="section1-title"></div>
								<ul class="section1-list">
									<li>
										<div class="list-icon list-icon1"></div>
										<div class="list-text">免费提现</div>
									</li>
									<li>
										<div class="list-icon list-icon2"></div>
										<div class="list-text">优先投标</div>
									</li>
									<li>
										<div class="list-icon list-icon3"></div>
										<div class="list-text">专属理财顾问</div>
									</li>
									<li class="li-last">
										<div class="list-icon list-icon4"></div>
										<div class="list-text">利息管理费8折</div>
									</li>
								</ul>
							</div>
							<div class="safe-section2">
								<div class="section-title">如何开通VIP会员？</div>
								<table class="section2-table" border="0" cellspacing="0" cellpadding="0">
									<colgroup>
										<col style="width: 672px;">
										<col style="width: 122px;">
									</colgroup>
									<tr>
										<td>1、120元购买期限一年VIP会员</td>
										<td>
											<a class="section2-btn section2-btn1" id = "section2-btn1" href="javascript:void(0)">立即开通</a>
										</td>
									</tr>
									<tr>
										<td>2、30天内投资满5W元即可尊享VIP会员一年</td>
										<td>
											<a class="section2-btn section2-btn2" href="/invest.html">立即投资</a>
										</td>
									</tr>
								</table>
							</div>
							<div class="safe-section3">
								<div class="section-title">详解VIP会员与普通会员区别</div>
								<ul class="section3-content">
									<li class="section3-li">
										<div class="li-title li-title1"></div>
										<ul class = "section3-text">
											<li>1、可享受利息管理费8折优惠</li>
											<li>2、利息管理费10%</li>
											<li>3、理财顾问7*8小时服务</li>
											<li>4、VIP会员每月享有2次免费提现机会，第三次申请提现开始按提现额的1‰收费；以后每增加一次提现，提现费增加1‰，最高收取3‰，提现费用上限为100元。</li>
										</ul>
									</li>
									<li class="section3-line"></li>
									<li class="section3-li li-last">
										<div class="li-title li-title2"></div>
										<ul class = "section3-text">
											<li>1、利息管理费10%</li>
											<li>2、每笔提现收取3‰，提现费用上限100元。</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--尾部-->
		<footer id="footer">
			<div class="footer-content">
				<div class="layout footer-frame clear-fix">
					<div class="footer-banner1 footer-banner">
						<div class="footer-title1 footer-title">客服热线</div>
						<div class="footer-banner1-text">
							客服热线400-360-995（工作时间 9:00-18:00）<br/> 客服邮箱（kefu@yooli.com）
							<br/> 广东省深圳市福田区彩田路瀚森大厦15A
							<br/>
						</div>
						<a class="resume-btn" href="javascript:void(0)"></a>
					</div>
					<div class="footer-banner2 footer-banner">
						<ul>
							<li class="footer-title">
								信息披露
							</li>
							<li>
								<a href="javascript:void(0)">
									平台公告
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									媒体报道
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									诚聘英才
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									联系我们
								</a>
							</li>
						</ul>
						<ul>
							<li class="footer-title">
								安全保障
							</li>
							<li>
								<a href="safety.html#section6">
									法律保障
								</a>
							</li>
							<li>
								<a href="safety.html#section2">
									实力保障
								</a>
							</li>
							<li>
								<a href="safety.html#section5">
									技术保障
								</a>
							</li>
							<li>
								<a href="safety.html#section3">
									资金保障
								</a>
							</li>
						</ul>
						<ul class="li-last">
							<li class="footer-title">
								帮助中心
							</li>
							<li>
								<a href="javascript:void(0)">
									常见问题
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									新手指引
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									借款流程
								</a>
							</li>
						</ul>
					</div>
					<ul class="footer-banner3 footer-banner">
						<li>
							<div class="app-ewm ewm">
								<img src="images/newCopyRight/app.jpg" />
							</div>
							<div class="ewm-detail">APP客户端下载</div>
						</li>
						<li class="li-last">
							<div class="wechat-ewm ewm">
								<img src="images/newCopyRight/wechat.jpg" />
							</div>
							<div class="ewm-detail">国富通微信公众号</div>
						</li>
					</ul>
				</div>
				<ul class="footerlogo layout">
					<li>
						<a href="javascript:void(0)">
							<img src="images/newCopyRight/footerLogo1.png" />
						</a>
					</li>
					<li>
						<a href="javascript:void(0)">
							<img src="images/newCopyRight/footerLogo2.png" />
						</a>
					</li>
					<li>
						<a href="javascript:void(0)">
							<img src="images/newCopyRight/footerLogo3.png" />
						</a>
					</li>
					<li>
						<a href="javascript:void(0)">
							<img src="images/newCopyRight/footerLogo4.png" />
						</a>
					</li>
					<li>
						<a href="javascript:void(0)">
							<img src="images/newCopyRight/footerLogo5.png" />
						</a>
					</li>
					<li>
						<a href="javascript:void(0)">
							<img src="images/newCopyRight/footerLogo6.png" />
						</a>
					</li>
				</ul>
			</div>
			<div class="layout footer-copyright">
				<p class="footer-cent">
					<a class="cent1" href="http://www.miitbeian.gov.cn" target="_blank">Copyright © 2014-2015备案号：粤ICP备14038056号-1</a>
					<a href="javascript:void(0)" class="cent2">深圳前海国富通电子商务有限公司 </a>
				</p>
			</div>
		</footer>
		<!--尾部-->
		<script src="head/html2canvas.min.js" type="text/javascript" charset="utf-8"></script>
	</body>
	<script src="js/jquery.min.js"></script>
	<script src="js/common.js" type="text/javascript" charset="utf-8"></script>
	<script src="head/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="head/cropper.js" type="text/javascript" charset="utf-8"></script>
	<script src="head/sitelogo.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/layer.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/vendor/velocity.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/app/gVerify.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/customer/setting.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		$(function() {
			// 头像模态框显示隐藏
			
			$(".head_img img").on("mouseenter", function() {
				var $this = $(this);
				$this.siblings().css("display", "block");
			});
			$(".head_img a").on("mouseleave", function() {
				var $this = $(this);
				$this.css("display", "none").prev().css("display", "none");
			});
			//做个下简易的验证  大小 格式
			$('#avatarInput').on('change', function(e) {
				var filemaxsize = 1024 * 5; //5M
				var target = $(e.target);
				var Size = target[0].files[0].size / 1024;
				if(Size > filemaxsize) {
					layer.alert('图片过大，请重新选择!');
					$(".avatar-wrapper").children().remove();
					return false;
				}
				if(!this.files[0].type.match(/image.*/)) {
					layer.alert('请选择正确的图片!')
				} else {
					var filename = document.querySelector("#avatar-name");
					var texts = document.querySelector("#avatarInput").value;
					var teststr = texts; //你这里的路径写错了
					testend = teststr.match(/[^\\]+\.[^\(]+/i); //直接完整文件名的
					filename.innerHTML = testend;
				}

			});

			$(".avatar-save").on("click", function() {
				var img_lg = document.getElementById('imageHead');
				// 截图小的显示框内的内容
				html2canvas(img_lg, {
					allowTaint: true,
					taintTest: false,
					onrendered: function(canvas) {
						canvas.id = "mycanvas";
						//生成base64图片数据
						var dataUrl = canvas.toDataURL("image/jpeg");
						var newImg = document.createElement("img");
						newImg.src = dataUrl;
						console.log(dataUrl);
						imagesAjax(dataUrl)
					}
				});
			});
//
			function imagesAjax(src) {
				var data = {};
				data.img = src;
				$.ajax({
					url: "test.php",
					data: data,
					type: "POST",
					dataType: 'json',
					success: function(re) {
						console.log("aaaa")
						if(re.status == '1') {
							$('.user_pic img').attr('src', src);
						}
					},
					error: function() {
						console.log("aaa")
					}
				});
			}
			$('.modify-btn').on('click', function() {
				var $modifyArea = $(this).parent().next().hasClass('modify-area') && $(this).parent().next() || "";
				if(!$modifyArea.hasClass('show')) {
					$modifyArea.toggleClass('show')
						.css('display', 'block')
						.velocity({
							opacity: 1,
							top: 0,
							height: $modifyArea[0].scrollHeight
						}, {
							duration: 400
						})
				}
			});

			//隐藏修改内容
			$('.close-btn').on('click', function() {
				var $modifyArea = $(this).parent().hasClass('modify-area') && $(this).parent() || "";
				if($modifyArea.hasClass('show')) {
					$modifyArea.velocity({
						opacity: 0,
						top: -20,
						height: 0
					}, {
						duration: 300
					});
					setTimeout(function() {
						$modifyArea.css('display', 'none');
						$modifyArea.toggleClass('show');
					}, 300)
				}
				// 重置 找回交易密码界面
				setTimeout(function() {
					$('#modify_psw_form').removeClass('hide');
				}, 200)
			});
		});
	</script>

</html>