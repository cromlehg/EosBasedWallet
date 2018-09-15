/* eslint-disable no-process-env, no-console */

import $ from 'jquery';
import Eos from 'eosjs';
import 'bootstrap/js/dist/modal';

import './index.pug';
import './index.scss';

const eos = Eos({
  httpEndpoint: process.env.API_HTTP_ENDPOINT,
  chainId: process.env.API_CHAIN_ID
});

const events = {
  FETCH_ACCOUNT_SUCCESS: 'FETCH_ACCOUNT_SUCCESS',
  TRANSFER_SUCCESS: 'TRANSFER_SUCCESS',
  TRANSFER_ERROR: 'TRANSFER_ERROR'
};

const account = {
  account_name: '',
  core_liquid_balance: ''
};

function formatQuantity(value, decimals = 4) {
  return parseFloat(value).toFixed(decimals);
}

function Alert($target) {
  const $markup = $('<div class="alert" role="alert"></div>');
  return new (function () {
    this.show = (message, color) => {
      $markup
        .removeClass((i, className) => className.match(/alert-\w*/))
        .addClass(`alert-${color}`)
        .html(message)
        .prependTo($target);
    };
    this.hide = () => $markup.detach();
  })();
}

// ----------------------------------------------------------------------------
// transfer form
// ----------------------------------------------------------------------------

const transferAlert = Alert($('#result'));
const $sendButton = $('#send');

$sendButton.click(event => {
  event.preventDefault();
  $sendButton.prop('disabled', true);
  const params = {
    from: $('#from').val(),
    to: $('#to').val(),
    quantity: formatQuantity($('#quantity').val()) + ' VEST',
    memo: $('#memo').val()
  };
  const options = {keyProvider: $('#private-key').val()};
  eos
    .transfer(params, options)
    .then(result => $.event.trigger(events.TRANSFER_SUCCESS, result))
    .catch(error => $.event.trigger(events.TRANSFER_ERROR, error));
});

$(window).on(events.FETCH_ACCOUNT_SUCCESS, (event, data) => {
  Object.assign(account, data);
  $('#from').val(account.account_name);
});

$(window).on(events.TRANSFER_SUCCESS, (event, data) => {
  eos
    .getAccount(account.account_name)
    .then(result => $.event.trigger(events.FETCH_ACCOUNT_SUCCESS, result));
  eos
    .getTransaction(data.transaction_id, data.transaction.ref_block_num)
    .then(result => {
      const txLink = `${process.env.TRACKER_HTTP_ENDPOINT}/transactions/${result.block_num}/${result.id}`;
      transferAlert.show(
        `Success! You can see your transaction on the <a href="${txLink}" target="_blank">blockchain</a>`,
        'success'
      );
    });
  $sendButton.prop('disabled', false);
});

$(window).on(events.TRANSFER_ERROR, (event, error) => {
  transferAlert.show('Ooops! Something went wrong!', 'danger');
  $sendButton.prop('disabled', false);
  console.error(error);
});

// ----------------------------------------------------------------------------
// account sidebar
// ----------------------------------------------------------------------------

$(window).on(events.FETCH_ACCOUNT_SUCCESS, (event, data) => {
  $('[data-bind="account-name"]').html(data.account_name);
  $('[data-bind="account-balance"]').html(data.core_liquid_balance);
});

$('#switch-account-button').click(() => $('#switch-account-modal').modal('show'));


// ----------------------------------------------------------------------------
// Select account modal
// ----------------------------------------------------------------------------

const selectAccountAlert = Alert($('#select-account-modal .modal-body'));

$('#select-account-modal')
  .modal({backdrop: 'static', show: true, focus: true})
  .on('hidden.bs.modal', () => {
    selectAccountAlert.hide();
  });

$('#select-account-submit').click(event => {
  const $submit = $(event.target);
  $submit.prop('disabled', true);
  const value = $('#select-account-input').val();
  eos
    .getAccount(value)
    .then(result => {
      selectAccountAlert.show('Thank you!', 'success');
      $submit.prop('disabled', false);
      $.event.trigger(events.FETCH_ACCOUNT_SUCCESS, result);
      setTimeout(() => {
        $('#select-account-modal').modal('hide');
      }, 500);
    })
    .catch(error => {
      selectAccountAlert.show('Oops! Something went wrong!', 'danger');
      console.error(error);
      $submit.prop('disabled', false);
    });
});

// ----------------------------------------------------------------------------
// Switch account modal
// ----------------------------------------------------------------------------

const switchAccountModalAlert = Alert($('#switch-account-modal .modal-body'));

$('#switch-account-modal')
  .modal({show: false})
  .on('hidden.bs.modal', () => {
    switchAccountModalAlert.hide();
  });

$('#switch-account-submit').click(event => {
  const $submit = $(event.target);
  $submit.prop('disabled', true);
  const value = $('#switch-account-input').val();
  eos
    .getAccount(value)
    .then(result => {
      Object.assign(account, result);
      switchAccountModalAlert.show('Thank you!', 'success');
      $submit.prop('disabled', false);
      $.event.trigger(events.FETCH_ACCOUNT_SUCCESS, result);
      setTimeout(() => {
        $('#switch-account-modal').modal('hide');
      }, 500);
    })
    .catch(error => {
      switchAccountModalAlert.show('Oops! Something went wrong!', 'danger');
      console.error(error);
      $submit.prop('disabled', false);
    });
});

/* eslint-enable no-process-env, no-console */
