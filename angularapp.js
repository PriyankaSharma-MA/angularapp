var SelectedArea="useraccess";
var filterarray=[];
var filterdataApp;
var defaultLinkdataApp;
var filterDatarows=[]
var filterData = {
headers: [],
rows: filterDatarows
};
var defaultLinkData = {
headers: [],
rows: []
};

 SelectedArea="local";

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
   
   function setdefaultLinkData ( reply, app ) {
 
   defaultLinkData.headers.length = 0;
   defaultLinkData.rows.length = 0;
   //set headers
   reply.qHyperCube.qDimensionInfo.forEach( function ( dim ) {
	   defaultLinkData.headers.push( dim.qFallbackTitle );
   } );
   reply.qHyperCube.qMeasureInfo.forEach( function ( mea ) {
	   defaultLinkData.headers.push( mea.qFallbackTitle );
   } );
   reply.qHyperCube.qDataPages.forEach( function ( page ) {
	   page.qMatrix.forEach( function ( row ) {
		   defaultLinkData.rows.push( row );
	   } );
	   
   })
 showDashboard(SelectedArea);
   };
 var dataApp = qlik.openApp(DashboardsList, config);

  filterdataApp = qlik.openApp(DashboardFilter, config);
 
  defaultLinkdataApp = qlik.openApp(DefaultLink, config);

 defaultLinkdataApp.createCube( {
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
			   "qDef": {"qFieldDefs": ["Link"]}
		   }
		   
	   ],
	   "qMeasures": [],
	   "qSuppressZero": false,
	   "qSuppressMissing": false,
	   "qMode": "S"
   }, setdefaultLinkData );
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
      myField.push (filterdataApp.field(filterarray[i].qFieldDefs).getData());
   }
var headercount=0;
var singlefield;
myField.forEach(function(singlefield){

	singlefield.OnData.bind( function(level){

			singlefield.rows.forEach(function(row,key){
			
			var count=singlefield.rows.length
			if(key==0)
			{
			 filterDatarows=[];
			 if(row.field.fldname!=undefined)
			 {
             filterData.headers.push([{"value":headercount, "text":row.field.fldname}])
			 headercount=headercount+1;
			 }
			}

			if(row.qText!=undefined)
			{
			filterDatarows.push([{"value":key+1, "text":row.qText}]) 
			}
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

 $scope.filterTab = function(id) {
   
	 $scope.filterheader = [];
	 $scope.filterrow = [];
	 $scope.filterheader=filterData.headers;
	 $scope.filterrow=filterData.rows;

    $("#global").hide();
	$("#local").hide();
	$("#"+ id).show();
  }
  $scope.hideFilter = function(){  
    $('#filter')[0].children[0].src=$('#filter')[0].children[0].src.replace("_dark.png",".png")
    $('#filter').removeClass('btn-success');
	$( "#filtercontainer" ).fadeOut();
	$( "#divblur" ).removeClass("blur");
	}
$scope.slideInOut = function(event){  

if(event.target.className=="collapsexpand material-icons md-dark md-24 right-arrow")
{
$("#navigation").addClass('rightnavigation'); 
$("#leftcontainer").addClass('right-left-half');
$("#leftcontainer").removeClass('left-half');
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
 
if(document.getElementsByClassName('btn-success').length !=0  && event.currentTarget.id =='filter' && document.getElementsByClassName('btn-success')[0].id =='dashboard')
  
  {}else
  {
    removetopnavigation();
  }
   var imgsrc= $("#"+event.currentTarget.id)[0].children[0].src
 $("#"+event.currentTarget.id)[0].children[0].src=imgsrc.replace(".png","_dark.png")
 
  $( "#inprogressContainer" ).hide();
  $("#"+event.currentTarget.id).addClass("btn-success");
  
  if(event.currentTarget.id !='dashboard' && event.currentTarget.id !='filter')
  {

  $( "#iconContainer" ).hide();
  $( "#dashboardContainer" ).hide(); 
  $( "#reportContainer" ).hide();
  $( "#filtercontainer" ).hide();
  }
	}

$scope.showFilter = function(event){
$scope.changecss(event);
 if(document.getElementById('reportContainer').style.display=="block")
 {
  $scope.isDisabled=false;
 }else
 {
  $scope.isDisabled=false;
 }
 $scope.selectedIndex = 0;
 
 $( "#filtercontainer" ).fadeIn()
 $( "#divblur" ).addClass("blur") 
}
	
$scope.displayChart = function(event){
$scope.changecss(event);
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
var strdiv="<div id='container'>";
hide();
 $( "#filtercontainer" ).fadeOut()
$( "#divblur" ).removeClass("blur");
$( "#dashboardContainer" ).show();
 for(var i=0;i<dashboardData.dashboardName.length;i++){

	strdiv=strdiv+"<div class='dashboardsummary' onClick=showDashboard('" + dashboardData.links[i] + "','" + dashboardData.appID[i] + "')><div class='dashboardsummaryHeader'  >"+ dashboardData.dashboard[i] +"</div>";
	strdiv=strdiv+"<div  class='qvobject' id='qv" + i + "'>"+dashboardData.description[i]+"</div></div>";

}
strdiv=strdiv+"</div>"
document.getElementById('qlik').innerHTML =strdiv;

};

console.log('controller loaded');

}]);

angular.bootstrap(document.getElementById('material'), ['QlikSenseMaterial']);

});

