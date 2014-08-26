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

    function basicRequest(method, whiteboard, type, data) {
      var deferred = $q.defer();
      var url = baseUrl + whiteboard + '-' + type;
      var requestParams = {};
      requestParams.method = method;
      requestParams.url = url;
      if (data !== undefined) {
        requestParams.data = data;
      }
      $http(requestParams).success(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    }

    function basicGet(whiteboard, type) {
      return basicRequest('GET', whiteboard, type);
    }

    function basicPost(whiteboard, type, data) {
      return basicRequest('POST', whiteboard, type, data);
    }

    function getAllCategoriesFor(whiteboard) {
      return basicGet(whiteboard, 'categories');
    }

    function getAllPostitsFor(whiteboard) {
      return basicGet(whiteboard, 'postits');
    }

    function addPostitToCorrespondingCategory(categories, postit) {
      var j;
      for (j = 0; j < categories.length; j = j + 1) {
        if (postit.category === categories[j].id) {
          if (categories[j].postits === undefined) {
            categories[j].postits = [];
          }
          categories[j].postits.push(postit);
        }
      }
    }

    function getAll(whiteboard) {
      var deferred = $q.defer();
      var categoryPromise = getAllCategoriesFor(whiteboard);
      var postitsPromise, i;
      categoryPromise.then(function (categories) {
        postitsPromise = getAllPostitsFor(whiteboard);
        postitsPromise.then(function (postits) {
          for (i = 0; i < postits.length; i = i + 1) {
            addPostitToCorrespondingCategory(categories, postits[i]);
          }
        });
        deferred.resolve(categories);
      });
      return deferred.promise;
    }



    function postDummyData() {
      for (var i = 0; i < dummyData.categories.length; i = i + 1) {
        basicPost('testwhiteboard', 'categories', dummyData.categories[i]);
      }
      for (var j = 0; j < dummyData.postits.length; j = j + 1) {
        basicPost('testwhiteboard', 'postits', dummyData.postits[j]);
      }
    }
    var dummyDataCategories = [{
      'name': 'Todo',
      'id': 1
    }, {
      'name': 'In progress',
      'id': 2
    }, {
      'name': 'Done',
      'id': 3
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


    var dummyData = {};
    dummyData.categories = dummyDataCategories;
    dummyData.postits = dummyDataPostits;
    // postDummyData();

    return {
      getUrl: function () {
        return baseUrl;
      },
      updateCategory: function (whiteboard, category) {
        console.log(whiteboard);
        console.log(category);
      },
      updatePostit: function (whiteboard, postit) {
        console.log(whiteboard);
        console.log(postit);
      },
      deletePostit: function (whiteboard, postit) {
        console.log(whiteboard);
        console.log(postit);
      },
      getAllCategoriesFor: getAllCategoriesFor,
      getAllPostitsFor: getAllPostitsFor,
      getAll: getAll
    };
  });