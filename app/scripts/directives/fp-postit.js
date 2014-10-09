'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:postit
 * @description
 * # postit
 */
angular.module('floggitPostitsApp')
  .directive('fpPostit', function () {
    return {
      templateUrl: 'views/postitTemplate.html',
      restrict: 'E',
      scope: {
        postit: '='
      },
      controller: function ($scope, $route, wsConnection, currentWhiteboard) {

        $scope.categories = currentWhiteboard.getCategories();

        $scope.colors = currentWhiteboard.getColors();

        // $scope.$watch(currentWhiteboard.getCategories, function (newValue) {
        //   $scope.categories = newValue;
        //   for (var i = 0; i < $scope.categories.length; i++) {
        //     if ($scope.categories[i].id === $scope.postit.category) {
        //       $scope.newCategory = $scope.categories[i];
        //     }
        //   }
        //   $scope.newColor = $scope.postit.color;
        // });

        var title = $scope.postit.title;
        var description = $scope.postit.description;
        var category = $scope.postit.category;
        var color = $scope.postit.color;
        $scope.newColor = color;

        $scope.$watch('newCategory', function () {
          updatePostitCategory();
        });

        $scope.$watch('newColor', function () {
          updatePostitColor();
        });

        var updatePostitColor = function () {
          if ($scope.newColor !== undefined && $scope.newColor !== color) {
            $scope.postit.color = $scope.newColor;
            color = $scope.newColor;
            wsConnection.updatePostit($scope.postit);
          }
        };

        var updatePostitCategory = function () {
          if ($scope.newCategory !== undefined && $scope.newCategory.id !== category) {
            $scope.postit.categoryId = $scope.newCategory.id;
            wsConnection.updatePostit($scope.postit);
          }
        };

        $scope.updatePostit = function () {
          if ($scope.postit.title !== title || $scope.postit.description !== description) {
            wsConnection.updatePostit($scope.postit);
            title = $scope.postit.title;
            description = $scope.postit.description;
          }
        };
        $scope.deletePostit = function () {
          var answer = confirm('Are you sure that you want to delete this postit?');
          if (answer === true) {
            wsConnection.deletePostit($scope.postit.id);
          }
        };
      }
    };
  });
