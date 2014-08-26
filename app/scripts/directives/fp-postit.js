'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:postit
 * @description
 * # postit
 */
angular.module('floggitPostitsApp')
	.directive('postit', function () {
		return {
			templateUrl: 'views/postit.html',
			restrict: 'E',
			scope: {
				postit: '='
			}

		};
	});