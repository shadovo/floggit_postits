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
      controller: function ($scope, dataStorage, currentWhiteboard) {
        var name = $scope.category.name;

        $scope.updateCategoryName = function () {
          if ($scope.category.name !== name) {
            dataStorage.updateCategory(currentWhiteboard.getName(), $scope.category)
              .then(function () {
                name = $scope.category.name;
              });
          }
        };
        $scope.deleteCategory = function () {
          var answer = confirm('Are you sure about deleting this category?');
          if (answer === true) {
            dataStorage.deleteCategory(currentWhiteboard.getName(), $scope.category.id);
          }
        };
      }
    };
  });
