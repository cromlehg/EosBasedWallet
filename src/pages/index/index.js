import $ from 'jquery';
import Eos from 'eosjs';
import 'bootstrap/js/dist/modal';

import './index.pug';
import './index.scss';

function formatQuantity(value, decimals = 4) {
  return parseFloat(value).toFixed(decimals);
}

const eos = Eos({
  httpEndpoint: 'http://148.251.194.72:8888',
  chainId: '8449f44ce9ba91e7b3da01900a6c6e49cd8466ceb43352f0902f6934dbfc9f4a'
});

$('#send').click(e => {
  e.preventDefault();
  const params = {
    from: $('#from').val(),
    to: $('#to').val(),
    quantity: formatQuantity($('#quantity').val()) + ' VEST',
    memo: $('#memo').val()
  };
  const options = {keyProvider: $('#private-key').val()};
  eos.transfer(params, options).then(console.log);
});
