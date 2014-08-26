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
      template: '<div>Hej! {{ categories }}</div>',
      restrict: 'E',
      scope: {
        name: '='
      },
      controller: function ($scope, dataStorage) {
        $scope.url = dataStorage.getUrl();
        dataStorage.getAllCategoriesFor('testwhiteboard').then(function (data) {
          $scope.categories = data;
        });
      }
    };
  });
