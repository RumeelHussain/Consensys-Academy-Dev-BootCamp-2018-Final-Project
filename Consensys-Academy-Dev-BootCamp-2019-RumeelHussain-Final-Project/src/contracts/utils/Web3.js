import Web3 from 'web3';

export default new Promise(function(resolve, reject) {
  window.addEventListener('load', function() {
    let web3 = window.web3;
    if (typeof web3 !== 'undefined') {
    //if (false) {
      web3 = new Web3(web3.currentProvider);
      resolve(web3);
    }
    else {
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      web3 = new Web3(provider);

      resolve(web3);
    }
  });
});
