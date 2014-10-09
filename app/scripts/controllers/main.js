'use strict';

/**
 * @ngdoc function
 * @name floggitPostitsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the floggitPostitsApp
 */
angular.module('floggitPostitsApp')
  .controller('MainCtrl', function ($scope, $location, wsConnection, wsMessageTypes, currentWhiteboard) {

    $scope.loadWhiteboard = function (whiteboard) {
      wsConnection.getWhiteboard(whiteboard.id);
    };

    function goToWhiteboard (event, whiteboard) {
      var path = '/board/' + whiteboard.id;
      $location.path(path);
      $scope.$apply();
    }

    $scope.createWhiteboard = function () {
      console.log('creating whiteboard with name: ' + $scope.newName);
      wsConnection.createWhiteboard({
        name: $scope.newName + ''
      });
      console.log('sent new whiteboard');
      $scope.newName = '';
    };

    function getAllWhiteboards () {
      wsConnection.getAllWhiteboards();
    }
    getAllWhiteboards();

    function setWhiteboards (event, whiteboards) {
      $scope.whiteboards = whiteboards;
      $scope.$digest();
    }

    function newWhiteboard (event, whiteboard) {
      console.log(whiteboard);
      $scope.whiteboards.push(whiteboard);
      $scope.$apply();
      console.table($scope.whiteboards);
    }

    $scope.$on(wsMessageTypes.WHITEBOARD_GET_ALL, setWhiteboards);
    $scope.$on(wsMessageTypes.WHITEBOARD_NEW, newWhiteboard);
    $scope.$on(wsMessageTypes.WHITEBOARD_GET, goToWhiteboard);
  });
