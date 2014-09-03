'use strict';

/**
 * @ngdoc service
 * @name floggitPostitsApp.currentWhiteboardFact
 * @description
 * # currentWhiteboardFact
 * Factory in the floggitPostitsApp.
 */
angular.module('floggitPostitsApp')
  .factory('currentWhiteboard', function () {
    // Service logic
    // ...

    var whiteboardName = '',
      whiteboardCategories = [],
      colors = ['yellow', 'red', 'blue', 'green'];

    // Public API here
    return {
      getName: function () {
        return whiteboardName;
      },
      setName: function (name) {
        whiteboardName = name;
      },
      getCategories: function () {
        return whiteboardCategories;
      },
      setCategories: function (categories) {
        whiteboardCategories = categories;
      },
      getColors: function () {
        return colors;
      }
    };
  });