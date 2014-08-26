'use strict';

/**
 * @ngdoc service
 * @name floggitPostitsApp.dataStorage
 * @description
 * # dataStorage
 * Factory in the floggitPostitsApp.
 */
angular.module('floggitPostitsApp')
	.factory('dataStorage', function ($http, $q) {

		// var baseUrl = 'http://api.beta2.se/fp-';
		var baseUrl = 'http://localhost:14782/fp-';

		function basicGet(whiteboard, type) {
			var deferred = $q.defer();
			var url = baseUrl + whiteboard + '-' + type;
			$http.get(url).success(function (data) {
				deferred.resolve(data);
			});
		}

		function basicPost(whiteboard, type, data) {
			var deferred = $q.defer();
			var url = baseUrl + whiteboard + '-' + type;
			$http.post(url, data).success(function (data) {
				deferred.resolve(data);
			});
		}

		function getAllCategoriesFor(whiteboard) {
			return basicGet(whiteboard, 'categories');
		}

		function getAllPostitsFor(whiteboard) {
			return basicGet(whiteboard, 'postits');
		}


		function postDummyData() {
			for (var i = 0; i < dummyData.categories.length; i = i + 1) {
				basicPost('testwhiteboard', 'categories', dummyData.categories[i]);
			}
			for (var j = 0; j < dummyData.postits.length; j = j + 1) {
				basicPost('testwhiteboard', 'postits', dummyData.postits[i]);
			}
		}

		var dummyDataCategories = [{
			'name': 'Todo'
		}, {
			'name': 'In progress'
		}, {
			'name': 'Done'
		}];

		var dummyDataPostits = [{
			'title': 'Some good deed.',
			'description': 'I am ver good deed that must be done!',
			'color': 'red',
			'category': 1
		}, {
			'title': 'Some bad deed.',
			'description': 'I am ver bad deed that must be done!',
			'color': 'blue',
			'category': 1
		}, {
			'title': 'Get angry over shit .',
			'description': 'I very important stuff!',
			'color': 'red',
			'category': 1
		}, {
			'title': 'Under progress',
			'description': 'I huiehriueh must be done!',
			'color': 'green',
			'category': 2
		}, {
			'title': 'Almost done.',
			'description': 'I am ver bad deed that must be done!',
			'color': 'yellow',
			'category': 2
		}, {
			'title': 'Done!!',
			'description': 'I huiehriueh must be done be done!',
			'color': 'green',
			'category': 3
		}, {
			'title': 'Done Again',
			'description': 'I anojoijojioj jjj must be done!',
			'color': 'blue',
			'category': 3
		}];

		// var dummyData = {};
		// dummyData.categories = dummyDataCategories;
		// dummyData.postits = dummyDataPostits;
		// postDummyData();

		return {
			getUrl: function () {
				return baseUrl;
			},
			getAllCategoriesFor: getAllCategoriesFor,
			getAllPostitsFor: getAllPostitsFor
		};
	});

// http://localhost:14782/fp-testwhiteboard-categories GET, POST
// http://localhost:14782/fp-testwhiteboard-categories/"id" GET, PUT, DELETE
// http://localhost:14782/fp-testwhiteboard-postits GET, POST
// http://localhost:14782/fp-testwhiteboard-postits/"id" GET, PUT, DELETE