$(function () {
    // tabs js
    jQuery(".slideTxt").slide({
        trigger: "click"
    });

    // 我的投资 tabs 切换
    jQuery('.slideTxt1,.slideTxt2').slide({
        trigger: 'click'
    });
});

// 投资计算
$(function () {
    var perNum = parseInt($('.per').html());

    $('.two-btn a').on('click', function () {
        var thisNum = $(this).index(),
            fenNum = parseInt($('.fen').val()),
            changes = Math.floor(parseInt($('.change').html()) / perNum),
            surplus = parseInt($('.surplus').html());
        if (thisNum == 0) {
            if (fenNum) {
                if (fenNum < changes && fenNum < surplus) {
                    $('.fen').val(++fenNum);
                } else {
                    return false;
                }
            } else {
                $('.fen').val(1);
            }
        } else {
            if (fenNum <= 5) {
                return false;
            } else {
                $('.fen').val(--fenNum);
            }
        }
        valChange();
    });

    // 输入框输入事件
    $('.fen').on("input propertychange", function () {
        valChange();
    });

    $('.fen').change(function () {
        var vals = $('.fen').val();
        if (vals < 5) {
            $('.fen').val(5);
            valChange();
        }
    });


    // 全额按钮点击事件
    $('.quane_btn').click(function () {
        var surplus = parseInt($('.surplus').html()),
            change = Math.floor(parseInt($('.change').html()) / perNum);
        if (surplus >= change) {
            $('.fen').val(change);
        } else {
            $('.fen').val(surplus);
        }
        valChange();
    });

    // 选择红包点击 下拉红包列表
    $('.btns_click').click(function () {
        var investNum = $('.invest-num').html();
        //        $.ajax({
        //            type : 'POST',
        //            url: '',
        //            data: investNum,
        //            success: function(){
        //
        //            },
        //            error: function() {}
        //        });

        $(this).parent().siblings('.select-list').slideToggle();
    });
    // 选择红包******************************************
    $('.redbags').click(function () {
        $('.select-list').slideUp();
        var thisHTML = $(this).html();
        $(this).parent().parent().siblings().children('.show_selected').html("已选择" + thisHTML + "<a class='clear'></a>");
		
		var investNum = $('.invest-num').html();
		var interest = {};
       
       console.debug($(this).parents('.redBag').find('.show_selected').hasClass('show-quans2'));
	    if($(this).parents('.redBag').find('.show_selected').hasClass('show-quans2')){
	    	var couponid = $('.show-quans2 .couponid').data('coupon');
        	interest.couponid = couponid;
	       	 console.debug(couponid);
	       	 $.ajax({
	            type: 'POST',
	            url: 'invest/coupons',
	            dataType: "json",
				async:true,
	            data: {
							"investNum": investNum,
							"couponid": couponid,
						},
	            success: function () {},
	            error: function () {}
	        });
	       }
        
        
        $('.clear').unbind().click(function () {
            $(this).parent('.show_selected').html('');
        })
    });
     // 选择红包******************************************
    $(document).on('click', function (e) {
        var e = e || Event;
        if (e.target.className != "btns_click")
            $('.select-list').slideUp();
    });

    // ajax 传递 加息券
    $('.invest-btn').click(function () {
        var interest = {};
        var interestid = $('.show-quans .interest').data('interest');
        interest.interestid = interestid;

        $.ajax({
            type: 'POST',
            url: '',
            data: interest,
            success: function () {},
            error: function () {}
        });
    });

    // 改变投资金额
    function valChange() {
        var fenVal = $('.fen').val();
		if(isNum(fenVal))
		  {
		  	
		  }else
		  {
		  }
        var newInvest = fenVal * perNum;
        $('.invest-num').html(newInvest);
    }
    function isNum(s) {
	 //var regu = "^([0-9]*)$";
	 var regu = "^([0-9]*[.0-9])$"; // 小数测试
	 var re = new RegExp(regu);
	 if (s.search(re) != -1)
	  return true;
	 else
	  return false;
	}
});

//  用户头像 及 canvas
$(function () {
    window.onload = function () {
        if ($('#canvas')[0]) {
            var canvas = $('#canvas')[0],
                cxt = canvas.getContext('2d'),
                arcs = [0, 24, 48, 72],
                step,
                startA = 0,
                startAngle = startA + Math.PI * 3 / 2,
                endAngle,
                add = Math.PI / 36,
                x = 50,
                y = 50,
                radius = 45,
                animation_interval = 20,
                n,
                varName;

            function actiondo() {
                step = 1;
                varName = setInterval(animation, animation_interval);
            };

            var animation = function () {
                if (step <= n) {
                    endAngle = startAngle + add;
                    drawArc(startAngle, endAngle);
                    startAngle = endAngle;
                    step++;
                } else {
                    clearInterval(varName);
                }

            };

            function drawArc(s, e) {
                cxt.beginPath();
                cxt.arc(x, y, radius, s, e, false);
                cxt.strokeStyle = '#d5be49';
                cxt.lineWidth = 5;
                cxt.stroke();
            };

            $.ajax({
                url: 'vip/viplevel',
                type: 'POST',
                data: '',
                success: function (index) {
                    $("#head-img").attr("src", "asset/images/vip" + index + ".png");
                    var indexs = parseInt(index) - 1;
                    n = arcs[indexs];
                    actiondo()
                },
                error: function (err) {
                    $("#head-img").attr("src", "http://www.gftp2p.com/asset/images/test.png");
                }
            });
        }
    }
});

//  将 #myInvest 的高度赋给
$(function () {
    $(document).on('click', function () {
        var myHeight = $('#myInvest').height();
        $('iframe.invest-detail').css('height', myHeight + 'px');
    });
});


// 更多操作 菜单显示和隐藏
$(function () {
    $('.operat-more').click(function () {
        $('.operat-list').hide();
        $(this).siblings().show();
    });

    $(document).click(function (e) {
        var e = e || event;
        var eClass = e.target.className;
        if (eClass != 'operat-more' && eClass != 'operat-list') {
            $('.operat-list').hide();
        }
    });
});

// 弹层
$(function () {
    // 查看合同
    $('.check_contract').click(function () {
        $('.check_contract-box').show();
    });
    $('.check_close').click(function () {
        $('.check_contract-box').hide();
    });

    //投资详情 invest-detail-btn
    $('.invest-detail-btn').click(function () {
        $('.invest-detail-box').css('width', '100%');
    });
    $('.invest-close').click(function () {
        $('.invest-detail-box').css('width', '0');
    });
})

// 合作协议
$(function () {
    $('.arrowss').on('click', function () {
        var $index = $(this).index(),
            ulLeft = parseInt($('.imgSlide-list').css('left'));
        console.log($index);
        if ($index == 0) {
            if (ulLeft == 0) {
                return false;
            } else {
                $('.imgSlide-list').css('left', 0);
            }
        } else if ($index == 1) {
            if (ulLeft != 0) {
                return false;
            } else {
                $('.imgSlide-list').css('left', '-880px')
            }
        }
    })
})


//  layer
$(function () {
    layer.ready(function () { //为了layer.ext.js加载完毕再执行
        layer.photos({
            photos: '#imgSlide-list'
        });
    });
})