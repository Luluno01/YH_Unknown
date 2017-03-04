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
    url: "http://tourguide.tpddns.cn:8888/tags/",
    method: "POST",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(user_selection),
  });
}

//li[3]
function getCheckBox(title, id)
{
  if(typeof id != "string" && typeof id != "number") return false;
  return "<li class='tg-list-item'>" +
    "<h4>" + title + "</h4>" +
    "<input class='tgl tgl-light' id='cb" + id + "' type='checkbox'>" +
    "<label class='tgl-btn' for='cb" + id + "'></label>" +
  "</li>";
}

var check_data = ["芙蓉湖", "情人谷", "芙蓉隧道", "海韵理工"];
var user_checked = [];
var int;

function dataIsGet()
{
  if(check_data)
  {
     clearInterval(int);
     checkDataHandler(window.parent.toggleLoad);
  }
}

function checkDataHandler(callback)
{
  $("#usercheck").empty();
  for(var i = 0; i<check_data.length; i++)
  {
    $("#usercheck").append(getCheckBox(check_data[i], i));
  }

  if(typeof callback == "function") callback();
}

function submitData_1()
{
  user_checked = [];
  for(var i = 0; i<check_data.length; i++)
  {
    if($("#cb" + i).is(":checked")) user_checked.push(check_data[i]);
  }
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
        int = setInterval("dataIsGet();", 1000);
        break;
      default:
        ;
    }
  });
  //Do something here
});
