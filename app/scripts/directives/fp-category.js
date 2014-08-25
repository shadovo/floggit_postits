'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:fpCategory
 * @description
 * # fpCategory
 */
angular.module('floggitPostitsApp')
	.directive('fpCategory', function () {
		return {
			templateUrl: 'views/category.html',
			restrict: 'E',
			scope: {
				category: '='
			},
			controller: function ($scope) {
				$scope.categoryName = category.name;
				$scope.postits = category.postits;
			}
		};
	});