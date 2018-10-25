import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import './style.scss';
import {Header, Footer} from '../../components';
import Keypairs from '../Keypairs';
import Main from '../Main';
import Modals from '../Modals';
import NotFound from '../NotFound';
import Transfer from '../Transfer';
import CreateAccount from '../CreateAccount';

import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
library.add(fab);

class App extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }

  render() {
    return (
      <Router history={this.history}>
        <div className="App">
          <div className="App__header">
            <Header/>
          </div>
          <div className="App__body">
            <Switch>
              <Route path="/" exact component={Main}/>
              <Route path="/create-account" exact component={CreateAccount}/>
              <Route path="/keypairs" exact component={Keypairs}/>
              <Route path="/transfer" component={Transfer}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
          <div className="App__footer">
            <Footer/>
          </div>
          <Modals/>
        </div>
      </Router>
    );
  }
}

export default connect(state => ({
  account: state.account
}))(App);
