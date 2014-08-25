'use strict';

/**
 * @ngdoc service
 * @name floggitPostitsApp.dataStorage
 * @description
 * # dataStorage
 * Factory in the floggitPostitsApp.
 */
angular.module('floggitPostitsApp')
  .factory('dataStorage', function ($http) {

    var url = 'http://localhost:14782/floggit-postit';



    return {
      getUrl: function () {
        return url;
      }
    };
  });