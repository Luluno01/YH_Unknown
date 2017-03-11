//panel checkbox

function onCheckListShown()
{
  $("#usercheck").children().each(function(index)
  {
    $($(this).children()[0]).click(function()
    {
      if(!($(this).hasClass("press")))
      {
        $(this).removeClass("depress");
        $(this).addClass("press");
        return;
      }
      if(!($(this).hasClass("depress")))
      {
        $(this).removeClass("press");
        $(this).addClass("depress");
        return;
      }
    });
  });
}
