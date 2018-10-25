import ecc from 'eosjs-ecc';
import {createThunk} from '../../utils';

export const types = {

  GENERATE: '@@account/GENERATE',
  GENERATE_SUCCESS: '@@account/GENERATE_SUCCESS',
  GENERATE_FAILURE: '@@account/GENERATE_FAILURE'

};

const thunk = createThunk(types);

export default {

  generate: thunk('GENERATE', () => {
    return ecc.randomKey().then(privateKey => {
      const publicKey = ecc.privateToPublic(privateKey);
      return {privateKey, publicKey: publicKey.replace('EOS', 'VEST')};
    });
  })

};
