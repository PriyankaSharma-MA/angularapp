function clickdashboarddiv(id)
{
alert(id)
}

function hide()
{
$( "#dashboardContainer" ).hide();
$( "#iconContainer" ).hide();
$( "#summaryContainer" ).hide();
$( "#reportContainer" ).hide();

}
function summaryShow()
{
$( "#iconContainer" ).show();
$( "#summaryContainer" ).show();
$( "#reportContainer" ).hide();
$( "#dashboardContainer" ).hide();
}

function hideFilter()
	{
	$( "#filtercontainer" ).fadeOut();
	}
function showDashboard(id)
{
$("#dashboard").removeClass("btn-success");
var url='';
   hide();		   
  $( "#reportContainer" ).show();

if(id=='WHQ')
{
  SelectedArea=id;
url="https://35.192.113.251/sense/app/9cd93190-efaf-4ac2-804d-6be28106f17a/sheet/PfKsJK/state/analysis"
}else if(id=="AR")
{
  SelectedArea=id;
url="https://35.192.113.251/sense/app/7fbbc750-5863-43d9-8662-223b3109dccb/sheet/1ff88551-9c4d-41e0-b790-37f4c11d3df8/state/analysis"
}else if(id=="JC")
{
  SelectedArea=id;
url="https://35.192.113.251/sense/app/1341e738-2cc5-40ad-940e-7349ff06b03e/sheet/XuWLHFK/state/analysis"
}else
{
  url=id;
}
  //alert(url)
		// var url='https://35.192.113.251/sense/app/9cd93190-efaf-4ac2-804d-6be28106f17a/sheet/PfKsJK/state/analysis'
 document.getElementById("reportContainer").innerHTML= '<iframe style="width:100%;height:100%;" frameborder="0" src="' + url + '" />';

}