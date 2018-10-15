import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './style.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="Header navbar navbar-expand">
        <div className="container">
          <Link className="navbar-brand"to="/">
            <img src={require('./assets/logo.png')} height="30" alt="VEST Wallet"/>
          </Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/transfer">Send tokens</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/keypairs">Generate keypairs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-account">Create an Account</NavLink>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}
