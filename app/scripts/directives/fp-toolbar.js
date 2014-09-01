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
      controller: function ($scope, dataStorage, currentWhiteboard) {
        $scope.colors = currentWhiteboard.getColors();
        $scope.categories = [];
        $scope.showCategorySelectionError = false;
        var newPostitTemplate = {
          color: $scope.colors[0]
        };
        $scope.newPostit = angular.copy(newPostitTemplate);
        $scope.$watch(currentWhiteboard.getCategories, function () {
          $scope.categories = currentWhiteboard.getCategories();
        });
        $scope.$watch('selectedCategory', function () {
          $scope.showCategorySelectionError = false;
        });

        $scope.resetForm = function () {
          $scope.showBigPostit = false;
          $scope.showCategorySelectionError = false;
          $scope.newPostit = angular.copy(newPostitTemplate);
        };

        $scope.savePostit = function () {
          if ($scope.newPostit.category === undefined || $scope.newPostit.category === null) {
            $scope.showCategorySelectionError = true;
          } else {
            var postit = {
              title: $scope.newPostit.title,
              description: $scope.newPostit.description,
              category: $scope.newPostit.category.id,
              color: $scope.newPostit.color
            };
            dataStorage.createPostit(currentWhiteboard.getName(), postit).then(function () {
              $scope.resetForm();
            });
          }
        };
      }
    };
  });
