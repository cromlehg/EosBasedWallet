import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Field, SubmissionError} from 'redux-form';
import isValidEmail from 'sane-email-validation';
import './style.scss';
import {accountActions, modalActions} from '../../../store/actions';
import {Button, Form, Input, Modal} from '../../../components';

class Login extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'invalid email';
    }
    if (!values.password) {
      errors.password = 'required';
    }
    return errors;
  }

  onSubmit = values => {
    return this.props.dispatch(accountActions.login(values.email, values.password)).then(() => {
      if (this.props.account.loginError) {
        throw new SubmissionError({_error: this.props.account.loginError});
      } else {
        this.props.dispatch(modalActions.close(true));
      }
    });
  }

  onCancel = () => {
    this.props.dispatch(modalActions.close(false));
  };

  renderHeader() {
    return (
      <h2>Login</h2>
    );
  }

  renderFooter() {
    return (
      <div className="row mr-auto">
        <p className="col col-12">Join our amazing community to comment and reward others.</p>
        <div className="col-12">
          <Link to="/signup" onClick={this.onCancel} className="btn btn-outline-secondary">Sign up</Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Modal onClose={this.onCancel} header={this.renderHeader()} footer={this.renderFooter()}>
        <Form form="login" onSubmit={this.onSubmit} validate={this.validate}>
          {this.props.account.loginError &&
            <div className="alert alert-danger">{this.props.account.loginError}</div>
          }
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <Field component={Input} type="text" name="email" id="email"/>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <Field component={Input} type="password" name="password" id="password"/>
          </div>
          <div className="row mt-5 mb-4">
            <div className="col col-auto">
              <Button type="submit" theme={['outline-primary', 'block']}>Login</Button>
            </div>
            <div className="col col-auto">
              <Button theme="outline-secondary" onClick={this.onCancel}>Cancel</Button>
            </div>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default connect(state => ({
  account: state.account
}))(Login);
