function expressIcon() {
    var $express = $('#express'),
        $timerIcon = null, //定时器
        $speed = 8000; //一次的时间

    /* 不支持动画时触发 */
    if (!Modernizr.cssanimations) {
        iconAniamtion();
        $timerIcon = setInterval(iconAniamtion, $speed + 1000);
    } else {
        clearInterval($timerIcon);
    }

    /**
     * @func iconAnimation
     * @desc 小车运动
     */
    function iconAniamtion() {
        $express.animate({'left' : '100%'}, $speed, function() {
            $express.css('left', -$express.width());
        });
    }
}

expressIcon();


/* 导航层 合作品牌 */
var $cooperate = $('.cooperate');

if ($('.saas-index').length > 0) {
    $cooperate.on('click', function($event) {
        // 阻止a标签的默认行为
        $event.preventDefault();

        $('html, body').animate({'scrollTop': $('#index-brand').offset().top}, 600);
    });
}

//svg
var $paths = $('.run-path'),
    num = 0;

if ($paths.length > 0) {
    setInterval(function() {
        $paths.attr('stroke-dashoffset', num);
        num = num > 100 ? 0 : ++num;
    }, 25);
}

