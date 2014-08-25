'use strict';

/**
 * @ngdoc function
 * @name floggitPostitsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the floggitPostitsApp
 */
angular.module('floggitPostitsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
