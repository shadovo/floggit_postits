'use strict';

/**
 * @ngdoc overview
 * @name floggitPostitsApp
 * @description
 * # floggitPostitsApp
 *
 * Main module of the application.
 */
angular
  .module('floggitPostitsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          whiteboards: function (dataStorage) {
            return dataStorage.getAllWhiteboards().then(function (whiteboards) {
              return whiteboards;
            });
          }
        }
      })
      .when('/board/:name', {
        templateUrl: 'views/whiteboard.html',
        controller: 'FpWhiteboardCtrl',
        resolve: {
          categories: function ($route, dataStorage) {
            return dataStorage.getAll($route.current.params.name)
              .then(function (data) {
                return data;
              });
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
