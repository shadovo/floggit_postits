'use strict';

describe('Service: dataStorage', function () {

  // load the service's module
  beforeEach(module('floggitPostitsApp'));

  // instantiate service
  var dataStorage;
  beforeEach(inject(function (_dataStorage_) {
    dataStorage = _dataStorage_;
  }));

  it('should do something', function () {
    expect(!!dataStorage).toBe(true);
  });

});
