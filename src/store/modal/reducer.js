import createReducer from '../../utils/createReducer';
import {types} from './actions';

const initState = {
  show: false,
  name: null,
  params: null,
  result: null
};

export default createReducer(initState, {

  [types.SHOW]: (state, action) => {
    return {
      ...state,
      show: true,
      name: action.payload.name,
      params: action.payload.params,
      resolve: action.payload.resolve,
      result: null
    };
  },

  [types.HIDE]: (state, action) => {
    if (state.name) {
      return {
        ...state,
        show: false,
        result: action.payload.result,
        resolve: null
      };
    }
    return state;
  }

});
