import { shallow, mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TransactionWrapper from './TransactionWrapper';
import Transaction from './../components/Transaction';
import { mockState } from './../mocks/mocks';

const mockStore = configureStore();
let store;
let wrapper;

beforeEach(() => {
  store = mockStore(mockState);
  wrapper = mount(
    <Provider store={store}>
      <TransactionWrapper />
    </Provider>
  );
});

describe('TransactionWrapper component', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a transcation for every saved transcation in the store', () => {
    const transaction = wrapper.find(Transaction);
    expect(transaction.props()).toEqual({
      name: { value: 'Test name' },
      email: { value: 'email@test.com' },
      amount: { value: '3000' }
    });
  });
});
