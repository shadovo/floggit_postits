'use strict';

describe('Service: currentWhiteboard', function () {

  // load the service's module
  beforeEach(module('floggitPostitsApp'));

  // instantiate service
  var currentWhiteboard;
  beforeEach(inject(function (_currentWhiteboard_) {
    currentWhiteboard = _currentWhiteboard_;
  }));

  it('should do something', function () {
    expect(!!currentWhiteboard).toBe(true);
  });

});
