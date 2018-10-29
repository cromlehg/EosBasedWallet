import ecc from 'eosjs-ecc';

function accountName(field, values, errors, checks) {
  if (!values[field]) {
    errors[field] = 'required';
  } else if (!/^[1-5a-z]*$/.test(values[field])) {
    errors[field] = 'account name may only include characters a-z, 1-5';
  } else if (checks.includes('lessThan12') && values[field].length > 12) {
    errors[field] = 'invalid account name length';
  } else if (checks.includes('exactly12') && values[field].length !== 12) {
    errors[field] = 'account name must be exactly 12 characters long';
  }
}

function privateKey(field, values, errors) {
  if (!values[field]) {
    errors[field] = 'required';
  } else if (!ecc.isValidPrivate(values[field], 'VEST')) {
    errors[field] = 'invalid private key';
  }
}

function publicKey(field, values, errors) {
  if (!values[field]) {
    errors[field] = 'required';
  } else if (!ecc.isValidPublic(values[field], 'VEST')) {
    errors[field] = 'invalid public key';
  }
}

function quantity(field, values, errors, number = null) {
  if (values[field] === '') {
    errors[field] = 'required';
  } else if (isNaN(parseFloat(values[field])) || !isFinite(values[field])) {
    errors[field] = 'invalid value';
  } else if (number !== null && Number(values[field]) > number) {
    errors[field] = 'not enough funds';
  }
}

export default {accountName, privateKey, publicKey, quantity};
