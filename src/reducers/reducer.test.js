import reducer from './index';
import { REGISTER_FIELD, UPDATE_FIELD_VALUE, SAVE_TRANSACTION } from './../actions/form';

const initialState = {
  form: {
    fields: {},
    savedTransactions: [],
    startingBalance: 18000,
    totalAvailable: 18000,
    totalSent: 0
  }
};

const mockState = {
  form: {
    fields: {
      testField: {
        value: ''
      }
    },
    savedTransactions: [],
    startingBalance: 18000,
    totalAvailable: 18000,
    totalSent: 0
  }
};

const mockUpdatedState = {
  form: {
    fields: {
      testField: {
        value: 'new value'
      }
    },
    savedTransactions: [],
    startingBalance: 18000,
    totalAvailable: 18000,
    totalSent: 0
  }
};

const mockSavedState = {
  form: {
    fields: {
      testField: {
        value: ''
      }
    },
    savedTransactions: [
      {
        testField: {
          value: 'new value'
        }
      }
    ],
    startingBalance: 18000,
    totalAvailable: 18000,
    totalSent: 0
  }
};

const mockAmountState = {
  form: {
    fields: {
      amount: {
        value: '8000'
      }
    },
    savedTransactions: [],
    startingBalance: 18000,
    totalAvailable: 18000,
    totalSent: 0
  }
};

const mockSavedAmountState = {
  form: {
    fields: {
      amount: {
        value: ''
      }
    },
    savedTransactions: [
      {
        amount: {
          value: '8000'
        }
      }
    ],
    startingBalance: 18000,
    totalAvailable: 10000,
    totalSent: 8000
  }
};

describe('Form reducer', () => {
  it('initialises with a default state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('registers a field with an initial value', () => {
    const action = {
      type: REGISTER_FIELD,
      data: { name: 'testField', initialValue: '' }
    };

    expect(reducer(initialState, action)).toEqual(mockState);
  });

  it('updates a field with a new value', () => {
    const action = {
      type: UPDATE_FIELD_VALUE,
      data: { name: 'testField', value: 'new value' }
    };

    expect(reducer(mockState, action)).toEqual(mockUpdatedState);
  });

  it('saves fields to savedTransactions', () => {
    const action = {
      type: SAVE_TRANSACTION
    };

    expect(reducer(mockUpdatedState, action)).toEqual(mockSavedState);
  });

  it('saved amounts calculate amount available and total spent', () => {
    const action = {
      type: SAVE_TRANSACTION
    };

    expect(reducer(mockAmountState, action)).toEqual(mockSavedAmountState);
  });
});
