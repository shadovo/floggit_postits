'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:fpCategory
 * @description
 * # fpCategory
 */
angular.module('floggitPostitsApp')
  .directive('fpCategory', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the fpCategory directive');
      }
    };
  });
