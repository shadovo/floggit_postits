'use strict';

/**
 * @ngdoc service
 * @name floggitPostitsApp.wsMessageTypes
 * @description
 * # wsMessageTypes
 * Constant in the floggitPostitsApp.
 */
angular.module('floggitPostitsApp')
  .constant('wsMessageTypes', {
    // Postit
    POSTIT_NEW: 'postit-new',
    POSTIT_GET: 'postit-get',
    POSTIT_GET_ALL: 'postit-get-all',
    POSTIT_UPDATE: 'postit-update',
    POSTIT_DELETE: 'postit-delete',
    // Category
    CATEGORY_NEW: 'category-new',
    CATEGORY_GET: 'category-get',
    CATEGORY_GET_ALL: 'category-get-all',
    CATEGORY_UPDATE: 'category-update',
    CATEGORY_DELETE: 'category-delete',
    // Whiteboard
    WHITEBOARD_NEW: 'whiteboard-new',
    WHITEBOARD_GET: 'whiteboard-get',
    WHITEBOARD_GET_ALL: 'whiteboard-get-all'
  });
