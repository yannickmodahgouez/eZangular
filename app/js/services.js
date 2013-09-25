'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('eZangular.services', []).
  value('version', 'beta0.1');


var baseURL = '/api/ezp/v2';
angular.module('eZangular.services', ['ngResource']).
factory('eZRESTcontent', function ($resource) {
    return $resource(baseURL+'/content', {}, {
        
    });
});
