import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Field, SubmissionError} from 'redux-form';
import {Button, Form, Input, InputGroup} from '../../components';
import {accountActions, createAccountActions, modalActions} from '../../store/actions';
import {formatQuantity} from '../../utils';
import './style.scss';

class CreateAccount extends Component {
  static propTypes = {
    account: PropTypes.object,
    createAccount: PropTypes.object,
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      step: this.props.account.user.name ? 2 : 1,
      success: false
    };
  }

  onClickSwitchAccount = () => {
    this.props.dispatch(modalActions.show('Login'));
  }

  validateStep1 = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'required';
    }
    return errors;
  };

  validateStep2 = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'required';
    }
    if (!values.owner) {
      errors.owner = 'required';
    }
    if (!values.active) {
      errors.active = 'required';
    }
    if (!values.bytes) {
      errors.bytes = 'required';
    }
    if (!values.stake_net_quantity) {
      errors.stake_net_quantity = 'required';
    }
    if (!values.stake_cpu_quantity) {
      errors.stake_cpu_quantity = 'required';
    }
    if (isNaN(values.transfer)) {
      errors.transfer = 'required';
    }
    if (!values.privatekey) {
      errors.privatekey = 'required';
    }
    return errors;
  };

  onSubmitStep1 = values => {
    this.setState({success: false, error: false});
    return this.props.dispatch(accountActions.fetch(values.name)).then(() => {
      if (this.props.account.errors.fetch) {
        this.setState({error: true});
        throw new SubmissionError({_error: this.props.account.errors.fetch});
      } else {
        this.setState({step: 2});
      }
    });
  };

  onSubmitStep2 = values => {
    const {name, owner, active, bytes, stake_net_quantity, stake_cpu_quantity, transfer, privatekey} = values;
    const newaccount = {
      creator: this.props.account.user.name,
      name,
      owner,
      active
    };
    const buyrambytes = {
      payer: this.props.account.user.name,
      receiver: name,
      bytes
    };
    const delegatebw = {
      from: this.props.account.user.name,
      receiver: name,
      stake_net_quantity: formatQuantity(stake_net_quantity) + ' VEST',
      stake_cpu_quantity: formatQuantity(stake_cpu_quantity) + ' VEST',
      transfer
    };
    this.setState({success: false, error: false});
    return this.props.dispatch(createAccountActions.create({newaccount, buyrambytes, delegatebw, privatekey})).then(() => {
      if (this.props.createAccount.errors.create) {
        this.setState({error: true});
        throw new SubmissionError({_error: this.props.createAccount.errors.create});
      } else {
        this.props.dispatch(accountActions.fetch(this.props.account.user.name));
        this.setState({success: true});
      }
    });
  };

  renderStep1 = () => {
    return (
      <div className="Transfer">
        <div className="Transfer__container container">
          <h5>Create new account</h5>
          <Form form="createaccountlogin" onSubmit={this.onSubmitStep1} validate={this.validateStep1}>
            {this.state.error &&
              <div className="alert alert-danger">{this.props.account.errors.fetch}</div>
            }
            {this.state.success &&
              <div className="alert alert-success">Thank you!</div>
            }
            <div className="form-group">
              <label htmlFor="name" className="form-label">Enter your account name</label>
              <Field component={Input} type="text" name="name" id="name"/>
            </div>
            <Button
              type="submit"
              theme='outline-secondary'
              disabled={this.props.account.loading.fetch}
            >Submit</Button>
          </Form>
        </div>
      </div>
    );
  };

  renderStep2 = () => {
    return (
      <div className="Transfer">
        <div className="Transfer__container container">
          <div className="row">
            <div className="Transfer__form col-12 col-md-8 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Create new account</h5>
                  <Form
                    form="createaccount"
                    initialValues={{
                      bytes: 8192,
                      stake_net_quantity: 10,
                      stake_cpu_quantity: 10,
                      transfer: 0
                    }}
                    onSubmit={this.onSubmitStep2}
                    validate={this.validateStep2}
                  >
                    {this.state.error &&
                      <div className="alert alert-danger">{this.props.createAccount.errors.create}</div>
                    }
                    {this.state.success &&
                      <div className="alert alert-success">Account successfully created!</div>
                    }
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">New account name</label>
                      <Field component={Input} type="text" name="name" id="name"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="owner" className="form-label">Owner public key</label>
                      <Field component={Input} type="text" name="owner" id="owner"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="active" className="form-label">Active public key</label>
                      <Field component={Input} type="text" name="active" id="active"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="bytes" className="form-label">RAM bytes</label>
                      <Field component={Input} type="text" name="bytes" id="bytes"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="stake_net_quantity" className="form-label">Stake net quantity</label>
                      <Field component={InputGroup} type="text" name="stake_net_quantity" id="stake_net_quantity">
                        <div className="input-group-append"><span className="input-group-text">EOS</span></div>
                      </Field>
                    </div>
                    <div className="form-group">
                      <label htmlFor="stake_cpu_quantity" className="form-label">Stake CPU quantity</label>
                      <Field component={InputGroup} type="text" name="stake_cpu_quantity" id="stake_cpu_quantity">
                        <div className="input-group-append"><span className="input-group-text">EOS</span></div>
                      </Field>
                    </div>
                    <div className="form-group">
                      <label htmlFor="transfer" className="form-label">Transfer</label>
                      <Field component={InputGroup} type="text" name="transfer" id="transfer">
                        <div className="input-group-append"><span className="input-group-text">EOS</span></div>
                      </Field>
                    </div>
                    <div className="form-group mb-5">
                      <label htmlFor="privatekey" className="form-label">Your private key</label>
                      <Field component={Input} type="text" name="privatekey" id="privatekey"/>
                    </div>
                    <Button
                      type="submit"
                      theme={['outline-secondary', 'block']}
                      disabled={this.props.createAccount.loading.create}
                    >Send</Button>
                  </Form>
                </div>
              </div>
            </div>
            <div className="Transfer__sidebar col-12 col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Your account</h5>
                  <table className="mb-4">
                    <tbody>
                      <tr>
                        <td className="pr-2">name</td>
                        <td>{this.props.account.user.name}</td>
                      </tr>
                      <tr>
                        <td className="pr-2">balance</td>
                        <td>{this.props.account.user.balance}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Button type="button" theme='outline-secondary' onClick={this.onClickSwitchAccount}>Change</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    switch (this.state.step) {
    case 2 : return this.renderStep2();
    default : return this.renderStep1();
    }
  }
}

export default connect(state => ({
  account: state.account,
  createAccount: state.createAccount
}))(CreateAccount);
