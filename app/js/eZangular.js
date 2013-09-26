'use strict';

// configuration relative to eZ REST API
var eZRestBaseURL = 'http://ezpublish.ymgconseil.com';
var eZRestPrefix = 'api/ezp/v2/';

// I assume for the moment that the API is REALLY stateless ( that is not true because we are using sessions ) so I can use cache
var useCache = true;
// bypassCORS is set to true by default because eZ Publish REST API does not suppor the CORS pre-flight OPTION request
var bypassCORS = true;
// native HTML5 mode allows angular to work without the # in the URIs
var html5Mode = true;

// Declare app level module which depends on filters, and services
angular.module('eZangular', [ 'ngRoute','eZangular.controllers','restangular','eZangular.filters']).
  config(['$routeProvider','RestangularProvider', '$locationProvider',
  	function($routeProvider, RestangularProvider, $locationProvider ) {

  		// this doesnt seems to work so far
		//$locationProvider.html5Mode(html5Mode);

		// the root route aka 'w00t w00t'
		$routeProvider.when('/', {redirectTo: '/content/locations/2'});
	   
	  	// pathstring  and direct location id routing
	    $routeProvider.when('/content/locations/:pathstring*', {templateUrl: 'partials/content/location/full.html', controller: 'LocationController'});

	  	// urlAlias routing
	  	$routeProvider.when('/:urlAlias*', {templateUrl: 'partial/content/view/full.html', controller: 'ViewController'});

	  	//otherwhise
	  	 $routeProvider.otherwise({redirectTo: '/'});

	    // restangular configuration
	    RestangularProvider.setBaseUrl(eZRestBaseURL);
	    RestangularProvider.setDefaultHeaders({accept: "application/vnd.ez.api.ContentInfo+json"});
	    //set up query cache so we don't have to re-query everything on every page
	    RestangularProvider.setDefaultHttpFields({cache: useCache});


	    // we have to set "X-Requested-With" to empty in order to bypass CORS pre-flight OPTION request
	    if(bypassCORS) RestangularProvider.setDefaultHeaders({"X-Requested-With" :""});

    

  	}]);
