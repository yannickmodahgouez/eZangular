'use strict';

/* Controllers */

angular.module('eZangular.controllers', ['restangular']).
  controller('LocationController', [ '$scope', 'Restangular' ,'$route', function($scope, Restangular, $route) {
    
    //get the location
    Restangular.one(eZRestPrefix + 'content').one('locations','1/'+$route.current.params.pathstring).get().
    then(function(eZlocation){
     
       //get the content for name
       Restangular.one(eZlocation.Location.Content._href.substring(1)).get().
       then(function(eZContent){

          $scope.contentName = eZContent.Content.Name;

       });

       // get the current version for fields
       Restangular.one(eZlocation.Location.Content._href.substring(1)).one('currentversion').get().
       then(function(eZContentCurrentVersion){

          $scope.fields = eZContentCurrentVersion.Version.Fields.field;

       });
       //get the children
       Restangular.one(eZlocation.Location.Children._href.substring(1)).get().
       then(function(eZLocationChildren){
          
          $scope.children = eZLocationChildren.LocationList.Location;
      
     });

    });


  }]);


  