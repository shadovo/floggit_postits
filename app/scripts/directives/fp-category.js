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
    templateUrl: 'views/categoryTemplate.html',
      restrict: 'E',
      scope: {
        category: '='
      },
      controller: function ($scope, $route, wsConnection, currentWhiteboard) {
        var name = $scope.category.name;
        $scope.updateCategoryName = function () {
          if ($scope.category.name !== name) {
            wsConnection.updateCategory($scope.category);
            name = $scope.category.name;
          }
        };
        $scope.deleteCategory = function () {
          var answer = confirm('Are you sure about deleting this category with its postits?');
          if (answer === true) {
            if ($scope.category.postits) {
              for (var i = 0; i < $scope.category.postits.length; i = i + 1) {
                wsConnection.deletePostit($scope.category.postits[i].id);
              }
            }
            wsConnection.deleteCategory($scope.category.id);
          }
        };
      }
    };
  });
