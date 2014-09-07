'use strict';

/**
 * @ngdoc function
 * @name floggitPostitsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the floggitPostitsApp
 */
angular.module('floggitPostitsApp')
  .controller('MainCtrl', function ($scope, $location, dataStorage, whiteboards) {
    $scope.whiteboards = whiteboards;
    $scope.goToWhiteboard = function (whiteboard) {
      $location.path('/board/' + whiteboard.id);
    };
    $scope.createWhiteboard = function () {
      dataStorage.createWhiteboard({
        name: $scope.newName
      }).then(function () {
        $scope.newName = '';
      });
    };

    function getAllWhiteboards() {
      dataStorage.getAllWhiteboards().then(function (whiteboards) {
        $scope.whiteboards = whiteboards;
      });
    }
    $scope.$on('dataUpdated', getAllWhiteboards);
  });
