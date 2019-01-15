// @flow
import { combineReducers } from 'redux';
import { REGISTER_FIELD, UPDATE_FIELD_VALUE, SAVE_TRANSACTION } from './../actions/form';

type InitialState = {
  +fields: {
    [key: string]: {
      [key: string]: string
    }
  },
  +savedTransactions: Array<{
    [key: string]: {
      [key: string]: string
    }
  }>,
  +startingBalance: number,
  +totalAvailable: number,
  +totalSent: number
};

type Action = {
  type: string,
  data: {
    [key: string]: string
  }
};

let initialFormState: InitialState = {
  fields: {},
  savedTransactions: [],
  startingBalance: 18000,
  totalAvailable: 18000,
  totalSent: 0
};

function formReducer(state = initialFormState, action: Action): InitialState {
  let newState: InitialState;

  switch (action.type) {
    case REGISTER_FIELD:
      newState = Object.assign({}, state, {
        fields: Object.assign({}, state.fields, {
          [action.data.name]: {
            value: action.data.initialValue
          }
        })
      });
      return newState;
    case UPDATE_FIELD_VALUE:
      newState = Object.assign({}, state, {
        fields: Object.assign({}, state.fields, {
          [action.data.name]: {
            value: action.data.value
          }
        })
      });
      return newState;
    case SAVE_TRANSACTION:
      let fields = {};
      Object.keys(state.fields).forEach((field) => {
        fields = Object.assign(fields, {
          [field]: {
            value: ''
          }
        });
      });

      newState = Object.assign({}, state, {
        savedTransactions: [state.fields, ...state.savedTransactions],
        fields: Object.assign({}, state.fields, fields),
        totalAvailable: state.fields.hasOwnProperty('amount')
          ? state.totalAvailable - parseFloat(state.fields['amount'].value)
          : state.totalAvailable,
        totalSent: state.fields.hasOwnProperty('amount')
          ? state.totalSent + parseFloat(state.fields['amount'].value)
          : state.totalSent
      });

      return newState;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  form: formReducer
});

export default rootReducer;
