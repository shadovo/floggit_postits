'use strict';

describe('Service: wsMessageTypes', function () {

  // load the service's module
  beforeEach(module('floggitPostitsApp'));

  // instantiate service
  var wsMessageTypes;
  beforeEach(inject(function (_wsMessageTypes_) {
    wsMessageTypes = _wsMessageTypes_;
  }));

  it('should do something', function () {
    expect(!!wsMessageTypes).toBe(true);
  });

});
