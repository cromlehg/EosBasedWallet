import eos from '../../api/eos';
import {createThunk} from '../../utils';

export const types = {

  FETCH: '@@transfer/FETCH',
  FETCH_SUCCESS: '@@transfer/FETCH_SUCCESS',
  FETCH_FAILURE: '@@transfer/FETCH_FAILURE',

  TRANSFER: '@@transfer/TRANSFER',
  TRANSFER_SUCCESS: '@@transfer/TRANSFER_SUCCESS',
  TRANSFER_FAILURE: '@@transfer/TRANSFER_FAILURE'

};

const thunk = createThunk(types);

export default {

  fetch: thunk('FETCH', eos.getTransaction),
  transfer: thunk('TRANSFER', eos.transfer)

};
