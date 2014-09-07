'use strict';

/**
 * @ngdoc function
 * @name floggitPostitsApp.controller:FpWhiteboardCtrl
 * @description
 * # FpWhiteboardCtrl
 * Controller of the floggitPostitsApp
 */
angular.module('floggitPostitsApp')
  .controller('FpWhiteboardCtrl', function ($scope, $routeParams, currentWhiteboard, categories) {
    $scope.whiteboard = $routeParams.name;
    currentWhiteboard.setCategories(categories);
  });
