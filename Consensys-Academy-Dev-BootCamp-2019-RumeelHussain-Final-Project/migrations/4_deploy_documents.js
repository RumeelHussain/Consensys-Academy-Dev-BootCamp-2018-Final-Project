'use strict';

const Accounts = artifacts.require('./Accounts.sol');
const StringUtils = artifacts.require('./StringUtils.sol');
const Documents = artifacts.require('./Documents.sol');

module.exports = function(deployer) {
  deployer.link(StringUtils, Documents);
  deployer.deploy(Documents, Accounts.address);
};
