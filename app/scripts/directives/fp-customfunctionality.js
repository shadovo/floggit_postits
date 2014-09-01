'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:fpCustomFunctionality
 * @description
 * # fpCustomFunctionality
 */
angular.module('floggitPostitsApp')
  .directive('fpSelectAllOnFocus', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        element.mouseup(function (event) {
          event.preventDefault();
        });
        element.focus(function () {
          element.select();
        });
      }
    };
  });
