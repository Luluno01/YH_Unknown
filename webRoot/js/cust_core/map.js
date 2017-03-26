var Notify = window.parent.UIkit.notify;

function onShown()
{
  console.log("Map.html shown.");
  $("#bottomnav > ul").empty();
  window.frames[0].onShown();
}

function getPosLi(name, onclick)
{
  return '<li><a href="#" onclick="' + onclick + '"><i class="uk-icon-map-marker"></i> ' + name + '</a></li>';
}

function appendPosLi(name, onclick)
{
  console.log("appended");
  $("#bottomnav > ul").append(getPosLi(name, onclick));
}

var img_recog_response = null;
var int_img_recog = -1;
var waiting = false;

function imgRecog()
{
  var img = $("#imgrecog").val();
  if(img == "") return;
  img_recog_response = $.ajax(
  {
    url: __IMG_UPLOAD__,
    method: "POST",
    type: "POST",
    data: {imgPath: img},
    cache: false,
    success: onUploadSuccess,
    error: onUploadFailed
  });
  waiting = true;

  int_img_recog = setInterval("uploadTimeoutListener(" + __IMG_RECOG_TIMEOUT__ + ")", 200);

  $("#imgrecog").val("");
}

var point = null;
var BMap = null;
function onUploadSuccess()
{
  if(!waiting && !SHOW) return;
  if(!img_recog_response.status && SHOW)
  {
    console.log("Timeout but SHOW == true");
    img_recog_response.responseJSON = {};
    img_recog_response.responseJSON.position = {};
  }
  else
  {
    console.log("Image upload successed!");
    img_recog_response.responseJSON = JSON.parse(img_recog_response.responseText);
  }
  waiting = false;
  Notify("<i class='uk-icon-check'></i> 图片上传成功！ :)");
  if(int_img_recog != -1)
  {
    clearInterval(int_img_recog);
    int_img_recog = -1;
    timer = null;
    //
  }
  else // int_img_recog == -1 -> upload successed after timeout
  {
    //
  }
  // Upload successed
  var modal = UIkit.modal("#modalimg");
  // $("#modaltrigger").click();
  modal.show();
  $("#modalimg > div > h1").html(img_recog_response.responseJSON.name || "God.YH");
  $("#modalimg > div > img").attr("src", img_recog_response.responseJSON.img ? (__YH_IMG_URL__ + img_recog_response.responseJSON.img) : "img/God.YH.jpg");
  $("#modalimg > div > p").html(img_recog_response.responseJSON.description || "YH大神带你装逼带你飞");
  BMap = BMap || window.frames[0].BMap;
  point = new BMap.Point(Number(img_recog_response.responseJSON.position.lng || "118.10"), Number(img_recog_response.responseJSON.position.lat || "24.46"));
  $("#modalimg > div > div.uk-text-right > button").click(function()
  {
    window.frames[0].walkNav(point);
    modal.hide();
  });
}

function onUploadFailed(XMLHttpRequest, textStatus, errorThrown)
{
  if(!waiting) return;
  waiting = false;
  if(!SHOW)
  {
    Notify("<i class='uk-icon-close'></i> 图片上传失败！ :(");
  }
  if(int_img_recog != -1)
  {
    clearInterval(int_img_recog);
    int_img_recog = -1;
    timer = null;
  }
  console.log("Image upload failed!");
  console.log("Error type: " + textStatus);
  // Upload failed
  onUploadSuccess(); // For show
}

var timer = null;
function uploadTimeoutListener(_timeout)
{
  _timeout = _timeout || 10000;
  if(!timer)
  {
    timer = (new Date).getTime();
  }
  if((new Date).getTime() - timer > _timeout)
  {
    // Timeout
    onUploadFailed(null, "Timeout");
    clearInterval(int_img_recog);
    int_img_recog = -1;
    timer = null;
  }
}
