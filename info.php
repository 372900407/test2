<?php 
$this->load->helper('strhelp');
$formrandid = randomstr(16);
@$back      = $_SERVER['HTTP_REFERER'];
if ($investInfo['istb'] == 1) { 
    $timetype  = "days";
    $type      = "天";
}else {
    $timetype  = "month";
    $type = "个月";
}
$this->session->set_userdata(array('formrandid' => $formrandid));
$this->session->set_userdata(array('investid' => $formrandid));
?>
	<link rel='stylesheet' href='/asset/css/invest-detail.css'>	  
	<link rel='stylesheet' href='/asset/css/user_withdrawal.css'>	 
	<input type="hidden" name="jkid" id="jkid" value="<?php echo $investInfo['id'];?>">
	<input type="hidden" name="formrandid" id="formrandid" value="<?php echo $formrandid;?>">
	<input type="hidden" name="uid" id="uid" value="<?php echo $uid;?>">
	<input type="hidden" name="jkuid" id="jkuid" value="<?php echo $investInfo['uid'];?>">
	<input type="hidden" name="is_card" id="is_card" value="<?php echo $userinfo['deposit_isband'];?>">
	<input type="hidden" name="jkdeposit" id="jkdeposit" value="<?php echo $investInfo['jkdeposit'];?>">
		<input type="hidden" name="type" id="type" value="1">
		<div class="invest-nav-frame">
			<div class=" layout">
				<div class="invest-nav">
					<a  <?php if(empty($back)){echo "style='display:none;'";} ?> href="javascript:void(0)" id="history-back" class="history-back">&lt;返回</a>
					<a href="/invest.html?jklx=<?php echo $investInfo['jklx'];?>">我要投资 &gt;</a>
					<a href="javascript:void(0)"><?php echo $investInfo['title'];?></a>
				</div>
			</div>
		</div>
		<div class="invest-nav-frame ">
			<div class="invest-section1 layout">
				<div class="section1-col1">
					<div class="section1-title-frame">
						<div class="title-icon">国</div>
						<div class="section1-title">
							<?php echo $investInfo['title'];?>
							<?if($investInfo['jkdeposit']==1):?>
                                <div class = "cunguan-img"><img src="/asset/images/newCopyRight/cunguan.png"/></div>
                            <?endif;?>
						</div>
					</div>
					<div class="section1-data-frame">
						<ul class="data-threeCol">
							<li class="li-first">
								<div class="data-red"><span id="rate-percent">
								   <?if($investInfo['nll'] >18):?>
                                        <?php echo '18+xx';?>%
                                    <?else:?>
                                        <?php echo number_format($investInfo['nll'],2);?>
                                    <?endif;?></span>%</div>
								<div class="data-gray">预期年化收益率</div>
							</li>
							<li class="li-second">
								<div class="data-red"><span id="month-data"><?php echo $investInfo['jkqx'];?></span><?php if ($investInfo['istb'] == 1) { echo '天';} else { echo '个月'; }?></div>
								<div class="data-gray">项目期限</div>
							</li>
							<li class="li-last">
								<div class="data-red">￥<?php echo number_format($investInfo['jkze'], 2, '.', ',');?></div>
								<div class="data-gray">项目总额</div>
							</li>
						</ul>
					</div>
			
					<ul class="detail-list">
						<li>
							<div class="detail-icon detail-icon1"></div>
							<div class="detail-text">还款方式：<?php if($investInfo['hkfs']==1){echo '等额本息';}else if($investInfo['hkfs']==2){echo '按月付息到期还本';}else if($investInfo['hkfs']==3){echo '到期还本付息';}?></div>
						</li>
						<li class="li-last">
							<div class="detail-icon detail-icon2"></div>
							<div class="detail-text">发布时间：<?php echo date('Y-m-d H:i:s',$investInfo['addtime']);?></div>
						</li>
						<li>
							<div class="detail-icon detail-icon3"></div>
							<div class="detail-text">起息日期：T+0（满标日）</div>
						</li>
						<li class="li-last">
							<div class="detail-icon detail-icon6"></div>
							<span class="detail-text detail-text1">项目进度 :</span>
							<span class="section1-process progress-bar-wrap" data-val="true">
								<span class = "progress-bar">
									<span class = "progress">		
									</span>
									</span>
								
									<span class="progress-state">
									<?php if($investInfo['stat']==2){echo floor(($investInfo['yck']/$investInfo['jkze'])*100);}else{echo 100;}?>%
									<div class = "progress-trangle"></div>
								</span>
							</span>
						</li>
						<li>
							<div class="detail-icon detail-icon5"></div>
							<div class="detail-text">剩余时间：<span id="tubb" style="color:red;"></span></div>
						</li>
						<li class="li-last">
							<div class="detail-icon detail-icon7"></div>
							<div class="detail-text">保障方式：安诚信担保</div>
						</li>
						
					</ul>	
				</div>
				<div class="section1-col2">
					<div class="col2-layout">
					 <?php if($investInfo['stat']==2):?>
						<!--******************************未登录的情况**************************************-->
						<?php if($uid ==0):?>
						<div class="unlogin-unMax">
							<div class="invest-status1">
								<div class="invest-text">剩余可购买金额：<span class="keyong"><?php echo number_format($investInfo['jkze']-$investInfo['yck'], 2, '.', ',');?>元</span><br/>账户余额
									<a id="loginBtn" href="javascript:void(0)">登录</a>后可见</div>
							</div>
							<div class="all-invest">
								<div class="invest-input">
									<input class="invest-data" type="text" maxlength="16" name="invest-data" id="invest-data" value="" placeholder="100元起投" />
									<div class="money-text">元</div>
								</div>
								<a href="javascript:void(0)" class="simple-all">全投</a>
								<input class="invest-submit" type="submit" name="invest-submit1" id="invest-operate" value="立即购买" />
							</div>
							<div class="invest-detail">温馨提示：市场有风险，出借须谨慎</div>
						</div>

						<!--******************************已登录的情况**************************************-->
						 <?php else:?>
						<div class="login-unMax">
							<div class="invest-info">
								剩余可购买金额：<span class="invest-num1 bold"><span class = "keyong"><?php echo number_format($investInfo['jkze']-$investInfo['yck'], 2, '.', ',');?></span>元</span>
							</div>
							<div class="invest-info">
								账户余额：<span class="invest-num1 bold"><span class = "still"><?php if($investInfo['jkdeposit']==1){echo number_format($userinfo['kyye'], 2, '.', ',');;}else{echo number_format($balance, 2, '.', ',');}?></span>元</span>
							</div>
							<input type="hidden" name="invest-num" id="invest-num" value="0" />
							
							<div class="invest-input-div">
								<div class="invest-input">
									<input class="invest-data" type="text" maxlength="16" name="invest-data" id="invest-data" value=""  onKeypress="if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
									 placeholder="100元起投" />
									<div class="money-text">元</div>
								</div>
								<a href="javascript:void(0)" class="simple-all">全投</a>
							</div>
							<?php if($investInfo['jkdeposit']==0):?>
							<div class="redBag">
								<p class="redbg_txt">
									<a class="btns_click" data-path="getrewards" data-bidtype="1" data-month="<?php if ($investInfo['istb'] == 1) { echo '0';} else { echo $investInfo['jkqx']; }?>">使用卡券</a>
									<span class="show_selected show-rewards"></span>
								</p>
							</div>
							<?php else:?>
							<br>
							<?php endif;?>
								<div class="invest-detail invest-detail1">预期收益： <span id="pre-invest">0.00</span> 元</div>
							<input class="invest-submit" type="submit" name="invest-submit2" id="invest-operate" value="立即购买" />
							<div class="invest-detail">温馨提示：市场有风险，出借须谨慎</div>

						</div>						
						<?php endif;?>
						<!--******************************已登录满标的情况**************************************-->
						 <?php else:?>
						<div class = "login-Max">
							<div class = "max-notice">
								该项目已投满，<br/>
								请关注其它优质项目,谢谢！
							</div>
							<div class = "max-icon"></div>
							<div class = "max-more"><a class = "more-href" href = "/invest.html?jklx=<?php echo $investInfo['jklx'];?>">点击查看</a>更多其它优质项目</div>
						</div>
						
						<?php endif;?>
					</div>
				</div>
			</div>
		</div>
		<div class="invest-nav-frame ">
			<div class="invest-section2 layout">
				<div class="section2-title">操作流程:</div>
				<ul class="section2-list">
					<li>
						<div class = "section2-icon section2-icon1"></div>
						<div class = "section2-detail">
							<div class = "section2-text1">开始投资</div>
							<div class = "section2-text2"><?php echo date('Y.m.d', $investInfo['shtime']);?></div>
						</div>
						<div class = "section2-arrow"></div>
					</li>
					<li>
						<div class = "section2-icon section2-icon2"></div>
						<div class = "section2-detail">
							<div class = "section2-text1">开始计息</div>
							<div class = "section2-text2"><?php if($investInfo['mbshtime']){echo date('Y.m.d',$investInfo['mbshtime']);}else{echo "满标日+0";} ?></div>
						</div>
						<div class = "section2-arrow"></div>
					</li>
					<li>
						<div class = "section2-icon section2-icon3"></div>
						<div class = "section2-detail">
							<div class = "section2-text1">项目到期</div>
							<div class = "section2-text2"><?php if($investInfo['mbshtime']){echo date('Y.m.d',strtotime('+'.$investInfo['jkqx'].' '. $timetype ,$investInfo['mbshtime']));}else{echo "计息日+".$investInfo['jkqx'].$type;} ?></div>
						</div>
						<div class = "section2-arrow"></div>
					</li>
					<li class = "li-last">
						<div class = "section2-icon section2-icon4"></div>
						<div class = "section2-detail">
							<div class = "section2-text1"><?php if($investInfo['hkfs']==1){echo "等额本息";}elseif ($investInfo['hkfs']==2){echo "月息期本";}else{echo "到期本息";}?></div>
							<div class = "section2-text2">T+0至账户中</div>
						</div>
						
					</li>
				</ul>
			</div>
		</div>
		<div class="invest-nav-frame invest-nav-frame-last">
			<div class="invest-section3 layout">
				<ul class="section3-list">
					<li>
						<a class="section3-current" href="javascript:void(0)">产品说明</a>
					</li>
<!-- 					<li> -->
<!-- 						<a href="javascript:void(0)">项目详情</a> -->
<!-- 					</li> -->
					<li>
						<a href="javascript:void(0)">投资记录</a>
					</li>
				</ul>
				<div class="section3-content" style="display: block;">
					<table>
						<tr>
							<td class="first-col">产品类别</td>
							<td>
								<?php echo $investInfo['title'];?>
							</td>
						</tr>
						<tr>
							<td class="first-col">产品介绍</td>
							<td>
								<?php echo $investInfo['jkxq'];?>
						</tr>
						<tr>
							<td class="first-col">起投金额</td>
							<td>
								100元起投，以1元递增
							</td>
						</tr>
						<tr>
							<td class="first-col">项目期限</td>
							<td>
								<?php echo $investInfo['jkqx'];?></span><?php if ($investInfo['istb'] == 1) { echo '天';} else { echo '个月'; }?>
							</td>
						</tr>
						<tr>
							<td class="first-col">收益方式</td>
							<td>
								预期年化利率<?if($investInfo['nll'] >18):?>
                                        <?php echo '18+xx';?>%
                                    <?else:?>
                                        <?php echo number_format($investInfo['nll'],2);?>
                                    <?endif;?>% ，<?php if($investInfo['hkfs']==1){echo "等额本息";}elseif ($investInfo['hkfs']==2){echo "月息期本";}else{echo "到期本息";}?>
							</td>
						</tr>
						<tr>
							<td class="first-col">还款时间</td>
							<td>
								收益到帐时间T+0（不晚于项目到期当天24点）							
							</td>
						</tr>
						<tr>
							<td class="first-col">还款来源</td>
							<td>
								第一还款来源：借款企业日常经营性收入<br/> 第二还款来源：借款方预付保证金及债务方股东连带保证
							</td>
						</tr>
						<tr>
							<td class="first-col">风险提示</td>
							<td>
								本产品投资可能面临下列各项风险，包括但不限于：<br/> 1、政策风险：因财政政策、货币政策、产业政策、区域发展政策等国家宏观政策发生变化，导致市场价格波动的风险。
								<br/> 2、不可抗力风险：指由于自然灾害、战争等不可抗力因素的出现，将严重影响金融市场的正常运行，可能影响产品的认购、投 资、偿 <br/> 还等的正常进行而带来的风险。
								<br/> 3、法律风险：本产品相关的法律、法规和配套制度发生变化，可能会对产品持有人的权益产生影响。
							</td>
						</tr>
					</table>
				</div>
				
				<div class="section3-content" id="investLog">
					<table class="invest-history">
						<tr>
							<th>序号</th>
							<th>投资人</th>
							<th>投资金额（元）</th>
							<th>投资时间 </th>
						</tr>
						
						<?php
						if(!empty($res)){
						 foreach ($res as $key=>$val){?>
						<tr>
							<td><?php if($key<9){$key="0".($key+1);}  echo $key ;?></td>
							<td><?php echo replaceX($val['username'],3,3,2);?></td>
							<td>￥<?php echo number_format($val['tbje'],2);?></td>
							<td><?php echo date('Y-m-d H:i:s',$val['tbtime']);?></td>
						</tr>
						 <?php }
						}else{
						    echo "<tr><td></td><td></td><td id='null'>暂无记录</td></tr>";
						}?>
						
					</table>
					<ul class="pagination">
					<?php echo $pagenav;?>
					</ul>
				</div>
				<div class="section3-content">
					<table>
						<tr>
							<td class="first-col">项目名称</td>
							<td>
								<?php echo $investInfo['projectname'];?>
							</td>
						</tr>
						<tr>
							<td class="first-col">项目介绍</td>
							<td>
								<?php echo $investInfo['projectinstruction'];?>
							</td>
						</tr>
						<tr>
							<td class="first-col">资金投向</td>
							<td>
								<?php echo $investInfo['moneyto'];?>
							</td>
						</tr>
						<tr>
							<td class="first-col">还款来源</td>
							<td>
								<?php echo $investInfo['moneysource'];?>
							</td>
						</tr>
						<tr>
							<td class="first-col">风控措施</td>
							<td>
								<?php echo $investInfo['control'];?>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div class="login-frame fixed-frame">
			<div class="fixed-bg"></div>
			<div class="login-content">
				<a href="javascript:void(0)" class="fixed-close">
					<img src="/asset/images/fix-close.png" />
				</a>
				<div class="login-layout">
					<div class="login-title">用户登录</div>
					<div class="login-input-frame frame-current">
						<div class="login-icon login-icon1"></div>
						<input class="login-input login-input1" type="text" name="username" id="signIn_id" value="" placeholder="请输入用户名/手机号码">
					</div>
					<div class="login-input-frame">
						<div class="login-icon login-icon2"></div>
						<input class="login-input login-input2" type="password" name="password" id="signIn_psw" maxlength="20" value="" placeholder="请输入用户密码">
						<a href="/forgetpwd.html" class="forgetPw">忘记密码？</a>
					</div>
					<ul class="login-button-group">
						<li>
							<input class="login-btn" type="submit" name="submit-btn" id="signIn_btn" value="立即登录">
						</li>
						<li class="register-detail">
							还没帐号？
							<a href="/reg.html" class="register-text">立即注册</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div id="loading1">
		</div>
		<div class="selectfixed-frame fixed-frame">
			<div class="fixed-bg"></div>
			<div class = "selectfixed-content">
				<div class = "selectfixed-title-bar">
					<div class = "selectfixed-title">
						我的卡券
					</div>
					<a href = "javascript:void(0)" class = "fixed-close">
						<img src="/asset/images/fix-close.png"/>
					</a>
				</div>
				<ul class = "selectfixed-fixed">
				</ul>
			</div>
		</div>
	<div class="mod"></div>
		<div class="deal_password">
			<ul class="remark_list">
				<li class="first">标的购买信息</li>
				<li>
					<p class="remark_tit">申请购买金额（元）</p>
					<span class="remark_con apply">10000.00</span>
				</li>
				<li>
					<p class="remark_tit">实际购买金额（元）</p>
					<span class="remark_con reality">10000.00</span>
				</li>
				<li>
					<p class="remark_tit">预期年化收益率</p>
					<span class="remark_con earnings">11%</span>
				</li>
				<li>
					<p class="remark">备注:</p>
					<span class="remark_info">暂无</span>
				</li>
			</ul>
			<div class="remark_body">
				<a href="javascript:;" class="cha">×</a>
				<div class="password">交易密码：</div>
				<input type="password" id="deal_pin" name="deal_password" placeholder="请输入交易密码" maxlength="20">
				<div class="forget">
					<a href="/user-setting.html">忘记密码？</a>
				</div>
				<div class="affirm">
					<a href="javascript:;" data-ase =1>确认</a>
				</div>
			</div>
		</div>
		
		<div class="buy-info">
            <a href="javascript:;" class="close"></a>
            <ul class="info-list">
                <li>
                    <div class="sign-info">
                        标的购买信息
                    </div>
                </li>
                <li>
                    <div class="sign-name clear-fix">
                        <div class="sign-title left">标的名称:</div>
                        <div class="sign-content hx-id left">1111111</div>
                    </div>
                </li>
                <li>
                    <div class="sign-name clear-fix">
                        <div class="sign-title left">申请投标金额（元）:</div>
                        <div class="sign-content hx-money left">10000.00</div>
                    </div>
                </li>
                <li>
                    <div class="sign-name clear-fix">
                        <div class="sign-title left">预期年化收益率:</div>
                        <div class="sign-content left"><span class="yield">11</span></div>
                    </div>
                </li>
            </ul>
            <div class="notarize">
                <a href="javascript:;">确认</a>
            </div>
   </div>
		
		
    	<form id="account" action="/deposit/register/index" method="post" target="_blank" style="display: none">
        	<p><input type="text" name="uid" value="<?php echo $uid ?>"/>
        	<p> <input type="text" name="client" value="PC"/>
        </form>
	    <form id="hxbank" action="/dep-bindcard" method="post" target="_blank"  style="display: none">
        	<input type="text" name="uid" value="<?php echo $uid ?>"/>
        	<input type="text" name="client" value="PC"/>
        </form>
        <form id="sumb" action="/deposit/normalinvest/index" method="post" target="_blank"  style="display: none">
        	<input type="text" name="uid" value="<?php echo $uid ?>"/>
        	<input type="text" name="id" value="<?php echo $investInfo['id'];?>"/>
        	<input type="text" id="tbje" name="tbje" value=""/>
        	<input type="text" name="client" value="PC"/>
        </form>
	<script src="/asset/js/layer.js" type="text/javascript" charset="utf-8"></script>
	<script src="/asset/js/require.js" data-main="/asset/js/app/invest"></script>
	<script type="text/javascript">
function showTbjl(page){
	var id=$('#jkid').val();
	$.ajax({
		type:'post',
		url:'/operate/tbjlAjax',
		dataType:'html',
		data:{page:page,id:id},
		success:function(d){
			$('#investLog').html('');
			$('#investLog').html(d);
		}
	});
}

//计算筹款期限倒计时
function timer()
{
  var now = new Date();//当前时间 
  var endDate = new Date(<?php echo $y;?>, <?php echo $m-1;?>, <?php echo $d;?>);//结束时间 
  var leftTime=endDate.getTime()-now.getTime();//计算时间差(秒)
  var leftsecond = parseInt(leftTime/1000); //精确到毫秒
  var day1=Math.floor(leftsecond/(60*60*24));//计算剩余的天数 (这里显示负的)
  var hour=Math.floor((leftsecond-day1*24*60*60)/3600); //计算剩余的小时数
  var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);//计算剩余的分钟数 
  var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); //计算剩余的秒数

	if(day1<=0){
		day1 = -day1;//(负负得正，取正的显示)
		hour = checkTime(hour);
		minute = checkTime(minute);
		second = checkTime(second);  
	}
	<?php
	
 if($investInfo['stat']==2){
  ?>          
  $("#tubb").text(day1 + "天" + hour + "小时" + minute + "分钟" + second + "秒");
  <?php
}else{
  ?>
  $("#tubb").text('筹款期限:已截止');	
  <?php
}
?>

  setTimeout("timer()",1000);
}
function checkTime(i)  
  {  
     if (i < 10) {  
         i = "0" + i;  
      }  
     return i;  
  }    
$(document).ready(function(){
	<?php 
			if ($isguoqi == 'right') {
		?>
			$("#tubb").text("已截止");
		<?php }else {?>
			timer();

		<?php }?>
}); 			              
</script>