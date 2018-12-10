/*global require*/
/*
 * Bootstrap and angular-based mashup
 * @owner Erik Wetterberg (ewg)
 */
/*
 *    Fill in host and port for Qlik engine
 */

  angular.module('firstApplication', ['ngMaterial']).controller( "MainCtrl", ['$scope', function ( $scope ) {
	
		 $scope.clicked = function (id) {
		     $( "#sale" ).hide();
			   $( "#finance").hide();
			   
			   $( "#reportContainer" ).show();
		   $( "#"+id ).show();
	     //alert(id);
		 hide();
		 var url='http://35.188.173.90/#/home/copysubscription';
		// var url='https://35.192.113.251/sense/app/9cd93190-efaf-4ac2-804d-6be28106f17a/sheet/PfKsJK/state/analysis'
		 document.getElementById("reportContainer").innerHTML= '<iframe style="width:100%;height:100%;" frameborder="0" src="' + url + '" />';
		//document.getElementById("durl").innerHTML='<object  data="https://ap.qlikcloud.com/edit/5c07aadff80e309af602a9dd" >';
		// $('#durl').load('https://ap.qlikcloud.com/edit/5c07aadff80e309af602a9dd');
		//openDashborad();
	
		}
	}] );
	function showFilter()
	{
//	 $( "#filtercontainer" ).show();
	 $( "#filtercontainer" ).fadeIn()
	}

	function hideFilter()
	{
	$( "#filtercontainer" ).fadeOut();
	}
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};

require.config( {
	baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
} );
function hide()
{
$( "#iconContainer" ).hide();
$( "#summaryContainer" ).hide();
$( "#reportContainer" ).show();

}
function summaryShow(id)
{
$( "#iconContainer" ).show();
$( "#summaryContainer" ).show();
$( "#reportContainer" ).hide();
$( "#sale" ).hide();
$( "#finance").hide();
$( "#"+id ).show();

}
function openDashborad()
{
hide();
require( ["js/qlik"], function ( qlik ) {
	//qlik app
	var app;
	//data for case listing
	var data = {
		headers: [],
		rows: []
	};

	function getQlikApp () {
	
		//return qlik.openApp( "4bf04442-aa89-43ff-870a-917c86c92990", config )
	
		return qlik.openApp( "OTIS Demo Dashboard .qvf", config )
		//return  qlik.openApp('a75b2bd9-20a1-4b9a-829c-2418a1395135', config);
	}

	//callbacks -- inserted here --
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
		} );
	}

	//
	// Defining Module
	//
	var helpdeskApp = angular.module( "helpdeskApp", ['ngRoute'] );
	var arr = [];
	//
	// Defining Routes
	//
	helpdeskApp.config( function ( $routeProvider ) {
		$routeProvider.when( '/cases', {
			templateUrl: 'cases.html',
			controller: 'CaseCtrl'
		} ).
			otherwise( {
				controller: 'MainCtrl',
				templateUrl: './main.html'
			} );
	} );
	//controllers
	helpdeskApp.controller( "MainCtrl", ['$scope', function ( $scope ) {
		if ( !app ) {
			app = getQlikApp();
		}
		//get objects -- inserted here --
	app.getAppObjectList( 'sheet', function(reply){
		  $scope.iterations = [];
	var str = "";
	$.each(reply.qAppObjectList.qItems, function(key, value) {
	if(value.qData.title=='KPI Dashboard'){
		str +=  value.qData.title + ' ';
		$.each(value.qData.cells, function(k,v){
		arr[k]=v.name;
		str +=  v.name + ' ';
		});}
	});
	//alert(str);

	for(var i=0;i<arr.length;i++)
{
//alert(arr[i]);
$scope.iterations.push(i)
app.getObject( 'qv'+i, arr[i] );
//app.getObject(arr[i])
}
});

// KxdNL tcxTY MdpsUpA XdJZrm PWXUJSk fzppH NxVT RsSb HLwvPy
		//app.getObject( 'QV00', 'CurrentSelections' );
		
		//app.getObject( 'QV01', ' KxdNL' );
		//app.getObject( 'QV02', 'tcxTY' );
		//app.getObject( 'QV03', 'MdpsUpA' );
		//app.getObject( 'QV04', 'XdJZrm' );
	}] );
	helpdeskApp.controller( "CaseCtrl", ['$scope', function ( $scope ) {
		if ( !app ) {
			app = getQlikApp();
		}
		app.createCube( {
			"qInitialDataFetch": [
				{
					"qHeight": 400,
					"qWidth": 8
				}
			],
			"qDimensions": [
				{
					"qDef": {"qFieldDefs": ["CaseNumber"]}
				},
				{
					"qDef": {"qFieldDefs": ["Status"]}
				},
				{
					"qDef": {"qFieldDefs": ["Priority"]}
				},
				{
					"qDef": {"qFieldDefs": ["Case Created Date"]}
				},
				{
					"qDef": {"qFieldDefs": ["Case Closed Date"]}
				},
				{
					"qDef": {"qFieldDefs": ["Case Duration Time"]}
				},
				{
					"qDef": {"qFieldDefs": ["Case Owner"]}
				},
				{
					"qDef": {"qFieldDefs": ["Subject"]}
				}
			],
			"qMeasures": [],
			"qSuppressZero": false,
			"qSuppressMissing": false,
			"qMode": "S"
		}, setCases );
		//set up scope headers and rows
		$scope.headers = data.headers;
		$scope.rows = data.rows;

	}] );
	// bootstrap my angular application, including the "qlik-angular" module
	// must be done before the Qlik Sense API is used
	// you must also set qva-bootstrap="false" in your html file
	angular.bootstrap( document, ["helpdeskApp", "qlik-angular"] );
	qlik.setOnError( function ( error ) {
		//TODO:bootstrap removes html elements on dismiss..should hide instead
		$( "#errmsg" ).html( error.message ).parent().show();
	} );

	//

} );
}