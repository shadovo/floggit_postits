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
			template: '<div></div>',
			restrict: 'E'

		};
	});