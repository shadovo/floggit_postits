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
      templateUrl: 'views/postit.html',
      restrict: 'E',
      scope: {
        postit: '='
      },
      controller: function ($scope, dataStorage) {

        $scope.categories = [];
        dataStorage.getAllCategoriesFor('testwhiteboard')
          .then(function (data) {
            $scope.categories = data;

            for (var i = 0; i < $scope.categories.length; i++) {
              if ($scope.categories[i].id === $scope.postit.category) {
                $scope.newCategory = $scope.categories[i];
              }
            }
          });

        $scope.$watch('newCategory', function () {
          $scope.updatePostitCategory();
        });

        var title = $scope.postit.title;
        var description = $scope.postit.description;
        var category = $scope.postit.category;
        var color = $scope.postit.color;

        $scope.updatePostitCategory = function () {
          console.log($scope.newCategory);
          if ($scope.newCategory !== undefined && $scope.newCategory.id !== category) {
            $scope.postit.category = $scope.newCategory.id;
            dataStorage.updatePostit('testwhiteboard', $scope.postit);
            category = $scope.postit.category;
            console.log(category);
          }
        };

        $scope.updatePost = function () {
          if ($scope.postit.title !== title || $scope.postit.description !== description) {
            dataStorage.updatePostit('testwhiteboard', $scope.postit);
            title = $scope.postit.title;
            description = $scope.postit.description;
          }
        };
        $scope.deletePostit = function () {
          var answer = confirm('Are you sure that you want to delete this postit?');
          if (answer === true) {
            console.log('ID: ' + $scope.postit.id);
            dataStorage.deletePostit('testwhiteboard', $scope.postit.id);
          }
        };
      }
    };
  });
