'use strict';


// Declare app level module which depends on filters, and services
angular.module('eZangular', ['eZangular.filters', 'eZangular.services', 'eZangular.directives', 'eZangular.controllers','restangular']).
  config(['$routeProvider', function($routeProvider) {
    
    $routeProvider.when('/content/location/:id', {templateUrl: 'partials/full.html', controller: 'ViewController'});
    $routeProvider.otherwise({controller: 'UrlAliasController'});

  }]);
