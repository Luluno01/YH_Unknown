function addMarker(map, point)
{
  var marker = new BMap.Marker(point);
  map.addOverlay(marker);
}

var map = null;

function onShown()
{
  console.log("Map.html shown.");
  var coord =
  {
    "芙蓉湖": new BMap.Point(118.105199, 24.442699),
    "情人谷": new BMap.Point(118.11057, 24.443525),
    "芙蓉隧道": new BMap.Point(118.109208, 24.441551),
    "海韵理工": new BMap.Point(118.120496, 24.436422)
  };

  // 百度地图API功能
  map = null;
  var _map = new BMap.Map("map");    // 创建Map实例
  _map.centerAndZoom(new BMap.Point(118.105199,24.442699), 17);  // 初始化地图,设置中心点坐标和地图级别
  _map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
  _map.setCurrentCity("厦门");          // 设置地图显示的城市 此项是必须设置的
  _map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

  var user_checked = window.parent.frames[0].user_checked;

  for(var index in user_checked)
  {
    addMarker(_map, coord[user_checked[index]]);
  }

  map = _map;

  return;
}
