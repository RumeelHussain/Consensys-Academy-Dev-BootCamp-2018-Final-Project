import TruffleContract from 'truffle-contract';

export default function (web3, _contract) {
  const Contract = TruffleContract(_contract);

  Contract.setProvider(web3.currentProvider);
  if (typeof Contract.currentProvider.sendAsync !== "function") {
    Contract.currentProvider.sendAsync = function() {
      return Contract.currentProvider.send.apply(
        Contract.currentProvider, arguments
      );
    };
    return Contract;
  }
  else{
    return Contract;
  }
};