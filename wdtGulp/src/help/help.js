/**
 * Created by wangdanting on 16/11/21.
 */

$(function() {
    //边导航ul
    var $sidebarUl = $(".help-sidebar-list");
    //个块里面的li点击效果
    $sidebarUl.on("click", ".help-sidebar-li", function($event) {
        $sidebarUl.find('.help-sidebar-li').removeClass('help-sidebar-on');
        //添加高亮效果
        $(this).addClass("help-sidebar-on");
    });
});
