/* eslint-disable no-process-env */

import Eos from 'eosjs';

const eos = Eos({
  httpEndpoint: process.env.API_HTTP_ENDPOINT,
  chainId: process.env.API_CHAIN_ID,
  keyPrefix: 'VEST'
});

export default eos;

/* eslint-enable no-process-env */
