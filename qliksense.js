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
   hide();		   
  $( "#reportContainer" ).show();

  var url=id;
  //alert(url)
		// var url='https://35.192.113.251/sense/app/9cd93190-efaf-4ac2-804d-6be28106f17a/sheet/PfKsJK/state/analysis'
 document.getElementById("reportContainer").innerHTML= '<iframe style="width:100%;height:100%;" frameborder="0" src="' + url + '" />';

}