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
      template: '<div>Hej! {{ categories }}<br>{{ postits }}<br><br> {{whiteboard}}</div>',
      restrict: 'E',
      scope: {
        name: '='
      },
      controller: function ($scope, dataStorage) {
        $scope.url = dataStorage.getUrl();

        var allPromise = dataStorage.getAll($scope.name);
        allPromise.then(function (data) {
          $scope.whiteboard = data;
        });
      }
    };
  });