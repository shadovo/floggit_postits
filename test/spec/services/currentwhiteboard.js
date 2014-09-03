'use strict';

describe('Service: currentWhiteboard', function () {

  beforeEach(module('floggitPostitsApp'));

  // instantiate service
  var currentWhiteboard;

  beforeEach(inject(function (_currentWhiteboard_) {
    currentWhiteboard = _currentWhiteboard_;
  }));

  it('the colors should be, red, blue, green and yellow', function () {
    console.log('kor test på vilka farger');
    expect(currentWhiteboard.getColors()).toContain('yellow', 'red', 'blue', 'green');
  });

  it('should set currentWhiteboards name to testwhiteboard and be able to retrieve it', function () {
    var name = 'testwhiteboard';
    currentWhiteboard.setName(name);
    expect(currentWhiteboard.getName()).toBe('testwhiteboard');
  });

  it('should set currentWhiteboards categories and get them', function () {
    var categories = [{
      id: 1,
      name: 'Category 1'
    }, {
      id: 2,
      name: 'Category 2'
    }, {
      id: 3,
      name: 'Category 3'
    }];
    currentWhiteboard.setCategories(categories);
    expect(currentWhiteboard.getCategories().length).toBe(3);
    expect(currentWhiteboard.getCategories()).toContain({
      id: 1,
      name: 'Category 1'
    });
  });

});