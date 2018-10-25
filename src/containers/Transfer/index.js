import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Field, SubmissionError} from 'redux-form';
import {Button, Form, Input, InputGroup} from '../../components';
import {accountActions, modalActions, transferActions} from '../../store/actions';
import {formatTxLink, formatQuantity, validation} from '../../utils';
import './style.scss';

class Transfer extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func,
    transfer: PropTypes.object
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
    validation.accountName('name', values, errors, ['lessThan12']);
    return errors;
  };


  validateStep2 = values => {
    const errors = {};
    validation.accountName('to', values, errors, ['lessThan12']);
    validation.quantity('quantity', values, errors);
    validation.privateKey('privatekey', values, errors);
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
    const params = {
      ...values,
      from: this.props.account.user.name,
      memo: values.memo ? values.memo : '',
      quantity: formatQuantity(values.quantity) + ' VEST'
    };
    this.setState({success: false, error: false});
    return this.props.dispatch(transferActions.transfer(params)).then(() => {
      if (this.props.transfer.errors.transfer) {
        this.setState({error: true});
        throw new SubmissionError({_error: this.props.transfer.errors.transfer});
      } else {
        this.props.dispatch(accountActions.fetch(params.from));
        this.props.dispatch(transferActions.fetch(this.props.transfer.transaction.id)).then(() => {
          this.setState({success: true});
        });
      }
    });
  };

  renderStep1 = () => {
    return (
      <div className="Transfer">
        <div className="Transfer__container container">
          <h5>Send Tokens</h5>
          <Form form="login" onSubmit={this.onSubmitStep1} validate={this.validateStep1}>
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
    let txLink = '';
    const {id, blockNum} = this.props.transfer.transaction;
    if (blockNum) {
      txLink = formatTxLink(blockNum, id);
    }
    return (
      <div className="Transfer">
        <div className="Transfer__container container">
          <div className="row">
            <div className="Transfer__form col-12 col-md-8 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Send tokens</h5>
                  <Form
                    form="transfer"
                    onSubmit={this.onSubmitStep2}
                    validate={this.validateStep2}
                  >
                    {this.state.error &&
                      <div className="alert alert-danger">{this.props.transfer.errors.transfer}</div>
                    }
                    {this.state.success &&
                      <div className="alert alert-success">
                        Success! You can see your transaction on the <a href={txLink} target="_blank" rel="noopener noreferrer">blockchain</a>
                      </div>
                    }
                    <div className="form-group">
                      <label htmlFor="from" className="form-label">From</label>
                      <input className="form-control" type="text" name="from" id="from" value={this.props.account.user.name} disabled/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="to" className="form-label">To</label>
                      <Field component={Input} type="text" name="to" id="to"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="quantity" className="form-label">Amount</label>
                      <Field component={InputGroup} type="text" name="quantity" id="quantity">
                        <div className="input-group-append"><span className="input-group-text">VEST</span></div>
                      </Field>
                    </div>
                    <div className="form-group">
                      <label htmlFor="memo" className="form-label">Memo</label>
                      <Field component={Input} type="text" name="memo" id="memo"/>
                    </div>
                    <div className="form-group mb-5">
                      <label htmlFor="privatekey" className="form-label">Private key</label>
                      <Field component={Input} type="text" name="privatekey" id="privatekey"/>
                    </div>
                    <Button
                      type="submit"
                      theme={['outline-secondary', 'block']}
                      disabled={this.props.transfer.loading.transfer}
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
                        <td className="pr-2 font-weight-bold">Name:</td>
                        <td>{this.props.account.user.name}</td>
                      </tr>
                      <tr>
                        <td className="pr-2 font-weight-bold">Balance:</td>
                        <td>{this.props.account.user.balance}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Button type="button" theme="outline-secondary" onClick={this.onClickSwitchAccount}>Change</Button>
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
  transfer: state.transfer
}))(Transfer);
