import createReducer from '../../utils/createReducer';
import {types} from './actions';

const initialState = {
  keypair: {},
  loading: {
    generate: false
  },
  errors: {
    generate: null
  }
};

export default createReducer(initialState, {

  [types.GENERATE]: (state) => {
    return {
      ...state,
      loading: {...state.loading, generate: true},
      errors: {...state.errors, generate: null}
    };
  },

  [types.GENERATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      keypair: action.payload,
      loading: {...state.loading, generate: false},
      errors: {...state.errors, generate: null}
    };
  },

  [types.GENERATE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: {...state.loading, generate: false},
      errors: {...state.errors, generate: action.error}
    };
  }

});
