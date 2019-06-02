'use strict';

const Accounts = artifacts.require('./Accounts.sol');
const StringUtils = artifacts.require('./StringUtils.sol');
const EmailRegex = artifacts.require('./EmailRegex.sol');

module.exports = function(deployer) {
  deployer.deploy(StringUtils);
  deployer.deploy(EmailRegex);
  deployer.link(StringUtils, Accounts);
  deployer.link(EmailRegex, Accounts);
  deployer.deploy(Accounts);
};
