import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';

class Main extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func
  }

  render() {
    return (
      <div className="Main">
        <div className="Main__container container">
          main page
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  account: state.account
}))(Main);
