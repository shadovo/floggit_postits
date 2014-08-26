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

    var baseUrl = 'http://api.beta2.se/fp-';

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
        basicPost('testwhiteboard', 'categories', dummyData.categories[i]);
      }
    }

    var dummyData = {};
    dummyData.categories = [];
    dummyData.postits = [];
    postDummyData();



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
