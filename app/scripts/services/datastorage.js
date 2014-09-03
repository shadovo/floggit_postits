  'use strict';

  /**
   * @ngdoc service
   * @name floggitPostitsApp.dataStorage
   * @description
   * # dataStorage
   * Factory in the floggitPostitsApp.
   */
  angular.module('floggitPostitsApp')
    .factory('dataStorage', function ($rootScope, $http, $q) {

      // var baseUrl = 'http://api.beta2.se/fp-';
      var baseUrl = 'http://localhost:14782/fp-';

      /*
       * options should include method, whiteboard, type
       * options could include  id, data
       */
      function basicRequest(options) {
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
        console.log(options.method + ' ' + url);
        $http(requestParams).success(function (data) {
          if (options.method !== 'GET') {
            $rootScope.$broadcast('dataUpdated', 'My data!! =D');
          }
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
          whiteboard: whiteboard,
          type: type,
          id: id
        });
      }

      function createPostit(whiteboard, postit) {
        return basicPost(whiteboard, 'postits', postit);
      }

      function createCategory(whiteboard, categoryName) {
        if (categoryName === undefined || categoryName === '') {
          categoryName = 'New Category';
        }
        return basicPost(whiteboard, 'categories', {
          name: categoryName
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
        return basicPut(whiteboard, 'categories', filteredCategory, category.id);
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

      return {
        createPostit: createPostit,
        createCategory: createCategory,
        updatePostit: updatePostit,
        updateCategory: updateCategory,
        deletePostit: deletePostit,
        deleteCategory: deleteCategory,
        getAllCategoriesFor: getAllCategoriesFor,
        getAllPostitsFor: getAllPostitsFor,
        getAll: getAll
      };
    });
