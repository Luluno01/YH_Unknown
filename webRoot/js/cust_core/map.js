

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

  int_img_recog = setInterval("uploadTimeoutListener(10000)", 200);

  $("#imgrecog").val("");
}

var point = null;
var BMap = null;
function onUploadSuccess()
{
  if(!waiting) return;
  waiting = false;
  console.log("Image upload successed!");
  img_recog_response.responseJSON = JSON.parse(img_recog_response.responseText);
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
  modal.show();
  $("#modalimg > div > h1").html(img_recog_response.responseJSON.name || "God.YH");
  $("#modalimg > div > img").attr("src", img_recog_response.responseJSON.img ? (__YH_IMG_URL__ + img_recog_response.responseJSON.img) : "img/God.YH.jpg");
  $("#modalimg > div > p").html(img_recog_response.responseJSON.description || "YH大神带你装逼带你飞");
  BMap = BMap || window.frames[0].BMap;
  point = new BMap.Point(Number(img_recog_response.responseJSON.position.lng), Number(img_recog_response.responseJSON.position.lat));
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
  if(int_img_recog != -1)
  {
    clearInterval(int_img_recog);
    int_img_recog = -1;
    timer = null;
  }
  console.log("Image upload failed!");
  console.log("Error type: " + textStatus);
  // Upload failed
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
