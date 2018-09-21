import createReducer from '../../utils/createReducer';
import {types} from './actions';

const initialState = {
  transaction: {},
  loading: {
    fetch: false,
    transfer: false
  },
  errors: {
    fetch: null,
    transfer: null
  }
};

export default createReducer(initialState, {

  [types.FETCH]: (state) => {
    return {
      ...state,
      loading: {...state.loading, fetch: true},
      errors: {...state.errors, fetch: null}
    };
  },

  [types.FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      transaction: {id: action.payload.id, blockNum: action.payload.block_num},
      loading: {...state.loading, fetch: false},
      errors: {...state.errors, fetch: null}
    };
  },

  [types.FETCH_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: {...state.loading, fetch: false},
      errors: {...state.errors, fetch: action.error}
    };
  },

  [types.TRANSFER]: (state) => {
    return {
      ...state,
      loading: {...state.loading, transfer: true},
      errors: {...state.errors, transfer: null}
    };
  },

  [types.TRANSFER_SUCCESS]: (state, action) => {
    return {
      ...state,
      transaction: {id: action.payload.transaction_id},
      loading: {...state.loading, transfer: false},
      errors: {...state.errors, transfer: null}
    };
  },

  [types.TRANSFER_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: {...state.loading, transfer: false},
      errors: {...state.errors, transfer: action.error}
    };
  }

});
