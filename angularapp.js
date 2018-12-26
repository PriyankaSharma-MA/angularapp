function slideInOut(id)
{
//alert(id.className);
if(id.className=="right-arrow")
{
$("#slidearrow").removeClass('right-arrow');
$("#slidearrow").addClass('left-arrow');

$("#leftcontainer").removeClass('left-half');
$("#leftcontainer").addClass('right-left-half');
$("#navigation").addClass('rightnavigation'); 

}else
{
$("#slidearrow").removeClass('left-arrow');
$("#slidearrow").addClass('right-arrow');

$("#leftcontainer").removeClass('right-left-half');
$("#leftcontainer").addClass('left-half');
$("#navigation").removeClass('rightnavigation'); 

}



}
var SelectedArea="User Access";
showDashboard(SelectedArea)

var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);


var config = {


host: window.location.hostname,


prefix: prefix,


port: window.location.port,


isSecure: window.location.protocol === "https:"


};




require.config({


baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",

});




require( ["js/qlik"], function ( qlik ) {


qlik.setOnError(function (error) {


$('#popupText').append(error.message + "<br>");


$('#popup').fadeIn(1000);


});


$("#closePopup").click(function () {


$('#popup').hide();


});



// create and bootstrap qlik sense angular module


var module = angular.module('QlikSenseWebApp', ['ngAnimate', 'ngRoute']);

module.config( function ( $routeProvider ) {
   $routeProvider.when( '/cases', {
	   templateUrl: 'cases.html',
	   controller: 'CaseCtrl'
   } ).
	   otherwise( {
		   controller: 'controller.main',
		   templateUrl: './main.html'
	   } );
} );
angular.bootstrap(document.getElementById('qlik'), ['qlik-angular', 'QlikSenseWebApp']);



// create and bootstrap angular material


var material = angular.module('QlikSenseMaterial', ['ngMaterial', 'ngRoute']);
material.config( function ( $routeProvider ) {
   $routeProvider.when( '/cases', {
	   templateUrl: 'cases.html',
	   controller: 'CaseCtrl'
   } ).
	   otherwise( {
		   controller: 'controller.main',
		   templateUrl: './main.html'
	   } );
} );
var data = {
headers: [],
rows: []
};


function setCases ( reply, app ) {
 
//alert('setCases')
   data.headers.length = 0;
   data.rows.length = 0;
   //set headers
   reply.qHyperCube.qDimensionInfo.forEach( function ( dim ) {
	   data.headers.push( dim.qFallbackTitle );
   } );
   reply.qHyperCube.qMeasureInfo.forEach( function ( mea ) {
	   data.headers.push( mea.qFallbackTitle );
   } );
   reply.qHyperCube.qDataPages.forEach( function ( page ) {
	   page.qMatrix.forEach( function ( row ) {
		   data.rows.push( row );
	   } );
   })

   };
//var dataApp = qlik.openApp('Dashboards list.qvf', config);
var dataApp = qlik.openApp('134b462d-3e70-4eb7-92c8-5e53467c8e8b', config);
dataApp.createCube( {
	   "qInitialDataFetch": [
		   {
			   "qHeight": 400,
			   "qWidth": 8
		   }
	   ],
	   "qDimensions": [
		   {
			   "qDef": {"qFieldDefs": ["Area"]}
		   },
		   {
			   "qDef": {"qFieldDefs": ["Dashboard"]}
		   },
		   {
			   "qDef": {"qFieldDefs": ["Dashboard Name"]}
		   },
		   {
			   "qDef": {"qFieldDefs": ["Object ID"]}
		   },
		    {
			   "qDef": {"qFieldDefs": ["links"]}
		   },
		    {
			   "qDef": {"qFieldDefs": ["App ID"]}
		   }
		   
	   ],
	   "qMeasures": [],
	   "qSuppressZero": false,
	   "qSuppressMissing": false,
	   "qMode": "S"
   }, setCases );
// create controller for handling button clicks etc.


//material.controller('controller.main', function ($scope) {

material.controller( "controller.main", ['$scope', function ( $scope ) {
$scope.selectedIndex = 0;
 $scope.filterTab = function(id) {
   // alert('one selected');
    $("#global").hide();
	$("#local").hide();
	$("#"+ id).show();
  }

$scope.changecss = function(event){
 // alert(event.target.id);
   
  $("#navContainer button").each( function(){
    $(this).removeClass('btn-success');
  });
  $("#"+event.target.id).addClass("btn-success");
  
  if(event.target.id !='dashboard' && event.target.id !='filter')
  {
  $( "#iconContainer" ).hide();
  $( "#summaryContainer" ).hide();
  $( "#dashboardContainer" ).hide(); 
  $( "#reportContainer" ).hide();
  $( "#filtercontainer" ).hide();
  }
	}


$scope.showFilter = function(){
$scope.selectedIndex = 0;
 $( "#filtercontainer" ).fadeIn()
 // $("#wrapper").css({'text-shadow': '0px 0px 10px #000'});

	// $( "#filtercontainer" ).fadeIn()
	}
	
$scope.displayChart = function(){
var dashboardData={
area:[],
dashboard:[],
dashboardName: [],
dashboardObject: [],
links:[],
appID: [],
}
   for(var i=0;i< data.rows.length;i++)
   {
   if(data.rows[i][0].qText==SelectedArea)
   {
   //alert(SelectedArea)
   dashboardData.area.push( data.rows[i][0].qText);
   dashboardData.dashboard.push( data.rows[i][1].qText);
   dashboardData.dashboardName.push( data.rows[i][2].qText);
   dashboardData.dashboardObject.push( data.rows[i][3].qText);
   dashboardData.links.push( data.rows[i][4].qText);
   dashboardData.appID.push( data.rows[i][5].qText);
   }
     }

	
	 
var app;
var apparr=[]
var strdiv="<div id='container'>";
//alert('displayChart')
hide();
 $( "#filtercontainer" ).fadeOut()
//document.getElementById('dashboard').addClass("btn-success");
$( "#dashboardContainer" ).show();
 for(var i=0;i<dashboardData.dashboardName.length;i++){
  $scope.iterations = [];
  $scope.iterations.push(i)
  //apparr.push(qlik.openApp(dashboardData.dashboardName[i] +".qvf", config));
  apparr.push(qlik.openApp(dashboardData.appID[i], config));
	//strdiv=strdiv+"<ul><li>"
	strdiv=strdiv+"<div class='dashboardsummary' onClick=showDashboard('" + dashboardData.links[i] + "')><div class='dashboardsummaryHeader'  >"+ dashboardData.dashboard[i] +"</div>";
	strdiv=strdiv+"<div  class='qvobject' id='qv" + i + "'></div></div>";
	
	//strdiv=strdiv+"</ul></li>"
}
strdiv=strdiv+"</div>"
document.getElementById('qlik').innerHTML =strdiv;
for(var i=0;i<apparr.length;i++)
{
app=apparr[i];
app.getObject( 'qv'+i, dashboardData.dashboardObject[i] );
}
};

console.log('controller loaded');


}]);

angular.bootstrap(document.getElementById('material'), ['QlikSenseMaterial']);

});

