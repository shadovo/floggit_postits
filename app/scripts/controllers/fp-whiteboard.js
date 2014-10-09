'use strict';

/**
 * @ngdoc function
 * @name floggitPostitsApp.controller:FpWhiteboardCtrl
 * @description
 * # FpWhiteboardCtrl
 * Controller of the floggitPostitsApp
 */
angular.module('floggitPostitsApp')
  .controller('FpWhiteboardCtrl', function ($routeParams, wsConnection, currentWhiteboard) {
    var id = parseInt($routeParams.id);
    if (id !== currentWhiteboard.getId()) {
      wsConnection.getWhiteboard(id);
    }
  });
