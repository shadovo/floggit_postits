'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:whiteboard
 * @description
 * # whiteboard
 */
angular.module('floggitPostitsApp')
	.directive('whiteboard', function () {
		return {
			template: '<div></div>',
			restrict: 'E'

		};
	});