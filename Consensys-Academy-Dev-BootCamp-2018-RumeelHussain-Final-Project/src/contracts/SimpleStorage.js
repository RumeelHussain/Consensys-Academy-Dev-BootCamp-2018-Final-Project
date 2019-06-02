import Web3 from './utils/Web3';
import TruffleContract from './utils/TruffleContract';
import SimpleStorage from '../assets/abis/SimpleStorage.json';

export default function () {

  return Web3.then((web3Inst)=>{
    const SimpleStorageInst = TruffleContract(web3Inst, SimpleStorage);
    return SimpleStorageInst.deployed();
  });
};