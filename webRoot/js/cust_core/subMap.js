var markers = [];
var position_info = null;
var user_checked = null;

function addMarker(map, point, searchInfoWindow)
{
  var marker = new BMap.Marker(point);
  marker.addEventListener("click", function(e){
    searchInfoWindow.open(marker);
  });
  marker.disableMassClear();
  map.addOverlay(marker);
  markers.push(marker);
}

var map = null;

function onShown()
{
  console.log("subMap.html shown.");

  position_info = window.parent.parent.frames[0].position_info;
  for(var key in position_info)
  {
    var point = new BMap.Point(Number(position_info[key].point[0]), Number(position_info[key].point[1]));
    position_info[key].point = point;
  }
  markers = [];

  // 百度地图API功能
  map = null;
  var _map = new BMap.Map("map");    // 创建Map实例
  _map.centerAndZoom(new BMap.Point(118.105199,24.442699), 17);  // 初始化地图,设置中心点坐标和地图级别
  _map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
  _map.setCurrentCity("厦门");          // 设置地图显示的城市 此项是必须设置的
  _map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

  _map.addEventListener("dblclick", function()
  {
    walking.clearResults();
    map.clearOverlays();
  });
  _map.disableDoubleClickZoom();

  user_checked = window.parent.parent.frames[0].user_checked;

  for(var index in user_checked)
  {
    //创建检索信息窗口对象
    var searchInfoWindow = null;
  	searchInfoWindow = new BMapLib.SearchInfoWindow(_map, position_info[user_checked[index]].des || user_checked[index], {
  		title  : user_checked[index],      //标题
  		width  : 290,             //宽度
  		height : 105,              //高度
  		panel  : "panel",         //检索结果面板
  		enableAutoPan : true,     //自动平移
  		searchTypes   :[
  			BMAPLIB_TAB_SEARCH,   //周边检索
  			BMAPLIB_TAB_TO_HERE,  //到这里去
  		]
  	});
    window.parent.appendPosLi(user_checked[index], "window.frames[0].walkNav('" + user_checked[index] + "');");
    addMarker(_map, position_info[user_checked[index]].point, searchInfoWindow);
  }

  map = _map;
  walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: true}});

  return;
}

var walking = null;

function walkNav(key)
{
  walking.clearResults();
  map.clearOverlays();
  var current_pos = new BMap.Point(window.parent.parent.current_pos[0], window.parent.parent.current_pos[1]);
  if(typeof key == "string")
  {
    walking.search(current_pos, position_info[key].point);
  }
  else if(typeof key == "object")
  {
    walking.search(current_pos, key);
  }
}

$(document).ready(function()
{
  window.parent.parent.BMap = BMap;
});
