import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  render() {
    const navbarCollapse = 'collapse navbar-collapse' + (this.state.collapsed ? ' show' : '');
    return (
      <div className="Header">
        <div className="topBar">
            <div className="container">
                <div className="row flex-column flex-md-row align-items-center justify-content-between">
                    <div className="col-auto">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item mx-1">
                                <a className="socialItem" href="https://t.me/vestchainio" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={['fab', 'telegram']} />
                                </a>
                            </li>
                            <li className="list-inline-item mx-1">
                                <a className="socialItem" href="https://www.facebook.com/vestchain" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={['fab', 'facebook']} />
                                </a>
                            </li>
                            <li className="list-inline-item mx-1">
                                <a className="socialItem" href="https://twitter.com/vestchain" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                                </a>
                            </li>
                            <li className="list-inline-item mx-1">
                                <a className="socialItem" href="https://github.com/vestchain" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={['fab', 'github']} />
                                </a>
                            </li>
                            <li className="list-inline-item mx-1">
                                <a className="socialItem" href="https://www.reddit.com/r/vestchain" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={['fab', 'reddit-alien']} />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-auto mt-2 mt-md-0">
                        <ul className="list-inline mb-0">
                            <li className="topNav list-inline-item mx-1">
                                <a className="" href="https://vestchain.io">Home</a>
                            </li>
                            <li className="topNav list-inline-item mx-1">|</li>
                            <li className="topNav list-inline-item mx-1">
                                <a className="" href="https://bounty.vestchain.io">Bounty</a>
                            </li>
                            <li className="topNav list-inline-item mx-1">|</li>
                            <li className="topNav list-inline-item mx-1">
                                <a className="" href="https://news.vestchain.io">News</a>
                            </li>
                            <li className="topNav list-inline-item mx-1">|</li>
                            <li className="topNav list-inline-item mx-1">
                                <a className="active" href="https://wallet.vestchain.io">Wallet</a>
                            </li>
                            <li className="topNav list-inline-item mx-1">|</li>
                            <li className="topNav list-inline-item mx-1">
                                <a className="g-color-primary--hover g-text-underline--none--hover
                                 g-color-primary" href="https://explorer.vestchain.io">Explorer</a>
                            </li>
                            <li className="topNav list-inline-item mx-1">|</li>
                            <li className="topNav list-inline-item mx-1">
                                <NavDropdown name="Support">
                                    <a className="dropdown-item" href="https://support.vestchain.io/legal/">Legal</a>
                                    <a className="dropdown-item" href="https://support.vestchain.io/changelog/">Changelog</a>
                                    <a className="dropdown-item" href="https://support.vestchain.io/careers/">Careers</a>
                                    <a className="dropdown-item" href="https://support.vestchain.io/contacts/">Contacts</a>
                                </NavDropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
          <nav className="row navbar navbar-expand-md navbar-light">
            <Link className="navbar-brand" to="/">
              <img src={require('./assets/logo-black.png')} height="30" alt="VEST Wallet"/>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
              aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" onClick={(e) => {
                this.setState(prevState => ({collapsed: !prevState.collapsed}));
              }}>
              <span className="navbar-toggler-icon" />
            </button>

            <div className={navbarCollapse} id="navbarCollapse">
              <ul className="navbar-nav">
                <NavItem path="/transfer" name="Send tokens" />
                <NavItem path="/keypairs" name="Generate keypairs" />
                <NavItem path="/create-account" name="Create an Account" />
              </ul>
            </div>
          </nav>

        </div>
      </div>
    );
  }
}

const NavItem = props => {
  const pageURI = window.location.pathname + window.location.search;
  const liClassName = (props.path === pageURI) ? 'nav-item active' : 'nav-item';
  const aClassName = props.disabled ? 'nav-link disabled' : 'nav-link';
  return (
    <li className={liClassName}>
      <NavLink to={props.path} className={aClassName}>
        {props.name}
        {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
      </NavLink>
    </li>
  );
};

class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
  }
  showDropdown(e) {
    e.preventDefault();
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    const classDropdownMenu = 'dropdown-menu' + (this.state.isToggleOn ? ' show' : '');
    return (
      <div className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" onClick={(e) => { this.showDropdown(e); }}>
          {this.props.name}
        </a>
        <div className={classDropdownMenu} aria-labelledby="navbarDropdown">
          {this.props.children}
        </div>
      </div>
    );
  }
}
