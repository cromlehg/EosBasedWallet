import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NotFound as NotFoundComponent} from '../../components';
import './style.scss';

class NotFound extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <NotFoundComponent/>
    );
  }
}

export default connect(() => ({
}))(NotFound);
