import validation from './validation';

const nameError = 'Please enter a valid name.';
const emailError = 'Please enter a valid email address.';
const amountError = 'Please enter a valid amount.';
const amountMaxError = 'You do not have enough money available.';

describe('Name validation', () => {
  it('returns an error if no name is provided', () => {
    expect(validation('name', '', null)).toEqual(nameError);
  });

  it('returns an error if non alpha name is provided', () => {
    expect(validation('name', '124a2', null)).toEqual(nameError);
  });

  it('returns true if a valid name is provided', () => {
    expect(validation('name', 'Test Name', null)).toEqual(true);
  });
});

describe('Email validation', () => {
  it('returns an error if no email is provided', () => {
    expect(validation('email', '', null)).toEqual(emailError);
  });

  it('returns an error if an invalid email is provided', () => {
    expect(validation('email', 'test@invalid', null)).toEqual(emailError);
  });

  it('returns true if an valid email is provided', () => {
    expect(validation('email', 'test@valid.com', null)).toEqual(true);
  });
});

describe('Amount validation', () => {
  it('returns an error if no amount is provided', () => {
    expect(validation('amount', '', null)).toEqual(amountError);
  });

  it('returns an error if an non numeric amount is provided', () => {
    expect(validation('amount', 'abc89s', 200)).toEqual(amountError);
  });

  it('returns an error if an amount with more than 2 decimals is provided', () => {
    expect(validation('amount', '12.398', 200)).toEqual(amountError);
  });

  it('returns an error if an amount is higher than the total available', () => {
    expect(validation('amount', '120', 30)).toEqual(amountMaxError);
  });

  it('returns true if a valid amount is provided', () => {
    expect(validation('amount', '120', 200)).toEqual(true);
  });
});

describe('Default case', () => {
  it('returns true by default', () => {
    expect(validation('unfoundName', '', null)).toEqual(true);
  });
});
