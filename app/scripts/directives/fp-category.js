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
			controller: function ($scope, dataStorage) {
				var name = $scope.category.name;

				$scope.updateCategoryName = function () {
					if ($scope.category.name !== name) {
						dataStorage.updatePostit('testwhiteboard', $scope.category);
					}
				};
			}
		};
	});