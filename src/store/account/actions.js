import eos from '../../api/eos';
import {createThunk} from '../../utils';

export const types = {

  FETCH: '@@account/FETCH',
  FETCH_SUCCESS: '@@account/FETCH_SUCCESS',
  FETCH_FAILURE: '@@account/FETCH_FAILURE'

};

const thunk = createThunk(types);

export default {

  fetch: thunk('FETCH', eos.getAccount)

};
