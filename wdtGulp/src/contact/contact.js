/**
 * Created by Administrator on 2016/11/24 0024.
 */
/**
 * Created by Administrator on 2016/11/23 0023.
 */
if ($('.contact-container').length > 0) {
    //地图初始化时，在地图上添加一个marker标记,鼠标点击marker可弹出自定义的信息窗体
    var map = new AMap.Map("map-container", {
        resizeEnable: true,
        center: [106.535700,29.552010],
        zoom: 18
    });
    addMarker();


//地图工具
    AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
        function(){
            map.addControl(new AMap.ToolBar());//工具条

            map.addControl(new AMap.Scale());//比例尺

        });

//添加marker标记
    function addMarker() {
        map.clearMap();
        var marker = new AMap.Marker({
            map: map,
            position: [106.535700,29.552010]
        });

        //鼠标点击marker弹出自定义的信息窗体
        AMap.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker.getPosition());
        });
    }

//实例化信息窗体
    var title = '重庆加班狗科技有限公司',
        content = [];
    content.push("<img src='dist/jbg-logo.png'>地址：重庆市渝中区李子坝正街抗战遗址公园内(生生公馆)");
    /*content.push("电话：400-000-0000");*/
    var infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow(title, content.join("<br/>")),
        offset: new AMap.Pixel(16, -45)
    });
//进入页面信息窗口默认打开
    infoWindow.open(map,[106.535700,29.552010]);

//构建自定义信息窗体
    function createInfoWindow(title, content) {
        var info = document.createElement("div");
        info.className = "info";
        info.style.width = "300px";
        // 定义顶部标题
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        var closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        closeX.src = "dist/close.gif";
        closeX.onclick = closeInfoWindow;

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        var bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';
        var sharp = document.createElement("img");
        sharp.src = "dist/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
    }

//关闭信息窗体
    function closeInfoWindow() {
        map.clearInfoWindow();
    }
}
