'use strict';

const SimpleStorage = artifacts.require('SimpleStorage');

contract('SimpleStorage', function(accounts) {

  it('...should store the value 89.', function() {
    let simpleStorageInstance;
    return SimpleStorage.deployed().then(function(instance) {
      simpleStorageInstance = instance;
      return simpleStorageInstance.set(89, { from: accounts[0] });
    }).then(function() {
      return simpleStorageInstance.get.call();
    }).then(function(storedData) {
      assert.equal(storedData, 89, 'The value 89 was not stored.');
    });
  });

});
