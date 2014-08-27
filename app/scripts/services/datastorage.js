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
      // method, whiteboard, type, data, id
      function basicRequest(options) {
        /*
         * options include method, whiteboard, type, id, data
         */
        var deferred = $q.defer();
        var url = baseUrl + options.whiteboard + '-' + options.type;
        var requestParams = {};
        if (options.id !== undefined) {
          url = url + '/' + options.id;
        }
        requestParams.method = options.method;
        requestParams.url = url;
        if (options.data !== undefined) {
          requestParams.data = options.data;
        }
        $http(requestParams).success(function (data) {
          deferred.resolve(data);
        });
        return deferred.promise;
      }

      function basicGet(whiteboard, type, id) {
        return basicRequest({
          method: 'GET',
          whiteboard: whiteboard,
          type: type,
          id: id
        });
      }

      function basicPost(whiteboard, type, data) {
        return basicRequest({
          method: 'POST',
          whiteboard: whiteboard,
          type: type,
          data: data
        });
      }

      function basicPut(whiteboard, type, data, id) {
        return basicRequest({
          method: 'PUT',
          whiteboard: whiteboard,
          type: type,
          data: data,
          id: id
        });
      }

      function basicDelete(whiteboard, type, id) {
        return basicRequest({
          method: 'DELETE',
          type: type,
          id: id
        });
      }

      function getAllCategoriesFor(whiteboard) {
        return basicGet(whiteboard, 'categories');
      }

      function getAllPostitsFor(whiteboard) {
        return basicGet(whiteboard, 'postits');
      }

      function updatePostit(whiteboard, postit) {
        return basicPut(whiteboard, 'postits', postit, postit.id);
      }

      function updateCategory(whiteboard, category) {
        var filteredCategory = {};
        filteredCategory.id = category.id;
        filteredCategory.name = category.name;
        return basicPut(whiteboard, 'category', filteredCategory, category.id);
      }

      function deletePostit(whiteboard, id) {
        return basicDelete(whiteboard, 'postits', id);
      }

      function deleteCategory(whiteboard, id) {
        return basicDelete(whiteboard, 'categories', id);
      }

      function addPostitToCorrespondingCategory(categories, postit) {
        for (var j = 0; j < categories.length; j = j + 1) {
          if (postit.category === categories[j].id) {
            if (categories[j].postits === undefined) {
              categories[j].postits = [];
            }
            categories[j].postits.push(postit);
            break;
          }
        }
      }

      function sortPostitsIntoCategories(categories, postits) {
        for (var i = 0; i < postits.length; i = i + 1) {
          addPostitToCorrespondingCategory(categories, postits[i]);
        }
        return categories;
      }

      function getAll(whiteboard) {
        return $q.all([
            getAllCategoriesFor(whiteboard), // res[0] === categories
            getAllPostitsFor(whiteboard) // res[1] === postits
          ])
          .then(function (res) {
            return sortPostitsIntoCategories(res[0], res[1]);
          });
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
      //postDummyData();

      return {
        getUrl: function () {
          return baseUrl;
        },
        updatePostit: updatePostit,
        updateCategory: updateCategory,
        deletePostit: deletePostit,
        deleteCategory: deleteCategory,
        getAllCategoriesFor: getAllCategoriesFor,
        getAllPostitsFor: getAllPostitsFor,
        getAll: getAll
      };
    });



  // var deferred = $q.defer();
  // var categoryPromise = getAllCategoriesFor(whiteboard);
  // var postitsPromise, i;
  // categoryPromise.then(function (categories) {
  //   postitsPromise = getAllPostitsFor(whiteboard);
  //   postitsPromise.then(function (postits) {
  //     for (i = 0; i < postits.length; i = i + 1) {
  //       addPostitToCorrespondingCategory(categories, postits[i]);
  //     }
  // });
  // deferred.resolve(categories);
  // });
  // return deferred.promise;