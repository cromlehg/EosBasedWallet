import {eos} from '../utils';


export default {

  createAccount: params => {
    const {newaccount, buyrambytes, delegatebw, privatekey} = params;
    return eos.transaction(tr => {
      tr.newaccount(newaccount);
      tr.buyrambytes(buyrambytes);
      tr.delegatebw(delegatebw);
    }, {keyProvider: privatekey});
  },

  getAccount: value => {
    return eos.getAccount(value);
  },

  getTransaction: id => {
    return eos.getTransaction(id);
  },

  transfer: params => {
    const {from, to, quantity, memo, privatekey} = params;
    return eos.transfer({from, to, quantity, memo, privatekey}, {keyProvider: privatekey});
  }

};
