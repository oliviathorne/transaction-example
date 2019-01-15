// @flow
const alphaOnly = /^([a-zA-Z\s])+$/g;
const numberTwoDecimals = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;

// See https://emailregex.com/ for full documentation on this regex
const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

const nameError = 'Please enter a valid name.';
const emailError = 'Please enter a valid email address.';
const amountError = 'Please enter a valid amount.';
const amountMaxError = 'You do not have enough money available.';

const validation = (name: string, value: string, totalAvailable: number) => {
  switch (name) {
    case 'name':
      if (!value) {
        return nameError;
      }
      if (!value.match(alphaOnly)) {
        return nameError;
      }
      return true;
    case 'email':
      if (!value) {
        return emailError;
      }
      if (!value.match(email)) {
        return emailError;
      }
      return true;
    case 'amount':
      if (!value) {
        return amountError;
      }
      if (!value.match(numberTwoDecimals)) {
        return amountError;
      }
      if (parseFloat(value) > totalAvailable) {
        return amountMaxError;
      }
      return true;
    default:
      return true;
  }
};

export default validation;
