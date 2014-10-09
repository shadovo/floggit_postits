'use strict';

/**
 * @ngdoc service
 * @name floggitPostitsApp.currentWhiteboardFact
 * @description
 * # currentWhiteboardFact
 * Factory in the floggitPostitsApp.
 */
angular.module('floggitPostitsApp')
  .factory('currentWhiteboard', function ($rootScope, wsMessageTypes) {
    // Service logic
    // ...

    var currentWhiteboard = {
      id: -1,
      name: 'no-name',
      categories: []
    },
    colors = ['yellow', 'red', 'blue', 'green'];

    function findIndexOf(id, array) {
      if (array !== undefined) {
        var i;
        for (i = 0; i < array.length; i = i + 1) {
          if (array[i].id === id) {
            return i;
          }
        }
      }
      return -1;
    }

    function findCategory (id) {
      return findIndexOf(id, currentWhiteboard.categories);
    }

    function findPostit (id, category) {
      return findIndexOf(id, category.postits);
    }

    function newPostit (event, postit) {
      var categoryIndex = findCategory(postit.categoryId);
      currentWhiteboard.categories[categoryIndex].postits.push(postit);
      $rootScope.$apply();
    }

    function updatePostit (event, postit) {
      console.log(postit);
      var categoryIndex = findCategory(postit.categoryId),
        postitIndex = findPostit(postit.id, currentWhiteboard.categories[categoryIndex]);
        console.log(categoryIndex);
        console.log(postitIndex);
        if (postitIndex !== -1) {
          currentWhiteboard.categories[categoryIndex].postits[postitIndex] = postit;
          $rootScope.$apply();
        } else {
          deletePostit(undefined, postit);
          newPostit(undefined, postit);
          $rootScope.$apply();
        }
    }

    function deletePostit (event, postit) {
      console.log('deletePostit');
      var catKey, posKey,
        categoryIndex = findCategory(postit.categoryId),
        postitIndex = findPostit(postit.id, currentWhiteboard.categories[categoryIndex]);
      if (postitIndex === -1) {
         for (catKey in currentWhiteboard.categories) {
          for (posKey in currentWhiteboard.categories[catKey].postits) {
            if (currentWhiteboard.categories[catKey].postits[posKey].id === postit.id) {
              categoryIndex = findCategory(currentWhiteboard.categories[catKey].id);
              postitIndex = findPostit(postit.id, currentWhiteboard.categories[catKey]);
            }
          }
        }
      }
      currentWhiteboard.categories[categoryIndex].postits.splice(postitIndex, 1);
      $rootScope.$apply();
    }

    function newCategory (event, category) {
      currentWhiteboard.categories.push(category);
      $rootScope.$apply();
    }

    function updateCategory (event, category) {
      var categoryIndex = findCategory(category.id);
      currentWhiteboard.categories[categoryIndex].name = category.name;
      $rootScope.$apply();
    }

    function deleteCategory (event, category) {
      var categoryIndex = findCategory(category.id);
      currentWhiteboard.categories.splice(categoryIndex, 1);
      $rootScope.$apply();
    }

    function getWhiteboard (event, whiteboard) {
      currentWhiteboard = whiteboard;
      $rootScope.$broadcast('dataUpdated');
    }


    $rootScope.$on(wsMessageTypes.POSTIT_NEW, newPostit);
    $rootScope.$on(wsMessageTypes.POSTIT_UPDATE, updatePostit);
    $rootScope.$on(wsMessageTypes.POSTIT_DELETE, deletePostit);

    $rootScope.$on(wsMessageTypes.CATEGORY_NEW, newCategory);
    $rootScope.$on(wsMessageTypes.CATEGORY_UPDATE, updateCategory);
    $rootScope.$on(wsMessageTypes.CATEGORY_DELETE, deleteCategory);

    $rootScope.$on(wsMessageTypes.WHITEBOARD_GET, getWhiteboard);


    // Public API here
    return {
      getName: function () {
        return currentWhiteboard.name;
      },
      getId: function () {
        return currentWhiteboard.id;
      },
      getCategories: function () {
        return currentWhiteboard.categories;
      },
      getColors: function () {
        return colors;
      }
    };
  });