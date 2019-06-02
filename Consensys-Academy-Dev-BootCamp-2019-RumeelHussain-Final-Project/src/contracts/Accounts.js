import Web3 from './utils/Web3';
import TruffleContract from './utils/TruffleContract';
import Accounts from '../assets/abis/Accounts.json';

export default function () {

  return Web3.then((web3Inst)=>{
    const SimpleStorageInst = TruffleContract(web3Inst, Accounts);
    return SimpleStorageInst.deployed();
  });
};