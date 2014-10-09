'use strict';

/**
 * @ngdoc service
 * @name floggitPostitsApp.wsConnection
 * @description
 * # wsConnection
 * Factory in the floggitPostitsApp.
 */
angular.module('floggitPostitsApp')
  .factory('wsConnection', function ($rootScope, $timeout, wsMessageTypes) {
    // Service logic
    // ...

    var url = 'ws://localhost:8080/whiteboard-ee/ws',
      ws;

    function connect () {
      if (ws === undefined) {
        ws = new WebSocket(url);
        ws.onopen = onOpen;
        ws.onclose = onClose;
        ws.onmessage = onMessage;
        ws.onerror = onError;
      }
    }

    connect();

    function disconnect() {
      ws = undefined;
    }

    function send (type, body) {
      if (ws && ws.readyState === WebSocket.OPEN) {
        var json,
          message = {
          type:type,
          body:[body]
        };
        json = JSON.stringify(message);
        console.log('%c(out) -> ' + json, 'color: blue');
        ws.send(json);
      } else {
        console.log('%c no socket open','color: red');
        $timeout(function() {
          send(type, body);
        }, 10);
      }
    }

    function createPostit (postit) {
      send(wsMessageTypes.POSTIT_NEW, postit);
    }

    function updatePostit (postit) {
      send(wsMessageTypes.POSTIT_UPDATE, postit);
    }

    function deletePostit (id) {
      send(wsMessageTypes.POSTIT_DELETE, id);
    }

    function createCategory (category) {
      send(wsMessageTypes.CATEGORY_NEW, category);
    }

    function updateCategory (category) {
      send(wsMessageTypes.CATEGORY_UPDATE, category);
    }

    function deleteCategory (id) {
      send(wsMessageTypes.CATEGORY_DELETE, id);
    }

    function createWhiteboard (whiteboard) {
      send(wsMessageTypes.WHITEBOARD_NEW, whiteboard);
    }

    function getWhiteboard (id) {
      send(wsMessageTypes.WHITEBOARD_GET, id);
    }

    function getAllWhiteboards () {
      send(wsMessageTypes.WHITEBOARD_GET_ALL, undefined);
    }



    function onOpen () {
      console.log('ws-session opened');
    }

    function onClose () {
      console.log('ws-session closed');
      ws = undefined;
    }

    function onMessage (message) {
      console.log('%c (in) <- ' + message.data, 'color: green');
      message = JSON.parse(message.data);
      if (message.type === wsMessageTypes.WHITEBOARD_GET_ALL) {
          $rootScope.$broadcast(message.type, message.body);
      } else {
        for (var key in message.body) {
          $rootScope.$broadcast(message.type, message.body[key]);
        }
      }
    }

    function onError (error) {
      console.log('%cERROR: ' + error, 'color:red');
      onClose();
    }



    // Public API here
    return {
      connect:connect,
      disconnect:disconnect,
      createPostit:createPostit,
      updatePostit:updatePostit,
      deletePostit:deletePostit,
      createCategory:createCategory,
      updateCategory:updateCategory,
      deleteCategory:deleteCategory,
      createWhiteboard:createWhiteboard,
      getWhiteboard:getWhiteboard,
      getAllWhiteboards:getAllWhiteboards
    };
  });
