'use strict';

/* Filters */

angular.module('eZangular.filters', []).
  filter('rewritePath', [ function() {
    return function(text) {
      return String(text).replace('/' + eZRestPrefix, '#/');
    }
  }]);
