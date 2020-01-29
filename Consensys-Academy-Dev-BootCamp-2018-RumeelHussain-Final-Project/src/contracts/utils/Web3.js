import Web3 from 'web3';

export default new Promise(function(resolve, reject) {
  window.addEventListener('load', function() {
    let web3 = window.web3;
    if (typeof web3 !== 'undefined' && window.ethereum) {
    //if (false) {
      web3 = new Web3(web3.currentProvider);
      try {
        
        ethereum.enable().then(()=> console.log);
      } catch (error){
        console.log(error)
      }
      
      resolve(web3);
    }
    else {
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      web3 = new Web3(provider);

      resolve(web3);
    }
  });
});
