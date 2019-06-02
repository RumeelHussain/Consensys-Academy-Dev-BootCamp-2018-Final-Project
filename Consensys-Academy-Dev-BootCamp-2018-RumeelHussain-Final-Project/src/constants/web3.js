import Web3 from '../contracts/utils/Web3';

export default {
  instance: undefined,
  init: function () {
    return Web3.then((web3Inst)=>{
      this.instance = web3Inst;
      return this.instance;
    });
  }
}