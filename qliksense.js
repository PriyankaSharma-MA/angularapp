function clickdashboarddiv(id)
{
alert(id)
}

function hide()
{
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