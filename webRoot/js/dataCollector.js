//YH_Unknown data collector

var DEFAULT_POS_INFO =
[
  {
    "芙蓉湖":
    {
      "point": [118.105199, 24.442699],
      "img": "img/01/FurongLake.jpg",
      "tags": ["天鹅", "湖", "水", "好吃"],
      "desc": "Default content",
      "popular": 100
    },
    "情人谷":
    {
      "point": [118.11057, 24.443525],
      "img": "img/01/Qingren.jpg",
      "tags": ["情人", "ff"],
      "desc": "Default content",
      "popular": 50
    },
    "芙蓉隧道":
    {
      "point": [118.109208, 24.441551],
      "img": "img/01/FurongTunnel.jpg",
      "tags": ["隧道", "涂鸦"],
      "desc": "Default content",
      "popular": 80
    },
    "海韵理工":
    {
      "point": [118.120496, 24.436422],
      "img": "img/01/Haiyun.jpg",
      "tags": ["海韵园", "教学楼", "辣鸡"],
      "desc": "Default content",
      "popular": 0
    }
  },
  {
    "钟林美广场":
    {
      "point": [118.100332, 24.443289],
      "img": "img/02/zonglinmei.jpg",
      "tags": ["天鹅", "湖", "水", "好吃"],
      "desc": "Default content",
      "popular": 100
    },
    "嘉庚主楼":
    {
      "point": [118.103545, 24.443847],
      "img": "img/02/jiageng.jpg",
      "tags": ["情人", "ff"],
      "desc": "Default content",
      "popular": 50
    },
    "科艺中心":
    {
      "point": [118.10499, 24.44195],
      "img": "img/02/keyizhongxin.jpg",
      "tags": ["隧道", "涂鸦"],
      "desc": "Default content",
      "popular": 80
    },
    "演武场":
    {
      "point": [118.101674, 24.442273],
      "img": "img/02/yanwuchang.jpg",
      "tags": ["海韵园", "教学楼", "辣鸡"],
      "desc": "Default content",
      "popular": 0
    }
  },
  {
    "鲁迅纪念馆":
    {
      "point": [118.102462, 24.44253],
      "img": "img/02/luxunjinian.jpg",
      "tags": ["天鹅", "湖", "水", "好吃"],
      "desc": "Default content",
      "popular": 100
    },
    "南光楼群":
    {
      "point": [118.105207, 24.440337],
      "img": "img/02/nanguang.jpg",
      "tags": ["情人", "ff"],
      "desc": "Default content",
      "popular": 50
    },
    "谢希德雕像":
    {
      "point": [118.108045, 24.440477],
      "img": "img/02/xiexide.jpg",
      "tags": ["隧道", "涂鸦"],
      "desc": "Default content",
      "popular": 80
    },
    "白城沙滩":
    {
      "point": [118.109852, 24.437976],
      "img": "img/02/baichengshatan.jpg",
      "tags": ["海韵园", "教学楼", "辣鸡"],
      "desc": "Default content",
      "popular": 0
    }
  },

  {
    "文庆亭":
    {
      "point": [118.102386, 24.444653],
      "img": "img/02/wenqingting.jpg",
      "tags": ["天鹅", "湖", "水", "好吃"],
      "desc": "Default content",
      "popular": 100
    },
    "白城看台":
    {
      "point": [118.109747, 24.438527],
      "img": "img/02/graph.png",
      "tags": ["情人", "ff"],
      "desc": "Default content",
      "popular": 50
    },
    "群贤楼群":
    {
      "point": [118.102075, 24.442788],
      "img": "img/02/qunxian.jpg",
      "tags": ["隧道", "涂鸦"],
      "desc": "Default content",
      "popular": 80
    },
    "湖心岛":
    {
      "point": [118.105237,24.443118],
      "img": "img/02/huxindao.jpg",
      "tags": ["海韵园", "教学楼", "辣鸡"],
      "desc": "Default content",
      "popular": 0
    }
  },
];

var default_pos_info_loop = -1;

function onShown()
{
  console.log("dataCollector.html shown");
  // position_info = null;
}

var user_selection = {};
var user_grade = {"site": {}};
var update_response;
var submit_response;
var pos_response;
var reco_response;
var refresh_response;
var reget_response;
var guid;
var Notify = window.parent.UIkit.notify;

function setCookie(c_name, value, expiredays) // Not my code; src: http://www.w3school.com.cn/js/js_cookies.asp
{
  var exdate=new Date()
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) +
  ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(name) //Not my code
{
  var arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr = document.cookie.match(reg)) return unescape(arr[2]);
  else return null;
}

function getGUID()
{
  if(getCookie("GUID"))
  {
    guid = new Guid(getCookie("GUID"));
    console.log("GUID detected: " + getCookie("GUID"));
    return guid;
  }
  guid = Guid.NewGuid();
  console.log("GUID generated: " + guid.ToString());
  setCookie("GUID", guid.ToString(), 365); // Expires in 1 year
  // user_selection.GUID = guid.ToString();
  return guid;
}

function toggleAnim(selector, anim) { //Not my code
    $(selector).removeClass(anim).addClass(anim).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass(anim);
    });
};

function pushData(src, data)
{
  user_selection[src] = data;
}

//li[1]
function adjustAgeButton()
{
  if(user_selection.gender == "2")
  {
    $("#age1").html('<i class="iconfont icon-girl"></i></br>姑娘');
    $("#age2").html('<i class="iconfont icon-woman"></i></br>阿姨');
    $("#age3").html('<i class="iconfont icon-womanold"></i></br>奶奶');
  }
  else
  {
    $("#age1").html('<i class="iconfont icon-boy"></i></br>小哥');
    $("#age2").html('<i class="iconfont icon-manbeard"></i></br>叔叔');
    $("#age3").html('<i class="iconfont icon-manold"></i></br>爷爷');
  }
}

//li[2]
var int_pos_track = -1;
function submitData_0()
{
  window.parent.toggleLoad(100);
  setCookie("gender", user_selection.gender);
  setCookie("age", user_selection.age);
  setCookie("way", user_selection.way);
  user_selection.GUID = getGUID().ToString();
  setCookie("GUID", user_selection.GUID);
  user_grade.GUID = user_selection.GUID;

  update_response = $.ajax(
  {
    url: __USER_INFO_UPDATE__,
    method: "POST",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(user_selection)
  });
  pos_response = $.ajax(
  {
    url: __USER_POS_UPLOAD__,
    method: "POST",
    type: "POST",
    dataType: "json",
    data: JSON.stringify({"GUID": getCookie("GUID"), "path": window.parent.user_pos}),
    success: function()
    {
      window.parent.user_pos = [];
    }
  });
  reco_response = $.ajax(
  {
    url: __GET_RECOMMEND_LIST__,
    method: "POST",
    type: "POST",
    data: JSON.stringify(user_selection),
    dataType: "json",
    success: function(){console.log("Reco list get. :)")}
  });

  int_pos_track = setInterval("uploadPath();", 3 * 60000);
}

//li[3]
function getCheckPanel(name, data, id)
{
  return '<div>' +
    '<div class="uk-panel uk-panel-box waves-effect">' +
      '<div class="uk-panel-badge uk-badge ' + ((data.popular == 0) ? "uk-badge-danger" : "uk-badge-success") + '">' + ((data.popular == 0) ? "Hot" : "推荐") + '</div>' +
      '<div class="uk-panel-teaser">' +
        '<img src="' + (position_info == DEFAULT_POS_INFO[default_pos_info_loop] ? "" : __YH_IMG_URL__) + data.img + '" alt="preview image">' +
      '</div>' +
      '<h3 class="uk-panel-title">' + name + '</h3>' +
      (data.des || name) +
    '</div>' +
  '</div>';
}

var position_info = null; // [["芙蓉湖", "FurongLake.jpg", "Default Content", 1], ["情人谷", "Qingren.jpg", "Default Content", 1], ["芙蓉隧道", "FurongTunnel.jpg", "Default Content", 1], ["海韵理工","Haiyun.jpg", "Default Content", 1]];
var user_checked = [];
var int_data_get = -1;
var timer = null;

function dataIsGet()
{
  // if(DEBUG)
  // {
  //   clearInterval(int_data_get);
  //   checkDataHandler(function()
  //   {
  //     window.parent.toggleLoad();
  //   });
  //   return;
  // }
  if(!timer)
  {
    timer = (new Date()).getTime();
  }
  if((new Date()).getTime() - timer > __GET_RECOMMEND_LIST_TIMEOUT__) // Timeout
  {
    console.log("Timeout at dataCollector.js dataIsGet().");
    default_pos_info_loop = (default_pos_info_loop + 1) % DEFAULT_POS_INFO.length
    position_info = DEFAULT_POS_INFO[default_pos_info_loop];
    console.log(position_info);
    timer = null;
    if(int_data_get != -1)
    {
      clearInterval(int_data_get);
      int_data_get = -1;
    }
    checkDataHandler(function()
    {
      window.parent.toggleLoad();
    });
    return;
  }
  if(reco_response.responseText)
  {
    position_info = reco_response.responseJSON;
    console.log(position_info);
    timer = null;
    if(int_data_get != -1)
    {
      clearInterval(int_data_get);
      int_data_get = -1;
    }
    checkDataHandler(function()
    {
      window.parent.toggleLoad();
    });
  }
}

function checkDataHandler(callback)
{
  $("#usercheck").empty();
  var i = 0;
  for(var pos_name in position_info)
  {
    $("#usercheck").append(getCheckPanel(pos_name, position_info[pos_name], i));
    i++;
  }
  onCheckListShown();
  if(typeof callback == "function") callback();
}

function submitData_1()
{
  user_checked = [];
  $("#usercheck").children().each(function(index)
  {
    var name = Object.keys(position_info);
    if($($(this).children()[0]).hasClass("press")) // This panel is pressed (checked)
    {
      user_checked.push(name[index]);
      user_grade.site[name[index]] = 2;
    }
    else
    {
      user_grade.site[name[index]] = -1;
    }
  });
  if(!user_checked.length)
  {
    Notify("<i class='uk-icon-exclamation'></i> 请选择至少一个景点 :)");
    toggleAnim("#checkarea", "uk-animation-shake");
    return;
  }

  //$.ajax
  Notify("<i class='uk-icon-check'></i> 你选择了 " + String(user_checked));
  submit_response = $.ajax(
  {
    url: __USER_INFO_UPDATE__,
    method: "POST",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(user_grade),
  });

  //Before leave

  window.parent.showFrame(1);
}

function refresh()
{
  window.parent.toggleLoad();
  for(var key in position_info)
  {
    user_grade.site[key] = -2;
  }
  refresh_response = $.ajax(
  {
    url: __USER_INFO_UPDATE__,
    method: "POST",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(user_grade)
  });
  user_grade.site = {};
  reget_response = $.ajax(
  {
    url: __GET_RECOMMEND_LIST__,
    method: "POST",
    type: "POST",
    data: JSON.stringify(user_selection),
    dataType: "json",
    success: function()
    {
      console.log("Reco list reget. :)");
    }
  });
  int_data_get = setInterval("dataIsGet();", 1000);
  reco_response = reget_response;
}

function uploadPath()
{
  pos_response = $.ajax(
  {
    url: __USER_POS_UPLOAD__,
    method: "POST",
    type: "POST",
    dataType: "json",
    data: JSON.stringify({"GUID": getCookie("GUID"), "path": window.parent.user_pos}),
    success: function()
    {
      window.parent.user_pos = [];
    }
  });
}

$(document).ready(function()
{
  $('#switcher').on('show.uk.switcher', function(event, area){
    switch($("#switcher li").index(area[0]))
    {
      case 1:
        adjustAgeButton();
        break;
      case 3:
        int_data_get = setInterval("dataIsGet();", 1000);
        break;
      default:
        ;
    }
  });
  //Do something here
});
