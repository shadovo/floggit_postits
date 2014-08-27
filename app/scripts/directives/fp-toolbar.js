'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:fpToolbar
 * @description
 * # fpToolbar
 */
angular.module('floggitPostitsApp')
  .directive('fpToolbar', function () {
    return {
      templateUrl: 'views/toolbar.html',
      restrict: 'E',
      scope: {
        whiteboard: '='
      },
      controller: function ($scope) {
        $scope.test = function (text) {
          console.log(text);
        };
      }
    };
  });
