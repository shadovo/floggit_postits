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
        var title = $scope.postit.title;
        var description = $scope.postit.description;
        $scope.updatePost = function () {
          if ($scope.postit.title !== title || $scope.postit.description !== description) {
            dataStorage.updatePostit('testwhiteboard', $scope.postit);
            title = $scope.postit.title;
            description = $scope.postit.description;
          }
        };
      }
    };
  });
