export const types = {
  SHOW: 'modal/@@SHOW',
  HIDE: 'modal/@@HIDE'
};

export default {

  show: (name, params) => {
    return dispatch => {
      return new Promise(resolve => {
        dispatch({
          type: types.SHOW,
          payload: {name, params, resolve}
        });
      });
    };
  },

  hide: (result) => {
    return async (dispatch, getState) => {
      const {modal} = getState();
      modal.resolve(result);
      dispatch({
        type: types.HIDE,
        payload: {result}
      });
    };
  }
};
