import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';
import {modalActions} from '../../store/actions';
import * as modals from './config.js';

class Modals extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    modal: PropTypes.object.isRequired
  };

  getModal() {
    const {modal, dispatch} = this.props;
    const props = {
      ...modal.params,
      close: (result) => {
        dispatch(modalActions.close(result));
      }
    };
    if (modal.show) {
      if (!(modal.params && modal.params.noOverflow)) {
        this.hideBodyOverflow();
      }
      if (modals[modal.name]) {
        const Modal = modals[modal.name];
        return <Modal {...props}/>;
      }
    } else {
      this.resetBodyOverflow();
    }
    return null;
  }

  hideBodyOverflow() {
    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
    }
  }

  resetBodyOverflow() {
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    }
  }

  render() {
    return this.getModal();
  }
}

export default connect(state => ({
  modal: state.modal
}))(Modals);
