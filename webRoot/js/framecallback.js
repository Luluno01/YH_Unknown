window.onload = function()
{
  if(window.parent != window) //In iframe
  {
    if(!window.parent.standby) window.parent.standby = 0;
    window.parent.standby++;
  }
}
