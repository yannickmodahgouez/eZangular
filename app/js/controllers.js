'use strict';

/* Controllers */

angular.module('eZangular.controllers', ['restangular']).
  controller('LocationController', [ '$scope', 'Restangular' ,'$route', function($scope, Restangular, $route) {
    
    //Welcome to callback hell
    //get the location
    Restangular.one(eZRestPrefix + 'content').one('locations',$route.current.params.pathstring).get().
    then(function(eZlocation){


      // create the breadcrumb array
       var breadcrumbs = [];
       eZlocation.Location.pathString.substring(1).split("/").forEach(function(el){

        if(el == 1 || el == "") return false;
        Restangular.one(eZRestPrefix + 'content').one('locations',el).get().
        then(function(elLocation){

          Restangular.one(elLocation.Location.Content._href.substring(1)).get().
          then(function(elContento){

            breadcrumbs.push({"name" : elContento.Content.Name , "href" : "#/content/locations/" + elLocation.Location.id })

          })
        
        });

       })

       $scope.breadcrumbs = breadcrumbs;

       Restangular.one(eZlocation.Location.Content._href.substring(1)).get().
       then(function(eZContent){

          $scope.contentName = eZContent.Content.Name;

       });
     
       //get the content for name
       Restangular.one(eZlocation.Location.Content._href.substring(1)).get().
       then(function(eZContent){

          $scope.contentName = eZContent.Content.Name;

       });

       // get the current version in order to display fields
       Restangular.one(eZlocation.Location.Content._href.substring(1)).one('currentversion').get().
       then(function(eZContentCurrentVersion){

          $scope.fields = eZContentCurrentVersion.Version.Fields.field;

       });

       //get the children array
       Restangular.one(eZlocation.Location.Children._href.substring(1)).get().
       then(function(eZLocationChildren){
          
          var children = [];

          eZLocationChildren.LocationList.Location.forEach(function(child){

            Restangular.one(eZRestPrefix + "content").one("locations" , child._href.split("/").slice(-1)[0]).get().
            then(function(childLocation){

               Restangular.one(childLocation.Location.Content._href.substring(1)).get().
               then(function(childContent){

                  children.push({"name" : childContent.Content.Name, "href" : "#/content/locations/" + childLocation.Location.id});

               });

            });

          });

          $scope.children = children;
      
     });

    });


  }]).
  controller('UrlAliasController', [ '$scope', 'Restangular' ,'$route', function($scope, Restangular, $route) {

    // we do no perform access check because the API is supposed to do it.
    console.log('on the urlalias route');

  }]);
  


  