import Web3 from './utils/Web3';
import TruffleContract from './utils/TruffleContract';
import Documents from '../assets/abis/Documents.json';

export default function () {

  return Web3.then((web3Inst)=>{
    const SimpleStorageInst = TruffleContract(web3Inst, Documents);
    return SimpleStorageInst.deployed();
  });
};