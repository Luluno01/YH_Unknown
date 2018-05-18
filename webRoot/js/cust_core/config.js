var DEBUG = true;
var SHOW = true;
var __YH_SRV_LIST__ =
[
  "server.zyh.science:8080",
];
var __YH_SRV__ = __YH_SRV_LIST__[1];
var __YH_IMG_URL__ = __YH_SRV__ + "static/";
var __USER_INFO_UPDATE__ = __YH_SRV__ + "API/UserInfoUpdate/";
var __USER_POS_UPLOAD__ = __YH_SRV__ + "API/UpLoadPath/";
var __GET_RECOMMEND_LIST__ = __YH_SRV__ + "API/GetRecommendList/";
var __IMG_UPLOAD__ = __YH_SRV__ + "API/UpLoadimg/"

var __GET_RECOMMEND_LIST_TIMEOUT__ = SHOW ? 500 : 5000; // 5s
var __IMG_RECOG_TIMEOUT__ = SHOW ? 1000 : 2000; // 2s
