'use strict';

const SimpleStorage = artifacts.require('./SimpleStorage.sol');

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
