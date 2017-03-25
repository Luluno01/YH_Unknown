var user_pos = [];
var current_pos = [];
var int_pos_track = -1;
var geolocation = null;

// [{"time": 1432464645, "pos": [118, 180]}, ...]

function userPositionTrack()
{
  window.BMap = window.BMap || window.frames[1].frames[0].BMap;
  if(!BMap) return;

  geolocation = new BMap.Geolocation();
  int_pos_track = setInterval("_userPositionTrack();", 1000);
}

function _userPositionTrack()
{
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == window.frames[1].frames[0].BMAP_STATUS_SUCCESS){
			// var mk = new BMap.Marker(r.point);
			// map.addOverlay(mk);
			// map.panTo(r.point);
			// alert('您的位置：'+r.point.lng+','+r.point.lat);
      current_pos[0] = r.point.lng;
      current_pos[1] = r.point.lat;
      user_pos.push({"time": (new Date()).getTime(), "pos": current_pos});
		}
		else {
			console.log('failed' + this.getStatus());
		}
	},{enableHighAccuracy: true});
	//关于状态码
	//BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
	//BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
	//BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
	//BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
	//BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
	//BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
	//BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
	//BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
	//BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
}
