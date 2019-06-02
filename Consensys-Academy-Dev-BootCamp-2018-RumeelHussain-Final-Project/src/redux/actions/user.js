import Auth from '../../utils/Auth';
import userType from '../type/user';
import ipfs from '../../utils/ipfs';
import contract from '../../constants/contracts';
import ipfsConst from '../../constants/ipfs';
import get from 'lodash/get';
import web3 from '../../constants/web3';

export function auth(payload) {
  return function(dispatch) {
    dispatch({type: userType.get});
    Promise.all([
      Auth.authenticate(payload),
      contract.accounts.getAccount({from: payload.account})
    ]).then((res)=>{
        const user = {
          account: payload.account,
          name: get(res, '[1][0]', ''),
          email: get(res, '[1][1]', ''),
          image: ipfsConst.url + get(res, '[1][2]', ''),
          description: get(res, '[1][3]', ''),
          type: get(res, '[1][4].c[0]', null),
          price: get(res, '[1][5].c[0]', null)
        };
        dispatch({type: userType.getDone, payload: {user: user, isAuthenticated: get(res, '[0].isAuthenticated', false)}})
      })
      .catch((err) => {
        dispatch({type: userType.getRejected, payload: err})
      });
  }
}

export function logOut() {
  return function(dispatch) {
    dispatch({type: userType.logOut});
    Auth.signOut()
      .then((response) => {
        dispatch({type: userType.logOutDone, payload: response})
      })
      .catch((err) => {
        dispatch({type: userType.logOutRejected, payload: err})
      });
  }
}

export function update(payload) {
  return function(dispatch) {
    dispatch({type: userType.update});
    let ipfsHash;
    ipfs.add(payload.logo)
      .then((res) => {
        ipfsHash = get(res, '[0].hash', '');
        if(!ipfsHash){
          throw new Error('IPFS file upload error occurred');
        }
        payload.type = payload.type || 0;
        payload.price = payload.price || 0;
        payload.price = +payload.price;
        payload.type = +payload.type;
        return contract.accounts.register.estimateGas(payload.name, payload.email, ipfsHash, payload.description, payload.type, payload.price, {from: payload.account});
      })
      .then((gas)=>{
        return contract.accounts.register(payload.name, payload.email, ipfsHash, payload.description, payload.type, payload.price, {from: payload.account, gasLimit: gas});
      })
      .then(()=>{
        const registeredEvent = contract.accounts.Registered();
        registeredEvent.watch((error) => {
          if (error){
            throw new Error('Account Register event has error occurred');
          }
          payload.image = ipfsConst.url + ipfsHash;
          dispatch({type: userType.updateDone, payload: payload});
        });
      })
      .catch((err)=>{
        dispatch({type: userType.updateRejected, payload: err})
      });
  }
}

export function count(payload) {
  return function(dispatch) {
    dispatch({type: userType.count});
    contract.documents.getCounts(payload.account, {from: payload.account})
      .then((res)=>{
        const count = {
          verified: get(res, '[0].c[0]', 0),
          rejected: get(res, '[1].c[0]', 0),
          total: get(res, '[2].c[0]', 0)
        };
        dispatch({type: userType.countDone, payload: count});
      })
      .catch((err)=>{
        dispatch({type: userType.countRejected, payload: err})
      });
  }
}
export function getTransactions(payload) {
  return function(dispatch) {
    dispatch({type: userType.getTransactions});
    let eth = web3.instance.eth;
    eth.getTransactionCount(payload.account, 'latest')
      .then((current)=>{
        let promises = [];
        for (let i=1; i <= current; i++) {
          promises.push(eth.getBlock(i));
        }
        return Promise.all(promises);
      })
      .then((transactions)=>{
        dispatch({type: userType.getTransactionsDone, payload: transactions});
      })
      .catch((err)=>{
        dispatch({type: userType.getTransactionsRejected, payload: err})
      });

  }
}