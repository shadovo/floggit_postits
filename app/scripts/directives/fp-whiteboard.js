'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:whiteboard
 * @description
 * # whiteboard
 */
angular.module('floggitPostitsApp')
  .directive('fpWhiteboard', function () {
    return {
      templateUrl: 'views/whiteboard.html',
      restrict: 'E',
      scope: {
        name: '='
      },
      controller: function ($scope, dataStorage) {
        $scope.url = dataStorage.getUrl();
        var allPromise = dataStorage.getAll($scope.name);
        allPromise.then(function (data) {
          $scope.categories = data;
        });
      }
    };
  });
