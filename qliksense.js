
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
$( "#reportContainer" ).hide();
$( "#filtercontainer" ).fadeOut();
}
function summaryShow()
{
$( "#iconContainer" ).show();
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
console.log( defaultLinkData.rows)

var url='';
  hide();
    $( "#reportContainer" ).show(); 
if(appID !=undefined)
{

url=event;
}

 
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
}else 
if(event.id=='useraccess')
{
 event.children[0].children[0].children[0].src="assets/mat_access_dark.png";
 SelectedArea="User Access";
}else if(event.id=="accountreceivable")
{
 event.children[0].children[0].children[0].src="assets/mat_ar_dark.png";
  SelectedArea="Account Receivable";
}else if(event.id=="jobcost")
{
  SelectedArea="Job Cost";
  event.children[0].children[0].children[0].src="assets/mat_jobcost_dark.png"; 
}else if(event.id=="revenue")
{
  event.children[0].children[0].children[0].src="assets/mat_revenue_dark.png";  
  SelectedArea="Revenue";
}
 for(var i=0;i< defaultLinkData.rows.length;i++)
   {
   if(defaultLinkData.rows[i][0].qText==SelectedArea)
   {
   url= defaultLinkData.rows[i][1].qText;
 
   break;
  }
  }
  
 document.getElementById("reportContainer").innerHTML= '<iframe style="width:100%;height:100%;" frameborder="0" src="' + url + '" />';

}