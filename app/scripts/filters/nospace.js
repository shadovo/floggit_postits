'use strict';

/**
 * @ngdoc filter
 * @name floggitPostitsApp.filter:nospace
 * @function
 * @description
 * # nospace
 * Filter in the floggitPostitsApp.
 */
angular.module('floggitPostitsApp')
  .filter('nospace', function () {
    return function (value) {
      return (!value) ? '' : value.replace(/ /g, '-');
    };
  });
