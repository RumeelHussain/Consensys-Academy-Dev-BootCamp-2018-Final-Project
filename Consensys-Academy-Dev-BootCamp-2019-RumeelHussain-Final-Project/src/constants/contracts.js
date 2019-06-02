import SimpleStorage from '../contracts/SimpleStorage';
import Accounts from '../contracts/Accounts';
import Documents from '../contracts/Documents';
import get from 'lodash/get';

export default {
  simpleStorage: null,
  accounts: null,
  documents: null,
  init: function () {
    console.log(' init ');
    return Promise.all([
        SimpleStorage(),
        Accounts(),
        Documents()
      ])
      .then((contracts)=>{
        this.simpleStorage = get(contracts, '[0]');
        this.accounts = get(contracts, '[1]');
        this.documents = get(contracts, '[2]');
      });
  }
}