//YH_Unknown data collector

var user_selection = {};
var stage2_response;
var guid;
var Notify = window.parent.UIkit.notify;

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
  document.cookie = "GUID=" + guid.ToString();
  user_selection.GUID = guid.ToString();
  return guid;
}

function toggleAnim(id, anim) { //Not my code
    $(id).removeClass(anim).addClass(anim).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
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
  if(user_selection.gender == "female")
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
function submitData_0()
{
  window.parent.toggleLoad(100);
  document.cookie = 'gender=' + user_selection.gender;
  document.cookie = 'age=' + user_selection.age;
  document.cookie = 'way=' + user_selection.way;

  stage2_response = $.ajax(
  {
    url: "https://tourguide.tpddns.cn:8888/tags/",
    method: "POST",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(user_selection),
  });
}

//li[3]
function getCheckPanel(data, id)
{
  return '<div>' +
    '<div class="uk-panel uk-panel-box" data-ripple>' +
      '<div class="uk-panel-badge uk-badge ' + ((data[3] == 0) ? "uk-badge-danger" : "uk-badge-success") + '">' + ((data[3] == 0) ? "拥挤" : "稀疏") + '</div>' +
      '<div class="uk-panel-teaser">' +
        '<img src="img/01/' + data[1] + '" alt="preview image">' +
      '</div>' +
      '<h3 class="uk-panel-title">' + data[0] + '</h3>' +
      data[2] +
    '</div>' +
  '</div>';
}

var check_data = [["芙蓉湖", "FurongLake.jpg", "Default Content", 1], ["情人谷", "Qingren.jpg", "Default Content", 1], ["芙蓉隧道", "FurongTunnel.jpg", "Default Content", 1], ["海韵理工","Haiyun.jpg", "Default Content", 1]];
var user_checked = [];
var int_data_get, int_img_com;

function wavesInit()
{
  var config =
  {
    duration: 320
  }
  //Waves.attach(".uk-button");
  Waves.attach(".uk-panel.uk-panel-box");
  Waves.init(config);
}

function dataIsGet()
{
  if(check_data)
  {
     clearInterval(int_data_get);
     checkDataHandler(function()
     {
       window.parent.toggleLoad();
     });
  }
}

function checkDataHandler(callback)
{
  $("#usercheck").empty();
  check_data.forEach(function(elem, i){$("#usercheck").append(getCheckPanel(check_data[i], i));});
  onCheckListShown();
  wavesInit();
  if(typeof callback == "function") callback();
}

function submitData_1()
{
  user_checked = [];
  $("#usercheck").children().each(function(index)
  {
    if($($(this).children()[0]).hasClass("press")) // This panel is pressed (checked)
    {
      user_checked.push(check_data[index][0]);
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

  //Before leave
  user_selection.GUID = getGUID().ToString();

  window.parent.showFrame(1);
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
