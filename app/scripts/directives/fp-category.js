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
      templateUrl: 'views/category.html',
      restrict: 'E',
      scope: {
        category: '='
      },
      controller: function ($scope, $route, dataStorage, currentWhiteboard) {
        var name = $scope.category.name;
        var category = $scope.category;
        $scope.updateCategoryName = function () {
          if ($scope.category.name !== name) {
            dataStorage.updateCategory(currentWhiteboard.getName(), $scope.category)
              .then(function () {
                name = $scope.category.name;
              });
          }
        };
        $scope.deleteCategory = function () {
          var answer = confirm('Are you sure about deleting this category with its postits?');
          if (answer === true) {
            for (var i = 0; i < category.postits.length; i = i + 1) {
              dataStorage.deletePostit(currentWhiteboard.getName(), category.postits[i].id);
            }
            dataStorage.deleteCategory(currentWhiteboard.getName(), $scope.category.id).then(function () {}).then(function () {
              $route.reload();
            });
          }
        };
      }
    };
  });