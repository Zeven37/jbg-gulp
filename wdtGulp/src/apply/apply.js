/**
 * Created by Administrator on 2016/11/24 0024.
 */
var selectUl =$(".select-ul");
var selectLi =$(".select-ul li");
var selectText=$("#select-text");

selectText.text("请选择城市");
selectText.css("color","#999");

selectText.click(function() {

    selectUl.slideToggle(function() {
        $(this).children("ul").css("display","block");
    }, function() {
        $(this).children("ul").css("display","none")
    });

    selectUl.addClass("select-ul ul-over");

    selectLi.hover(function(){
        selectLi.mousemove(function(){
            $(this).addClass("li-over");
        });
        selectLi.mouseout(function(){
            $(this).removeClass("li-over");
        });
        selectLi.click(function () {
            selectText.text($(this).text());
            selectUl.css("display","none");
            selectText.css("color","#333");
        });
    });

});
