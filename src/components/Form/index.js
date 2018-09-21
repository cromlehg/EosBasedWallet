import React from 'react';
import {reduxForm} from 'redux-form';

export default reduxForm()(
  (props) => (
    <form onSubmit={props.handleSubmit}>
      {props.children}
    </form>
  )
);
