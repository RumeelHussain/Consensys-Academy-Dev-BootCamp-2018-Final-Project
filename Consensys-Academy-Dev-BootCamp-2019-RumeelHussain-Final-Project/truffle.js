'use strict';
const fullPathBuildDirectory = `${__dirname}/src/assets/abis`;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  contracts_build_directory: fullPathBuildDirectory, // eslint-disable-line
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      // Match any network id
      network_id: '*' // eslint-disable-line camelcase
    }
  }
};
