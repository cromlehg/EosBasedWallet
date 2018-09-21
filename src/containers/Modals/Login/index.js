import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Field, SubmissionError} from 'redux-form';
import './style.scss';
import {accountActions, modalActions} from '../../../store/actions';
import {Button, Form, Input, Modal} from '../../../components';

class Login extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      success: false
    };
  }

  validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'required';
    }
    return errors;
  }

  onSubmit = values => {
    this.setState({success: false, error: false});
    return this.props.dispatch(accountActions.fetch(values.name)).then(() => {
      if (this.props.account.errors.fetch) {
        this.setState({error: true});
        throw new SubmissionError({_error: this.props.account.errors.fetch});
      } else {
        this.setState({success: true});
        this.props.dispatch(modalActions.hide(true));
      }
    });
  }

  onCancel = () => {
    this.props.dispatch(modalActions.hide(false));
  };

  renderHeader() {
    return (
      <h2>Switch account</h2>
    );
  }

  render() {
    return (
      <Modal onClose={this.onCancel} header={this.renderHeader()}>
        <Form form="login" onSubmit={this.onSubmit} validate={this.validate}>
          {this.state.error &&
            <div className="alert alert-danger">{this.props.account.errors.fetch}</div>
          }
          <div className="form-group">
            <label htmlFor="name" className="form-label">Account name</label>
            <Field component={Input} type="text" name="name" id="name"/>
          </div>
          <div className="row mt-5 mb-4">
            <div className="col col-auto">
              <Button
                type="submit"
                theme={['outline-primary', 'block']}
                disabled={this.props.account.loading.fetch}
              >Submit</Button>
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
