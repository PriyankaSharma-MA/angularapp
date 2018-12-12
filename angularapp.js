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
var dashboardData={
dashboardName: [],
dashboardObject: []
}

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
   for(var i=0;i< data.rows.length;i++)
   {
   if(data.rows[i][0].qText=="AR")
   {
  // alert('ar')
   dashboardData.dashboardName.push( data.rows[i][2].qText);
   dashboardData.dashboardObject.push( data.rows[i][3].qText);
   }
  
   }
   };
var dataApp = qlik.openApp('Dashboards list.qvf', config);
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
$scope.showFilter = function(){

	 $( "#filtercontainer" ).fadeIn()
	}
$scope.displayChart = function(){

var app;
var apparr=[]
var strdiv="<div id='container' style='display:flex'>";
//alert('displayChart')
hide();
$( "#dashboardContainer" ).show();
 for(var i=0;i<dashboardData.dashboardName.length;i++){
  $scope.iterations = [];
  $scope.iterations.push(i)
  apparr.push(qlik.openApp(dashboardData.dashboardName[i] +".qvf", config));
       //app = qlik.openApp(dashboardData.dashboardName[i] +".qvf", config);
		//app.getObject( 'QV02', dashboardData.dashboardObject[i] );
	strdiv=strdiv+"<div  class='qvobject' id='qv" + i + "'" +" onClick=clickdashboarddiv(" +i + ")></div>";	
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
//angular.bootstrap( document.getElementById('material'), ["QlikSenseMaterial", "qlik-angular"] );
//angular.bootstrap( document, ['QlikSenseMaterial', "qlik-angular"] );

});

