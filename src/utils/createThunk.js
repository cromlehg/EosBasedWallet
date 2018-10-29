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
      let error = '';
      try {
        let cleanErr = e.toString().replace('Error: ', '');
        const obj = JSON.parse(cleanErr);
        if (obj.error.code !== 0) {
          error = obj.error.what;
        } else {
          const details = [];
          obj.error.details.forEach(detail => details.push(detail.message));
          error = details.join(", ");
          if (error === 'unknown key') {
            error = 'Invalid Account Name';
          }
        }
      } catch (err) {
        if (error.length === 0) {
          error = 'Something went wrong.';
        }
      }
      dispatch({
        type: types[`${type}_FAILURE`],
        error,
        params
      });
      return null;
    }
  };
}
