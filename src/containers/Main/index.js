import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './style.scss';

class Main extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func
  }

  render() {
    return (
      <div className="Main">
        <h4 className="text-center mb-4">
          Welcome to EOS based wallet!
        </h4>
        <p className="text-center text-secondary">How can we help you?</p>
        <ul className="Main__menu">
          <li className="Main__menu-item"><Link to="/transfer">Send tokens</Link></li>
          <li className="Main__menu-item"><Link to="/keypairs">Create new keypairs</Link></li>
          <li className="Main__menu-item"><Link to="/create-account">Create new account</Link></li>
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  account: state.account
}))(Main);
