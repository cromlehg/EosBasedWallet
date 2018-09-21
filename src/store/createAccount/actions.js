import eos from '../../api/eos';
import {createThunk} from '../../utils';

export const types = {

  CREATE: '@@account/CREATE',
  CREATE_SUCCESS: '@@account/CREATE_SUCCESS',
  CREATE_FAILURE: '@@account/CREATE_FAILURE'

};

const thunk = createThunk(types);

export default {

  create: thunk('CREATE', eos.createAccount)

};
