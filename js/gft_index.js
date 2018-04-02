$(function () {
    // 智能理财分页
    $('.dots .dots-next').click(function () {
        var $this = $(this);
        var dotsIndex = parseInt($(this).attr('data'));
        var prev = $(this).prev();
        var prevData = parseInt(prev.attr('data'));
        $(this).addClass('active').siblings().removeClass('active');
        if (dotsIndex > 0 && dotsIndex <=$('.plan-list li').length - 3){
        	$('.plan-list').css('left', -dotsIndex*250 + 'px');
        	$(this).attr('data', dotsIndex + 1);
        	prev.attr('data', prevData - 1);
        }
    });
    
    $('.dots .dots-prev').click(function () {
        var $this = $(this);
        var dotsIndex = parseInt($(this).attr('data'));
        var next = $(this).next();
        var nextData = parseInt(next.attr('data'));
        
        $(this).addClass('active').siblings().removeClass('active');
        if (dotsIndex >= 3-$('.plan-list li').length && dotsIndex < 0){
        	$('.plan-list').css('left', (dotsIndex + 1) *250 + 'px');
        	$(this).attr('data', dotsIndex+1);
        	next.attr('data', nextData -1);
        }
    });
    
    // 投资列表 点击效果
    $('.lists-category .cate').click(function(){
       $(this).addClass('on').siblings().removeClass('on'); 
    });
})


// canvas 圆形进度条

$(function () {


    $('canvas.process').each(function () {
        // n 为 canvas 中的数字，ajax 改变 n 值
        //       n = Math.ceil(Math.random() * 100);
        var i = 0;
        var $this = $(this);
        text = $(this).text();
        var n = text.substring(0, text.length - 1);
        setInterval(function () {
            addNum()
        }, 10);

        function addNum() {
            if (i < n) {
                i++;
                $this.text(i + "%");
                drawProcess();
            } else {
                clearInterval(setInterval("addNum()", 20))
            }
        }
    })

});

function drawProcess() {
    $('canvas.process').each(function () {
        var text = $(this).text();
        var process = text.substring(0, text.length - 1);
        var canvas = this;
        var context = canvas.getContext('2d');

        context.clearRect(0, 0, 46, 46);
        context.beginPath();
        context.moveTo(23, 23);
        context.arc(23, 23, 22.5, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = '#ff5950';
        context.fill();

        context.beginPath();
        context.moveTo(23, 23);
        context.arc(23, 23, 23, Math.PI * 3 / 2, Math.PI * 2 * process / 100 + Math.PI * 3 / 2, false);
        context.closePath();
        context.fillStyle = '#e5eced';
        context.fill();

        context.beginPath();
        context.moveTo(23, 23);
        context.arc(23, 23, 18, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = '#fff';
        context.fill();

        context.font = "bold 9pt Arial";
        context.fillStyle = '#ff5950';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.moveTo(23, 23);
        context.fillText(text, 23, 23);
    });
}