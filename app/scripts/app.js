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
        controller: 'MainCtrl'
      })
      .when('/board/:id', {
        templateUrl: 'views/whiteboard.html',
        controller: 'FpWhiteboardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
