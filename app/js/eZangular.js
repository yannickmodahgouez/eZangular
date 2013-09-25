'use strict';

// configuration relative to eZ REST API
var eZRestBaseURL = 'http://ezpublish.ymgconseil.com';
var eZRestPrefix = 'api/ezp/v2/';

// bypassCORS is set to true by default because eZ Publish REST API does not suppor the CORS pre-flight OPTION request
var bypassCORS = true;
// native HTML5 mode allows angular to work without the # in the URIs
var html5Mode = true;

// Declare app level module which depends on filters, and services
angular.module('eZangular', [ 'eZangular.controllers','restangular']).
  config(['$routeProvider','RestangularProvider', '$locationProvider',
  	function($routeProvider, RestangularProvider, $locationProvider ) {

		//$locationProvider.html5Mode(html5Mode);

	  	// pathstring routing
	    $routeProvider.when('/content/location/:pathstring*', {templateUrl: 'partials/full.html', controller: 'LocationController'});
	    //$routeProvider.otherwise({redirectTo: '/'});

	  	// urlAlias routing
	  	// to be implemented

	    // restangular configuration
	    RestangularProvider.setBaseUrl(eZRestBaseURL);
	    RestangularProvider.setDefaultHeaders({accept: "application/vnd.ez.api.ContentInfo+json"});

	    // we have to set "X-Requested-With" to empty in order to bypass CORS pre-flight OPTION request
	    if(bypassCORS) RestangularProvider.setDefaultHeaders({"X-Requested-With" :""});

    

  	}]);
