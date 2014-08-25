'use strict';

/**
 * @ngdoc function
 * @name floggitPostitsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the floggitPostitsApp
 */
angular.module('floggitPostitsApp')
	.controller('MainCtrl', function ($scope) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});