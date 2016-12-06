/**
 * Created by wangdanting on 16/11/24.
 */

$(function() {
    //滚动条下拉，回到顶端图标出现

    $(window).on('scroll', function() {
        if(($('html').scrollTop() + $('body').scrollTop()) != 0) {
            $(".tool-turn-top").slideDown(200);
        } else {
            $(".tool-turn-top").slideUp(200);
        }
    });
    //点击回到顶端图标
    $(".tool-turn-top").on("click", function () {
        $('html, body').animate({'scrollTop' : 0}, 500);
    });
    //li hover 效果
    var mouseEnter = false;
    if(!mouseEnter) {
        $('.tool-rightsidemenu-li').on('mouseenter', function() {
            mouseEnter = true;
            $(this).find('.tool-insert-block').show(100);
        }).on('mouseleave', function() {
            $(this).find('.tool-insert-block').hide(100);
        });
        mouseEnter = false;
    }

});
