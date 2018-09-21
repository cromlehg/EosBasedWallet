import createReducer from '../../utils/createReducer';
import {types} from './actions';

const initialState = {
  loading: {
    create: false
  },
  errors: {
    create: null
  }
};

export default createReducer(initialState, {

  [types.CREATE]: (state) => {
    return {
      ...state,
      loading: {...state.loading, create: true},
      errors: {...state.errors, create: null}
    };
  },

  [types.CREATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: {...state.loading, create: false},
      errors: {...state.errors, create: null}
    };
  },

  [types.CREATE_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: {...state.loading, create: false},
      errors: {...state.errors, create: action.error}
    };
  }

});
