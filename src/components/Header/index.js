import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="Header navbar navbar-expand">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/transfer">Send tokens</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/keypairs">Generate keypairs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-account">Create account</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
