'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:fpToolbar
 * @description
 * # fpToolbar
 */
angular.module('floggitPostitsApp')
	.directive('fpToolbar', function () {
		return {
			templateUrl: 'views/toolbar.html',
			restrict: 'E',
			link: function postLink(scope, element) {
				element.text('this is the fpToolbar directive');
			}
		};
	});