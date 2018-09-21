export default function (types) {
  return (type, fn) => params => async dispatch => {
    dispatch({type: types[type], params});
    try {
      const response = await fn(params);
      dispatch({
        type: types[`${type}_SUCCESS`],
        payload: response,
        params
      });
      return response;
    } catch (e) {
      // console.log(e)
      if (e.response && e.response.status < 500) {
        const error = e.response.data.msg || e.response.data || 'Something went wrong';
        dispatch({
          type: types[`${type}_FAILURE`],
          error,
          params
        });
      } else {
        dispatch({
          type: types[`${type}_FAILURE`],
          error: 'Something went wrong',
          params
        });
        // throw e;
      }
      return null;
    }
  };
}
