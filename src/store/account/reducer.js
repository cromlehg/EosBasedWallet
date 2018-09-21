import createReducer from '../../utils/createReducer';
import {types} from './actions';

const initialState = {
  user: {},
  loading: {
    fetch: false
  },
  errors: {
    fetch: null
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
      user: {name: action.payload.account_name, balance: action.payload.core_liquid_balance},
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
  }

});
