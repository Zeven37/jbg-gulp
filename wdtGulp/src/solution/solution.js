var $subMenu = $('.solution-submenu'),
    $blocks = $('.solution-block');

if ($subMenu.length > 0) {
    var menuTop = $subMenu.offset().top;

// 页面滚动到.solution-information-container时 定位于最上方
    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= menuTop) {
            $subMenu.addClass('fixedSub');
            $('.solution-information-container').css('margin-top', $subMenu.height() + 'px');
        } else {
            $subMenu.removeClass('fixedSub');
            $('.solution-information-container').css('margin-top', 0);
        }
    });

    $subMenu.on('click', '.solution-submenu-link', function($event) {
        $event.preventDefault();

        // $(this).parent().prevAll().length 获取当前位置
        $('html, body').animate({'scrollTop' : $($blocks[$(this).parent().prevAll().length]).offset().top - $subMenu.height() - 10}, 500);
    });
}

