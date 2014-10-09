'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:whiteboard
 * @description
 * # whiteboard
 */
angular.module('floggitPostitsApp')
  .directive('fpBoard', function () {
    return {
      templateUrl: 'views/boardTemplate.html',
      restrict: 'E',
      controller: function ($scope, $timeout, currentWhiteboard) {
        function updateData () {
          $scope.categories = currentWhiteboard.getCategories();
          $timeout(function(){
            $scope.$apply();
          });
        }
        updateData();

        $scope.$on('dataUpdated', updateData);
      }
    };
  });
