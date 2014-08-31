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
      controller: function ($scope, dataStorage, currentWhiteboard) {
        currentWhiteboard.setName($scope.name);

        function getAllData() {
          dataStorage.getAll($scope.name)
            .then(function (data) {
              currentWhiteboard.setCategories(data);
              $scope.categories = currentWhiteboard.getCategories();
            });
        }
        getAllData();

        $scope.$on('dataUpdated', getAllData);
      }
    };
  });
