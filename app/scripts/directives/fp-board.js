'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:whiteboard
 * @description
 * # whiteboard
 */
angular.module('floggitPostitsApp')
  .directive('fpBoard', function () {
    return {
      templateUrl: 'views/boardTemplate.html',
      restrict: 'E',
      scope: {
        name: '='
      },
      controller: function ($scope, dataStorage, currentWhiteboard) {
        currentWhiteboard.setName($scope.name);
        $scope.categories = currentWhiteboard.getCategories();

        function getAllData() {
          dataStorage.getAll($scope.name)
            .then(function (data) {
              currentWhiteboard.setCategories(data);
              $scope.categories = currentWhiteboard.getCategories();
            });
        }
        $scope.$on('dataUpdated', getAllData);
      }
    };
  });
