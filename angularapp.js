var SelectedArea="useraccess";
var filterarray=[];
var newfilterarray=[];
var filterdataApp;
var filterDatarows=[]
var filterData = {
headers: [],
rows: filterDatarows
};

 SelectedArea="local";
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
var filterdata = {
headers: [],
rows: []
};

var myField=[];
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
   
   function setFilterData ( reply, app ) {
 
   filterdata.headers.length = 0;
   filterdata.rows.length = 0;
   //set headers
   reply.qHyperCube.qDimensionInfo.forEach( function ( dim ) {
	   filterdata.headers.push( dim.qFallbackTitle );
   } );
   reply.qHyperCube.qMeasureInfo.forEach( function ( mea ) {
	   filterdata.headers.push( mea.qFallbackTitle );
   } );
   reply.qHyperCube.qDataPages.forEach( function ( page ) {
	   filterdata.qMatrix.forEach( function ( row ) {
		   data.rows.push( row );
	   } );
   })

   };
 var dataApp = qlik.openApp('a2302b85-1df0-4563-93c8-0e67f5d642dc', config);

  filterdataApp = qlik.openApp('c406337c-9f60-4afe-8fd6-1aaf66ca653b', config);

 //var dataApp = qlik.openApp('Dashboards list.qvf', config);

 // filterdataApp = qlik.openApp('DashboardFilter.qvf', config);
 
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
		   },
		   
		    {
			   "qDef": {"qFieldDefs": ["Description"]}
		   }
		   
	   ],
	   "qMeasures": [],
	   "qSuppressZero": false,
	   "qSuppressMissing": false,
	   "qMode": "S"
   }, setCases );
 filterdataApp.getList("FieldList", function(reply){
 	$.each(reply.qFieldList.qItems, function(key, value) {

 		filterarray.push({qFieldDefs:value.qName});
	})
	
	for(var i=0;i<filterarray.length;i++)
	{
 	newfilterarray.push({qDef : filterarray[i]});
 	}
	
	for(var i=0;i<filterarray.length;i++)
{
 myField.push (filterdataApp.field(filterarray[i].qFieldDefs).getData());
}
var headercount=0;
var singlefield;
myField.forEach(function(singlefield){
	singlefield.OnData.bind( function(level){
			singlefield.rows.filter(x=>x.qText!=undefined).forEach(function(row,key){
			
			var count=singlefield.rows.filter(x=>x.qText!=undefined).length
			if(key==0)
			{
			  filterDatarows=[];
             filterData.headers.push([{"value":headercount, "text":row.field.fldname}])
			 headercount=headercount+1;
			}
			filterDatarows.push([{"value":key+1, "text":row.qText}]) 
			if(key+1==count)
			{
			if(filterDatarows.length!=0)
			 {
			 filterData.rows.push(filterDatarows)
			 }
			
			}
		
		}
		
		)
		;})});

		
	
	});


 
 
material.controller( "controller.main", ['$scope', function ( $scope ) {
$scope.selectedIndex = 0;
 $scope.filterTab = function(id) {
   // alert('one selected');
     $scope.iterations = [];
	 $scope.filterheader = [];
	 $scope.filterrow = [];
	 $scope.filterheader=filterData.headers;
	 $scope.filterrow=filterData.rows;

    $("#global").hide();
	$("#local").hide();
	$("#"+ id).show();
  }
  $scope.hideFilter = function(){  

    $('#filter').removeClass('btn-success');
	$( "#filtercontainer" ).fadeOut();
	$( "#divblur" ).removeClass("blur");
	}
$scope.slideInOut = function(event){  

//alert(event.target.className);
if(event.target.className=="collapsexpand material-icons md-dark md-24 right-arrow")
{
$("#navigation").addClass('rightnavigation'); 
$("#leftcontainer").addClass('right-left-half');
$("#leftcontainer").removeClass('left-half');

//$("#slidearrow").removeClass('right-arrow');
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
$scope.showinprogressContainer = function(event){ 
$scope.changecss(event);
 $( "#inprogressContainer" ).show();

}
$scope.changecss = function(event){
 // alert(event.target.id);
   
  removetopnavigation();
  $( "#inprogressContainer" ).hide();
  $("#"+event.currentTarget.id).addClass("btn-success");
  
  if(event.currentTarget.id !='dashboard' && event.currentTarget.id !='filter')
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
 $( "#divblur" ).addClass("blur") 
}
	
$scope.displayChart = function(){
var dashboardData={
area:[],
dashboard:[],
dashboardName: [],
dashboardObject: [],
links:[],
appID: [],
description: []
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
   dashboardData.description.push( data.rows[i][6].qText);
   }
     }

	
	 
var app;
var apparr=[]
var strdiv="<div id='container'>";
//alert('displayChart')
hide();
 $( "#filtercontainer" ).fadeOut()
$( "#divblur" ).removeClass("blur");
$( "#dashboardContainer" ).show();
 for(var i=0;i<dashboardData.dashboardName.length;i++){
  $scope.iterations = [];
  $scope.iterations.push(i)
  apparr.push(qlik.openApp(dashboardData.dashboardName[i] +".qvf", config));

	strdiv=strdiv+"<div class='dashboardsummary' onClick=showDashboard('" + dashboardData.links[i] + "')><div class='dashboardsummaryHeader'  >"+ dashboardData.dashboard[i] +"</div>";
	strdiv=strdiv+"<div  class='qvobject' id='qv" + i + "'>"+dashboardData.description[i]+"</div></div>";

}
strdiv=strdiv+"</div>"
document.getElementById('qlik').innerHTML =strdiv;

};

console.log('controller loaded');


}]);

angular.bootstrap(document.getElementById('material'), ['QlikSenseMaterial']);

});

