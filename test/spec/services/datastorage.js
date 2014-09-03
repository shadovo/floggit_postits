'use strict';

describe('Service: dataStorage', function () {

  // load the service's module
  beforeEach(module('floggitPostitsApp'));

  // instantiate service
  var dataStorage,
    httpBackend,
    categoriesUrl = 'http://localhost:14782/fp-testwhiteboard-categories',
    postitsUrl = 'http://localhost:14782/fp-testwhiteboard-postits',
    categories = [{
      'name': 'todo',
      'id': 1
    }, {
      'name': 'done',
      'id': 2
    }],
    postits = [{
      'title': 'Postit 1',
      'description': 'This is the first postit',
      'category': 1,
      'color': 'green',
      'id': 1
    }, {
      'title': 'Postit 2',
      'description': '2nd postit',
      'category': 1,
      'color': 'green',
      'id': 2
    }, {
      'title': 'Postit 3',
      'category': 2,
      'color': 'yellow',
      'description': '3d postit',
      'id': 3
    }];
  beforeEach(inject(function ($httpBackend, _dataStorage_) {
    dataStorage = _dataStorage_;
    httpBackend = $httpBackend;
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should get a list of all categories', function () {
    var returnData = categories,
      returnedPromise = dataStorage.getAllCategoriesFor('testwhiteboard'),
      result;

    httpBackend.expect('GET', categoriesUrl).respond(200, returnData);

    returnedPromise.then(function (response) {
      result = response;
    });
    httpBackend.flush();
    expect(result).toEqual(returnData);
  });

  it('should get a list of all postits', function () {
    var returnData = angular.copy(postits),
      returnedPromise = dataStorage.getAllPostitsFor('testwhiteboard'),
      result;

    httpBackend.expect('GET', postitsUrl).respond(200, returnData);

    returnedPromise.then(function (response) {
      result = response;
    });
    httpBackend.flush();
    expect(result).toEqual(returnData);
  });

  it('should get a list of categories each containing a list of coresponding postits', function () {
    var returnData,
      result = {},
      returnedPromise;

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

    function sortPostitsIntoCategories(cats, posts) {
      for (var i = 0; i < postits.length; i = i + 1) {
        addPostitToCorrespondingCategory(cats, posts[i]);
      }
      return cats;
    }
    returnData = sortPostitsIntoCategories(categories, postits);
    returnedPromise = dataStorage.getAll('testwhiteboard');

    httpBackend.expect('GET', categoriesUrl).respond(200, returnData);
    httpBackend.expect('GET', postitsUrl).respond(200, returnData);

    returnedPromise.then(function (response) {
      result = response;
    });
    httpBackend.flush();
    expect(result).toEqual(returnData);
  });

  it('should send new postits to the server', function () {
    var sendData = {
        'title': 'New postit!',
        'description': 'This is a postit cerated by the test',
        'category': 1,
        'color': 'green'
      },
      returnData = angular.copy(sendData),
      returnedPromise = dataStorage.createPostit('testwhiteboard', sendData),
      result;
    returnData.id = 4;
    httpBackend.expect('POST', postitsUrl, sendData).respond(200, returnData);

    returnedPromise.then(function (response) {
      result = response;
    });
    httpBackend.flush();
    expect(result).toEqual(returnData);
  });

  it('should send new category to the server with specified name', function () {
    var sendData = 'my category',
      expectedServerData = {
        'name': 'my category'
      },
      returnData = {
        'name': 'my category',
        'id': 3
      },
      returnedPromise = dataStorage.createCategory('testwhiteboard', sendData),
      result;
    returnData.id = 4;
    httpBackend.expect('POST', categoriesUrl, expectedServerData).respond(200, returnData);

    returnedPromise.then(function (response) {
      result = response;
    });
    httpBackend.flush();
    expect(result).toEqual(returnData);
  });

  it('should send new category to the server with default name if not specified', function () {
    var expectedServerData = {
        'name': 'New Category'
      },
      returnData = {
        'name': 'New Category',
        'id': 3
      },
      returnedPromise = dataStorage.createCategory('testwhiteboard'),
      result;
    returnData.id = 4;
    httpBackend.expect('POST', categoriesUrl, expectedServerData).respond(200, returnData);

    returnedPromise.then(function (response) {
      result = response;
    });
    httpBackend.flush();
    expect(result).toEqual(returnData);
  });

  it('should update a postit based on id', function () {
    var sendData = {
        'title': 'Updated 1st postit',
        'description': 'This postit was updated',
        'category': 1,
        'color': 'green',
        'id': 1
      },
      returnData = {
        'updated': true
      },
      returnedPromise = dataStorage.updatePostit('testwhiteboard', sendData),
      result,
      postitUrl = postitsUrl + '/1';
    httpBackend.expect('PUT', postitUrl, sendData).respond(200, returnData);

    returnedPromise.then(function (response) {
      result = response;
    });
    httpBackend.flush();
    expect(result).toEqual(returnData);
  });

  it('should update a category based on id', function () {
    var sendData = {
        'name': 'Updated category name!',
        'id': 1,
        'postits': [{
          'title': 'Postit 1',
          'description': 'This is the first postit',
          'category': 1,
          'color': 'green',
          'id': 1
        }, {
          'title': 'Postit 2',
          'description': '2nd postit',
          'category': 1,
          'color': 'green',
          'id': 2
        }]
      },
      expectedServerData = {
        'name': 'Updated category name!',
        'id': 1
      },
      returnData = {
        'updated': true
      },
      returnedPromise = dataStorage.updateCategory('testwhiteboard', sendData),
      result,
      categoryUrl = categoriesUrl + '/' + sendData.id;
    httpBackend.expect('PUT', categoryUrl, expectedServerData).respond(200, returnData);

    returnedPromise.then(function (response) {
      result = response;
    });
    httpBackend.flush();
    expect(result).toEqual(returnData);
  });

  it('should delete a postit based on id from the server', function () {
    var returnData = {
        'deleted': true
      },
      returnedPromise = dataStorage.deletePostit('testwhiteboard', 1),
      result,
      postitUrl = postitsUrl + '/1';
    httpBackend.expect('DELETE', postitUrl).respond(200, returnData);
    returnedPromise.then(function (response) {
      result = response;
    });
    httpBackend.flush();
    expect(result).toEqual(returnData);
  });
  it('should delete a category based on id from the server', function () {
    var returnData = {
        'deleted': true
      },
      returnedPromise = dataStorage.deleteCategory('testwhiteboard', 1),
      result,
      categoryUrl = categoriesUrl + '/1';
    httpBackend.expect('DELETE', categoryUrl).respond(200, returnData);

    returnedPromise.then(function (response) {
      result = response;
    });
    httpBackend.flush();
    expect(result).toEqual(returnData);
  });
});
