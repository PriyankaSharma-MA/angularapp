
function slideInOut(id)
{
if(id.className=="right-arrow")
{
$("#navigation").addClass('rightnavigation'); 
$("#leftcontainer").addClass('right-left-half');
$("#leftcontainer").removeClass('left-half');
$("#slidearrow").removeClass('right-arrow');
$("#slidearrow").addClass('left-arrow');

}else
{

$("#leftcontainer").addClass('left-half');
$("#leftcontainer").removeClass('right-left-half');
$("#slidearrow").removeClass('left-arrow');
$("#slidearrow").addClass('right-arrow');
$("#navigation").removeClass('rightnavigation'); 

}

}

function hide()
{
$( "#dashboardContainer" ).hide();
$( "#iconContainer" ).hide();
$( "#summaryContainer" ).hide();
$( "#reportContainer" ).hide();
$( "#filtercontainer" ).fadeOut();
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
	  $('#filter').removeClass('btn-success');
	  $( "#filtercontainer" ).fadeOut();
	  $("divblur").removeClass('blur');
	}
	function removetopnavigation ()
	{
	 $("#navContainer button").each( function(){
	 $(this)[0].children[0].src=$(this)[0].children[0].src.replace("_dark.png",".png")
     $(this).removeClass('btn-success');
    });
	

	}
function removeLeftNavigation()
{
  $( ".selectedmenuitem" ).each(function() {
    $( this ).removeClass("selectedmenuitem");
  });
   
   $("#navigation img").each( function(){
  
   $(this)[0].src=$(this)[0].currentSrc.replace("_dark","");
      });
}
function showDashboard(event,appID)
{
//alert(appID)
//alert(event.id)
if(appID !=undefined)
{
selectedAppId=appID;
}

var url='';
  hide();

   $( "#reportContainer" ).show(); 
   if(event!="local")
   {
    var scope = angular.element(document.getElementById('controller.main')).scope();
   }
   if(event!="local" && event.id!=undefined)
{
 removetopnavigation();
 removeLeftNavigation();
 event.classList.add("selectedmenuitem");
 }
 
if(event=="local" )
{
SelectedArea="User Access"
 url="https://35.192.113.251/sense/app/7fbbc750-5863-43d9-8662-223b3109dccb/sheet/1ff88551-9c4d-41e0-b790-37f4c11d3df8/state/analysis";
}else 
if(event.id=='useraccess')
{
 event.children[0].children[0].children[0].src="assets/mat_access_dark.png";
 SelectedArea="User Access";
url="https://35.192.113.251/sense/app/7fbbc750-5863-43d9-8662-223b3109dccb/sheet/1ff88551-9c4d-41e0-b790-37f4c11d3df8/state/analysis"
}else if(event.id=="accountreceivable")
{
 event.children[0].children[0].children[0].src="assets/mat_ar_dark.png";
  SelectedArea="Account Receivable";
url="https://35.192.113.251/sense/app/9cd93190-efaf-4ac2-804d-6be28106f17a/sheet/PfKsJK/state/analysis"
}else if(event.id=="jobcost")
{
  SelectedArea="Job Cost";
  event.children[0].children[0].children[0].src="assets/mat_jobcost_dark.png"; 
url="https://35.192.113.251/sense/app/1341e738-2cc5-40ad-940e-7349ff06b03e/sheet/XuWLHFK/state/analysis"
}else if(event.id=="revenue")
{
  event.children[0].children[0].children[0].src="assets/mat_revenue_dark.png";  
  SelectedArea="Revenue";
url="https://35.192.113.251/sense/app/7fbbc750-5863-43d9-8662-223b3109dccb/sheet/1ff88551-9c4d-41e0-b790-37f4c11d3df8/state/analysis"
}

  //alert(url)
		// var url='https://35.192.113.251/sense/app/9cd93190-efaf-4ac2-804d-6be28106f17a/sheet/PfKsJK/state/analysis'
 document.getElementById("reportContainer").innerHTML= '<iframe style="width:100%;height:100%;" frameborder="0" src="' + url + '" />';

}